import { localize } from '@vee-validate/i18n'
import zh from '@vee-validate/i18n/dist/locale/zh_CN.json'
import {
  confirmed,
  email,
  // eslint-disable-next-line camelcase
  is_not,
  length,
  max,
  min,
  required
} from '@vee-validate/rules'
import { configure, defineRule } from 'vee-validate'

defineRule('required', required)
defineRule('email', email)
defineRule('min', min)
defineRule('min', length)
defineRule('min', max)
defineRule('min', is_not)
defineRule('min', confirmed)

const config = {
  messages: {
    ...zh.messages,
    required: '请输入{field}'
  },
  names: {
    name: '昵称',
    username: '账号',
    password: '密码',
    code: '验证码'
  }
}

configure({
  // Generates an English message locale generator
  generateMessage: localize('zh_CN', config)
})
