import React, {useState} from 'react';
import {getAuth, signInWithPopup} from "firebase/auth";
import {FcGoogle} from "react-icons/fc"
import {auth, googleAuthProvider} from "../../firebase";

import styles from "./form.module.scss"

const GoogleAuth = () => {
    const [user, setUser] = useState(null);
    const handleGoogleAuth = () => {
        auth.onAuthStateChanged(maybeUser => {
            if (maybeUser !== null) {
                console.log(maybeUser)
                return setUser(maybeUser)
            }
        })
        signInWithPopup(auth, googleAuthProvider)
            .then(credentials => setUser(credentials.user))
            .catch(e => console.log(e))
    }

    return (
        <button className={styles.google_button} onClick={handleGoogleAuth}><FcGoogle/>  Google {user?.displayName}</button>
    );
};

export default GoogleAuth;