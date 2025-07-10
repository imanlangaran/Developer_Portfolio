import { createContext, useContext, useEffect, useState } from 'react'
import { I18nextProvider } from 'react-i18next'
import i18n from '../lang/i18n'
import { getLangFromLocalStorageOrDefault, setLangToLocalStorage } from '../utils/helper';

const langContext = createContext();

export const LangProvider = ({ children }) => {
  const [lang, setLang] = useState(
    getLangFromLocalStorageOrDefault()
  )

  useEffect(() => {
    i18n.changeLanguage(lang);
    // localStorage.setItem('lang', lang)
    setLangToLocalStorage(lang)
  }, [lang])

  return (
    <langContext.Provider
      value={{ lang, setLang }}
    >
      <I18nextProvider i18n={i18n}>
        <div className={`${lang === "En" ? "font-en" : "font-fa"}`}>
          {children}
        </div>
      </I18nextProvider>
    </langContext.Provider>
  )
}

export const useLang = () => useContext(langContext);