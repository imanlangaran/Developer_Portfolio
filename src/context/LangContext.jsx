import { createContext, useContext, useEffect, useState } from "react";
import { I18nextProvider } from "react-i18next";
import i18n from "../lang/i18n";
import {
  getChangeLangDuration,
  getLangFromLocalStorageOrDefault,
  setLangToLocalStorage,
} from "../utils/helper";

const langContext = createContext();

const langDirMap = {
  En: "ltr",
  Fa: "rtl",
};

export const LangProvider = ({ children }) => {
  const [lang, setLang] = useState(getLangFromLocalStorageOrDefault());

  useEffect(() => {
    document.documentElement.dir = langDirMap[lang] || "ltr";
  }, []);

  useEffect(() => {
    // setLang(lang);
    setTimeout(() => {
      i18n.changeLanguage(lang);
      document.documentElement.dir = langDirMap[lang] || "ltr";
      document.documentElement.lang = lang.toLowerCase();
      setLangToLocalStorage(lang);
    }, getChangeLangDuration("ms"));
    // localStorage.setItem('lang', lang)
  }, [lang]);

  return (
    <langContext.Provider value={{ lang, setLang }}>
      <I18nextProvider i18n={i18n}>
        <div className={`${i18n.language === "En" ? "font-en" : "font-fa"}`}>
          {children}
        </div>
      </I18nextProvider>
    </langContext.Provider>
  );
};

export const useLang = () => useContext(langContext);
