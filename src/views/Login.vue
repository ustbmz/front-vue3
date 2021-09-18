<template>
  <div class="layui-container fly-marginTop">
    <div class="fly-panel fly-panel-user" pad20>
      <div class="layui-tab layui-tab-brief" lay-filter="user">
        <ul class="layui-tab-title">
          <li class="layui-this">登入</li>
          <li>
            <a :to="{ name: 'reg' }">注册</a>
          </li>
        </ul>
        <div
          class="layui-form layui-tab-content"
          id="LAY_ucm"
          style="padding: 20px 0"
        >
          <div class="layui-tab-item layui-show">
            <div class="layui-form layui-form-pane">
              <Form method="post">
                <div class="layui-form-item">
                  <label for="L_email" class="layui-form-label">用户名</label>
                  <div class="layui-input-inline">
                    <Field
                      type="text"
                      name="username"
                      v-model="state.username"
                      placeholder="请输入用户名"
                      autocomplete="off"
                      class="layui-input"
                      rules="required|email"
                    />
                  </div>
                  <div class="layui-form-mid">
                    <span style="color:#c00">
                      <ErrorMessage name="username" />
                    </span>
                  </div>
                </div>
                <div class="layui-form-item">
                  <label for="L_pass" class="layui-form-label">密码</label>
                  <div class="layui-input-inline">
                    <Field
                      type="password"
                      name="password"
                      v-model="state.password"
                      placeholder="请输入密码"
                      autocomplete="off"
                      class="layui-input"
                      rules="required"
                    />
                  </div>
                  <div class="layui-form-mid">
                    <span style="color:#c00">
                      <ErrorMessage name="password" />
                    </span>
                  </div>
                </div>
                <div class="layui-form-item">
                  <div class="layui-row">
                    <label for="L_vercode" class="layui-form-label">
                      验证码
                    </label>
                    <div class="layui-input-inline">
                      <Field
                        type="text"
                        name="code"
                        v-model="state.code"
                        placeholder="请输入验证码"
                        autocomplete="off"
                        class="layui-input"
                        rules="required|length:4"
                      />
                    </div>
                    <div class>
                      <span
                        class="svg"
                        style="color: #c00"
                        @click="getCaptcha()"
                        v-html="state.svg"
                      ></span>
                    </div>
                    <div class="layui-form-mid">
                      <span style="color:#c00">
                        <ErrorMessage name="code" />
                      </span>
                    </div>
                  </div>
                </div>
                <div class="layui-form-item">
                  <button class="layui-btn" type="button" @click="submit()">
                    立即登录
                  </button>
                  <span style="padding-left: 20px">
                    <a :to="{ name: 'forget' }">
                      忘记密码？
                    </a>
                  </span>
                </div>
                <div class="layui-form-item fly-form-app">
                  <span>或者使用社交账号登入</span>
                  <a
                    href
                    onclick="layer.msg('正在通过QQ登入', {icon:16, shade: 0.1, time:0})"
                    class="iconfont icon-qq"
                    title="QQ登入"
                  ></a>
                  <a
                    href
                    onclick="layer.msg('正在通过微博登入', {icon:16, shade: 0.1, time:0})"
                    class="iconfont icon-weibo"
                    title="微博登入"
                  ></a>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive } from 'vue'
import { Field, Form, ErrorMessage } from 'vee-validate'
import { v4 as uuidv4 } from 'uuid'
import store from '@/store'
import { getCode } from '@/api/login'
import { HttpResponse } from '@/common/interface'
export default defineComponent({
  components: {
    Field,
    Form,
    ErrorMessage
  },
  setup () {
    const state = reactive({
      username: '',
      password: '',
      code: '',
      svg: ''
    })

    const getCaptcha = async () => {
      let sid = ''
      if (localStorage.getItem('sid')) {
        sid = localStorage.getItem('sid') || ''
      } else {
        sid = uuidv4()
        localStorage.setItem('sid', sid)
      }
      store.commit('setSid', sid)
      const { data, code } = (await getCode(sid)) as HttpResponse
      if (code === 200) {
        state.svg = data
      }
    }

    const submit = () => {
      console.log('submit')
    }

    onMounted(async () => {
      getCaptcha()
    })

    return {
      state,
      submit,
      getCaptcha
    }
  },
  methods: {
    isRequired (value: any) {
      if (value && value.trim()) {
        return true
      }

      return 'This is required'
    }
  }
})
</script>

<style scoped></style>
