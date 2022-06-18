import type { AxiosInstance, AxiosRequestConfig, AxiosResponse,AxiosError ,AxiosPromise} from "axios";
import { Interceptors } from "./interceptors";
export interface successType {
  code:number,
  message:string,
  result: string,
  data:any
}
export class HttpServer {
  axios: AxiosInstance;
  constructor() {
    this.axios = new Interceptors().getInterceptors();
  }
  request<T>(config: AxiosRequestConfig<T>):AxiosPromise<successType> {
    return new Promise((resolve, reject) => {
      this.axios(config).then((res:AxiosResponse<successType,T>) => {
        resolve(res);
      }).catch((err:AxiosError) => {
        reject(err)
      });
    });
  }
}

const http = new HttpServer()

export default http