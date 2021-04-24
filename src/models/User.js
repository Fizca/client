import { http } from "@services/Backend";
import { observable } from "mobx";

class User {
  @observable id;
  @observable name;

  constructor(obj = {}) {
    const { _id, google: {displayName} } = obj;
    this.id = _id;
    this.name = displayName;
  }

  static FetchUser(userId) {
    return http(`/users/${userId}`)
      .then((res) => {
        const { data } = res;
        return new User(data);
      });
  }

  static Logout() {
    Axios(`${process.env.SERVER_URL}/logout`);
  }
}

export default User;
