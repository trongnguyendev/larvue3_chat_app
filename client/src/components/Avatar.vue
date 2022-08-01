<template>
    <div :class="{ 'tooltip tooltip-right z-10': tooltip  }"  :data-tip="name">
        <div class="avatar mx-auto" v-if="avarta">
            <div :class="size" class="rounded-full ring ring-1st ring-offset-base-100 ring-offset-2 cursor-pointer">
                <img src="https://api.lorem.space/image/face?hash=55350" />
            </div>
        </div>
        <div class="avatar placeholder" v-if="!avarta">
            <div :class="size" class="bg-neutral-focus text-neutral-content rounded-full">
                <span :style="{fontSize: textSize}">{{ setAvartarDefault() }}</span>
            </div>
        </div> 
    </div>
</template>

<script>
export default {
    props: {
        avarta: {
            type: String,
            default: '',
        },

        name: {
            type: String,
            default: '',
            required: true
        },

        tooltip: {
            type: Boolean,
            default: false
        },
        size: {
            type: String,
            default: 'w-7'
        },
        textSize: {
            type: String,
            default: '17px'
        },
    },

    data() {
        return {
            avarta_type: 0
        }
    },
    mounted() {

    },
    
    created() {
        this.avarta_type = this.avarta == null ? 0 : 1
    },

    methods: {
        setAvartarDefault() {
            let position_space = this.name.search(" ")

            let name_short = this.name.slice(0,1) + this.name.slice(position_space + 1, position_space + 2)

            return name_short.toUpperCase()
        }
    }
}
</script>