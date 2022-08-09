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
    // cat 1 = computers
    // cat 2 = mice
    // cat 3 = keybaords
    // cat 4 = webacam

    await prisma.users.create({
      data: {
        username: "admin",
        password: "12341234",
        email: "email@email.com",
        isAdmin: true,
      },
    });

    await prisma.products.create({
      data: {
        name: "Ibuypower Gaming PC",
        price: "90000$",
        description:
          "Ibuypower Gaming PC RTX 3080 EDITION, RYZEN 5, 18GB RAM and RGB Fans 1TB storage",
        inventory: 23,
        image_url:
          "https://c1.neweggimages.com/ProductImage/83-227-920-V01.jpg",
        categoryId: 1,
      },
    });

    await prisma.products.create({
      data: {
        name: "Starter Gaming Pc",
        price: "400$",
        description: "Starter PC with ryzen 3, GT710, 4GB ram, 100gb storage",
        inventory: 5,
        image_url:
          "https://i.pinimg.com/236x/c9/13/e1/c913e12261b13873d99d030a72e78a2d--computer-projects-computer-engineering.jpg",
        categoryId: 1,
      },
    });

    await prisma.products.create({
      data: {
        name: "Mechanical Keyboard",
        price: "80$",
        description: "Keyboard with red switches. It's a clicky keybaord",
        inventory: 5,
        image_url:
          "https://m.media-amazon.com/images/I/71jAUlz7KPL._AC_SY450_.jpg",
        categoryId: 3,
      },
    });

    await prisma.products.create({
      data: {
        name: "Gaming Mouse",
        price: "40$",
        description: "Obtain better aim with this mouse",
        inventory: 9,
        image_url: "https://m.media-amazon.com/images/I/41NWfrMr-8L.jpg",
        categoryId: 2,
      },
    });

    await prisma.products.create({
      data: {
        name: "Streaming Webcam",
        price: "150$",
        description: "4k 60 fps streaming webcam",
        inventory: 40,
        image_url:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSaDc-SATHfce_moGUnpk5307NBUdAxfkuyanuuDyy0zTCEjIoeerVdgSv9oUmMzeB2TpI&usqp=CAU",
        categoryId: 4,
      },
    });

    await prisma.categories.create({
      data: {
        name: "Computers",
        description: "Gaming computers ",
      },
    });

    await prisma.categories.create({
      data: {
        name: "Mice",
        description: "Gaming mice to be better",
      },
    });

    await prisma.categories.create({
      data: {
        name: "Keyboard",
        description: "Type faster keyboards",
      },
    });

    await prisma.categories.create({
      data: {
        name: "Webcam",
        description: "Streaming webacams",
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
