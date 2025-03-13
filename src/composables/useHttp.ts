import { fetch } from "@tauri-apps/plugin-http";
import { useCookie } from "./useCookie";
import { useStorage } from "@vueuse/core";

const userAccessToken = useStorage("user-access-token", "");

export class RocoxApi {
  private baseUrl = "";
  private headers = {
    Accept: "*/*",
    authorization: `Bear ${userAccessToken.value}`,
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
  };

  constructor(baseUrl?: string, headers?: Record<string, string>) {
    if (baseUrl) this.baseUrl = baseUrl;
    if (headers) this.headers = { ...this.headers, ...headers };
  }

  async get<T>(endpoint: string, params?: any) {
    let url: any = new URL(endpoint, this.baseUrl);
    if (params) {
      Object.entries(params as Record<string, any>).forEach(([key, value]) => {
        url.searchParams.append(key, value);
      });
    }

    url = url.toString();
    const response = await fetch(url, {
      method: "GET",
      headers: this.headers,
    });

    return response.json() as T;
  }

  async post<T>(endpoint: string, params?: any) {
    const url = new URL(endpoint, this.baseUrl).toString();

    const response = await fetch(url, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify(params),
    });

    const cookies = response.headers.getSetCookie();

    if (cookies.length) {
      const { allCookies, stringToCookie } = useCookie();
      allCookies.value.push(stringToCookie(cookies)[0]);
    }

    return response.json() as T;
  }

  setAuthorization(value: string) {
    this.headers.authorization = `Bearer ${value}`;
  }
}
