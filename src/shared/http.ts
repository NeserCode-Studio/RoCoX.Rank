export interface ApiOptions {
	baseUrl: string
	headers: Record<string, string>
}

export interface Cookie {
	name?: string
	value?: string
	"Max-Age"?: string
	Expires?: string
	Domain?: string
	Path?: string
	Secure?: boolean
	SameSite?: string
	HttpOnly?: boolean

	[key: string]: any
}
