import axios from "axios";

export async function getUser() {
  try {
    const { data: user } = await axios.get("/api/users/me");
    console.log("USER:", user);
    return user;
  } catch (err) {
    console.error(err);
  }
}
