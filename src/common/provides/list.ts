import { getList } from '@/api/content'
import { reactive } from '@vue/runtime-dom'
import { useRoute } from 'vue-router'
import { HttpResponse } from '../interface'

export const listService = () => {
  const state = reactive({
    catalog: '',
    isEnd: false,
    isRepeat: false,
    isTop: 0,
    isShow: true,
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
      isTop: state.isTop,
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
      // alert(error.message)
      console.log('list Service catch errinfo:' + error)
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
  return {
    search,
    state,
    handleGetlist,
    nextPage,
    init
  }
}
