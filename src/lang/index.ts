import { createI18n, I18nOptions } from 'vue-i18n'

// 本地语言包
import enLocale from './package/en/en'


function siphonI18n(prefix = 'zh-CN') {
  return Object.fromEntries(
    Object.entries(import.meta.glob('./**/*.ts', { eager: true })).map(([key, value]: any) => {
      const matched = key.match(/([A-Za-z0-9-_]+)\./i)[1]
      return [matched, value.default]
    })
  )[prefix]
}

const messages = {
  // 'zh-cn': {
  //   ...zhCnLocale,
  //   ...siphonI18n('zh-cn')
  // },
  en: {
    ...enLocale,
    ...siphonI18n('en')
  }
}

const i18n = createI18n({
  legacy: false, // 如果想在composition api中使用需要设置为false
  locale: 'en',
  messages: messages as I18nOptions['messages'],
  globalInjection: true // 如果设置true, $t() 函数将注册到全局
})
// console.log('il8n-----', messages);

export default i18n