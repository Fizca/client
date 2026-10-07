import Http from "@services/Http";
import { ProfileResponse } from "../types/api";

class Profile {
  id: string;
  name: string;
  birthday?: string;
  nickname?: string;

  constructor(obj: ProfileResponse) {
    this.id = obj._id;
    this.name  = obj.name;
    this.birthday  = obj.birthday;
    this.nickname  = obj.nickname;
  }

  static FetchProfiles() {
    return Http(`/profiles/list`)
      .then((res) => {
        const { data } = res;
        return data.map((entry: ProfileResponse) => new Profile(entry));
      });
  }
}

export default Profile;
