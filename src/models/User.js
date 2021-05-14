import { http } from "@services/Backend";
import { observable } from "mobx";

class User {
  @observable id;
  @observable name;

  constructor(obj = {}) {
    const { _id, google: {displayName, avatar} } = obj;
    this.id = _id;
    this.name = displayName;
    this.avatar = avatar;
  }

  static FetchUser(userId) {
    return http(`/users/${userId}`)
      .then((res) => {
        const { data } = res;
        return new User(data);
      });
  }

  static Logout() {
    return http(`/auth/logout`);
  }
}

export default User;
