import {createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, sendEmailVerification} from "firebase/auth";
import {
    authErrorVar,
    currentUserVar,
    isAuthUserVar,
    secondStepVar,
    userDataVar,
} from "../../cashe/productVar";
const errorM = {
    "auth/wrong-password": "Wrong password",
    "auth/email-already-in-use": "This email address is already taken",
    "auth/too-many-requests": "Wrong password, please try again later.",
    "auth/user-not-found": "User not found"
}


const storage = window.localStorage;

export const createUserFireBase = (email, password )=>{
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            authErrorVar("")
            userDataVar({email: user.email, token: user.accessToken, password})
            secondStepVar(true)
        })
        .catch((error) => {
            const errorCode = error.code;
            authErrorVar(errorM[errorCode])
            console.log(errorCode)
        });
}

export const sendEmailVerificationFireBase = () => {
    const auth = getAuth();
    sendEmailVerification(auth.currentUser)
        .then(() => {
            console.log(auth.currentUser)
            // Email verification sent!
        });
}

export const authUserFireBase = ( mutationDgraph) =>{
    const auth = getAuth();
    const {email, password} = userDataVar()
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log(user)
            authErrorVar("")
            if (user.emailVerified){
                mutationDgraph({ variables: {email: user.email, token: user.accessToken} })
            }else{
                authErrorVar(`${email} Follow this link to verify your email address`)
            }

        })
        .catch((error) => {
            const errorCode = error.code;
            console.log(errorCode)
            authErrorVar(errorM[errorCode])
        });
}

export const setUserLocal = () => {
    storage.setItem("currentUser", JSON.stringify(userDataVar()));
    isAuthUserVar(true)
}

export const authCreateUserFireBase = (email, password, checkDgraph) =>{
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            authErrorVar("")
            if (user.emailVerified){
                checkDgraph({ variables: {email: user.email, token: user.accessToken} })
                userDataVar({email: user.email, token: user.accessToken, password})
                console.log("authCreateUserFireBase", user)
            }else{
                authErrorVar(`${email} Follow this link to verify your email address`)
            }

        })
        .catch((error) => {
            const errorCode = error.code;
            console.log(errorCode)
            authErrorVar(errorM[errorCode])
        });
}

export const authCreateUserDgraph = (addDgraph) => {
    const {email, token} = userDataVar()
    addDgraph({ variables: {email, token} })
}

export const getUserDgraph = () =>{
    if (storage.getItem("currentUser") ) {
        const current = JSON.parse(storage.getItem("currentUser"));
        if(current.email){
            isAuthUserVar(true);
        }
        return current.email
    }
}

export const  deleteUser = () => {
    userDataVar({});
    currentUserVar({});
    storage.setItem("currentUser", JSON.stringify({}));
    isAuthUserVar(false);
}