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
import { getList } from '@/api/content'
import { HttpResponse } from '@/common/interface'
import { defineComponent, onMounted, reactive } from '@vue/runtime-core'
import { toRef, watch } from 'vue'
import { onBeforeRouteUpdate, useRoute } from 'vue-router'
import ListItem from './Listitem.vue'
export default defineComponent({
  name: 'list',
  components: {
    ListItem
  },
  setup () {
    const state = reactive({
      catalog: '',
      isEnd: false,
      isRepeat: false,
      // isShow: true,
      current: '',
      status: '',
      tag: '',
      sort: '',
      page: 0,
      limit: 20,
      lists: []
    })

    const route = useRoute()
    console.log(route.params)
    const catalog = route?.params?.catalog as string
    if (typeof catalog !== 'undefined' || catalog !== '') {
      state.catalog = catalog
    }

    const handleGetlist = async () => {
      console.log('handleGetlist state.catalog:' + state.catalog)
      if (state.isRepeat) return
      if (state.isEnd) return
      state.isRepeat = true
      const options = {
        catalog: state.catalog,
        isTop: 0,
        page: state.page,
        limit: state.limit,
        sort: state.sort,
        tag: state.tag,
        status: state.status
      }
      try {
        const res = await getList(options)
        const { code, data } = res as HttpResponse
        if (code === 200) {
          state.isRepeat = false
          if (data.length < 20) {
            state.isEnd = true
          }
          if (state.lists.length === 0) {
            state.lists = res.data
          } else {
            state.lists = state.lists.concat(res.data)
          }
        }
      } catch (error) {
        alert(error.message)
      }
    }

    const init = () => {
      state.page = 0
      state.lists = []
      state.isEnd = false
      state.isRepeat = false
      handleGetlist()
    }

    const nextPage = () => {
      state.page++
      handleGetlist()
    }

    onMounted(() => {
      console.log('List vue onMounted')
      handleGetlist()
    })

    onBeforeRouteUpdate(async (to, from) => {
      console.log(
        '🚀 ~ file: List.vue ~ line 146 ~ onBeforeRouteUpdate ~ from',
        from
      )
      console.log(
        '🚀 ~ file: List.vue ~ line 146 ~ onBeforeRouteUpdate ~ to',
        to
      )
      state.catalog = to.params.catalog as string
      init()
      // only fetch the user if the id changed as maybe only the query or the hash changed
    })

    const search = (val: string | null) => {
      // if (typeof val === 'undefined' && state.current === '') {
      //   return
      // }
      state.current = val ? val + '' : ''
      switch (val) {
        case '0':
          state.status = '0'
          state.tag = ''
          break
        case '1':
          state.status = '1'
          state.tag = ''
          break
        case '2':
          state.status = ''
          state.tag = '精华'
          break
        case '3':
          state.sort = 'created'
          break
        case '4':
          state.sort = 'answer'
          break
        default:
          console.log('search default')
          state.status = ''
          state.tag = ''
          state.sort = 'created'
          state.current = ''
          break
      }
    }
    const current = toRef(state, 'current')
    watch(() => {
      console.log('state.current:' + state.current)
      return state.current
    }, init)

    return {
      search,
      state,
      handleGetlist,
      nextPage,
      init,
      current
    }
  }
})
</script>

<style lang="scss" scoped></style>
