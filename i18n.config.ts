import en from './lang/en.js';
import ch from './lang/ch.js';

export default defineI18nConfig(() => ({
    legacy: false,
    locales: ['en', 'ch'],
    messages: {
        en, 
        ch,
    },
}));