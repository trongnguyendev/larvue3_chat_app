<template>
    <div class="grid container bg-white">
            <div class="p-9 rounded-md justify-between lg:order-first m-auto">
                <div>
                    <h2 class="text-[24px] font-bold text-color-t">Xin chào,</h2>
                    <div class="form-register grid gap-3">
                        <h1 class="text-s-14 mb-5 text-color-t">{{ $t('login.title_register') }}</h1>
                        <InputText 
                            v-model="name" 
                            :isError="v$.name.$error"
                            :placeHolder="$t('login.enter_name')">
                            <UserIcon class="w-5 h-5 text-gray-500 mr-1" />
                        </InputText>
                        <ErrorMessage v-if="v$.name.$error">Name field has an error.</ErrorMessage>

                        <InputText 
                            v-model="email"
                            :isError="v$.email.$error || emailTaken"
                            :placeHolder="$t('login.enter_email')">
                            <UserIcon class="w-5 h-5 text-gray-500 mr-1" />
                        </InputText>
                        <ErrorMessage v-if="v$.email.$error">Mail field has an error.</ErrorMessage>
                        <ErrorMessage v-if="emailTaken">Mail is taken.</ErrorMessage>

                        <InputText
                            v-model="password" 
                            :isError="v$.password.$error"
                            :placeHolder="$t('login.enter_password')">
                            <KeyIcon class="w-5 h-5 text-gray-500 mr-1" />
                        </InputText>
                        <ErrorMessage v-if="v$.password.$error">Password field has an error.</ErrorMessage>

                        <InputText 
                            v-model="confirmPassword" 
                            :isError="v$.confirmPassword.$error"
                            :placeHolder="$t('login.retype_password')">
                            <KeyIcon class="w-5 h-5 text-gray-500 mr-1" />
                        </InputText>
                        <ErrorMessage v-if="v$.confirmPassword.$error">Confirm password fail, try input password.</ErrorMessage>

                        <InputCheckbox v-model="accept">{{ $t('login.accept_with_policie')}}</InputCheckbox>

                        <ErrorMessage v-if="v$.accept.$error">Accept field has an error.</ErrorMessage>

                        <ErrorMessage v-if="registerFail">Register fail, please check input.</ErrorMessage>

                        <button class="mt-3 bg-primary rounded-md text-14 text-white w-full py-3 font-bold flex justify-center items-center" :disabled="isRequestOngoing" @click="submitForm">
                            <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" v-if="isRequestOngoing">
                                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            {{ $t('login.btn_register') }}
                        </button>
                    </div>

                    <div class="mt-2 text-center">
                        <router-link to="/login" class="text-sm opacity-50 text-center text-color-t">{{ $t('login.have_account') }} <span class="text-blue-700 cursor-pointer">{{ $t('login.login') }}</span></router-link>
                    </div>
                </div>

                <div class="login-orther mt-6">
                    <p class="opacity-50 text-center text-sm text-color-t">Hoặc tiếp tục bằng</p>
                    <div class="flex justify-center my-4">
                        <button class="outline-none focus-visible:outline-none"><img src="@/assets/images/fb.png" class="w-14" alt=""></button>
                        <button class="outline-none"><img src="@/assets/images/gg.png" class="w-14 mx-5" alt=""></button>
                        <button><img src="@/assets/images/zalo.png" class="w-14" alt=""></button>
                    </div>
                    <p class="opacity-50 text-center text-xs text-color-t">Bằng việc tiếp tục, bạn đã chấp nhận <span class="border-b border-gray-50"><router-link class="underline" to="/">điều khoản sử dụng</router-link></span></p>
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
        KeyIcon,
    },
    data() {
        return {
            name: '',
            email: 'trong7@gmail.com',
            password: '123123123',
            confirmPassword: '123123123',
            accept: false,

            registerFail: false,
            isRequestOngoing: false,
            emailTaken: false,
        }
    },
    validations () {
        return {
            name: { required },
            email: { required, email },
            password: { required },
            confirmPassword: { sameAs: val => val === this.password },
            accept: { sameAs: val => val === true }
        }
    },
    computed: {
        ...mapState('auth', {
            status: state => state.status,
            user: state => state.user
        }),
    },

    created() {        
    },

    methods: {
        ...mapActions('auth',[
            'login',
            'logout',
            'register',
        ]),

        async submitForm(user) 
        {
            const isFormCorrect = await this.v$.$validate()

            if (!isFormCorrect) return this.registerFail = true
            
            this.isRequestOngoing = true

            let response = await this.register({
                'name': this.name,
                'email': this.email,
                'password': this.password
            })

            this.isRequestOngoing = false

            if (response.status == 0) {
                this.emailTaken = response.results.errors.email.length > 0
                this.registerFail = true
                this.toast.error("I'm a toast!");
            } else {
                this.registerFail = false
                this.emailTaken = false
                this.toast.success("Register success");
                v$.$reset()
                this.$router.push("/login");
            }
        }
    }
    
}
</script>