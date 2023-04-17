import {createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, sendEmailVerification} from "firebase/auth";
import {
    authErrorVar,
    currentUserVar,
    isAuthUserVar,
    secondStepVar,
    userEmailVar,
    userPasswordVar, userTokenVar
} from "../../cashe/productVar";
import catalog from "../../../pages/catalog/Catalog";
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
            userPasswordVar(password)
            userEmailVar(email)
            console.log(user)

            currentUserVar({email: user.email, token: user.accessToken})
            storage.setItem("currentUser", JSON.stringify(user));
            secondStepVar(true)
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
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
            // ...
            // setDgraph({ variables: {email: auth.currentUser.email, token: auth.currentUser.accessToken} })
        });
}

export const authUserFireBase = (email, password, mutationDgraph) =>{
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            userTokenVar(user.accessToken)
            userEmailVar(email)
            console.log(user)
            authErrorVar("")
            if (user.emailVerified){
                mutationDgraph({ variables: {email: user.email, token: user.accessToken} })
                console.log(user)
                if (!currentUserVar().email) currentUserVar({email: user.email, token: user.accessToken})
                storage.setItem("currentUser", JSON.stringify(user));
            }else{
                authErrorVar(`${email} Follow this link to verify your email address`)
            }

        })
        .catch((error) => {
            const errorCode = error.code;
            // const errorMessage = error.message;
            console.log(errorCode)
            authErrorVar(errorM[errorCode])
        });
}

export const authCreateUserFireBase = (email, password, checkDgraph) =>{
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            authErrorVar("")
            if (user.emailVerified){
                checkDgraph({ variables: {email: user.email, token: user.accessToken} })
                console.log(user)
                storage.setItem("currentUser", JSON.stringify(user));
            }

        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode)
            authErrorVar(errorM[errorCode])
        });
}

export const authCreateUserDgraph = (addDgraph) => {
    addDgraph({ variables: {email: userEmailVar(), token: userTokenVar()} })
}

export const getUserDgraph = () =>{
    if (storage.getItem("currentUser") ) {
        const current = JSON.parse(storage.getItem("currentUser"));
        if(current.email){
            currentUserVar(current);
            isAuthUserVar(true);
        }
    }
}

export const  deleteUser = () => {
    currentUserVar({});
    storage.setItem("currentUser", JSON.stringify({}));
    isAuthUserVar(false);
    // signOut(auth).catch(e=>console.log(e))
}