<template>
    <div>Product item</div>
    <div>{{ $route.params.id }}</div>
</template>

<script>
export default {
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