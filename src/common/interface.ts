export interface UserInfo {
  _id: string
  isVip: string
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
  msg?: string | Record<string, any>
  token?: string
  lastsign?: string
  total?: number
  count?: number
  fav?: number
}

interface FormState<TValues> {
  values: TValues
  errors: Partial<Record<keyof TValues, string | undefined>>
  touched: Partial<Record<keyof TValues, boolean>>
  submitCount: number
}
declare type FormErrors<TValues extends Record<string, unknown>> = Partial<
  Record<keyof TValues, string | undefined>
>
interface SetFieldValueOptions {
  force: boolean
}
export interface FormActions<TValues extends Record<string, any>> {
  setFieldValue<T extends keyof TValues>(
    field: T,
    value: TValues[T],
    opts?: Partial<SetFieldValueOptions>
  ): void
  setFieldError: (
    field: keyof TValues,
    message: string | string[] | undefined
  ) => void
  setErrors: (fields: FormErrors<TValues>) => void
  setValues<T extends keyof TValues>(
    fields: Partial<Record<T, TValues[T]>>
  ): void
  setFieldTouched: (field: keyof TValues, isTouched: boolean) => void
  setTouched: (fields: Partial<Record<keyof TValues, boolean>>) => void
  resetForm: (state?: Partial<FormState<TValues>>) => void
}
export interface SubmissionContext<
  TValues extends Record<string, unknown> = Record<string, unknown>
> extends FormActions<TValues> {
  evt?: Event
}

export declare type SubmissionHandler<
  TValues extends Record<string, any> = Record<string, any>
> = (values: TValues, ctx: SubmissionContext<TValues>) => any
