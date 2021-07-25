import Http from "@services/Http";

class Profile {
  constructor(obj = {}) {
    this.id = obj._id;
    this.name  = obj.name;
    this.birthday  = obj.birthday;
    this.nickname  = obj.nickname;
  }

  static FetchProfiles() {
    return Http(`/profiles/list`)
      .then((res) => {
        const { data } = res;
        return data.map((entry) => new Profile(entry));
      });
  }
}

export default Profile;
