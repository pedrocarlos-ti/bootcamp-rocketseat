interface Techs {
  type: String;
  xp?: Number;
}

interface CreateUser {
  name?: String;
  email: String;
  password: String;
  techs: Array<String | Techs>;
}

export function createUser({ name, email, password, techs }: CreateUser) {
  const user = {
    name,
    email,
    password,
    techs,
  };

  return user;
}
