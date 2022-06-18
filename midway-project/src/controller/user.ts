/* eslint-disable prettier/prettier */
import { Body, Controller, Inject, Post } from '@midwayjs/decorator';
import { JwtService } from '@midwayjs/jwt';
import { Validate } from '@midwayjs/validate';
import UserLoginDTO from '../dto/user.dto'
import { IReturnValue } from '../interface';
import UserModel from '../model/user.model'
@Controller('/api/user')

export class HomeController {
  @Inject()
  jwtService: JwtService;
  @Post('/login')
  @Validate()
  async userLogin(@Body() UserLoginDTO: UserLoginDTO): Promise<IReturnValue> {
    console.log('user login', UserLoginDTO)
    const user = await UserModel.getUserByUsernameAndPassword(UserLoginDTO.username, UserLoginDTO.password)
    console.log(user)
    if (user) {
        const newToken = await this.jwtService.sign({admin:user}, 'wzc');
        return {
                code: 200,
                result: 'success',
                message: '登录成功',
                data: { token: newToken}
            }
    }else {
        return {
            code: 400,
            result: 'error',
            message: '账号或密码不正确',
            data: null
        }
    }
  }
}
