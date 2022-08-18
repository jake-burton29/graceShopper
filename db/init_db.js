const prisma = require("./prisma");
const bcrypt = require("bcrypt");
const SALT_ROUNDS = 10;

async function buildTables() {
  try {
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
      price DECIMAL(7,2) NOT NULL,
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

    const adminPassword = await bcrypt.hash("12341234", SALT_ROUNDS);
    const testPassword = await bcrypt.hash("12345678", SALT_ROUNDS);

    await prisma.users.create({
      data: {
        username: "admin",
        password: adminPassword,
        email: "email@email.com",
        isAdmin: true,
      },
    });

    await prisma.users.create({
      data: {
        username: "test",
        password: testPassword,
        email: "testemail@email.com",
        isAdmin: false,
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

    await prisma.products.create({
      data: {
        name: "Ibuypower Gaming PC",
        price: 900.0,
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
        price: 400.0,
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
        price: 80.0,
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
        price: 40.0,
        description: "Obtain better aim with this mouse",
        inventory: 9,
        image_url: "https://m.media-amazon.com/images/I/41NWfrMr-8L.jpg",
        categoryId: 2,
      },
    });

    await prisma.products.create({
      data: {
        name: "Xm1r Gaming Mouse",
        price: 60.0,
        description: "Best sensor in the world",
        inventory: 50,
        image_url:
          "https://cdn.shopify.com/s/files/1/0427/7911/5669/products/Endgame-Gear-XM1r-Black_0004_500x.png?v=1630020770",
        categoryId: 2,
      },
    });

    await prisma.products.create({
      data: {
        name: "Small Internet browsing mouse",
        price: 60.0,
        description: "Good mouse for Internet browsing",
        inventory: 50,
        image_url:
          "https://cdn.shopify.com/s/files/1/0427/7911/5669/products/Endgame-Gear-XM1r-Black_0004_500x.png?v=1630020770",
        categoryId: 2,
      },
    });

    await prisma.products.create({
      data: {
        name: "Streaming Webcam",
        price: 150.0,
        description: "4k 60 fps streaming webcam",
        inventory: 40,
        image_url:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSaDc-SATHfce_moGUnpk5307NBUdAxfkuyanuuDyy0zTCEjIoeerVdgSv9oUmMzeB2TpI&usqp=CAU",
        categoryId: 4,
      },
    });

    await prisma.products.create({
      data: {
        name: "4k Super Zoom Webcam",
        price: 190.0,
        description: "4k 144fps streaming webcam for any streaming service",
        inventory: 101,
        image_url:
          "https://ssl-product-images.www8-hp.com/digmedialib/prodimg/lowres/c07899214.png",
        categoryId: 4,
      },
    });

    await prisma.products.create({
      data: {
        name: "elgato super facecam",
        price: 250.0,
        description: "Super high resolution camera with built in microphone",
        inventory: 101,
        image_url:
          "https://ssl-product-images.www8-hp.com/digmedialib/prodimg/lowres/c07899214.png",
        categoryId: 4,
      },
    });

    await prisma.orders.create({
      data: {
        total: 1500,
        complete: true,
        shopperId: 2,
      },
    });

    await prisma.orders.create({
      data: {
        total: 800,
        complete: false,
        shopperId: 1,
      },
    });

    await prisma.product_orders.create({
      data: {
        productId: 1,
        orderId: 1,
        quantity: 1,
      },
    });
    await prisma.product_orders.create({
      data: {
        productId: 2,
        orderId: 2,
        quantity: 2,
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
  .finally(() => console.log("seeded!"));
