import {
	ApiOptions,
	FindUserParams,
	UserCreationParams,
	UserSignInParams,
	UserSignOutParams,
	UserTokenClearParams,
} from "../shared"
import { RocoxApi } from "./useHttp"

export const useApi = (options: ApiOptions) => {
	const api = new RocoxApi(options.baseUrl, options.headers)

	return {
		userSignUp: (params: UserCreationParams) =>
			api.post("/v1/user/sign/up", { ...params }),
		userSignIn: (params: UserSignInParams) =>
			api.post("/v1/user/sign/in", { ...params }),
		userSignOut: (params: UserSignOutParams) =>
			api.post("/v1/user/sign/out", { ...params }),
		userSignInfo: () => api.get("/v1/user/sign/verify"),
		userSignClear: (params: UserTokenClearParams) =>
			api.post("/v1/user/sign/clear", { ...params }),
		userSignRefresh: () => api.get("/v1/user/sign/refresh"),
		appCookies: () => api.get("/cookies"),
		findUser: (params: FindUserParams) =>
			api.post("/v1/user/find", { ...params }),
	}
}
