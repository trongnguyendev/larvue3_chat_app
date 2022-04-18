<template>
    <aside class="bg-4th flex divide-x-[1px] divide-dv">
        <TabGroup>
            <TabList class="w-[70px] divide-y divide-dv flex flex-col">
            <div class="logo w-9 h-9 mx-auto my-6">
                <img src="@/assets/logo.png" alt="" class="w-full mx-auto">
            </div>
            <div class="w-full h-full text-center flex flex-col justify-center gap-6 py-6">
                <Tab>
                    <div class="avatar mx-auto">
                        <div class="w-7 rounded-full ring ring-1st ring-offset-base-100 ring-offset-2 cursor-pointer">
                            <img src="https://api.lorem.space/image/face?hash=55350" />
                        </div>
                    </div>
                </Tab>
                <Tab>
                    <div class="w-full cursor-pointer">
                        <AnnotationIcon class="w-8 h-8 m-auto text-gray-500" />
                    </div>
                </Tab>
                <Tab>
                    <div class="w-full cursor-pointer">
                        <div class="indicator">
                            <span class="indicator-item badge p-0 h-3 w-3 right-2 top-3 bg-blue-500 border-blue-500"></span> 
                            <BellIcon class="w-8 h-8 m-auto text-gray-500" />
                        </div>
                    </div>
                </Tab>
                <div class="mt-auto flex flex-col gap-6">
                    <div class="w-full cursor-pointer">
                        <MoonIcon class="w-8 h-8 m-auto text-gray-500" v-show="!isDark"  @click="toggleDarkMode" />
                        <SunIcon class="w-8 h-8 m-auto text-gray-500" v-show="isDark" @click="toggleDarkMode" />
                    </div> 
                    
                    <Tab>
                        <div class="w-full cursor-pointer">
                            <CogIcon class="w-8 h-8 m-auto text-gray-500" />
                        </div>
                    </Tab>
                </div>
            </div>
            
            </TabList>
            <TabPanels>
                <div class="aside-main w-[400px]">
                    <!-- profile panel -->
                    <TabPanel>Content 2</TabPanel>
                    <!-- chat panel -->
                    <TabPanel>
                        <div class="py-4 h-full">
                            <div class="px-4">
                                <h2 class="text-2xl font-bold text-5th">Chats</h2>
                                <p class="text-sm text-5th">Chat form your friends</p>
                            </div>

                            <div class="user-recent flex gap-2 px-4 my-2">
                                <div class="avatar blur-avatar cursor-pointer" v-for="(user, index) in user_current" :key="index">
                                    <div class="rounded-xl">
                                        <img :src="user.avarta" />
                                    </div>
                                    <div class="user-name absolute bottom-2 left-0 w-full h-4">
                                        <h4 class="text-white text-xs flex justify-between items-center px-2">
                                            {{user.name}}
                                            <div class="action w-2 h-2 rounded-full badge-success"></div>
                                        </h4>
                                        
                                    </div>
                                </div>
                            </div>

                            <div class="mt-5 h-full">
                                <div class="px-4">
                                    <h2 class="text-2xl font-bold text-5th">Recent</h2>
                                    <p class="text-sm text-5th">Start New Conversation</p>
                                </div>
                                
                                    <div class="px-4 my-2">
                                    <div class="bg-gray-100 flex gap-1 px-2 rounded-md ">
                                        <SearchIcon class="w-5 text-gray-500" />
                                        <input type="text" placeholder="Search message" class="input bg-transparent w-full input-xs text-sm mt-1 mb-1 focus:outline-none">
                                    </div>
                                </div>

                                <div class="recents_message mt-4 h-recent">
                                    <div class="flex gap-4 py-3 px-3 cursor-pointer ease-linear"
                                    @click="change_user_active(item.id)" :class="item.id == current_message ?  'message_active' : ''"
                                    v-for="(item, index) in message_user_current" :key="index">
                                        <div class="avatar online">
                                            <div class="w-11 rounded-full">
                                                <img :src="item.avarta" />
                                            </div>
                                        </div>
                                        <div class="w-full">
                                            <h3 class="font-bold flex items-center justify-between text-5th text-sm">{{item.name}} <span class="text-xs text-5th font-extralight">{{item.time}}</span></h3>
                                            <p class="text-xs text-5th">{{item.mess_short}}</p>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </TabPanel>
                    <!-- notification panel -->
                    <TabPanel>Content 3</TabPanel>
                    <!-- setting panel -->
                    <TabPanel>Content 4</TabPanel>
                </div>
            </TabPanels>
        </TabGroup>

        
    </aside>
