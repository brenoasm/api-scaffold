import { RECOVERY_CODE_REPOSITORY } from 'src/commons/constants';

import { RecoveryCodeModel } from './models/recovery.code.model';

export const authProviders = [
  {
    provide: RECOVERY_CODE_REPOSITORY,
    useValue: RecoveryCodeModel,
  },
];
