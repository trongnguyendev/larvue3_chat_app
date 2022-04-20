<template>
  <div class="flex w-full fixed h-full divide-x-[1px]"
    :class="{'dark': isDark}">
      <router-view></router-view>
    </div>
    
</template>

<script>
import axios from "axios";
// import HelloWorld from './components/HelloWorld.vue'
// import Header from './components/HeaderPartial.vue'
// import Footer from './components/FooterPartial.vue'

// import UserIcon from '../components/icons/User.vue'
import PhoneIcon from './components/icons/Phone.vue'
import CameraIcon from './components/icons/Camera.vue'
import CircleIcon from './components/icons/CircleInfo.vue'
import SearchIcon from './components/icons/Search.vue'
import PaperClipIcon from './components/icons/PaperClip.vue'
import EmojiHappyIcon from './components/icons/EmojiHappy.vue'
import PlusCircleIcon from './components/icons/PlusCircle.vue'
import PaperPlaneIcon from './components/icons/PaperPlane.vue'

import SidebarRight from './components/partials/SidebarRight.vue'
import SidebarLeft from './components/partials/SidebarLeft.vue'

import { mapState, mapGetters, mapActions } from 'vuex'
import { useToast } from "vue-toastification";

export default {
  setup () {
      const toast = useToast();
      return { toast }
  },
  name: 'App',
  components: {
    PhoneIcon,
    CameraIcon,
    CircleIcon,
    SearchIcon,
    PaperClipIcon,
    EmojiHappyIcon,
    PlusCircleIcon,
    PaperPlaneIcon,

    SidebarRight,
    SidebarLeft
  },

  data() {
    return {
      bool: false,
      isDark: false,
      current_message: 1,
      message: '',
      info: '',
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
  
  filters: {
      truncate: function(value) {
        if (value && value.length > 5) {
            value = value.substring(0, 5) + '...';
        }
        return value
      }
  },

  computed: {
    ...mapGetters([
      'darkMode'
    ]),

    ...mapState('notification', [
      'active',
      'title',
      'message',
      'type'
    ])
  },

  methods: {
    ...mapActions('notification', [
      'resetNotification'
    ])
  },

  watch: {
    darkMode() {
      this.isDark = this.darkMode
    },
    active() {
      if(this.active) {
        if(this.type == 'success') {
          this.toast.success(this.title);
        } else {
          this.toast.error(this.title);
        }
        this.resetNotification()
      }
    }
  },
}
</script>
