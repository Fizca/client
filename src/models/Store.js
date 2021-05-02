import { observable } from "mobx";

import User from './User';

const Empty = 'empty';
const Loading = 'loading';
const Ready = 'ready';

class Store {
  @observable status = Empty;
  @observable user;

  async loadUser() {
    this.status = Loading;
    this.user = await User.FetchUser('me').catch(() => {
      console.log('User not logged in.');
    });
    this.status = Ready;
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

