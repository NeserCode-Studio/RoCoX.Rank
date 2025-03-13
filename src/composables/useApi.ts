import {
  ApiOptions,
  UserQueryParams,
  UserCreationParams,
  UserSignInParams,
  UserSignOutParams,
  UserSignRefreshParams,
  UserSignInResult,
  BaseErrorResult,
  SafeUser,
  UserSignRefreshResult,
} from "../shared";
import { RocoxApi } from "./useHttp";
import { useStorage, watchImmediate } from "@vueuse/core";

export const useApi = (options: ApiOptions) => {
  const api = new RocoxApi(options.baseUrl, options.headers);
  const userAccessToken = useStorage("user-access-token", "");

  watchImmediate(userAccessToken, (token) => {
    api.setAuthorization(token);
  });

  return {
    userSignUp: (params: UserCreationParams) =>
      api.post("/user/sign/up", { ...params }),

    userSignIn: (params: UserSignInParams) =>
      api.post<UserSignInResult | BaseErrorResult>("/user/sign/in", {
        ...params,
      }),

    userSignOut: (params: UserSignOutParams) =>
      api.post("/user/sign/out", { ...params }),

    userSignInfo: () =>
      api.get<SafeUser | BaseErrorResult>("/user/sign/verify"),

    userSignRefresh: (params: UserSignRefreshParams) =>
      api.post<UserSignRefreshResult | BaseErrorResult>("/user/sign/refresh", {
        ...params,
      }),

    userQuery: (params: UserQueryParams) =>
      api.get<SafeUser | BaseErrorResult>(`/user/query/${params.username}`),
  };
};
