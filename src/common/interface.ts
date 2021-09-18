export interface UserInfo {
  id: string
  username?: string
  name?: string
  location?: string
  pic?: string
  gender?: string
  remark?: string
}

export interface LoginInfo {
  username: string
  password: string
  code: string
  sid?: string
}

export interface RegInfo extends LoginInfo {
  name: string
  repassword?: string
}

export interface ForgetInfo {
  username: string
  code: string
}

export interface HttpResponse {
  code: number
  data: any
  msg?: string
  lastsign?: string
  total?: number
  count?: number
  fav?: number
}
