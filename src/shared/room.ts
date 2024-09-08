export interface RoomCreationData {
	name: string
	password?: string
	hostId: string
}

export interface Room_Safe {
	id: string
	name: string
	hostId: string

	createAt: Date
	updateAt: Date
}
