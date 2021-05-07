import { computed, observable } from "mobx";
import Profile from "./Profile";

import User from './User';

const Empty = 'empty';
const Loading = 'loading';
const Ready = 'ready';

class Store {
  @observable status = Empty;
  @observable user;
  @observable profiles = [];
  @observable selected = 0;
  @observable profile = new Profile({nickname: 'loading...'});

  async loadUser() {
    this.status = Loading;
    this.user = await User.FetchUser('me').catch(() => {
      console.log('User not logged in.');
    });
    this.status = Ready;
  }

  async loadProfiles() {
    this.profiles = await Profile.FetchProfiles();
    if (this.profiles.length) {
      this.profile = this.profiles[this.selected];
    }
  }

  async clearUser() {
    await User.Logout();
    this.user = undefined;
    return;
  }

  isReady() {
    return this.status === Ready;
  }
}

export default new Store();

