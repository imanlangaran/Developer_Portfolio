import i18n from "i18next";
import { I18nContext, initReactI18next } from "react-i18next";
import en from "./locales/en.json";
import fa from "./locales/fa.json";
import { getLangFromLocalStorageOrDefault } from "../utils/helper";

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources: {
      En: { translation: en },
      Fa: { translation: fa },
    },
    lng: getLangFromLocalStorageOrDefault(),

    keySeparator: false, // we do not use keys in form messages.welcome

    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;
