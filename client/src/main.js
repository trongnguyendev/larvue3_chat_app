import { createApp } from 'vue'

// const axios = require('axios')

import axios from 'axios'

import App from './App.vue'

// vue router
import router from './router'

// style css
import './assets/style.css'

// store vuex
import store from './stores'

// vue toast - https://github.com/Maronato/vue-toastification  -  https://vue-toastification.maronato.dev/?ref=madewithvuejs.com
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";

// vue I18n - https://vue-i18n.intlify.dev/guide/#javascript
import i18n from './lang/i18n'

// register componenet global
import ErrorMessage from '@/components/base/ErrorMessage'
import InputText from '@/components/base/InputText'
import InputCheckbox from '@/components/base/InputCheckbox'
import InputRadio from '@/components/base/InputRadio'
import InputRadioGroup from '@/components/base/InputRadioGroup'

const app = createApp(App)
app.use(router)
app.use(store)
app.use(i18n)
app.mount('#app')

const options = {
    position: "top-right",
    timeout: 2000,
    closeOnClick: true,
    pauseOnFocusLoss: false,
    pauseOnHover: false,
    draggable: true,
    draggablePercent: 0.42,
    showCloseButtonOnHover: false,
    hideProgressBar: true,
    closeButton: "button",
    icon: true,
    rtl: false,
    transition: "Vue-Toastification__fade",
    maxToasts: 8,
    newestOnTop: true
};

app.use(Toast, options);

app.component('ErrorMessage', ErrorMessage)
app.component('InputText', InputText)
app.component('InputCheckbox', InputCheckbox)
app.component('InputRadio', InputRadio)
app.component('InputRadioGroup', InputRadioGroup)

// Other config global (ex: this.configToast)
app.config.globalProperties.configToast = []


axios.interceptors.request.use(request => {
    let user = localStorage.getItem('user')
    let token = JSON.parse(user);

    if(user) {
        request.headers.common.Authorization = `Bearer ${token.access_token}`;
    }

    return request
})

axios.interceptors.response.use(response => {
    return response
})