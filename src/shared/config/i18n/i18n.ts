import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import backend from "i18next-http-backend";
import { initReactI18next } from "react-i18next";

i18n
  .use(LanguageDetector)
  .use(backend)
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    fallbackLng: "en", // use en if detected lng is not available
    debug: __IS_DEV__,

    interpolation: {
      escapeValue: false, // react already safes from xss
    },

    react: {},
  });

export default i18n;
