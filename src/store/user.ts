import { defineStore } from "pinia";
import { SafeUser, User } from "../shared";

export const useUserStore = defineStore("user-data", {
  state() {
    return {
      username: "",
      password: "",
      id: "",
      usernameHash: "",
      nickname: "",
      qq: "",
      email: "",
      rocoName: "",
      state: "Offline",
      roomId: null,
    } as User;
  },
  getters: {
    displayName: (state) => `${state.nickname}#${state.usernameHash}`,
  },
  actions: {
    update(data: SafeUser) {
      this.username = data.username || this.username;
      this.id = data.id || this.id;
      this.usernameHash = data.usernameHash || this.usernameHash;
      this.nickname = data.nickname || this.nickname;
      this.qq = data.qq || this.qq;
      this.email = data.email || this.email;
      this.rocoName = data.rocoName || this.rocoName;
      this.state = data.state || this.state;
      this.roomId = data.roomId || this.roomId;
    },
    reset() {
      this.username = "";
      this.password = "";
      this.id = "";
      this.usernameHash = "";
      this.nickname = "";
      this.qq = "";
      this.email = "";
      this.rocoName = "";
      this.state = "Offline";
      this.roomId = null;
    },
  },
  persist: true,
});
