<template>
  <div class="layui-container fly-marginTop">
    <div class="fly-panel fly-panel-user" pad20>
      <div class="layui-tab layui-tab-brief" lay-filter="user">
        <ul class="layui-tab-title">
          <li class="layui-this">登入</li>
          <li>
            <router-link :to="{ name: 'reg' }">注册</router-link>
          </li>
        </ul>
        <div
          class="layui-form layui-tab-content"
          id="LAY_ucm"
          style="padding: 20px 0"
        >
          <div class="layui-tab-item layui-show">
            <div class="layui-form layui-form-pane">
              <Form @submit="submit" v-slot="{ errors }">
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
                      {{ errors.username }}
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
                      {{ errors.password }}
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
                        rules="required"
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
                        {{ errors.code }}
                      </span>
                    </div>
                  </div>
                </div>
                <div class="layui-form-item">
                  <button class="layui-btn" type="submit">
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
import { defineComponent, onMounted } from 'vue'
import { Field, Form } from 'vee-validate'
import { loginUtils } from '@/utils/login'
import { HttpResponse, LoginInfo } from '@/common/interface'
import router from '@/router'

export default defineComponent({
  components: {
    Field,
    Form
  },
  setup () {
    const { state, getCaptcha, loginHandle } = loginUtils()
    onMounted(async () => {
      getCaptcha()
    })

    const submit = async (value: LoginInfo, form: any) => {
      const ret = await loginHandle()
      const { code, msg } = ret as HttpResponse
      const { setErrors, resetForm } = form
      if (code === 200) {
        resetForm()
        setTimeout(() => {
          router.push({ name: 'home' })
        }, 1000)
      } else {
        if (typeof msg === 'object') {
          setErrors({
            ...msg
          })
        } else {
          setErrors({
            code: msg
          })
        }
      }
    }

    return {
      state,
      getCaptcha,
      submit
    }
  }
})
</script>

<style scoped></style>
