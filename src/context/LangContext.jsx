import { createContext, useContext, useEffect, useState } from "react";
import { I18nextProvider } from "react-i18next";
import i18n from "../lang/i18n";

const langContext = createContext();

const langDirMap = {
  En: "ltr",
  Fa: "rtl",
};

export const LangProvider = ({ children }) => {
  // Normalize detected language to our supported keys ("En" or "Fa")
  // Browser languages like "en-US", "en-GB", "fa-IR" are mapped accordingly
  const normalizeLang = (lng) => {
    if (!lng) return "En";
    const lower = String(lng).toLowerCase();
    return lower.startsWith("fa") ? "Fa" : "En";
  };

  const [lang, setLang] = useState(normalizeLang(i18n.language));

  // Set DOM attributes on mount (languageChanged event doesn't fire on init)
  useEffect(() => {
    document.documentElement.dir = langDirMap[lang] || "ltr";
    document.documentElement.lang = lang.toLowerCase();
    document.getElementById("langClass").className = `font-${lang.toLowerCase()}`;
  }, []);

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
