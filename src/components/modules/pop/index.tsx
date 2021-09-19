import { App, createApp } from 'vue'
import PopComponent from './Pop.vue'
export const popup = (msg: string, type = '', delay = 2000) => {
  const root = document.createElement('div')
  document.body.appendChild(root)

  const options = {
    type,
    msg,
    delay
  }

  const popCom = createApp({
    setup () {
      const unmount = () => {
        popCom.unmount()
        document.body.removeChild(root)
      }
      const newOptions = Object.assign(options, { unmount })
      return () => <PopComponent {...newOptions} />
    }
  })

  popCom.mount(root)
}

export default {
  install: (app: App) => {
    app.config.globalProperties.$pop = popup
  }
}
