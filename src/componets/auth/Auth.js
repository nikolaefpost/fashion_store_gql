import React, {useEffect, useState} from 'react';
import {getAuth, signInWithPopup} from 'firebase/auth';
import {app, googleAuthProvider} from '../../firebase'

const AuthProvider = () => {
    const auth = getAuth(app);
    const [user, setUser] = useState(auth.currentUser);
    console.log(user)

    useEffect(() => {
        const unsub = auth.onAuthStateChanged(maybeUser => {
            if (maybeUser !== null) return setUser(maybeUser)
        })
        signInWithPopup(auth, googleAuthProvider)
            .then(credentials => setUser(credentials.user))
            .catch(e => console.log(e))
        return unsub
    }, [auth])


    return user !== null ?
        <> {user.displayName}</> :
        <> Loading ...</>;
};

export default AuthProvider;