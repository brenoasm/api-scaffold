import { Dialect } from 'sequelize/types';

export interface DatabaseConfigAttributes {
  username?: string;
  password?: string;
  database?: string;
  host?: string;
  port?: number | string;
  dialect?: Dialect;
  urlDatabase?: string;
}
