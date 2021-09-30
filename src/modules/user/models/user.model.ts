import {
  Table,
  Column,
  Model,
  PrimaryKey,
  AutoIncrement,
  BeforeCreate,
} from 'sequelize-typescript';
import { Encrypt } from 'src/commons/encrypt';
import { UserEntity } from '../entities/user.entity';

@Table({ tableName: 'Users' })
export class UserModel extends Model implements UserEntity {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @Column({ allowNull: false })
  username: string;

  @Column({ allowNull: false })
  email: string;

  @Column({ allowNull: false })
  password: string;

  @BeforeCreate
  static async hashPassword(user: UserModel) {
    try {
      const hashedPassword = await Encrypt.hash(user.password);

      user.password = hashedPassword;
    } catch (error) {
      throw new Error(error);
    }
  }
}