</template>

<script setup>
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from '@headlessui/vue'
</script>

<script>
import SearchIcon from '@/components/icons/Search.vue'
import PowerOffIcon from '@/components/icons/PowerOff.vue'
import { LogoutIcon, AnnotationIcon, CogIcon, MoonIcon, SunIcon, BellIcon } from '@heroicons/vue/outline'
// import { MoonIcon } from '@heroicons/vue/solid'

import { mapGetters, mapActions } from 'vuex'

export default {
    components: {
        SearchIcon,
        PowerOffIcon,
        LogoutIcon,
        AnnotationIcon,
        CogIcon,
        MoonIcon,
        SunIcon,
        BellIcon
    },
    data() {
        return {
            isDark: false,
            current_message: 1,
            message: '',
            user_current: [
                { name: 'Toni Dev', avarta: 'https://api.lorem.space/image/face?hash=88560' },
                { name: 'Calvin Tuan', avarta: 'https://api.lorem.space/image/face?hash=26448' },
                { name: 'Henry', avarta: 'https://api.lorem.space/image/face?hash=27312' },
                { name: 'Henry', avarta: 'https://api.lorem.space/image/face?hash=27312' },
            ],

            message_user_current: [
                { name: 'Toni Dev', avarta: 'https://api.lorem.space/image/face?hash=88560', mess_short : '...', type: 'seen', time: '22/10/2019', id: 1 },
                { name: 'Calvin Tuan', avarta: 'https://api.lorem.space/image/face?hash=26448', mess_short : '...', type: 'not_seen', time: '22/10/2019', id: 2 },
                { name: 'Henry', avarta: 'https://api.lorem.space/image/face?hash=2642731248', mess_short : '...', type: 'seen', time: '22/10/2019', id: 3 },
                { name: 'Henry', avarta: 'https://api.lorem.space/image/face?hash=2642731248', mess_short : '...', type: 'seen', time: '22/10/2019', id: 4 },
                { name: 'Henry', avarta: 'https://api.lorem.space/image/face?hash=2642731248', mess_short : '...', type: 'seen', time: '22/10/2019', id: 5 },
                { name: 'Henry', avarta: 'https://api.lorem.space/image/face?hash=2642731248', mess_short : '...', type: 'seen', time: '22/10/2019', id: 6 },
                { name: 'Henry', avarta: 'https://api.lorem.space/image/face?hash=2642731248', mess_short : '...', type: 'seen', time: '22/10/2019', id: 7 },
                { name: 'Henry', avarta: 'https://api.lorem.space/image/face?hash=2642731248', mess_short : '...', type: 'seen', time: '22/10/2019', id: 8 },
                { name: 'Henry', avarta: 'https://api.lorem.space/image/face?hash=2642731248', mess_short : '...', type: 'seen', time: '22/10/2019', id: 9 },
                { name: 'Henry', avarta: 'https://api.lorem.space/image/face?hash=2642731248', mess_short : '...', type: 'seen', time: '22/10/2019', id: 10 },
                { name: 'Henry', avarta: 'https://api.lorem.space/image/face?hash=2642731248', mess_short : '...', type: 'seen', time: '22/10/2019', id: 11 },
                { name: 'Henry', avarta: 'https://api.lorem.space/image/face?hash=2642731248', mess_short : '...', type: 'seen', time: '22/10/2019', id: 12 },
                { name: 'Henry', avarta: 'https://api.lorem.space/image/face?hash=2642731248', mess_short : '...', type: 'seen', time: '22/10/2019', id: 13 },
                { name: 'Henry1', avarta: 'https://api.lorem.space/image/face?hash=2642731248', mess_short : '...', type: 'seen', time: '22/10/2019', id: 14 },
            ]
        }
    },
    mounted() {
    },

    computed: {
        ...mapGetters(['darkMode'])
    },

    methods: {
        ...mapActions(['SET_DARKMODE']),

        toggleDarkMode() {
            this.isDark = !this.isDark
            this.SET_DARKMODE(this.isDark)
        }
    }
}
</script>