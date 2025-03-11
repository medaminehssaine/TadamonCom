import { I18n } from 'i18n-js';
import * as RNLocalize from 'react-native-localize';
import en from "i18n-js/json/en.json";
import fr from "i18n-js/json/fr.json";
import ar from "i18n-js/json/ar.json";

// Correct structure: { en: {...}, fr: {...}, ar: {...} }
const translations = { ...en, ...fr, ...ar };

const i18n = new I18n(translations);

const deviceLocale = RNLocalize.getLocales()[0].languageTag;
i18n.locale = deviceLocale.split('-')[0];
i18n.enableFallback = true;

export default i18n;