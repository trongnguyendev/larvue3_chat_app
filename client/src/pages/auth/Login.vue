<template>
    <div class="grid container bg-white">
        <div class="p-9  rounded-md justify-between m-auto">
            <h2 class="text-[24px] font-bold text-color-t">Xin chào,</h2>
            <div class="form-register grid gap-3">
                <h1 class="text-s-17 mb-5 text-color-t">{{ $t('login.title_login') }}</h1>
                <form action="" class="grid gap-3" @submit.prevent="submitForm">
                    <InputText 
                        v-model="email"
                        :isError="v$.email.$error"
                        :placeHolder="$t('login.enter_email')">
                        <UserIcon class="w-5 h-5 text-gray-500 mr-1" />
                    </InputText>
                    <ErrorMessage v-if="v$.email.$error">Mail field has an error.</ErrorMessage>

                    <InputText
                        v-model="password" 
                        type="password"
                        :isError="v$.password.$error"
                        :placeHolder="$t('login.enter_password')">
                        <KeyIcon class="w-5 h-5 text-gray-500 mr-1" />
                    </InputText>
                    <ErrorMessage v-if="v$.password.$error">Password field has an error.</ErrorMessage>

                    <div class="flex justify-between">
                        <label class="flex items-center mb-3">
                            <input type="checkbox" class="checkbox checkbox-xs" v-model="isRemember">
                            <span class="ml-2 cursor-pointer opacity-50 text-sm">Ghi nhớ đăng nhập</span>
                        </label>

                        <router-link
                        class="text-sm text-blue-700 opacity-50 cursor-pointer"
                        to="/forgot-password"
                        >
                            Forgot Passwords
                        </router-link>
                    </div>

                    <button class="mt-3 bg-primary rounded-md text-14 text-white w-full py-3 font-bold flex justify-center items-center" :disabled="isRequestOngoing">
                        <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" v-if="isRequestOngoing">
                            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        {{ $t('login.btn_login') }}
                    </button>
                </form>
            </div>
            <div class="mt-2 text-center">
                <router-link to="/register" class="text-sm opacity-50 text-center">Bạn chưa có tài khoản? <span class="text-blue-700 cursor-pointer">Đăng kí ngay</span></router-link>
            </div>

            <div class="login-orther mt-6">
                <p class="text-center text-sm text-color-t">Hoặc tiếp tục bằng</p>
                <div class="flex justify-center my-4">
                    <button class="outline-none focus-visible:outline-none"><img src="@/assets/images/fb.png" class="w-14" alt=""></button>
                    <button class="outline-none"><img src="@/assets/images/gg.png" class="w-14 mx-5" alt=""></button>
                    <button><img src="@/assets/images/zalo.png" class="w-14" alt=""></button>
                </div>
                <p class="opacity-50 text-center text-xs">Bằng việc tiếp tục, bạn đã chấp nhận <span class="border-b border-gray-50"><router-link class="underline" to="/">điều khoản sử dụng</router-link></span></p>
            </div>
        </div>
    </div>
</template>

<script>
import { UserIcon, KeyIcon, MailIcon } from '@heroicons/vue/solid'
import { mapActions, mapState } from 'vuex'
import useVuelidate from '@vuelidate/core'
import { required, email, shouldBeChecked, sameAs, helpers } from '@vuelidate/validators'
import { useToast } from "vue-toastification";

export default {
    setup () {
        const toast = useToast();
        return { v$: useVuelidate(), toast }
    },
    components: {
        UserIcon,
        MailIcon,
        KeyIcon
    },

    data() {
        return {
            email: '',
            password: '',

            isRequestOngoing: false,
            isRemember: false
        }
    },
    validations () {
        return {
            email: { required, email },
            password: { required },
        }
    },

    computed: {
        ...mapState('auth', {
            token: state => state.token,
            loggedIn: state => state.loggedin
        }),
        ...mapState('notification', {

        })
    },

    created() {
        this.loadRemember()
    },

    methods: {
        ...mapActions('auth',[
            'login',
            'logout',
            'register',
            'me'
        ]),

        ...mapActions('notification', [
            'showNotification',
            'resetNotification'
        ]),

        loadRemember() {
            if(this.$cookies.get('loginRemember') != null) {
                let data_cookie = this.$cookies.get('loginRemember')
                this.email = data_cookie.email
                this.password = this.deCodePassword(data_cookie.password)
                this.isRemember = true
            }
        },

        enCodePassword(pw) {
            return btoa(encodeURIComponent(pw))
        },

        deCodePassword(pw) {
            return decodeURIComponent(atob(pw))
        },

        saveRemember() {
            if(this.isRemember) {
                this.$cookies.set('loginRemember', JSON.stringify({email: this.email, password: this.enCodePassword(this.password)}));
            } else {
                if(this.$cookies.get('loginRemember') != null) {
                    this.$cookies.remove('loginRemember')
                }
            }
        },

        async submitForm() 
        {
            const isFormCorrect = await this.v$.$validate()

            if (!isFormCorrect) return
            
            this.isRequestOngoing = true

            let response = await this.login({
                'email': this.email,
                'password': this.password
            })

            this.isRequestOngoing = false

            if (response.status == 0) {
                let data_notification = {
                    'title': 'Login fail',
                    'message': 'message login success',
                    'type': 'error',
                }

                this.showNotification(data_notification)
            } else {

                this.saveRemember()

                let data_notification = {
                    'title': 'Login success',
                    'message': 'message login success',
                    'type': 'success',
                }

                this.showNotification(data_notification)

                // let response_me = await this.me()
                
                this.$router.push("/message");
                // v$.$reset()

                // console.log(this.user)
            }

            
            
        }
    }
    
}
</script>