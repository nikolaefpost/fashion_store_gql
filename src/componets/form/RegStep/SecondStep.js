import React, {useEffect} from 'react';
import {authUserFireBase, sendEmailVerificationFireBase, setUserLocal} from "../../../appolo/operations/user/userStore";
import {useMutation, useReactiveVar} from "@apollo/client";
import {ADD_USER} from "../../../appolo/operations/user/userGrapfQgl";
import {secondStepVar, userDataVar} from "../../../appolo/cashe/appVar";
import {useLanguage} from "../../../context/setting";

import styles from "../form.module.scss";



const SecondStep = ({setModal}) => {
    const {text} = useLanguage();
    const [addUser, {data, loading, error}] = useMutation(ADD_USER)
    const currentData = useReactiveVar(userDataVar)
    const { email } = userDataVar();

    const createUserFinality = () => {
        authUserFireBase(addUser)
    }

    useEffect(() => {
        if (currentData.email) {
            sendEmailVerificationFireBase()
        }
    }, [currentData])

    useEffect(() => {
        if (data?.addUser) {
            setUserLocal()
            secondStepVar(false)
            setModal(false);
        }
    }, [data])

    if (loading) return 'Submitting...';
    if (error) return `Submission error! ${error?.message}`;

    return (
        <div className={styles.user_form}>
            <h3>{text.registration_step_2}</h3>
            <div className={styles.second_step_text}>{text.should_receive_letter} {email}. {text.follow_link_proceed}</div>
            <button
                type="button"
                className={styles.submit}
                onClick={createUserFinality}
            >
                {text.register}
            </button>
        </div>
    );
};

export default SecondStep;