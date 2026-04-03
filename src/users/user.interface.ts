import type { IRole } from "./role.type";

export interface IUser {
  id?: number;
  /** Имя пользователя */
  username?: string;
  /** Пароль */
  password?: string;
  /** ФИО */
  name?: string;
  /** Электропочта */
  email?: string;
  /** Номер телефона */
  phone?: string;
  /** Роль */
  user_role?: IRole;
  /** JWT-токен */
  access_token?: string;
  
  created_at?: string;
  updated_at?: string;
  deleted_at?: string;
}