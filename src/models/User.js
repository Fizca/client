import axios from "axios";
import { observable } from "mobx";

const transport = axios.create({
  withCredentials: true
})

class User {
  @observable id;
  @observable name;

  constructor(obj = {}) {
    const { _id, google: {displayName} } = obj;
    this.id = _id;
    this.name = displayName;
  }

  static FetchUser(userId) {
    return transport(`${process.env.SERVER_URL}/users/${userId}`)
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
