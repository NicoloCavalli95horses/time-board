//===========================
// Import
//===========================
import translations from "./locales/translations.json";
import { ref } from "vue";

//===========================
// Const
//===========================
export const availableLanguages = ["it", "en", "fr"];
export const currentLanguage = ref(_detectLanguage());


//===========================
// Functions
//===========================
function _detectLanguage() {
  // preference saved by user
  const stored = localStorage.getItem("language");

  if (stored && availableLanguages.includes(stored)) {
    return stored;
  }

  // browser language
  const browserLang = navigator.language.split("-")[0].toLowerCase();

  if (availableLanguages.includes(browserLang)) {
    return browserLang;
  }

  return availableLanguages.includes(browserLang) ? browserLang : "en";
}



export function setLanguage(lang) {
  if (availableLanguages.includes(lang)) {
    currentLanguage.value = lang;
    localStorage.setItem("language", lang);
  }
}



export function getLanguage() {
  return currentLanguage.value;
}



export function translate(key) {
  const lang = currentLanguage.value;
  const entry = translations[key];

  if (!entry) {
    console.warn(`Missing translation: ${key}`);
    return key;
  }

  return entry[lang] ?? entry["en"] ?? key;
}