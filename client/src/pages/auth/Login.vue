<template>
    <div class="grid container bg-white">
        <div class="p-9  rounded-md justify-between m-auto">
            <h2 class="text-[24px] font-bold text-color-t">Xin chào,</h2>
            <div class="form-register">
                <h1 class="text-s-17 mb-5 text-color-t">Đăng nhập tài khoản</h1>

                <div class="flex mb-3 items-center border-1 rounded-md border-gray-300 px-2">
                    <UserIcon class="w-5 h-5 text-gray-500 mr-1" />
                    <input class="input input-sm p-0 w-full" placeholder="Mail...">
                </div>

                <div class="flex mb-3 items-center border-1 rounded-md border-gray-300 px-2">
                    <KeyIcon class="w-5 h-5 text-gray-500 mr-1" />
                    <input class="input input-sm p-0 w-full" placeholder="Password...">
                </div>

                <label class="flex items-center mb-3">
                    <input type="checkbox" class="checkbox checkbox-xs">
                    <span class="ml-2 cursor-pointer opacity-50 text-sm">Ghi nhớ đăng nhập</span>
                </label>


                <button class="bg-primary rounded-md text-14 text-white w-full py-3 font-bold">Đăng nhập</button>
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
                <p class="opacity-50 text-center text-xs">Bằng việc tiếp tục, bạn đã chấp nhận <span class="border-b border-gray-50"><nuxt-link class="underline" to="/">điều khoản sử dụng</nuxt-link></span></p>
            </div>
        </div>
    </div>
</template>

<script>
import UserIcon from '@/components/icons/User.vue'
import MailIcon from '@/components/icons/MailSolid.vue'
import KeyIcon from '@/components/icons/KeySolid.vue'

export default {
    components: {
        UserIcon,
        MailIcon,
        KeyIcon
    }
    
}
</script>