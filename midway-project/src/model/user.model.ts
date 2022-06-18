/* eslint-disable prettier/prettier */
import { Repository } from 'typeorm';
import { InjectEntityModel } from '@midwayjs/orm';
import UserEntity from '../entity/user.entity';
class UserModel {
  @InjectEntityModel(UserEntity)
  userRepo: Repository<UserEntity>;

  /**
   * 根据用户名和密码获取用户信息
   * @param username {String} 用户名
   * @param password {String} 用户密码
   */
  async getUserByUsernameAndPassword(username, password): Promise<UserEntity> {
    console.log(this.userRepo)
    const loginSuccessfulType = await this.userRepo.findOne({
      where: {
        username: username,
        password: password
      }
    });
    return loginSuccessfulType
  }
}
export default new UserModel();
