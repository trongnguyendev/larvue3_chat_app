<template>
  <div class="flex w-full fixed h-full divide-x-[1px] divide-dv">

        <!-- sidebar left -->
        <SidebarLeft :option="sidebar_option" />

        <!-- main -->
        <div id="content" class="w-full relative" v-if="Object.keys(friendInfor).length > 0">
            <div class="absolute w-full left-0 top-0 p-4 z-10 bg-3rd">
                <div class="bg-4th h-20 p-4 flex justify-between items-center rounded-sm shadow-sm">
                    <!-- avarta -->
                    <div class="flex gap-4">
                        <Avartar :avarta="friendInfor.avarta" :name="friendInfor.name" :tooltip="false" /> 
                        <div class="flex justify-center gap-2 items-center">
                            <h3 class="text-5th">{{ friendInfor.name }}</h3>
                            <div class="action w-2 h-2 rounded-full badge-success"></div>
                            <!-- <div class="badge badge-success gap-2 text-4th badge-sm">
                                Active
                            </div> -->
                        </div>
                    </div>
                    <div class="option flex gap-6 items-center">
                      <SearchIcon class="w-7 h-7 cursor-pointer text-gray-500" />
                      <PhoneIcon class="w-7 h-7 cursor-pointer text-gray-500" />
                      <VideoCameraIcon class="w-8 h-8 cursor-pointer text-gray-500" />
                      <InformationCircleIcon class="w-8 h-8 cursor-pointer text-gray-500" />
                    </div>
                </div>
            </div>

            <div class="overflow-auto w-full h-full bg-3rd" ref="conversations">
                <div class="flex w-full- h-full aaaa">
                    <div class="list-message p-4 mt-auto w-full pb-16">
                        <div 
                        class="flex gap-4 items-start mb-5 gap-y-12"
                        v-for="(message, index) in messages" :key="index" :class="message.sender_id != sidebar_option.id ? 'message' : 'message_me'">
                            <!-- <Avartar v-if="message.sender_id == sidebar_option.id" :avarta="avarta.me" :name="name.me" :tooltip="false" />  -->
                            <Avartar v-if="message.sender_id != sidebar_option.id" :avarta="friendInfor.avatar" :name="friendInfor.name" :tooltip="false" /> 
                            <div>
                              
                                <h3 class="mb-1 text-sm font-bold" v-if="message.sender_id == sidebar_option.id" >
                                <!-- {{ name.me }} -->
                                <span class="text-xs text-5th ml-3 opacity-40"><timeago :converter="x" :datetime="message.created_at"/></span></h3>
                                <h3 class="mb-1 text-sm font-bold" v-if="message.sender_id != sidebar_option.id">{{ friendInfor.name }} <span class="text-xs text-5th ml-3 opacity-40"><timeago :datetime="message.created_at"/></span></h3>
                                <div class="message_content px-4 py-2 rounded-3xl text-sm w-fit" :class="message.sender_id == sidebar_option.id ? 'ml-auto' : 'mr-auto'">{{message.content}}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="absolute bottom-0 left-0 w-full bg-3rd z-10 flex items-center p-4 gap-2">
                <PhotographIcon class="w-8 h-8 cursor-pointer text-gray-500" />
                <EmojiPicker @some-event="sentMessage" />
            </div>
        </div>

        <!-- main empty -->
        <div id="content" class="w-full text-5th relative bg-3rd flex gap-6 items-center justify-center flex-col" v-else>
          <h1 class="text-4xl">Welcome, {{name.me}}</h1>
          <Avartar avarta="" :name="name.me" :tooltip="false" size="w-24" textSize="35px" />    
          <button class="btn btn-ghost">Start new conversation now.</button>
          <p class="font-extralight">Search for someone to start chatting with or go to Contacts to see who is available.</p>
        </div>

        <!-- sidebar right -->
        <SidebarRight />
    </div>
</template>
<script>
import axios from "axios";
import CameraIcon from '@/components/icons/Camera.vue'
import CircleIcon from '@/components/icons/CircleInfo.vue'
import PaperClipIcon from '@/components/icons/PaperClip.vue'
import PlusCircleIcon from '@/components/icons/PlusCircle.vue'
import PaperPlaneIcon from '@/components/icons/PaperPlane.vue'
import PowerOffIcon from '@/components/icons/PowerOff.vue'

import SidebarRight from '@/components/partials/SidebarRight.vue'
import SidebarLeft from '@/components/partials/SidebarLeft.vue'

import EmojiPicker from '@/components/EmojiPicker.vue'

import { PhotographIcon, SearchIcon, PhoneIcon, VideoCameraIcon, InformationCircleIcon } from '@heroicons/vue/outline'
import { EmojiHappyIcon } from '@heroicons/vue/solid'

import { mapActions, mapState, mapGetters, mapMutations } from 'vuex'

import Avartar from '@/components/Avatar'

export default {
  name: 'App',
  components: {
    // icons
    PhoneIcon,
    CameraIcon,
    CircleIcon,
    SearchIcon,
    PaperClipIcon,
    EmojiHappyIcon,
    PlusCircleIcon,
    PaperPlaneIcon,
    PhotographIcon,
    PowerOffIcon,
    VideoCameraIcon,
    InformationCircleIcon,
    // partials
    SidebarRight,
    SidebarLeft,
    // emoji
    EmojiPicker,

    Avartar,
  },

  data() {
    return {
      message: '',
      
      sidebar_option: {
        avarta : '',
        name: '',
        id: 0
      },

      avarta: {
        me: '',
        friend: ''
      },

      name: {
        me: '',
        friend: ''
      },

      auth_id: null,
    }
  },

  created() {
    this.loadUser()
    window.Echo.channel('channel')
    .listen('Hello', (e) => {
      console.log(e)
    })
    console.log("aaa")

  },

  filters: {
      truncate: function(value) {
          if (value && value.length > 5) {
              value = value.substring(0, 5) + '...';
          }
          return value
      }
  },

  computed: {
    ...mapGetters('messageUser', [
      'friendInfor',
      'messages',
    ]),
  },

  watch: {
    userMessage() {
      // this.messages = this.userMessage
    }
  },

  mounted() {
    this.scrollToEnd();
    
  },

  updated() {
    this.scrollToEnd();
  },

  methods: {
    ...mapActions('user', [
      'getInforMe'
    ]),
    ...mapActions('messageUser', [
        'sendMessage',
        'gettmessageByGroup',
    ]),
    ...mapMutations('messageUser', [
      'PUSH_MESSAGE',
    ]),

    async loadUser() {
      let response = await this.getInforMe()
      this.sidebar_option.avarta = response.results.profile.avarta
      this.sidebar_option.name = response.results.users.name
      this.sidebar_option.id = response.results.users.id

      this.avarta.me = response.results.profile.avarta
      this.name.me = response.results.users.name

      this.avarta.friend = ''
      this.name.friend = 'HE He'
      console.log(response)
      this.auth_id = response.results.users.id
    },

    async sentMessage(content) {

      let data_message = {
        'sender_id': this.auth_id,
        'receiver_id': this.friendInfor['user_id'],
        'message_type': 1,
        'content': content
      }

      let res = await this.sendMessage(data_message);

      this.PUSH_MESSAGE(res.results.message)

      this.scrollToEnd()
    },

    scrollToEnd() {
      let container = this.$refs.conversations
      if(container) {
        container.scrollTop = container.scrollHeight
      }
      
    },
  }
}
</script>
