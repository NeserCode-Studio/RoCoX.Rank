export type UserState = "Online" | "Offline" | "Blocked";
export type RankStandard = "I" | "II" | "III" | "IV" | "V" | "X";
export type RankLevel = "E" | "D" | "C" | "B" | "A" | "S";

export type RankType = "Score" | "Shiftscore" | "Badge" | "Custom";

export interface Rank {
  id: number;
  userId: string;
  rocoName: string;
  level: RankLevel;
  standard: RankStandard;
  star: number;

  createAt: Date;
  updateAt: Date;
}

export type User = {
  username: string;
  password: string;
  id: string;
  usernameHash: string;
  nickname: string;
  qq: string;
  email: string;
  rocoName: string;
  state: UserState;
  roomId: string | null;
  createAt: Date;
  updateAt: Date;
};
export type SafeUser = Omit<User, "password">;

export interface UserCreationParams {
  qq: string;
  username: string;
  password: string;
  name?: string;
}

export interface UserSignRefreshParams {
  uid: string;
}
export interface UserSignRefreshResult {
  $access_token: string;
}

export interface UserUpdateParams {
  qq?: string;
  password?: string;
  name?: string;
  state?: UserState;
}

export interface UserSignInParams {
  username: string;
  password: string;
}
export interface UserSignInResult {
  $access_token: string;
}

export interface UserSignOutParams {
  uid: string;
}

export interface UserQueryParams {
  username: string;
}
