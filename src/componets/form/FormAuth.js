import React, {useState} from 'react';
import MainAuth from "./AuthStep/MainAuth";
import ForgotPassword from "./AuthStep/ForgotPassword";
import {form} from "../../appolo/operations/user/userFormData";


const FormAuth = ({handleTransition, setModal}) => {
    const [isNewPassword, setIsNewPassword] = useState(false);

    return (!isNewPassword ?
            <MainAuth
                handleTransition={handleTransition}
                form={form}
                setModal={setModal}
                setIsNewPassword={setIsNewPassword}
            /> :
            <ForgotPassword
                setIsNewPassword={setIsNewPassword}
            />
    );
};

export default FormAuth;