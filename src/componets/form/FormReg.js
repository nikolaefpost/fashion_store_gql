import React from 'react';
import FirstStep from "./RegStep/FirstStep";
import SecondStep from "./RegStep/SecondStep";
import {useReactiveVar} from "@apollo/client";
import {secondStepVar} from "../../appolo/cashe/appVar";
import {form} from "../../appolo/operations/user/userFormData";

const FormReg = ({handleTransition, setModal}) => {
    const secondStep = useReactiveVar(secondStepVar)
    return (!secondStep  ?
            <FirstStep form={form}  handleTransition={handleTransition} setModal={setModal}/> :
            <SecondStep   setModal={setModal} />
    );
};

export default FormReg;