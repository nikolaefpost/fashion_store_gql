import React, {useState} from 'react';
import {observer} from "mobx-react-lite";
import FormAuth from "./FormAuth";
import FormReg from "./FormReg";
import {authErrorVar} from "../../appolo/cashe/productVar";

const Form = ({setModal}) => {
    const [isAuth, setIsAuth] = useState(false)
    const authToReg = () => {
        setIsAuth(true);
        authErrorVar("");
    }
    const regToAuth = () => {
        setIsAuth(false);
        authErrorVar("");
    }

    return !isAuth ?
        <FormReg handleTransition={authToReg} setModal={setModal}/> :
        <FormAuth handleTransition={regToAuth} setModal={setModal}/>;
};

export default observer(Form);