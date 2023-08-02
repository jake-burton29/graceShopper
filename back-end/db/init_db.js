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
    // cat 1 = computers
    // cat 2 = mice
    // cat 3 = keyboards
    // cat 4 = webcams

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

    //Computers

    await prisma.products.create({
      data: {
        name: "Cobratype Sonora Gaming Desktop PC",
        price: 900.0,
        description:
          "Ryzen 5800X, RTX 3070 Ti, 32GB DDR4, 1TB NVMe, AIO Liquid Cooler",
        inventory: 23,
        image_url:
          "https://res.cloudinary.com/dgnfm1iyp/image/upload/v1660934946/83-360-194-17_a4zile.jpg",
        categoryId: 1,
      },
    });

    await prisma.products.create({
      data: {
        name: "iBuyPower SlateMR 246i",
        price: 1500.0,
        description:
          "Intel Core i5-11400F 2.6GHz, AMD Radeon RX 6500XT 4GB, 8GB DDR4, 500GB NVMe, RGB Fans, WiFi Ready, Windows 11 Home",
        inventory: 18,
        image_url:
          "https://res.cloudinary.com/dgnfm1iyp/image/upload/v1660934740/2O5A0656-HDR-Edit_cbn14y.jpg",
        categoryId: 1,
      },
    });

    await prisma.products.create({
      data: {
        name: "ABS Challenger Desktop Gaming PC",
        price: 400.0,
        description:
          "AMD Ryzen 5 5600 - GeForce RTX 3050 - 8 GB DDR4 3000MHz - 512GB M.2 NVMe SSD",
        inventory: 8,
        image_url:
          "https://res.cloudinary.com/dgnfm1iyp/image/upload/v1660935299/R2S-8_1_22_badiyy.png",
        categoryId: 1,
      },
    });

    await prisma.products.create({
      data: {
        name: "ABS Master Desktop Gaming PC",
        price: 400.0,
        description:
          "Intel i7 10700F - GeForce RTX 2060 - 16GB RGB DDR4 3000MHz - 512GB M.2 NVMe SSD - ASUS TUF Gaming GT301",
        inventory: 12,
        image_url:
          "https://res.cloudinary.com/dgnfm1iyp/image/upload/v1660934931/6471870cv2d_wmoynh.jpg",
        categoryId: 1,
      },
    });

    await prisma.products.create({
      data: {
        name: "Yeyian Katana PC",
        price: 1200.0,
        description:
          "Ryzen 5 5000 Series 5600X (3.70GHz) 16GB DDR4 1 TB NVMe SSD NVIDIA GeForce RTX 3070 Windows 10 Home 64-bit",
        inventory: 24,
        image_url:
          "https://res.cloudinary.com/dgnfm1iyp/image/upload/v1660934888/83-360-300-01_sswzqz.jpg",
        categoryId: 1,
      },
    });

    await prisma.products.create({
      data: {
        name: "ABS Legend Gaming PC",
        price: 4500.0,
        description:
          "Intel i9 11900KF - GeForce RTX 3080 Ti - Corsair Vengeance RGB Pro 32GB (2x16GB) DDR4 3200MHz - 2TB Intel M.2 NVMe SSD - Corsair iCue 5000X White Gaming Case",
        inventory: 3,
        image_url:
          "https://res.cloudinary.com/dgnfm1iyp/image/upload/v1660934718/PhoenixMain45-Edit-Edit_dlree6.jpg",
        categoryId: 1,
      },
    });

    await prisma.products.create({
      data: {
        name: "IPASON Gaming Desktop",
        price: 900.0,
        description:
          "AMD A8 7680 (4 Core up to 3.8GHz) - Radeon R7 - 240GB SSD - 8GB 1600MHz - Windows 10 home - Office Computer - Gaming PC",
        inventory: 16,
        image_url:
          "https://res.cloudinary.com/dgnfm1iyp/image/upload/v1660934715/Apollo-Black-RGB-Main45-1_rxfckm.jpg",
        categoryId: 1,
      },
    });

    await prisma.products.create({
      data: {
        name: "MSI Gaming Desktop MEG Trident",
        price: 1600.0,
        description:
          "i7 12th Gen 12700K (3.60GHz) 16GB DDR5 2 TB PCIe SSD NVIDIA GeForce RTX 3080 Ti Windows 11 Home 64-bit",
        inventory: 7,
        image_url:
          "https://res.cloudinary.com/dgnfm1iyp/image/upload/v1660934713/2O5A1015-HDR-Edit_ycbnfz.jpg",
        categoryId: 1,
      },
    });

    // Keyboards

    await prisma.products.create({
      data: {
        name: "Dragon Tech Keyboard",
        price: 80.0,
        description:
          "Wired Gamer Mechanical Keyboard with Aluminum Housing - MX Brown Switches (Slight Clicky) for Gaming and Office - Customizable RGB Backlighting - Full Size - white/blue",
        inventory: 17,
        image_url:
          "https://res.cloudinary.com/dgnfm1iyp/image/upload/v1660936983/61hdRFcTkzL._AC_SL1080__njapi5.jpg",
        categoryId: 3,
      },
    });

    await prisma.products.create({
      data: {
        name: "Cherry MX Board",
        price: 120.0,
        description:
          "Mechanical Gaming Keyboard - 61 Keys Multi Color RGB Illuminated LED Backlit Wired Programmable for PC/Mac Gamer (Gateron Optical Yellow, Black)",
        inventory: 28,
        image_url:
          "https://res.cloudinary.com/dgnfm1iyp/image/upload/v1660937030/keyboard-alienware-aw510k-campaign-hero-504x350-ng_o4fuom.jpg",
        categoryId: 3,
      },
    });

    await prisma.products.create({
      data: {
        name: "Fiodio 61 Key Gaming Keyoard",
        price: 70.0,
        description:
          "RGB Wireless and Wired Mechanical Gaming Keyboard with Blue Switches, Audible Click Sound Rainbow Portable Compact Mini Office Keyboard for Windows PC Gaming, (F-SG61)",
        inventory: 25,
        image_url:
          "https://res.cloudinary.com/dgnfm1iyp/image/upload/v1660936902/01f4a5e7-b4d0-4d81-bc51-925a1b10c229.1997e6ff2161987e2fe2d194f9b24f7c_ogns44.jpg",
        categoryId: 3,
      },
    });

    // Mice

    await prisma.products.create({
      data: {
        name: "Logitech Speed XV3 ",
        price: 40.0,
        description:
          "3k Ultra Sensor, Precison clicks for faster response times 12k DPI, Side Buttons",
        inventory: 9,
        image_url:
          "https://res.cloudinary.com/dgnfm1iyp/image/upload/v1660938152/6409361_sd_it9s8m.jpg",
        categoryId: 2,
      },
    });

    await prisma.products.create({
      data: {
        name: "Xm1r Gaming Mouse",
        price: 60.0,
        description:
          "PAW3370 Sensor - 50 to 19,000 CPI - Mouse for Gaming - 5 Buttons - Kailh GM 8.0 Switches - 80 M - Wired Computer Mouse",
        inventory: 75,
        image_url:
          "https://res.cloudinary.com/dgnfm1iyp/image/upload/v1660938384/GAMO-941-pdp_09_avfqcj.png",
        categoryId: 2,
      },
    });

    await prisma.products.create({
      data: {
        name: "Xwolf Browser",
        price: 30.0,
        description:
          "Xwolf Wireless Mouse X3000 G2 (28Y30AA, Black) up to 15-Month Battery,Scroll Wheel, Side Grips for Control, Travel-Friendly, Blue LED, Powerful 1600 DPI Optical Sensor, Win XP,8, 11 Compatible",
        inventory: 30,
        image_url:
          "https://res.cloudinary.com/dgnfm1iyp/image/upload/v1660938473/G-wolves-Hati-Small-HTS-Transparent-Blue-Wireless-Gaming-Mouse-Addice-inc-13_2048x2048_u9q8ar.jpg",
        categoryId: 2,
      },
    });

    // Webcams

    await prisma.products.create({
      data: {
        name: "EMEET C960 Web Camera",
        price: 150.0,
        description:
          "1080P Webcam with Microphone, EMEET C960 Web Camera, 2 Mics Streaming Webcam with Privacy Cover, For Calls/Conference, Zoom/Skype/YouTube, Laptop/Desktop",
        inventory: 40,
        image_url:
          "https://res.cloudinary.com/dgnfm1iyp/image/upload/v1660938849/w328_gjn9jj.png",
        categoryId: 4,
      },
    });

    await prisma.products.create({
      data: {
        name: "Logitech Brio",
        price: 190.0,
        description:
          " Ultra 4K HD Video Calling, Noise-Canceling mic, HD Auto Light Correction, Wide Field of View, Works with Microsoft Teams, Zoom, Google Voice, PC/Mac/Laptop/Macbook/Tablet",
        inventory: 101,
        image_url:
          "https://res.cloudinary.com/dgnfm1iyp/image/upload/v1660938744/61OQP2_yqML._AC_SL1500__nvez5e.jpg",
        categoryId: 4,
      },
    });

    await prisma.products.create({
      data: {
        name: "Elgato Facecam",
        price: 250.0,
        description:
          "Elgato Facecam - 1080p60 True Full HD Webcam for Live Streaming, Gaming, Video Calls, Sony Sensor, Advanced Light Correction, DSLR Style Control, works with OBS, Zoom, Teams, and more, for PC/Mac",
        inventory: 101,
        image_url:
          "https://res.cloudinary.com/dgnfm1iyp/image/upload/v1660938797/17047759_800_yzc9ve.jpg",
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
