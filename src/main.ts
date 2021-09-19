// import directives from '@/common/directives'
import '@/common/vee-validate'
import alert from '@/components/modules/alert'
import popup from '@/components/modules/pop/index'
import router from '@/router'
import { createApp } from 'vue'
import App from './App.vue'
import store from './store'

const app = createApp(App)

app.use(alert)
app.use(popup)
app.use(store)
app.use(router)

// Object.keys(directives).forEach(key => {
//   app.directive(key, directives[key])
// })

app.mount('#app')
