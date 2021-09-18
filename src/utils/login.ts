import { getCode, login, reg } from '@/api/login'
import { HttpResponse } from '@/common/interface'
import store from '@/store'
import { reactive } from '@vue/runtime-dom'
import { v4 as uuidv4 } from 'uuid'

export const loginUtils = () => {
  let sid = ''

  const state = reactive({
    username: '',
    name: '',
    password: '',
    repassword: '',
    code: '',
    svg: ''
  })

  const getCaptcha = async () => {
    if (localStorage.getItem('sid')) {
      sid = localStorage.getItem('sid') || ''
    } else {
      sid = uuidv4()
      localStorage.setItem('sid', sid)
    }
    store.commit('setSid', sid)
    const { data, code } = (await getCode(sid)) as HttpResponse
    if (code === 200) {
      state.svg = data
    }
  }

  const loginHandle = async () => {
    const res = await login({
      username: state.username,
      password: state.password,
      code: state.code,
      sid: sid
    })
    const { code, data, token } = res as HttpResponse
    if (code === 200) {
      res.data.username = state.username
      store.commit('setUserInfo', data)
      store.commit('setIsLogin', true)
      store.commit('setToken', token)
      localStorage.setItem('isLogin', 'true')
    }
    return res
  }
  const regHandle = async () => {
    const res = await reg({
      username: state.username,
      name: state.name,
      password: state.password,
      code: state.code,
      sid: sid
    })
    return res
  }

  return {
    state,
    getCaptcha,
    loginHandle,
    regHandle
  }
}
