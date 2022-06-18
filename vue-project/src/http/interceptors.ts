import axios from "axios";
import type { AxiosInstance } from "axios";
import {
  removeToken,
} from "../utils/cookie";

export class Interceptors {
  instance: AxiosInstance;
  constructor() {
    this.instance = axios.create({
      baseURL: "/api",
      timeout: 10000,
    });
  }
  // 初始化拦截器
  init() {
    // 请求接口拦截器
    this.instance.interceptors.request.use(
      (config) => {
        window.localStorage.getItem('token') ? config.headers!['authorization'] = window.localStorage.getItem('token')! : null
        return config;
      },
      (err) => {
        console.error(err);
      }
    );

    // 响应拦截器
    this.instance.interceptors.response.use(
      (response) => {
        const res = response.data;
        if (!response.status.toString().startsWith("2") || res.code === -1) {
          console.error("系统错误，请检查API是否正常！");
          return;
        }
        if (res.code !== 0) {
        } else {
          return response;
        }
      },
      (error) => {
        if (error.message === "Request failed with status code 500") {
          console.error("系统错误，请检查API是否正常！");
          return;
        }
        let code = -110;
        if (error && error.response && error.response.status) {
          code = error.response.status;
          // 登陆过期
          if (code === 401 || code === -3) {
            removeToken();
          }
        } else {
          console.error(error.message);
        }
        const err = { errCode: -110, errMsg: error.message || "Error" };
        return Promise.resolve(error);
      }
    );
  }
  // 返回一下
  getInterceptors() {
    this.init()
    return this.instance;
  }
}