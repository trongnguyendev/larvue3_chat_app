<template>
    <div class="flex items-center rounded-3xl bg-gray-300 relative w-full">
        <div class="dropdown dropdown-top">
        <label tabindex="0"><EmojiHappyIcon tabindex="0" class="w-8 h-8 cursor-pointer text-gray-500" /></label>
        <div tabindex="0" class="mb-4 shadow-lg dropdown-content menu">
            <Picker :data="emojiIndex" set="facebook" :showPreview="false" :showSearch="false" @select="showEmoji" />
            <div class="shape_other"></div>
        </div>
        </div>
        <input
        type="text" 
        placeholder="Aa" 
        v-model="inputMessage" 
        @keyup.enter="sendMessage"
        class="input input-ghost w-full bg-opacity-20 bg-transparent h-8 focus:outline-none focus:bg-opacity-20 px-2 py-4">
    </div>
</template>

<script>

import data from "emoji-mart-vue-fast/data/facebook.json";
import "emoji-mart-vue-fast/css/emoji-mart.css";
import { Picker, EmojiIndex } from "emoji-mart-vue-fast/src";
let emojiIndex = new EmojiIndex(data);

import { EmojiHappyIcon } from '@heroicons/vue/solid'

export default {
    components: {
        Picker,
        EmojiHappyIcon
    },
    data() {
        return {
            inputMessage: '',
            emojiIndex: emojiIndex,
        }
    },
    methods: {
        showEmoji(emoji) {
            console.log(emoji)
            this.inputMessage += emoji.native;
            console.log(this.inputMessage)
        },
        sendMessage() {
            console.log(this.inputMessage)
            this.$emit('someEvent', this.inputMessage)
            this.inputMessage = ''
            
        }
    }
}
</script>