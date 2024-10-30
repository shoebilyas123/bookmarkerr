export interface DBDoc {
  _id: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface UserType extends DBDoc {
  name: string;
  email: string;
  password?: string;
  avatar?: string;
}

export interface UserAuthenticated {
  token: string | null;
  user: UserType | null;
}
