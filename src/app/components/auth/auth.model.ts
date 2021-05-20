export interface Auth {
  token: string;
  profile: User;
}

export interface User {
  id?: number;
  username: string;
  email?: string;
  password?: string;
}
