<template>
    <div class="grid container bg-white">
            <div class="p-9 rounded-md justify-between lg:order-first m-auto">
                <div>
                    <h2 class="text-[24px] font-bold text-color-t">Xin chào,</h2>
                    <div class="form-register grid gap-3">
                        <h1 class="text-s-14 mb-5 text-color-t">{{ $t('login.title_register') }}</h1>
                        <form action="" class="grid gap-3" @submit.prevent="submitForm">
                            <InputText 
                                v-model="name" 
                                :isError="v$.name.$error"
                                :placeHolder="$t('login.enter_name')">
                                <UserIcon class="w-5 h-5 text-gray-500 mr-1" />
                            </InputText>
                            <ErrorMessage v-if="errorsForm.name">{{errorsForm.name}}</ErrorMessage>

                            <InputText 
                                v-model="email"
                                :isError="v$.email.$error || emailTaken"
                                :placeHolder="$t('login.enter_email')">
                                <UserIcon class="w-5 h-5 text-gray-500 mr-1" />
                            </InputText>
                            <ErrorMessage v-if="errorsForm.email">{{errorsForm.email}}</ErrorMessage>
                            <ErrorMessage v-if="emailTaken">Mail is taken.</ErrorMessage>

                            <InputText
                                type="password"
                                v-model="password" 
                                :isError="v$.password.$error"
                                :placeHolder="$t('login.enter_password')">
                                <KeyIcon class="w-5 h-5 text-gray-500 mr-1" />
                            </InputText>
                            
                            <ErrorMessage v-if="errorsForm.password">{{errorsForm.password}}</ErrorMessage>

                            <InputText 
                                type="password"
                                v-model="confirmPassword" 
                                :isError="v$.confirmPassword.$error"
                                :placeHolder="$t('login.retype_password')">
                                <KeyIcon class="w-5 h-5 text-gray-500 mr-1" />
                            </InputText>
                            <ErrorMessage v-if="v$.confirmPassword.$error">Confirm password must same the password.</ErrorMessage>

                            <InputCheckbox v-model="accept">{{ $t('login.accept_with_policie')}}</InputCheckbox>

                            <ErrorMessage v-if="registerFail">Register fail, please check input.</ErrorMessage>

                            <button
                            :disabled="!accept || isRequestOngoing"
                            :class="{'opacity-50': !accept}"
                            class="mt-3 bg-primary rounded-md text-14 text-white w-full py-3 font-bold flex justify-center items-center" >
                                <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" v-if="isRequestOngoing">
                                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                {{ $t('login.btn_register') }}
                            </button>
                        </form>
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

import { replaceValidate } from '@/mixins/replaceValidate'

export default {
    mixins: [replaceValidate],
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
            email: '',
            password: '',
            confirmPassword: '',
            accept: false,

            registerFail: false,
            isRequestOngoing: false,
            emailTaken: false,

            errorsForm: {
                name: '',
                email: '',
                password: '',
                confirmPassword: '',
                
            }
        }
    },
    validations () {
        return {
            name: { required },
            email: { required, email },
            password: { required },
            confirmPassword: { sameAs: val => val == this.password },
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

        ...mapActions('notification', [
            'showNotification',
            'resetNotification'
        ]),
        
        async submitForm() 
        {
            const isFormCorrect = await this.v$.$validate()

            if (!isFormCorrect) {
                this.errorsForm = this.replaceMessage(this.errorsForm, this.v$.$errors);
                this.registerFail = true
                return
            } 

            this.errorsForm = this.resetValidate(this.errorsForm)
            
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
            } else {
                this.registerFail = false
                this.emailTaken = false

                let data_notification = {
                    'title': 'Register success',
                    'message': 'message register success',
                    'type': 'success',
                }

                this.showNotification(data_notification)
                
                this.$router.push("/login");
                // v$.$reset()
            }
        }
    }
    
}
</script>