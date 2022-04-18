<template>
    <label class="flex items-center">
        <input 
        type="checkbox"
        class="checkbox checkbox-xs" 
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