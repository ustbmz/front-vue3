import { ForgetInfo, LoginInfo, RegInfo } from '@/common/interface'
import axios from '@/utils/request'

// 获取验证码
const getCode = (sid: string) => {
  return axios.get('/public/getCaptcha', {
    params: {
      sid: sid
    }
  })
}

// 忘记密码
const forget = async (forgetinfo: ForgetInfo) => {
  return axios.post('/login/forgot', {
    ...forgetinfo
  })
}

// 登陆接口
const login = async (logininfo: LoginInfo) => {
  return axios.post('/login/login', {
    ...logininfo
  })
}

// 注册接口
const reg = async (reginfo: RegInfo) => {
  return axios.post('/login/reg', {
    ...reginfo
  })
}

export { getCode, forget, login, reg }
