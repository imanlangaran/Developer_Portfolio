import { createContext, useContext, useEffect, useState } from "react";
import { I18nextProvider } from "react-i18next";
import i18n from "../lang/i18n";

const langContext = createContext();

export const LangProvider = ({ children }) => {
  const [lang, setLang] = useState(i18n.language);

  useEffect(() => {
    i18n.changeLanguage(lang);
  }, [lang]);

  return (
    <langContext.Provider value={{ lang, setLang }}>
      <I18nextProvider i18n={i18n}>
        <div id="langClass" className={`font-${lang.toLowerCase()}`}>
          {children}
        </div>
      </I18nextProvider>
    </langContext.Provider>
  );
};

export const useLang = () => useContext(langContext);
