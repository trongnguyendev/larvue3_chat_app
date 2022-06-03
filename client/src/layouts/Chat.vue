<template>
  <div class="flex w-full fixed h-full divide-x-[1px] divide-dv">

        <!-- sidebar left -->
        <SidebarLeft :option="sidebar_option" />

        <!-- main -->
        <div id="content" class="w-full relative">

            <div class="absolute w-full left-0 top-0 p-4 z-10 bg-3rd">
                <div class="bg-4th h-20 p-4 flex justify-between items-center rounded-sm shadow-sm">
                    <!-- avarta -->
                    <div class="flex gap-4">
                        <Avartar :avarta="friendInfor.avarta" :name="friendInfor.name" :tooltip="false" /> 
                        <div>
                            <h3 class="text-5th">{{ friendInfor.name }}</h3>
                            <div class="badge badge-success gap-2 text-4th badge-sm">
                                Active
                            </div>
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
                        v-for="(message, index) in messages" :key="index" :class="message.user_id != sidebar_option.id ? 'message' : 'message_me'">
                            <Avartar v-show="message.user_id == sidebar_option.id" :avarta="avarta.me" :name="name.me" :tooltip="false" /> 
                            <Avartar v-show="message.user_id != sidebar_option.id" :avarta="avarta.friend" :name="name.friend" :tooltip="false" /> 
                            <div>
                                <h3 class="mb-1 text-sm font-bold">{{ name.me }} <span class="text-xs text-5th ml-3 opacity-40">{{ message.created_at }}</span></h3>
                                <div class="message_content px-4 py-2 rounded-3xl text-sm">{{message.message}}</div>
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

import { mapActions, mapState, mapGetters } from 'vuex'

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
      list_messages: [],
      messages: [
          { user_id: 2, message: 'Yeah everything is fine', time_post: '2022-05-15', message_type: 'text'},
          { user_id: 3, message: '& Next meeting tomorrow 10.00AM', time_post: '2022-05-15', message_type: 'text' },
          { user_id: 2, message: 'Good morning, How are you? What about our next meeting?', time_post: '2022-05-15', message_type: 'text' },
          { user_id: 3, message: 'Good morning', time_post: '2022-05-15', message_type: 'text' },
          { user_id: 2, message: 'Wow thats great', time_post: '2022-05-15', message_type: 'text' },
          { user_id: 3, message: 'đi suối nên mụi ng đem đồ theo tắm đc nha', time_post: '2022-05-15', message_type: 'text' },
          { user_id: 3, message: 'Ủa tắm mà cũng ép', time_post: '2022-05-15', message_type: 'text' },
          { user_id: 3, message: 'Thường tắm tui ko có mặc đồ bạn', time_post: '2022-05-15', message_type: 'text' },
          { user_id: 2, message: 'Chơi vậy rồi ai dám chơi lại anh ', time_post: '2022-05-15', message_type: 'text' },
          { user_id: 3, message: 'Hi mn.. Mình là mem mới.. Mong các bạn nhẹ nhàng tay ga cho mình theo với nhé!', time_post: '2022-05-15', message_type: 'text' },
          { user_id: 2, message: 'Lớn rồi nha mậy.. dạo này t hay cọc lắm á.. múc m giờ :))))', time_post: '2022-05-15', message_type: 'text' },
          { user_id: 3, message: 'Vậy đổi giờ tập trung đi @Nguyễn Đức Trường Giang 9h30 đi..', time_post: '2022-05-15', message_type: 'text' },

      ],
      
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
      }
    }
  },

  created() {
    this.loadUser()

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
      'userMessage',
      'friendInfor'
    ]),
  },

  watch: {
    userMessage() {
      this.messages = this.userMessage
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
        'setCurrentUserMessage',
        'loadcurrentMessageByUser'
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
    },

    async sentMessage(content) {
      let data_request = {
          'user_id': this.sidebar_option.id,
          'friend_id': this.friendInfor.friend_id,
          'message_type': 1,
          'message': content
      }

      let res = await this.setCurrentUserMessage(data_request)
      console.log(res)

      this.scrollToEnd()
    },

    scrollToEnd() {
      let container = this.$refs.conversations
      container.scrollTop = container.scrollHeight
    },
  }
}
</script>
