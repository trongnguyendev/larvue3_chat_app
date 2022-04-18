<template>
    <label class="flex items-center">
        <input 
        type="radio"
        class="radio radio-xs" 
        :checked="modelValue"
        @input="$emit('update:modelValue', $event.target.checked)">
        
        <span class="ml-2 cursor-pointer opacity-50 text-sm">
            <slot></slot>
        </span>
    </label>
</template>

<script>
export default {
    props: ['modelValue']
}
</script>