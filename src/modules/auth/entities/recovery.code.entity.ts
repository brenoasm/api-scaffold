export interface RecoveryCodeEntity {
  email: string;
  code: number;
  expiresIn: Date;
}
