<template>
    <aside class="bg-4th flex divide-x-[1px] divide-dv">
        <TabGroup :defaultIndex="1">
            <TabList class="w-[70px] divide-y divide-dv flex flex-col">
            <div class="logo w-9 h-9 mx-auto my-6">
                <img src="@/assets/logo.png" alt="" class="w-full mx-auto">
            </div>
            <div class="w-full h-full text-center flex flex-col justify-center gap-6 py-6">
                <Tab>
                    <Avartar :avarta="option.avarta" :name="option.name" :tooltip="true" />                    
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
                            <CogIcon class="w-8 h-8 m-auto text-gray-500" @click="setLogout" />
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
                                    <div class="bg-gray-100 flex items-center gap-1 px-2 rounded-md ">
                                        <SearchIcon class="w-5 text-gray-500" />
                                        <input
                                        type="text"
                                        v-model="ip_search"
                                        placeholder="Search message"
                                        @keyup="search_friend"
                                        class="input bg-transparent w-full input-xs text-sm mt-1 mb-1 focus:outline-none">
                                        
                                    </div>
                                    
                                </div>      

                                <div class="panel_search" v-if="is_search_friend">

                                    <!-- no result -->
                                    <div v-if="friends.length == 0 && !loading_find_friend" class="px-3">{{ message_seach }}</div>

                                    <!-- list result -->
                                    <div 
                                    class="flex gap-4 py-3 px-3 cursor-pointer ease-linear items-center hover:bg-3rd"
                                    v-for="friend in friends" 
                                    :key="friend.id" @click="setConversation(friend.id)">
                                        <Avartar :avarta="friend.avarta" :name="friend.name" :tooltip="false" />       
                                        <div class="w-full">
                                            <h3 class="flex items-center justify-start text-5th text-sm" v-html="set_highlight(friend.name)"></h3>
                                        </div>
                                        <div @click="insert_friend(friend.id)" v-if="friend.friend_id == null && friend.user_id == null" >
                                            <UserAddIcon class="w-6 text-gray-500"/> 
                                        </div>
                                        <div class="flex gap-2" v-if="friend.friend_id == option.id && friend.relation_type == 0">
                                            <XIcon class="w-6 text-gray-500" /> 
                                            <CheckIcon  class="w-6 text-gray-500" />
                                        </div>
                                        <div v-if="friend.user_id == option.id && friend.relation_type == 0">
                                            Cancel
                                        </div>
                                    </div>

                                    <!-- effect loading -->
                                    <div v-if="loading_find_friend" class="text-center">
                                        <svg class="animate-spin m-auto h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                                            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                    </div>
                                </div>

                                <div class="recents_message mt-4 h-recent" v-if="!is_search_friend">
                                    <div class="flex gap-4 py-3 px-3 cursor-pointer ease-linear items-center"
                                    @click="current_user_message(friend.id, friend.idd)" :class="friend.id == current_message ?  'message_active' : ''"
                                    v-for="(friend, index) in message_user_current" :key="index" :data-id="friend.id">
                                        <Avartar :avarta="friend.avarta" :name="friend.name" :tooltip="false" />  
                                        <div class="w-full">
                                            <h3 class="font-bold flex items-center justify-between text-5th text-sm">{{friend.name}} <span class="text-xs text-5th font-extralight">{{friend.created_at}}</span></h3>
                                            <p class="text-xs text-5th">...</p>
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
import { LogoutIcon, AnnotationIcon, CogIcon, MoonIcon, SunIcon, BellIcon, UserAddIcon, CheckIcon, XIcon } from '@heroicons/vue/outline'

import Avartar from '@/components/Avatar'
// import { MoonIcon } from '@heroicons/vue/solid'

import axios from "axios"

import { mapGetters, mapActions } from 'vuex'

export default {
    props: ['option'],

    components: {
        SearchIcon,
        PowerOffIcon,
        LogoutIcon,
        AnnotationIcon,
        CogIcon,
        MoonIcon,
        SunIcon,
        BellIcon,
        UserAddIcon,
        CheckIcon,
        XIcon,

        Avartar
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
            ],

            is_search_friend: false,
            ip_search: '',
            friends: [],
            loading_find_friend: false,
            message_seach: ''
        }
    },

    computed: {
        ...mapGetters(['darkMode']),
        ...mapGetters('user', ['friends'])
    },

    watch: {
    },

    mounted() {
        
    },

    created() {
        this.get_friends()

        
    },

    methods: {
        ...mapActions(['SET_DARKMODE']),

        ...mapActions('auth', ['logout']),

        ...mapActions('user', ['findFriend', 'insertFriend', 'listFriend']),

        ...mapActions('messageUser', [
            'setCurrentUserMessage',
            'loadcurrentMessageByUser'
        ]),

        toggleDarkMode() {
            this.isDark = !this.isDark
            this.SET_DARKMODE(this.isDark)
        },
        
        setLogout() {
            this.logout()
            this.$router.push("/login")
        },

        async search_friend($event) {
            this.is_search_friend = $event.target.value == '' ? false : true
            // if(this.ip_search != $event.target.value) return

            this.friends = []
            this.ip_search = $event.target.value

            if(this.ip_search != '') {
                
                this.is_search_friend = true
                this.loading_find_friend = true
                let response = await this.findFriend(this.ip_search)

                if(response == undefined) {
                    this.message_seach = 'Ban seach qua nhieu, hay tim kiem sau nhe.'
                }
                else if(response.status == 1) {
                    this.friends = response.results.users

                    if(this.friends.length == 0) {
                        this.message_seach = 'Not result.'
                    }
                }                
            }

            // this.is_search_friend = false
            this.loading_find_friend = false
        },

        set_highlight(str) {
            
            let name = str.toUpperCase();
            let ip = this.ip_search.toUpperCase().trim();

            let position = name.search(ip);

            if(position > -1) {
                let str_first = str.slice(0, position);
                let str_middle = str.slice(position, position + ip.length).trim();
                let str_last = str.slice(position + ip.length);

                let space = ip.length > str_middle.length || str_last.length > str_last.trim().length ? '&nbsp;' : ''
                let space2 = str_first.length > str_first.trim().length ? '&nbsp;' : ''

                return str_first.trim() + space2 + str_middle.bold() + space + str_last.trim()
            }

            return str;            
        },

        async insert_friend(id_friend) {
            let data = {
                user_id: this.option.id,
                friend_id: id_friend,
                friend: '0'
            }
            let response = await this.insertFriend(data)

            if(response.status == 1) {

            }
        },

        async get_friends() {
            let res = await this.listFriend(this.option.id);
            console.log(res)
            this.message_user_current = res
        }, 

        async current_user_message(id, friend_id) {

            // Check conversation
            

            // Get message conversation
        



            // let data_request = {
            //     'user_id': 1,
            //     'friend_id': id,
            //     'message_type': 1,
            //     'message': 'heheeheh'
            // }

            // let res = await this.setCurrentUserMessage(data_request)

            let res = await this.loadcurrentMessageByUser({'friend_id': friend_id})
            console.log(res)
            this.current_message = id

        }
    }
}
</script>