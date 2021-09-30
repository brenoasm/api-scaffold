import { USER_REPOSITORY } from 'src/commons/constants';
import { UserModel } from './models/user.model';

export const userProviders = [
  {
    provide: USER_REPOSITORY,
    useValue: UserModel,
  },
];
