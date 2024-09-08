import type { Rank, RankLevel, RankStandard } from "@prisma/client"

export interface RankCreationData {
	userId: string
	rocoName: string
	level: RankLevel
	standard: RankStandard
	star: number
}

export interface RankQueryData {
	userId: string
}

export interface RankUpdateData {
	userId: string
	rocoName?: string
	level?: RankLevel
	standard?: RankStandard
	star?: number
}

export interface Rank_Safe extends Rank {}
