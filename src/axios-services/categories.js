import axios from "axios";

export async function getCategories() {
  try {
    const { data: categories } = await axios.get("/api/categories");
    console.log("CATEGORIES:", categories);
    return categories;
  } catch (err) {
    console.error(err);
  }
}
