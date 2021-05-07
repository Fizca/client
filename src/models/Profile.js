import { http } from "@services/Backend";
import { computed, observable } from "mobx";

class Profile {
  constructor(obj = {}) {
    this.id = obj._id;
    this.name  = obj.name;
    this.birthday  = obj.birthday;
    this.nickname  = obj.nickname;
  }

  static FetchProfiles() {
    return http(`/profiles/list`)
      .then((res) => {
        const { data } = res;
        return data.map((entry) => new Profile(entry));
      });
  }
}

export default Profile;
