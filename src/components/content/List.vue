<template>
  <div class="fly-panel">
    <div class="fly-panel-title fly-filter">
      <a
        @click.prevent="search()"
        :class="{ 'layui-this': state.status === '' && state.tag == '' }"
      >
        综合
      </a>
      <span class="fly-mid"></span>
      <a
        @click.prevent="search('0')"
        :class="{ 'layui-this': state.status === '0' }"
      >
        未结
      </a>
      <span class="fly-mid"></span>
      <a
        @click.prevent="search('1')"
        :class="{ 'layui-this': state.status === '1' }"
      >
        已结
      </a>
      <span class="fly-mid"></span>
      <a
        @click.prevent="search('2')"
        :class="{ 'layui-this': state.status === '' && state.tag == '精华' }"
      >
        精华
      </a>
      <span class="fly-filter-right layui-hide-xs">
        <a
          @click.prevent="search('3')"
          :class="{ 'layui-this': state.sort === 'created' }"
        >
          按最新
        </a>
        <span class="fly-mid"></span>
        <a
          @click.prevent="search('4')"
          :class="{ 'layui-this': state.sort === 'answer' }"
        >
          按热议
        </a>
      </span>
    </div>
    <list-item
      :lists="state.lists"
      @nextpage="nextPage()"
      :isShow="state.isShow"
      :isEnd="state.isEnd"
    ></list-item>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/runtime-core'
import { onMounted, toRef, watch } from 'vue'
import { onBeforeRouteUpdate } from 'vue-router'
import ListItem from './Listitem.vue'
import { listService } from '../../common/provides/list'
export default defineComponent({
  name: 'list',
  components: {
    ListItem
  },
  setup () {
    const { state, nextPage, handleGetlist, init, search } = listService()

    onBeforeRouteUpdate(async (to, from) => {
      state.catalog = to.params.catalog as string
      init()
    })

    onMounted(() => {
      console.log('List vue onMounted')
      handleGetlist()
    })

    const current = toRef(state, 'current')
    watch(current, init)

    return {
      search,
      state,
      nextPage,
      init
    }
  }
})
</script>

<style lang="scss" scoped></style>
