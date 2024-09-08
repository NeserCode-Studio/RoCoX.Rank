export type UserState = "Online" | "Offline" | "Blocked"
export interface UserCreationData {
	qq: string
	username: string
	password: string
	name?: string
	state: UserState
}

export interface UserUpdateData {
	qq?: string
	password?: string
	name?: string
	state?: UserState
}

export interface UserSignInData {
	username: string
	password: string
}

export interface UserSignOutData {
	userId: string
}

export interface UserTokenClearResponseData {
	userId: string
	password: string
}
