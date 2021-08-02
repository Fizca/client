import { observable } from "mobx";

import Profile from "@models/Profile";
import User from '@models/User';
import Http from "@services/Http";

const Empty = 'empty';
const Loading = 'loading';
const Ready = 'ready';
const StorageKey = 'session-data';

class Store {
  @observable status = Empty;
  @observable user;
  @observable profiles = [];
  @observable profile;

  clearSession() {
    this.user = undefined
    this.profiles = [];
    this.profile = undefined;
  }

  async googleAuth(googleData) {
    console.log(googleData);
    const body = { token: googleData.tokenId };
    const headers = { "Content-Type": "application/json" };
    return Http.post("auth/google", body, { headers })
      .then((res) => res.data);
  }

  async init() {
    this.status = Loading;

    try {
      await this.loadUser();
      await this.loadProfiles();

      // For now, grab the first profile and assume that's correct.
      if (this.profiles.length) {
        this.profile = this.profiles[0];
      }
    } catch (e) {
      console.log(e);
      this.clearSession();
    }
    this.status = Ready;
  }

  async loadUser() {
    this.user = await User.FetchUser('me').catch((e) => {
      throw 'User not logged in.';
    });
  }

  async loadProfiles() {
    this.profiles = await Profile.FetchProfiles().catch((e) => {
      throw 'No profiles available.';
    });
  }

  async clearUser() {
    await User.Logout()
      .catch((e) => console.log(e));

    this.clearSession();
    return;
  }

  isReady() {
    return this.status === Ready;
  }
}

export default new Store();

