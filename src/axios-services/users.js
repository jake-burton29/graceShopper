import axios from "axios";

export async function getUser() {
  try {
    const { data: user } = await axios.get("/api/users/me");
    return user;
  } catch (err) {
    console.error(err);
  }
}

export async function loginUser(username, password) {
  try {
    const { data: user } = await axios.post("/api/users/login", {
      username,
      password,
    });
    return user;
  } catch (error) {
    console.error(error);
  }
}

export async function logout() {
  try {
    const result = await axios.post("/api/users/logout");
    return result;
  } catch (error) {
    console.error(error);
  }
}
export async function createUser(username, password, email) {
  try {
    let { data: newUser } = await axios.post("/api/users/register", {
      username,
      password,
      email,
    });
    newUser = { ...newUser, orders: [] };
    return newUser;
  } catch (err) {
    console.error(err);
  }
}
