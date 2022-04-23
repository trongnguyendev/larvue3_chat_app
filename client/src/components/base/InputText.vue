<template>
    <div class="flex items-center border-1 rounded-md border-gray-300 px-2" :class="{'border-error shadow-md': isError}">
        <slot></slot>
        <input
        :type="typeInput"
        class="input input-sm p-0 w-full leading-none"
        :placeholder="placeHolder"
        @input="$emit('update:modelValue', $event.target.value)"
        :value="modelValue">
        <EyeIcon class="w-5 h-5 opacity-60"  v-if="typeInput == 'password'" @click="changeTypeText" />
        <EyeOffIcon class="w-5 h-5 opacity-60" v-if="typeInput == 'text'" @click="changeTypeText" />
    </div>
</template>

<script>
import { EyeIcon, EyeOffIcon } from '@heroicons/vue/solid'

export default {
    props: ['modelValue', 'isError', 'placeHolder', 'type'],
    emits: ['update:modelValue'],

    data() {
        return {
            typeInput: ''
        }
    },

    components: {
        EyeIcon,
        EyeOffIcon
    },

    mounted() {
        this.typeInput = this.type
    },

    methods: {
        changeTypeText() {
            this.typeInput = this.typeInput == 'password' ? 'text' : 'password'
        }
        
    },    
}
</script>