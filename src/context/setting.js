import React, {createContext,  useContext, useEffect, useState} from "react";
import {data} from "./languageData";

const storage = window.localStorage;
const SettingContext = createContext({});

export const LanguageProvider = ({children}) => {
    const currentLang = storage.getItem("language")

    const [lang, setLang] = useState(currentLang? currentLang: "Eng");
    const [text, setText] = useState({});

    const onChangeLang = () => {
        setLang(prev => {
            if (prev === "Eng"){
                storage.setItem("language", "Укр");
                return "Укр"
            }else{
                storage.setItem("language", "Eng");
                return "Eng"
            }
        })

    };

    const getLanguage = () => {
        if (lang === "Eng") {
          setText(data.en);
        }
        else {
          setText(data.ua);
        }
    };

    useEffect(() => getLanguage(), [getLanguage, lang]);
    const value = { text, lang, onChangeLang };

    return (
        <SettingContext.Provider value={value}>
            {children}
        </SettingContext.Provider>
    );
};

export const useLanguage = () => useContext(SettingContext);