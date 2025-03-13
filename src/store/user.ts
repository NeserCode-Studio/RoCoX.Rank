import { defineStore } from "pinia";
import { SafeUser, User } from "../shared";

export const useUserStore = defineStore("user-data", {
  state() {
    return {
      username: "",
      nickname: "",
      qq: "",
      id: "",
      state: "Offline",
    } as User;
  },
  actions: {
    update(data: SafeUser) {
      this.username = data.username;
      this.nickname = data.nickname;
      this.qq = data.qq;
      this.id = data.id;
      this.state = data.state;
    },
    reset() {
      this.username = "";
      this.nickname = "";
      this.qq = "";
      this.id = "";
      this.state = "Offline";
    },
  },
});
