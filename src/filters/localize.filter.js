import store from '../store'
import ru from '@/local/ru.json'
import en from '@/local/en.json'

const locales = {
    'ru-RU': ru,
    'en-US': en
}

export default function localizeFilter(key) {
    const local = store.getters.info.local || 'ru-RU'
    return locales[local][key] || `[localize ERROR]: key ${key} is not found`
}