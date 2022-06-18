
import http from "../http";
interface LoginType {
    username: string,
    password: string,
}
export default new class Login{ 
    userLogin(data: LoginType) {
        return http.request({
            url: `/user/login`,
            method: "post",
            data
        })
    }

}