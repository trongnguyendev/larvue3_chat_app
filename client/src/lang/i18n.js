import { createI18n } from 'vue-i18n'
import en_json from './en.json'
import vn_json from './vn.json'

const messages = {
    en: en_json,
    vn: vn_json,
}

const i18n = createI18n({
    locale: 'vn',
    fallbackLocale: 'en',
    messages,
})

export default i18n