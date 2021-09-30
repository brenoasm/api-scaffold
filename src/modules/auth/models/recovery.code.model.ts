import { Table, Column, Model, PrimaryKey } from 'sequelize-typescript';

import { RecoveryCodeEntity } from '../entities/recovery.code.entity';

@Table({ tableName: 'RecoveryCodes' })
export class RecoveryCodeModel extends Model implements RecoveryCodeEntity {
  @PrimaryKey
  @Column({ allowNull: false })
  email: string;

  @Column({ allowNull: false })
  code: number;

  @Column({ allowNull: false })
  expiresIn: Date;
}
