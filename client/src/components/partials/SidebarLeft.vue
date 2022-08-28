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
                <div class="aside-main w-[350px]">
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
                                    <div v-if="friends.length == 0 && !loading_find_friend" class="px-3">{{ message_search }}</div>

                                    <!-- list result -->
                                    <div 
                                    class="flex gap-4 py-3 px-3 cursor-pointer ease-linear items-center hover:bg-3rd"
                                    v-for="friend in friends"
                                    :key="friend.id">
                                        <Avartar :avarta="friend.avarta" :name="friend.name" :tooltip="false" />    

                                        <div class="w-full">
                                            <h3 class="flex items-center justify-start text-5th text-sm" v-html="set_highlight(friend.name)"></h3>
                                        </div>

                                        <div v-if="friend.status != 2">
                                            <!-- action friend -->
                                            <div v-if="friend.status == null || friend.status == '0'"  @click="add_relationship(friend.id, 1)">
                                                <UserAddIcon class="w-6 text-gray-500"/> 
                                            </div>

                                            <div class="flex gap-2"
                                            v-else-if="friend.status == 1 && friend.user_2_id == option.id"
                                            @click="add_relationship(friend.id, 2)"
                                            >
                                                <XIcon class="w-6 text-gray-500" /> 
                                                <CheckIcon  class="w-6 text-gray-500" />
                                            </div>

                                            <div
                                            v-else-if="friend.status == 1 & friend.user_1_id == option.id"
                                            @click="add_relationship(friend.id, 3)"
                                            >
                                                <button class="text-gray-500">Cancel</button>
                                            </div>
                                        </div>
                                        <div v-else class="text-gray-500" @click="add_relationship(friend.id, 3)">
                                            Unfriend
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
                                    <div class="flex gap-4 py-3 px-3 cursor-pointer ease-linear items-center rounded-r-lg hover:bg-slate-200"
                                    
                                    @click="current_user_message(friend.user_id)"
                                    :class="[
                                        friend.user_id == current_friend_id ?  'message_active' : '',
                                        room_notify.includes(friend.room) ? 'message_notify' : '',
                                    ]"
                                     
                                    v-for="(friend, index) in friends_current" :key="index" :data-id="friend.id" :attr="friend.room" :attr1="room_notify">
                                        <Avartar :avarta="friend.avarta" :name="friend.name" size="w-10" :tooltip="false" />  
                                        <div class="w-full">
                                            <h3 class="font-bold flex items-center justify-between text-5th text-sm">{{friend.name}}
                                                <!-- <span class="text-xs text-5th font-extralight">
                                                    <timeago :refresh="1" :datetime="friend.created_at"/>
                                                </span> -->
                                            </h3>
                                            <p class="text-xs text-5th opacity-70">{{ friend.last_message }}</p>
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

import { get_element_by_attribute } from '@/mixins/arrayHelper'

import axios from "axios"

import { mapGetters, mapActions, mapMutations } from 'vuex'

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
            // mode dark/light
            isDark: false,

            // friend chat current
            current_friend_id: 1,

            // friend online
            user_current: [
                { name: 'Toni Dev', avarta: 'https://api.lorem.space/image/face?hash=88560' },
                { name: 'Calvin Tuan', avarta: 'https://api.lorem.space/image/face?hash=26448' },
                { name: 'Henry', avarta: 'https://api.lorem.space/image/face?hash=27312' },
                { name: 'Henry', avarta: 'https://api.lorem.space/image/face?hash=27312' },
            ],

            // search
            is_search_friend: false,
            ip_search: '',

            // friend list
            friends: [],
            loading_find_friend: false,
            message_search: '',

            // messenger current
            friend_messenger_current: [],

        }
    },

    computed: {
        ...mapGetters(['darkMode']),
        ...mapGetters('user', ['friends_current', 'room_current', 'room_notify'])
    },

    watch: {

    },

    created() {
        this.$socketio.on('connectToRoom', (data) => {
            console.log("data: " + data);
        })
        
    },

    methods: {
        ...mapActions(['SET_DARKMODE']),

        ...mapActions('auth', ['logout']),

        ...mapActions('user', ['findFriend', 'addFriend', 'getFriendsByStatus', 'updateRelationshipByStatus']),

        ...mapActions('messageUser', [
            'setCurrentUserMessage',
            'getMessageByGroup',
        ]),
        ...mapMutations('messageUser', ['SET_FRIEND_MESSENGER_INFOR', 'RESET_MESSAGE_USER', 'CLEAR_MESSAGE']),
        ...mapMutations('user', ['RESET_INFOR', 'SET_ROOM_CURRENT', 'REMOVE_ROOM_NOTIFY']),

        // set mode theme
        toggleDarkMode() {
            this.isDark = !this.isDark
            this.SET_DARKMODE(this.isDark)
        },
        
        // set log out
        setLogout() {
            this.logout()
            this.RESET_INFOR();
            this.RESET_MESSAGE_USER();

            this.$router.push("/login")
        },

        // search friends
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
                    this.message_search = 'Ban seach qua nhieu, hay tim kiem sau nhe.'
                }
                else if(response.status == 1) {
                    this.friends = response.results.users

                    if(this.friends.length == 0) {
                        this.message_search = 'Not result.'
                    }
                }                
            }

            this.loading_find_friend = false
        },

        // set highlight name friend search
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

        async current_user_message(id) {

            this.current_friend_id = id

            let element = get_element_by_attribute(this.friends_current, 'user_id', id)

            this.SET_FRIEND_MESSENGER_INFOR(element)

            let room = (this.option.id > id) ? (this.option.id + "_" + id + "_room") :  (id + "_" + this.option.id + "_room");

            if(room != this.room_current) {
                this.CLEAR_MESSAGE()
                await this.getMessageByGroup({ friend_id: id })
                this.$emit('chosenFriend', true);

            }
            
            this.SET_ROOM_CURRENT(room)
            this.REMOVE_ROOM_NOTIFY(room)

            this.$socketio.emit('initial_socket', this.room_current)

            

        },

        async add_relationship(id_friend, status) {

            const STATUS_CANCEL = '0';
            const STATUS_REQUESTED = '1';
            const STATUS_ACCEPTED = '2';

            let res = null;

            switch(status) {
                case 1:
                    // add friend
                    console.log("add friend")
                    res = await this.addFriend({ friend_id: id_friend})
                    break;
                case 2:
                    //accept friend
                    console.log("accept friend")
                    res = await this.updateRelationshipByStatus({ friend_id: id_friend, status: STATUS_ACCEPTED})
                    break;
                case 3:
                    // cancel friend / unfriend 
                    console.log("cancel friend")
                    res = await this.updateRelationshipByStatus({ friend_id: id_friend, status: STATUS_CANCEL})
                    break;
                default:
                    res = await this.addFriend({ friend_id: id_friend})                    
                    break;
            }            
        },


    }
}
</script>