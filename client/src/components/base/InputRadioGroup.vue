<!-- <InputRadioGroup class="flex gap-4 text-blue-400" v-model="valueRadio" name="default" :items="[{value: '1', label: 'one'}, {value: '2', label: 'two'}]" /> -->
<template>
    <div>
        <label class="flex items-center" v-for="item in items" :key="item.value">
            <input 
            type="radio"
            class="radio radio-xs" 
            :value="item.value"
            :name="name"
            @input="$emit('update:modelValue', $event.target.value)">
            
            <span class="ml-2 cursor-pointer text-sm">
                {{item.label}}
            </span>
        </label>
    </div>
</template>

<script>
export default {
    props: ['modelValue', 'items', 'name']
}
</script>