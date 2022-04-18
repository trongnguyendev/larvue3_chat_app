<template>
    <div class="flex items-center border-1 rounded-md border-gray-300 px-2" :class="{'border-error shadow-md': isError}">
        <slot></slot>
        <input
        type="text"
        class="input input-sm p-0 w-full"
        :placeholder="placeHolder"
        @input="$emit('update:modelValue', $event.target.value)"
        :value="modelValue">
    </div>
</template>

<script>
export default {
    props: ['modelValue', 'isError', 'placeHolder'],
    emits: ['update:modelValue']
}
</script>