<template>
    <div class="grid container bg-white">
        <div class="p-9  rounded-md justify-between m-auto">
            <h2 class="text-[24px] font-bold text-color-t">Xin chào,</h2>
            <div class="form-register grid gap-3">
                <h1 class="text-s-17 mb-3 text-color-t">Nhập email reset password</h1>
                <form action="" class="grid gap-3" @submit.prevent="submitForm">
                    <InputText 
                        v-model="email"
                        type="email"
                        :isError="v$.email.$error"
                        :placeHolder="$t('login.enter_email')">
                        <MailIcon class="w-5 h-5 text-gray-500 mr-1" />
                    </InputText>
                    <ErrorMessage v-if="v$.email.$error">Mail field has an error.</ErrorMessage>


                    
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
        MailIcon
    },

    data() {
        return {
            email: '',
            isRequestOngoing: false,
        }
    },
    validations () {
        return {
            email: { required, email }
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
    },

    methods: {
        ...mapActions('auth',[
            'login',
            'logout',
            'register',
            'forgotPassword',
            'me',
        ]),

        ...mapActions('notification', [
            'showNotification',
            'resetNotification'
        ]),

        async submitForm() 
        {
            const isFormCorrect = await this.v$.$validate()

            if (!isFormCorrect) return

            this.isRequestOngoing = true;

            let response = await this.forgotPassword({
                'email': this.email
            })

            this.isRequestOngoing = false

            console.log(response)

            let data_notification = {
                'title': response.message,
                'message': response.message,
                'type': response.status == 1 ? 'success' : 'error',
            }

            this.showNotification(data_notification)
            
            if(response.status) {
                
            }
        }
    }
    
}
</script>