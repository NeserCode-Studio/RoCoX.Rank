export type UserState = "Online" | "Offline" | "Blocked"
export interface UserCreationParams {
	qq: string
	username: string
	password: string
	name?: string
}

export interface UserUpdateParams {
	qq?: string
	password?: string
	name?: string
	state?: UserState
}

export interface UserTokenClearParams {
	userId: string
	password: string
}

export interface UserSignInParams {
	username: string
	password: string
}

export interface UserSignOutParams {
	userId: string
}
