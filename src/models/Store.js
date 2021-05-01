import { observable } from "mobx";

import Profile from "@models/Profile";
import User from '@models/User';
import { http } from "@services/Backend";

const Empty = 'empty';
const Loading = 'loading';
const Ready = 'ready';

class Store {
  @observable status = Empty;
  @observable user;
  @observable profiles = [];
  @observable profile;

  setAccessToken(token) {
    // Update the header to include the access token
    http.defaults.headers.common['access_token'] = token;
    window.localStorage.setItem('access_token', token);
  }

  getAccessToken() {
    const token = window.localStorage.getItem('access_token');
    http.defaults.headers.common['access_token'] = token;
    return token;
  }

  clearSession() {
    this.user = undefined
    this.profiles = [];
    this.profile = undefined;

    window.localStorage.removeItem('access_token');
    http.defaults.headers.common['access_token'] = undefined;
  }

  async googleAuth(googleData) {
    console.log(googleData);
    const body = { token: googleData.tokenId };
    const headers = { "Content-Type": "application/json" };
    return http.post("auth/google", body, { headers })
      .then((res) => res.data);
  }

  async init() {
    this.status = Loading;

    const token = this.getAccessToken()
    if (!token) {
      console.log('No access token...');
      this.clearSession();
      this.status = Ready;
      return;
    }

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
    await User.Logout();
    this.user = undefined;
    return;
  }

  isReady() {
    return this.status === Ready;
  }

  isReady() {
    return this.status === 'checked';
  }
}

export default new Store();

