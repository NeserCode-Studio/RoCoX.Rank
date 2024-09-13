export type UserState = "Online" | "Offline" | "Blocked"
export type RankStandard = "I" | "II" | "III" | "IV" | "V" | "X"
export type RankLevel = "E" | "D" | "C" | "B" | "A" | "S"

export type RankType = "Score" | "Shiftscore" | "Badge" | "Custom"

export interface Rank {
	id: number
	userId: string
	rocoName: string
	level: RankLevel
	standard: RankStandard
	star: number

	createAt: Date
	updateAt: Date
}

export interface User {
	id: string
	qq: string
	username: string
	name: string
	password?: string
	state: UserState

	rank?: Rank

	createAt?: Date
	updateAt?: Date
}

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

export interface FindUserParams {
	type: "id" | "qq" | "username" | "socketId"
	payload: string
}
