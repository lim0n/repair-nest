import { SetMetadata } from '@nestjs/common';
import { IRole } from './roles.enum';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: string[]) => SetMetadata(ROLES_KEY, roles);