<template>
  <div class="flex w-full fixed h-full divide-x-[1px] divide-dv">

        <!-- sidebar left -->
        <SidebarLeft />

        <!-- main -->
        <div id="content" class="w-full relative">

            <div class="absolute w-full left-0 top-0 p-4 z-10 bg-3rd">
                <div class="bg-4th h-20 p-4 flex justify-between items-center rounded-sm shadow-sm">
                    <!-- avarta -->
                    <div class="flex gap-4">
                        <div class="avatar online">
                            <div class="w-11 rounded-full">
                                <img src="https://api.lorem.space/image/face?hash=28212" />
                            </div>
                        </div>
                        <div>
                            <h3 class="text-5th">Josephin water</h3>
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
                      <!-- <div class="bg-3rd p-2 rounded-full">
                        <SearchIcon class="w-6 h-6 cursor-pointer text-gray-400" />
                      </div>
                      <div class="bg-3rd p-2 rounded-full">
                        <PhoneIcon class="w-6 h-6 cursor-pointer text-gray-400" />
                      </div>
                      <div class="bg-3rd p-2 rounded-full">
                        <CameraIcon class="w-6 h-6 cursor-pointer text-gray-400" />
                      </div>
                      <div class="bg-3rd p-2 rounded-full">
                        <CircleIcon class="w-6 h-6 cursor-pointer text-gray-400" />
                      </div> -->
                    </div>
                </div>
            </div>

            <div class="overflow-auto w-full h-full bg-3rd">
                <div class="flex w-full- h-full">
                    <div class="list-message p-4 mt-auto w-full pb-16">
                        <div class="flex gap-4 items-start mb-5 gap-y-12" v-for="(message, index) in messages" :key="index" :class="message.type ? 'message' : 'message_me'">
                            <div class="avatar mt-1">
                                <div class="rounded-full w-11">
                                    <img :src="message.avarta" />
                                    
                                </div>
                            </div>
                            <div>
                                <h3 class="mb-1 text-sm font-bold">Alan josheph <span class="text-xs text-5th ml-3 opacity-40">01:04 AM</span></h3>
                                <div class="message_content px-4 py-2 rounded-3xl text-sm">{{message.content}}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="absolute bottom-0 left-0 w-full bg-3rd z-10 flex items-center p-4 gap-2">
                <!-- <PaperClipIcon class="w-9 h-9 cursor-pointer text-[#1c9dea]" /> -->
                <PhotographIcon class="w-8 h-8 cursor-pointer text-gray-500" />
                
                <!-- <div class="bg-3rd p-2 rounded-full">
                  <PlusCircleIcon class="w-5 h-5 cursor-pointer text-[#1c9dea]" />
                </div>
                <div class="bg-3rd p-2 rounded-full">
                  <PaperClipIcon class="w-4 h-4 cursor-pointer text-[#1c9dea]" />
                </div>
                <div class="bg-3rd p-2 rounded-full">
                  <EmojiHappyIcon class="w-4 h-4 cursor-pointer text-[#1c9dea]" />
                </div> -->
                <!-- <PaperClipIcon class="w-5 cursor-pointer" />
                <EmojiHappyIcon class="w-5 cursor-pointer" />                 -->
                

                <!-- <div class="flex items-center rounded-3xl bg-gray-300 relative w-full">
                  <div class="dropdown dropdown-top">
                    <label tabindex="0"><EmojiHappyIcon tabindex="0" class="w-8 h-8 cursor-pointer text-gray-500" /></label>
                    <div tabindex="0" class="mb-4 shadow-lg dropdown-content menu">
                      <Picker :data="emojiIndex" set="facebook" :showPreview="false" :showSearch="false" @select="showEmoji" />
                      <div class="shape_other"></div>
                    </div>
                  </div>
                  <input type="text" placeholder="Aa" v-model="inputMessage" class="input input-ghost w-full bg-opacity-20 bg-transparent h-8 focus:outline-none focus:bg-opacity-20 px-2 py-4">
                </div> -->

                <EmojiPicker />
                <!-- <div class="bg-1st p-2 rounded-full">
                  <PaperPlaneIcon class="w-4 h-4 cursor-pointer text-[#1c9dea]" />
                </div> -->
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

import { mapState, mapGetters, mapActions } from 'vuex'

import { PhotographIcon, SearchIcon, PhoneIcon, VideoCameraIcon, InformationCircleIcon } from '@heroicons/vue/outline'
import { EmojiHappyIcon } from '@heroicons/vue/solid'


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
  },

  data() {
    return {
      message: '',
      list_messages: [],
      messages: [
          { type: 1, avarta: 'https://api.lorem.space/image/face?hash=28212', content: 'Yeah everything is fine' },
          { type: 1, avarta: 'https://api.lorem.space/image/face?hash=28212', content: '& Next meeting tomorrow 10.00AM' },
          { type: 0, avarta: 'https://api.lorem.space/image/face?hash=55350', content: 'Good morning, How are you? What about our next meeting?' },
          { type: 0, avarta: 'https://api.lorem.space/image/face?hash=55350', content: 'Good morning' },
          { type: 1, avarta: 'https://api.lorem.space/image/face?hash=28212', content: 'Wow thats great' },
          { type: 1, avarta: 'https://api.lorem.space/image/face?hash=28212', content: 'đi suối nên mụi ng đem đồ theo tắm đc nha' },
          { type: 0, avarta: 'https://api.lorem.space/image/face?hash=55350', content: 'Ủa tắm mà cũng ép' },
          { type: 1, avarta: 'https://api.lorem.space/image/face?hash=28212', content: 'Thường tắm tui ko có mặc đồ bạn' },
          { type: 0, avarta: 'https://api.lorem.space/image/face?hash=55350', content: 'Chơi vậy rồi ai dám chơi lại anh ' },
          { type: 0, avarta: 'https://api.lorem.space/image/face?hash=55350', content: 'Hi mn.. Mình là mem mới.. Mong các bạn nhẹ nhàng tay ga cho mình theo với nhé!' },
          { type: 1, avarta: 'https://api.lorem.space/image/face?hash=28212', content: 'Lớn rồi nha mậy.. dạo này t hay cọc lắm á.. múc m giờ :))))' },
          { type: 1, avarta: 'https://api.lorem.space/image/face?hash=28212', content: 'Vậy đổi giờ tập trung đi @Nguyễn Đức Trường Giang 9h30 đi..' },

      ],
    }
  },

  created() {
    // watch change router
    this.$watch(
      () => this.$route.params,
      (toParams, previousParams) => {
        console.log(toParams)
        console.log(previousParams)
      }
    ),
    console.log("storage: " + localStorage.getItem('user'));

  },

  filters: {
      truncate: function(value) {
          if (value && value.length > 5) {
              value = value.substring(0, 5) + '...';
          }
          return value
      }
  },
}
</script>
