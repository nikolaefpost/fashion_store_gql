import React, {useEffect, useState} from 'react';
import rootStore from "../../store/rootStore";
import {observer} from "mobx-react-lite";
import FirstStep from "./RegStep/FirstStep";
import SecondStep from "./RegStep/SecondStep";

const FormReg = ({handleTransition, setModal}) => {
    const [user, setUser] = useState({});
    const [isCheckEmail, setIsCheckEmail] = useState(false);
    const {userStore} = rootStore;
    useEffect(()=>{
        if (isCheckEmail) userStore.handleSetUser(user)
    }, [isCheckEmail, user])

    return (!user.email ?
            <FirstStep form={userStore.form} setUser={setUser} handleTransition={handleTransition}/> :
            <SecondStep secondForm={userStore.formStep2} setIsCheckEmail={setIsCheckEmail} setModal={setModal} />
    );
};

export default observer(FormReg);