export interface UserEntity extends UserProfile {
  password: string;
}

export interface UserProfile {
  id: number;
  username: string;
  email: string;
}
