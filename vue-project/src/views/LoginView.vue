<template>
  <a-form
    :model="formState"
    name="basic"
    :label-col="{ span: 8 }"
    :wrapper-col="{ span: 16 }"
    autocomplete="off"
    @finish="onFinish"
  >
    <a-form-item
      label="Username"
      name="username"
      :rules="[{ required: true, message: 'Please input your username!' }]"
    >
      <a-input v-model:value="formState.username" />
    </a-form-item>

    <a-form-item
      label="Password"
      name="password"
      :rules="[{ required: true, message: 'Please input your password!' }]"
    >
      <a-input-password v-model:value="formState.password" />
    </a-form-item>


    <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
      <a-button type="primary" html-type="submit">Submit</a-button>
    </a-form-item>
  </a-form>
</template>
<script lang="ts" setup>
import { message } from 'ant-design-vue';
import { reactive } from 'vue';
import {Login} from '../api'
    interface FormState {
      username: string;
      password: string;
    }
    const formState = reactive<FormState>({
      username: '',
      password: '',
    });
    const onFinish = async (values: FormState) => {
      const res = await Login.userLogin({username: values.username, password: values.password})
      console.log(res)
      res.data.code === 200 ? (message.success('登录成功'), window.localStorage.setItem("token", res.data.data.token)): message.error('登陆失败')
    };
</script>