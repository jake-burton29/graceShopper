import axios from "axios";

// GET /me is not working ?

export async function getUser() {
  try {
    const { data: user } = await axios.get("/api/users/me");
    console.log("USER:", user);
    return user;
  } catch (err) {
    console.error(err);
  }
}

export async function loginUser(username, password) {
  try {
    const { data: user } = await axios({
      method: "post",
      url: "/api/users/login",
      data: { username, password },
    });
    return user;
  } catch (error) {
    console.error(error);
  }
}

export async function logout() {
  try {
    const result = await axios({
      method: "post",
      url: "/api/users/logout",
    });
    return result;
  } catch (error) {
    console.error(error);
  }
}
