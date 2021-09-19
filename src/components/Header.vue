<template>
  <div class="fly-header layui-bg-black">
    <div class="layui-container">
      <ul class="layui-nav layui-hide-xs">
        <li class="layui-nav-item layui-this">
          <a :to="{ name: 'index' }">
            <i class="iconfont icon-jiaoliu"></i>
            首页
          </a>
        </li>
        <li class="layui-nav-item">
          <a href="https://www.ustbmz.com" target="_blank">
            <i class="iconfont icon-ui"></i>
            博客
          </a>
        </li>
      </ul>

      <ul class="layui-nav fly-nav-user">
        <!-- 未登入的状态 -->
        <template v-if="!state.isShow">
          <li class="layui-nav-item">
            <a
              class="iconfont icon-touxiang layui-hide-xs"
              :to="{ name: 'login' }"
            ></a>
          </li>
          <li class="layui-nav-item">
            <router-link :to="{ name: 'login' }"><a>登入</a></router-link>
          </li>
          <li class="layui-nav-item">
            <router-link :to="{ name: 'reg' }"><a>注册</a></router-link>
          </li>
          <li class="layui-nav-item layui-hide-xs">
            <a
              to="/goQQ"
              onclick="layer.msg('正在通过QQ登入', {icon:16, shade: 0.1, time:0})"
              title="QQ登入"
              class="iconfont icon-qq"
            ></a>
          </li>
          <li class="layui-nav-item layui-hide-xs">
            <a
              to="/goWb"
              onclick="layer.msg('正在通过微博登入', {icon:16, shade: 0.1, time:0})"
              title="微博登入"
              class="iconfont icon-weibo"
            ></a>
          </li>
        </template>
        <template v-else>
          <li class="layui-nav-item" @mouseover="show()" @mouseleave="hide()">
            <a
              class="fly-nav-avatar"
              :to="{ name: 'home', params: { uid: state.user._id } }"
            >
              <cite class="layui-hide-xs">{{ state.user.name }}</cite>
              <i
                class="layui-badge fly-badge-vip layui-hide-xs"
                v-if="state.user.isVip !== '0'"
              >
                {{ state.user.isVip }}
              </i>
              <img :src="state.user.pic" />
            </a>
            <dl
              class="layui-nav-child layui-anim layui-anim-downbit"
              :class="{ 'layui-show': state.isHover }"
            >
              <dd>
                <a :to="{ name: 'center' }">
                  <i class="layui-icon">&#xe620;</i>
                  基本设置
                </a>
              </dd>
              <dd>
                <a :to="{ name: 'msg' }">
                  <i class="iconfont icon-tongzhi" style="top: 4px"></i>
                  我的消息
                </a>
              </dd>
              <dd>
                <a :to="{ name: 'home', params: { uid: state.user._id } }">
                  <i
                    class="layui-icon"
                    style="margin-left: 2px; font-size: 22px"
                  >
                    &#xe68e;
                  </i>
                  我的主页
                </a>
              </dd>
              <hr style="margin: 5px 0" />
              <dd>
                <a
                  href="javascript:void(0)"
                  @click="quit()"
                  style="text-align: center"
                >
                  退出
                </a>
              </dd>
            </dl>
          </li>
          <!-- <div class="fly-nav-msg">
            <a :to="{ name: 'msg' }">{{ num }}</a>
          </div>
          <div class="layui-layer-tips" v-show="hasMsg">
            <div class="layui-layer-content">
              您有{{ num }}条未读消息
              <i class="layui-layer-TipsG layui-layer-TipsB"></i>
            </div>
          </div> -->
        </template>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, reactive } from 'vue'
import { confirm } from '@/components/modules/alert'
import store from '@/store'
import router from '@/router'
export default defineComponent({
  setup () {
    const state = reactive({
      isHover: false,
      hoverContral: 0,
      hasMsg: false,
      num: computed(() => store.state.num),
      user: computed(() => store.state.userInfo),
      isShow: computed(() => store.state.isLogin)
    })

    const show = () => {
      clearTimeout(state.hoverContral)
      state.hoverContral = setTimeout(() => {
        state.isHover = true
      }, 200)
    }
    const hide = () => {
      clearTimeout(state.hoverContral)
      state.hoverContral = setTimeout(() => {
        state.isHover = false
      }, 300)
    }
    const quit = () => {
      alert('fuck')
      confirm('是否退出当前用户?',
        () => {
          // confirm 执行
          localStorage.clear()
          store.commit('setUserInfo', '')
          store.commit('setIsLogin', false)
          store.commit('setToken', '')
          // 忽略重复路由
          router.push('/')
        },
        () => {
          // cancel 执行
        }
      )
    }
    return {
      state,
      show,
      hide,
      quit
    }
  }
})
</script>

<style lang="scss" scoped>
.fly-logo {
  left: -15px;
  top: -10px;
  margin-left: 15px;
}
.pdl20 {
  top: 0px;
  padding-left: 20px;
}
.layui-layer-tips {
  position: fixed;
  right: 0;
  white-space: nowrap;
  z-index: 3000;
}
</style>
