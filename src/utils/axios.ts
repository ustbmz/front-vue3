// 封装axios 返回重新封装后的报文数据
// 进行异常处理
import { HttpResponse } from '@/common/interface'
import store from '@/store/index'
import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  Canceler
} from 'axios'
import errorHandle from './errorHandle'

class HttpRequest {
  private baseUrl: string
  private pending: Record<string, Canceler>
  constructor (baseUrl: string) {
    this.baseUrl = baseUrl
    this.pending = {}
  }

  // 获取配置
  getInsideConfig () {
    const config = {
      baseURL: this.baseUrl,
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      timeout: 10000
    }
    return config
  }

  // 设置拦截器
  interceptors (instance: AxiosInstance) {
    // Add a request interceptor
    // 发送请求拦截
    instance.interceptors.request.use(
      config => {
        const token = store.state.token
        if (token && config.headers) {
          config.headers.Authorization = 'Bearer ' + token
        }
        // Do something before request is sent
        console.log('axios 发出请求报文:', config)
        return config
      },
      err => {
        // Do something with request error

        errorHandle(err)
        return Promise.reject(err)
      }
    )

    // Add a response interceptor
    // 响应拦截
    instance.interceptors.response.use(
      res => {
        // Any status code that lie within the range of 2xx cause this function to trigger
        // Do something with response data
        if (res.status === 200) {
          return Promise.resolve(res.data)
        } else {
          return Promise.reject(res)
        }
      },
      err => {
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        // Do something with response error
        errorHandle(err)
        return Promise.reject(err)
      }
    )
  }

  // 创建实例
  request (options: AxiosRequestConfig) {
    const instance = axios.create()
    // Object.assign() 方法用于将所有可枚举属性的值从一个或多个源对象分配到目标对象。它将返回目标对象。
    const newOptions = Object.assign(this.getInsideConfig(), options)
    this.interceptors(instance)
    // return instance.request(newOptions)
    return instance(newOptions)
  }

  get (
    url: string,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse> | Promise<HttpResponse> {
    const options = Object.assign(
      {
        method: 'get',
        url: url
      },
      config
    )
    return this.request(options)
  }

  post (
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse> | Promise<HttpResponse> {
    const options = Object.assign(
      {
        method: 'post',
        url: url,
        data: data
      },
      config
    )
    return this.request(options)
  }
}

export default HttpRequest
