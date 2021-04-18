import { observable } from "mobx";

import User from './User';

export const checked = 'checked';
export const empty = 'empty';
export const loading = 'loading';

class Store {
  @observable status = 'empty';
  @observable user;

  async loadUser() {
    this.status = 'loading';
    this.user = await User.FetchUser('me').catch(() => {
      console.log('User not logged in.');
    });
    this.status = 'checked';
  }
}

export default new Store();

