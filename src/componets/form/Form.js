import React, {useState} from 'react';
import {observer} from "mobx-react-lite";
import FormAuth from "./FormAuth";
import FormReg from "./FormReg";

const Form = ({setModal}) => {
    const [isAuth, setIsAuth] = useState(false)
    const authToReg = () => {
        setIsAuth(true);
    }
    const regToAuth = () => {
        setIsAuth(false);
    }

    return !isAuth ?
        <FormReg handleTransition={authToReg} setModal={setModal}/> :
        <FormAuth handleTransition={regToAuth} setModal={setModal}/>;
};

export default observer(Form);