import { SetMetadata } from '@nestjs/common';
import { SKIP_AUTH } from '../constants';

export const SkipAuth = () => {
  console.log(`Skipping Auth`);
  console.log(`SKIP_AUTH = ${SKIP_AUTH}`);
  return SetMetadata(SKIP_AUTH, true);
};
