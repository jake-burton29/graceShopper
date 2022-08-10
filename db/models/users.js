// grab our db client connection to use with our adapters
const client = require("../client");
const prisma = require("../prisma");
const { users } = require("../prisma");
const bcrypt = require("bcrypt");
const SALT_ROUNDS = 10;

module.exports = {
  // add your database adapter fns here
  getAllUsers,
  getUserByUsername,
  createUser,
  editUser,
  deleteUser,
};

async function getAllUsers() {
  const users = await prisma.users.findMany();
  console.log("all", users);
  return users;
}

async function getUserByUsername(username) {
  const users = await prisma.users.findUnique({
    where: { username },
  });
  console.log("single", users);
  return users;
}

async function createUser({ username, password, email, isAdmin }) {
  const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
  const user = await prisma.users.create({
    data: {
      username,
      password: hashedPassword,
      email,
      isAdmin,
    },
  });
  console.log("new user", user);
  return user;
}

async function editUser({ id, username, password, email, isAdmin }) {
  const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
  const editedUser = await prisma.users.update({
    data: {
      username,
      password: hashedPassword,
      email,
      isAdmin,
    },
    where: { id },
  });
  console.log("edited", editedUser);
  return editedUser;
}

async function deleteUser(id) {
  const deletedUser = await prisma.users.delete({
    where: { id },
  });
  console.log("deleted:", deletedUser);
  return deletedUser;
}
