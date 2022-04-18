<template>
    <div class="flex">
        <div class="w-96">
            <Sidebar />
        </div>
        <router-view></router-view>
    </div>
    
</template>



<script>
import Sidebar from '@/components/partials/Sidebar.vue'
export default {
    components: {
        Sidebar
    },

    data() {
        return {

        }
    },
    created() {
        console.log("aaa")
        console.log(this.$route.params)
    }
}
</script>