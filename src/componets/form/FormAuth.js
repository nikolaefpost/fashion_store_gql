import React, {useState} from 'react';
import rootStore from "../../store/rootStore";
import MainAuth from "./AuthStep/MainAuth";
import ForgotPassword from "./AuthStep/ForgotPassword";


const FormAuth = ({handleTransition, setModal}) => {
    const {userStore} = rootStore;
    const [isNewPassword, setIsNewPassword] = useState(false);

    return (!isNewPassword ?
            <MainAuth
                handleTransition={handleTransition}
                form={userStore.form}
                authUser={userStore.handleAuthUser}
                setModal={setModal}
                setIsNewPassword={setIsNewPassword}
            /> :
            <ForgotPassword
                handleSetRecoveryEmail={userStore.handleSetRecoveryEmail}
                setIsNewPassword={setIsNewPassword}
            />
    );
};

export default FormAuth;