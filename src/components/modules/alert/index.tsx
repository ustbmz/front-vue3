import { App, createApp } from 'vue'
import AlertComponent from './Alert.vue'

export const alert = (msg: string) => {
  const root = document.createElement('div')
  document.body.appendChild(root)

  const options = {
    type: 'alert',
    msg
  }

  const alertCom = createApp({
    setup () {
      const unmount = () => {
        alertCom.unmount()
        document.body.removeChild(root)
      }
      const newOptions = Object.assign(options, { unmount })
      return () => (<AlertComponent {...newOptions} />)
    }
  })

  alertCom.mount(root)
}

export const confirm = (msg: string, success:any, cencel?:any) => {
  const root = document.createElement('div')
  document.body.appendChild(root)

  const options = {
    type: 'confirm',
    msg,
    success,
    cencel
  }

  const alertCom = createApp({
    setup () {
      const unmount = () => {
        alertCom.unmount()
        document.body.removeChild(root)
      }
      const newOptions = Object.assign(options, { unmount })
      return () => (<AlertComponent {...newOptions} />)
    }
  })

  alertCom.mount(root)
}

export default {
  install: (app: App) => {
    app.config.globalProperties.$alert = alert
    app.config.globalProperties.$confirm = confirm
  }
}
