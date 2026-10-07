import { observable, configure, makeObservable } from "mobx";

import Profile from "@models/Profile";
import User from '@models/User';
import Http from "@services/Http";

// MobX 5 did not enforce actions. Preserve that lenient behavior so the
// existing async flows that mutate observables after an await keep working
// without warnings. Tightening this belongs to the later MobX cleanup.
configure({ enforceActions: "never" });

const Empty = 'empty';
const Loading = 'loading';
const Ready = 'ready';
const StorageKey = 'session-data';

class Store {
  status = Empty;
  user;
  profiles = [];
  profile;

  constructor() {
    makeObservable(this, {
      status: observable,
      user: observable,
      profiles: observable,
      profile: observable,
    });
  }

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

