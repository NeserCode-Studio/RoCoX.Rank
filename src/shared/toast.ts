import type { Component } from "vue"
import type { ToasterProps } from "vue-sonner"

export type ToastPromiseData<T> = ToasterProps & {
	loading?: string | Component
	success?: (data: T) => string | Component
	error?: (data: T) => string | Component
	description?: string | Component | ((data: any) => Component | string)
	finally?: () => void | Promise<void>
}
