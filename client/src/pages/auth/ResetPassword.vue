<template>
    <div class="grid container bg-white">
        <div class="p-9  rounded-md justify-between m-auto">
            <h2 class="text-[24px] font-bold text-color-t">Xin chào,</h2>
            <div class="form-register grid gap-3">
                <h1 class="text-s-17 mb-3 text-color-t">Tạo mật khẩu mới</h1>
                <form action="" class="grid gap-3" @submit.prevent="submitForm">
                    <InputText 
                        v-model="password"
                        type="password"
                        :isError="v$.password.$error"
                        placeHolder="Password mới">
                        <KeyIcon class="w-5 h-5 text-gray-500 mr-1" />
                    </InputText>
                    <ErrorMessage v-if="v$.password.$error">Password field has an error.</ErrorMessage>

                    <InputText 
                        v-model="passwordConfirm"
                        type="password"
                        :isError="v$.passwordConfirm.$error"
                        placeHolder="Password confirm...">
                        <KeyIcon class="w-5 h-5 text-gray-500 mr-1" />
                    </InputText>
                    <ErrorMessage v-if="v$.passwordConfirm.$error">Password confirm field has an error.</ErrorMessage>
                    
                    <button class="mt-3 bg-primary rounded-md text-14 text-white w-full py-3 font-bold flex justify-center items-center">
                        <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" v-if="isRequestOngoing">
                            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Reset Password
                    </button>
                </form>
                
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
        MailIcon,
        KeyIcon
    },

    data() {
        return {
            email: '',
            token: '',
            password: '',
            passwordConfirm: '',

            isRequestOngoing: false,
        }
    },
    validations () {
        return {
            password: { required },
            passwordConfirm: { sameAs: val => val === this.password },
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
        this.email = this.$route.query.email
        this.token = this.$route.query.token
    },

    methods: {
        ...mapActions('auth',[
            'login',
            'logout',
            'register',
            'forgotPassword',
            'resetPassword',
            'me',
        ]),

        ...mapActions('notification', [
            'showNotification',
            'resetNotification'
        ]),



        async submitForm(event) 
        {
            event.preventDefault()

            const isFormCorrect = await this.v$.$validate()

            if (!isFormCorrect) return

            this.isRequestOngoing = true;

            let response = await this.resetPassword({
                'email': this.email,
                'password': this.password,
                'password_confirmation': this.passwordConfirm,
                'token': this.token
            })

            this.isRequestOngoing = false

            let data_notification = {
                'title': response.message,
                'message': response.message,
                'type': response.status == 1 ? 'success' : 'error',
            }

            this.showNotification(data_notification)
            
            if(response.status) {
                this.$router.push('/login')
            }
        }
    }
    
}
</script>