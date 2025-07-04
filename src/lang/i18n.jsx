import i18n from 'i18next';
import { I18nContext, initReactI18next } from "react-i18next";
import en from './locales/en.json';
import fa from './locales/fa.json';
import { useEffect, useState } from 'react';

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources: {
      En: { translation: en },
      Fa: { translation: fa },
    },
    lng: "Fa",

    keySeparator: false, // we do not use keys in form messages.welcome

    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

export const useI18n = () => {
  const [lang, setLang] = useState("Fa");

  const changeLanguage = (lng) => {
    setLang(lng);
    i18n.changeLanguage(lng)
  }

  useEffect(() => {
    document.title = i18n.t("my name");
  }, [lang])

  return { i18n, lang, changeLanguage };
}

export default i18n;
