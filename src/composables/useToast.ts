import { toast as sonnerToast, type ToasterProps } from "vue-sonner"

export const useToast = (options: ToasterProps = {}) => {
	const toastOptions: ToasterProps = Object.assign<ToasterProps, ToasterProps>(
		{
			richColors: true,
			duration: 10000,
		},
		options
	)

	return {
		toast: (message: string) => {
			sonnerToast(`${message}`, {
				...toastOptions,
			})
		},
		promise: (promise: Promise<any>, data: any) => {
			sonnerToast.promise(promise, { ...data })
		},
		success: (message: string) => {
			sonnerToast.success(`${message}`, {
				...toastOptions,
			})
		},
		error: (message: string) => {
			sonnerToast.error(`${message}`, {
				...toastOptions,
			})
		},
		warning: (message: string) => {
			sonnerToast.warning(`${message}`, {
				...toastOptions,
			})
		},
		info: (message: string) => {
			sonnerToast.info(`${message}`, {
				...toastOptions,
			})
		},
		loading: (message: string) => {
			sonnerToast.loading(`${message}`, {
				...toastOptions,
			})
		},
		dimiss: sonnerToast.dismiss,
	}
}
