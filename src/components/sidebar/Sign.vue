<template>
  <div class="fly-panel fly-signin">
    <div class="fly-panel-title">
      签到1
      <i class="fly-mid"></i>
      <a
        href="javascript:void(0);"
        class="fly-link"
        id="LAY_signinHelp"
        @click="showInfo()"
      >
        说明
      </a>
      <i class="fly-mid"></i>
      <a
        href="javascript:;"
        class="fly-link"
        id="LAY_signinTop"
        @click="showInfo(1)"
      >
        活跃榜
        <span class="layui-badge-dot"></span>
      </a>
      <span class="fly-signin-days" v-show="state.isSign || state.isLogin">
        已连续签到
        <cite>{{ state.count }}</cite>
        天
      </span>
    </div>
    <div class="fly-panel-main fly-signin-main">
      <template v-if="!state.isSign">
        <button
          class="layui-btn layui-btn-danger"
          id="LAY_signin"
          @click="sign()"
        >
          今日签到
        </button>
        <span>
          可获得
          <cite>{{ state.fav }}</cite>
          飞吻
        </span>
      </template>
      <template v-else>
        <!-- 已签到状态 -->
        <button class="layui-btn layui-btn-disabled">
          {{ state.nextSignTime }}
        </button>
        <span>
          获得了
          <cite>{{ state.getFav }}</cite>
          飞吻
        </span>
      </template>
    </div>
    <!-- 父组件 sync用法  -->
    <!-- 字组件不需要提交关闭事件让父组件取改变isShow的状态  -->
    <sign-info v-model:isShow="state.showDes"></sign-info>
    <sign-list v-model:isShow="state.showTop"></sign-list>
  </div>
</template>

<script lang="ts">
import SignInfo from './signContent/signInfo.vue'
import SignList from './signContent/SignList.vue'
import { userSign } from '@/api/user'
import { defineComponent } from '@vue/runtime-core'
import store from '@/store'
import { computed, reactive } from 'vue'
import { popup } from '@/components/modules/pop'
import { HttpResponse } from '@/common/interface'

export default defineComponent({
  name: 'sign',
  components: {
    SignInfo,
    SignList
  },
  setup () {
    const state = reactive({
      showDes: false,
      showTop: false,
      isSign: false,
      resetTime: '',
      nextSignTime: '今日已签到',
      leftSeconds: 0,
      count: computed(() =>
        store.state.userInfo.count ? store.state.userInfo.count : 0
      ),
      isLogin: computed(() => store.state.isLogin),
      user: computed(() => store.state.userInfo),
      getFav: 0
    })

    const fav = () => {
      let fav = 0
      if (state.count <= 5) {
        fav = 5
      } else if (state.count > 5 && state.count <= 15) {
        fav = 10
      } else if (state.count > 15 && state.count <= 30) {
        fav = 15
      } else if (state.count > 30 && state.count <= 100) {
        fav = 20
      } else if (state.count > 100 && state.count <= 365) {
        fav = 50
      }
      return fav
    }

    const showInfo = (val: boolean) => {
      if (val) {
        state.showTop = true
      } else {
        state.showDes = true
      }
    }

    const sign = async () => {
      const userInfo = store.state.userInfo
      if (!state.isLogin) {
        popup('请先登陆')
        return
      }
      const res = await userSign()
      const { code, data } = res as HttpResponse

      if (code === 200) {
        state.getFav = data.favs
        state.count = data.count
        popup('签到成功')
        state.isSign = true
      } else {
        state.isSign = false
        popup('用户已签到')
      }
      // userInfo.isSign = true
      userInfo.lastSign = data.lastSign
      store.commit('setUserInfo', userInfo)
    }

    return {
      state,
      sign,
      showInfo,
      fav
    }
  }
})
</script>

<style lang="scss">
@keyframes bounceIn {
  0% {
    opacity: 0;
    transform: scale(0.5);
  }
  50% {
    opacity: 1;
    transform: scale(0.8);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}
.mask {
  z-index: 20000;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  position: fixed;
  top: 0;
  left: 0;
}
.layui-layer {
  z-index: 21000;
  position: fixed;
  width: 300px;
  height: 480px;
  top: 50%;
  left: 50%;
  margin-top: -240px;
  margin-left: -150px;
  background: #fff;
  &.active {
    animation-fill-mode: both;
    // 动画持续时间
    animation-duration: 0.2s;
    animation-name: bounceIn;
  }
  .layui-layui-title {
    height: 42px;
    line-height: 42px;
    background: #f8f8f8;
    color: #333;
  }
}
.layui-tab-item {
  line-height: 40px;
  li {
    border-bottom: 1px solid dotted #dcdcdc;
    &:last-child {
      border-bottom: none;
    }
  }
  img {
    padding: 5px;
    width: 40px;
    height: 40px;
  }
}
</style>
