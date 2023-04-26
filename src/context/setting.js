import React, {createContext,  useContext, useEffect, useState} from "react";
import {data} from "./languageData";



const SettingContext = createContext({});

export const LanguageProvider = ({children}) => {
    const [lang, setLang] = useState("Eng");
    const [text, setText] = useState({});

    const onChangeLang = () => setLang(prev => {
        return (prev === "Eng")? "Укр" : "Eng"
    });

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