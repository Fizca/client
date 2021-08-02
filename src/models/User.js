import { observable } from "mobx";

import Http from "@services/Http";

class User {
  @observable id;
  @observable name;

  constructor(obj = {}) {
    const { _id, google: {displayName}, avatar, role } = obj;
    this.id = _id;
    this.name = displayName;
    this.avatar = avatar;
    this.role = role;
  }

  canContribute() {
    return (this.role == 'contributor' || this.role === 'admin');
  }

  static FetchUser(userId) {
    return Http(`/users/${userId}`)
      .then((res) => {
        const { data } = res;
        return new User(data);
      });
  }

  static Logout() {
    return Http(`/auth/logout`);
  }
}

export default User;
