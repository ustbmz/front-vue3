<template>
  <div class="fly-panel">
    <div class="fly-panel-title fly-filter">
      <a>置顶</a>
      <a
        href="#signin"
        class="layui-hide-sm layui-show-xs-block fly-right"
        id="LAY_goSignin"
        style="color: #ff5722"
      >
        去签到
      </a>
    </div>
    <list-item
      :lists="state.lists"
      :isShow="state.isShow"
      :isEnd="state.isEnd"
    ></list-item>
  </div>
</template>

<script>
import ListItem from './Listitem.vue'
import { listService } from '../../common/provides/list'
import { defineComponent, onMounted } from 'vue'

export default defineComponent({
  name: 'topList',
  components: {
    ListItem
  },
  setup () {
    const { state, handleGetlist } = listService()
    state.isTop = 1

    onMounted(() => {
      console.log('TopList vue onMounted')
      handleGetlist()
    })

    return {
      state
    }
  }
})
</script>

<style lang="scss" scoped></style>
