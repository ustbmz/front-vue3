<template>
  <div class="layui-container">
    <home-panel></home-panel>
    <router-view></router-view>
  </div>
</template>

<script>
import Panle from '@/components/Panle.vue'
import { defineComponent } from '@vue/runtime-core'

export default defineComponent({
  name: 'home',
  components: {
    'home-panel': Panle
  }
})
</script>

<style lang="scss" scoped></style>
