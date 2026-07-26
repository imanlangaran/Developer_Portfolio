import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { getLangFromLocalStorageOrDefault } from "../utils/helper";

import common_en from "./locales/en/common.json";
import hero_en from "./locales/en/hero.json";
import skills_en from "./locales/en/skills.json";
import projects_en from "./locales/en/projects.json";
import about_en from "./locales/en/about.json";
import contact_en from "./locales/en/contact.json";
import footer_en from "./locales/en/footer.json";
import notFound_en from "./locales/en/notFound.json";

import common_fa from "./locales/fa/common.json";
import hero_fa from "./locales/fa/hero.json";
import skills_fa from "./locales/fa/skills.json";
import projects_fa from "./locales/fa/projects.json";
import about_fa from "./locales/fa/about.json";
import contact_fa from "./locales/fa/contact.json";
import footer_fa from "./locales/fa/footer.json";
import notFound_fa from "./locales/fa/notFound.json";

i18n
  .use(initReactI18next)
  .init({
    resources: {
      En: {
        common: common_en,
        hero: hero_en,
        skills: skills_en,
        projects: projects_en,
        about: about_en,
        contact: contact_en,
        footer: footer_en,
        notFound: notFound_en,
      },
      Fa: {
        common: common_fa,
        hero: hero_fa,
        skills: skills_fa,
        projects: projects_fa,
        about: about_fa,
        contact: contact_fa,
        footer: footer_fa,
        notFound: notFound_fa,
      },
    },

    ns: [
      "common",
      "hero",
      "skills",
      "projects",
      "about",
      "contact",
      "footer",
      "notFound",
    ],
    defaultNS: "common",
    fallbackNS: "common",

    lng: getLangFromLocalStorageOrDefault(),

    keySeparator: false,

    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
