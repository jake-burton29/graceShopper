const { client } = require("./");
const {
  users,
  categories,
  products,
  orders,
  product_orders,
} = require("./prisma");
const prisma = require("./prisma");

async function buildTables() {
  try {
    client.connect();

    // drop tables in correct order
    await prisma.$executeRaw`
    DROP TABLE IF EXISTS product_orders;`;
    await prisma.$executeRaw`
    DROP TABLE IF EXISTS products;`;
    await prisma.$executeRaw`
    DROP TABLE IF EXISTS orders;`;
    await prisma.$executeRaw`
    DROP TABLE IF EXISTS users;`;
    await prisma.$executeRaw`
    DROP TABLE IF EXISTS categories;`;

    // build tables in correct order
    await prisma.$executeRaw`
    CREATE TABLE users (
      id SERIAL PRIMARY KEY,
      username VARCHAR(255)	UNIQUE NOT NULL,
      password VARCHAR(255)	NOT NULL,
      email VARCHAR(255) UNIQUE NOT NULL,
      "isAdmin" BOOLEAN DEFAULT false
    );
  `;
    await prisma.$executeRaw`
    CREATE TABLE categories (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255)	UNIQUE NOT NULL,
      description TEXT	NOT NULL
    );
  `;
    await prisma.$executeRaw`
    CREATE TABLE products (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255)	UNIQUE NOT NULL,
      price INTEGER	NOT NULL,
      description TEXT	NOT NULL,
      inventory INTEGER,
      "categoryId" INTEGER REFERENCES categories(id),
      image_url TEXT
    );
  `;
    await prisma.$executeRaw`
    CREATE TABLE orders (
      id SERIAL PRIMARY KEY,
      total INTEGER,
      complete BOOLEAN DEFAULT false,
      "shopperId" INTEGER REFERENCES users(id)
    );
  `;
    await prisma.$executeRaw`
    CREATE TABLE product_orders (
      id SERIAL PRIMARY KEY,
      quantity INTEGER,
      "productId" INTEGER REFERENCES products(id),
      "orderId" INTEGER REFERENCES orders(id)
    );
  `;
  } catch (error) {
    throw error;
  }
}

async function populateInitialData() {
  try {
    // create useful starting data by leveraging your
    // Model.method() adapters to seed your db, for example:
    // const user1 = await User.createUser({ ...user info goes here... })
    await prisma.users.create({
      data: {
        username: "admin",
        password: "12341234",
        email: "email@email.com",
        isAdmin: true,
      },
    });
  } catch (error) {
    ``;
    throw error;
  }
}

buildTables()
  .then(populateInitialData)
  .catch(console.error)
  .finally(() => client.end());
