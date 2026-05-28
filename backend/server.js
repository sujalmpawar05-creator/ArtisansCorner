// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");
// const Product = require("./models/Product");
// const User = require("./models/User");
// const { authMiddleware, sellerMiddleware } = require("./middleware/authMiddleware");
// const Order = require("./models/Order");
// require("dotenv").config();
// const multer = require("multer");
// const cloudinary = require("./config/cloudinary");
// const storage = multer.diskStorage({});
// const Review = require("./models/Review");

// const upload = multer({ storage });


// const app = express();


// // Middleware
// app.use(cors());
// app.use(express.json());

// // Test Route
// app.get("/", (req, res) => {
//   res.send("Artisan's Corner API Running");
// });

// // Add Product API

// app.post(
//   "/api/products",
//   authMiddleware,
//   sellerMiddleware,
//   upload.single("image"),
//   async (req, res) => {

//     try {

//       const result =
//         await cloudinary.uploader.upload(
//           req.file.path
//         );

//       const product =
//         await Product.create({

//           title: req.body.title,

//           description:
//             req.body.description,

//           price: req.body.price,

//           image: result.secure_url,

//           seller: req.user._id

//         });

//       res.status(201).json({

//         success: true,

//         product

//       });

//     } catch (error) {

//       console.log(error);

//       res.status(500).json({

//         success: false,

//         message: error.message

//       });

//     }

//   }
// );

// app.get("/api/products", async (req, res) => {

//   try {

//     const products = await Product.find();

//     res.status(200).json({
//       success: true,
//       products
//     });

//   } catch (error) {

//     res.status(500).json({
//       success: false,
//       message: error.message
//     });

//   }

// });

// app.get("/api/products/:id", async (req, res) => {

//   try {

//     const product = await Product.findById(req.params.id);

//     if (!product) {
//       return res.status(404).json({
//         success: false,
//         message: "Product not found"
//       });
//     }

//     res.status(200).json({
//       success: true,
//       product
//     });

//   } catch (error) {

//     res.status(500).json({
//       success: false,
//       message: error.message
//     });

//   }

// });

// //Update API

// app.put(
//   "/api/products/:id",
//   authMiddleware,
//   sellerMiddleware,
//   upload.single("image"),
//   async (req, res) => {

//     try {

//       let imageUrl = req.body.image;

//       if (req.file) {

//         const result =
//           await cloudinary.uploader.upload(
//             req.file.path
//           );

//         imageUrl = result.secure_url;

//       }

//       const updatedProduct =
//         await Product.findByIdAndUpdate(

//           req.params.id,

//           {

//             title: req.body.title,

//             description:
//               req.body.description,

//             price: req.body.price,

//             image: imageUrl

//           },

//           { new: true }

//         );

//       if (!updatedProduct) {

//         return res.status(404).json({

//           success: false,

//           message: "Product not found"

//         });

//       }

//       res.status(200).json({

//         success: true,

//         product: updatedProduct

//       });

//     } catch (error) {

//       console.log(error);

//       res.status(500).json({

//         success: false,

//         message: error.message

//       });

//     }

//   }
// );
// //Delete API
// app.delete("/api/products/:id", async (req, res) => {

//   try {

//     const product = await Product.findByIdAndDelete(req.params.id);

//     if (!product) {
//       return res.status(404).json({
//         success: false,
//         message: "Product not found"
//       });
//     }

//     res.status(200).json({
//       success: true,
//       message: "Product deleted successfully"
//     });

//   } catch (error) {

//     res.status(500).json({
//       success: false,
//       message: error.message
//     });

//   }

// });

// //Register API
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");

// app.post("/api/register", async (req, res) => {

//   try {

//     const { name, email, password, role } = req.body;

//     // Check existing user
//     const existingUser = await User.findOne({ email });

//     if (existingUser) {
//       return res.status(400).json({
//         success: false,
//         message: "User already exists"
//       });
//     }

//     // Hash password
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // Create user
//     const user = await User.create({
//       name,
//       email,
//       password: hashedPassword,
//       role
//     });

//     res.status(201).json({
//       success: true,
//       message: "User registered successfully",
//       user
//     });

//   } catch (error) {

//     res.status(500).json({
//       success: false,
//       message: error.message
//     });

//   }

// });

// //Login API
// app.post("/api/login", async (req, res) => {

//   try {

//     const { email, password } = req.body;

//     // Find user
//     const user = await User.findOne({ email });

//     if (!user) {
//       return res.status(400).json({
//         success: false,
//         message: "Invalid email or password"
//       });
//     }

//     // Compare password
//     const isMatch = await bcrypt.compare(password, user.password);

//     if (!isMatch) {
//       return res.status(400).json({
//         success: false,
//         message: "Invalid email or password"
//       });
//     }

//     // Create token
//     const token = jwt.sign(
//       { id: user._id },
//       "secretkey",
//       { expiresIn: "7d" }
//     );

//     res.status(200).json({
//       success: true,
//       message: "Login successful",
//       token,
//       user
//     });

//   } catch (error) {

//     res.status(500).json({
//       success: false,
//       message: error.message
//     });

//   }

// });

// //Place order API
// app.post(
//   "/api/orders",
//   authMiddleware,
//   async (req, res) => {

//     try {

//       const {
//         products,
//         shippingAddress,
//         totalPrice
//       } = req.body;

//       const platformFee =
//         totalPrice * 0.05;

//       const vendorPayout =
//         totalPrice - platformFee;

//       const order = await Order.create({

//         user: req.user._id,

//         products,

//         totalPrice,

//         shippingAddress,

//         platformFee,

//         vendorPayout

//       });

//       res.status(201).json({
//         success: true,
//         message: "Order Placed",
//         order
//       });

//     } catch (error) {

//       res.status(500).json({
//         success: false,
//         message: error.message
//       });

//     }

//   }
// );
// //Get my orders API
// app.get(
//   "/api/my-orders",
//   authMiddleware,
//   async (req, res) => {

//     try {

//       const orders = await Order.find({
//         user: req.user._id
//       });

//       res.status(200).json({
//         success: true,
//         orders
//       });

//     } catch (error) {

//       res.status(500).json({
//         success: false,
//         message: error.message
//       });

//     }

//   }
// );

// //Update order API
// app.put(
//   "/api/orders/:id",
//   authMiddleware,
//   async (req, res) => {

//     try {

//       const { status } = req.body;

//       const order = await Order.findByIdAndUpdate(
//         req.params.id,
//         { status },
//         { new: true }
//       );

//       res.status(200).json({
//         success: true,
//         order
//       });

//     } catch (error) {

//       res.status(500).json({
//         success: false,
//         message: error.message
//       });

//     }

//   }
// );

// //Image upload API
// app.post(
//   "/api/upload",
//   upload.single("image"),
//   async (req, res) => {

//     try {

//       const result = await cloudinary.uploader.upload(
//         req.file.path
//       );

//       res.status(200).json({
//         success: true,
//         imageUrl: result.secure_url
//       });

//     } catch (error) {

//       res.status(500).json({
//         success: false,
//         message: error.message
//       });
//       console.log(error);

//     }

//   }
// );

// //Add Review API
// app.post(
//   "/api/reviews",
//   authMiddleware,
//   async (req, res) => {

//     try {

//       const {
//         productId,
//         rating,
//         comment
//       } = req.body;

//       // Check if user purchased product

//       const order = await Order.findOne({

//         user: req.user._id,

//         "products.productId": productId

//       });

//       if (!order) {

//         return res.status(403).json({
//           success: false,
//           message:
//             "Only buyers can review purchased products"
//         });

//       }

//       const review = await Review.create({

//         user: req.user._id,

//         product: productId,

//         rating,

//         comment

//       });

//       res.status(201).json({
//         success: true,
//         review
//       });

//     } catch (error) {

//       res.status(500).json({
//         success: false,
//         message: error.message
//       });

//     }

//   }
// );

// //Get Review API
// app.get(
//   "/api/reviews/:productId",
//   async (req, res) => {

//     try {

//       const reviews = await Review.find({

//         product: req.params.productId

//       });

//       res.status(200).json({
//         success: true,
//         reviews
//       });

//     } catch (error) {

//       res.status(500).json({
//         success: false,
//         message: error.message
//       });

//     }

//   }
// );
// // MongoDB Connection
// mongoose.connect(process.env.MONGO_URI, {
//   serverSelectionTimeoutMS: 30000
// })
//   .then(() => console.log("MongoDB Connected"))
//   .catch((err) => console.log(err));

// // Server
// const PORT = 5000;

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Product = require("./models/Product");
const User = require("./models/User");
const { authMiddleware, sellerMiddleware } = require("./middleware/authMiddleware");
const Order = require("./models/Order");
require("dotenv").config();
const multer = require("multer");
const cloudinary = require("./config/cloudinary");
const storage = multer.diskStorage({});
const Review = require("./models/Review");

const upload = multer({ storage });


const app = express();


// Middleware

app.use(cors({

  origin: [

    "http://localhost:5173",

    "https://artisans-corner-three.vercel.app/"

  ],

  methods: ["GET", "POST", "PUT", "DELETE"],

  allowedHeaders: [

    "Content-Type",

    "Authorization"

  ],

  credentials: true

}));

app.use(express.json());

// Test Route
app.get("/", (req, res) => {
  res.send("Artisan's Corner API Running");
});

// Add Product API

app.post(
  "/api/products",
  authMiddleware,
  sellerMiddleware,
  upload.single("image"),
  async (req, res) => {

    try {

      const result =
        await cloudinary.uploader.upload(
          req.file.path
        );

      const product =
        await Product.create({

          title: req.body.title,

          description:
            req.body.description,

          price: req.body.price,

          image: result.secure_url,

          seller: req.user._id

        });

      res.status(201).json({

        success: true,

        product

      });

    } catch (error) {

      console.log(error);

      res.status(500).json({

        success: false,

        message: error.message

      });

    }

  }
);

app.get("/api/products", async (req, res) => {

  try {

    const products = await Product.find();

    res.status(200).json({
      success: true,
      products
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

});

app.get("/api/products/:id", async (req, res) => {

  try {

    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found"
      });
    }

    res.status(200).json({
      success: true,
      product
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

});

//Update API

app.put(
  "/api/products/:id",
  authMiddleware,
  sellerMiddleware,
  upload.single("image"),
  async (req, res) => {

    try {

      let imageUrl = req.body.image;

      if (req.file) {

        const result =
          await cloudinary.uploader.upload(
            req.file.path
          );

        imageUrl = result.secure_url;

      }

      const updatedProduct =
        await Product.findByIdAndUpdate(

          req.params.id,

          {

            title: req.body.title,

            description:
              req.body.description,

            price: req.body.price,

            image: imageUrl

          },

          { new: true }

        );

      if (!updatedProduct) {

        return res.status(404).json({

          success: false,

          message: "Product not found"

        });

      }

      res.status(200).json({

        success: true,

        product: updatedProduct

      });

    } catch (error) {

      console.log(error);

      res.status(500).json({

        success: false,

        message: error.message

      });

    }

  }
);
//Delete API
app.delete("/api/products/:id", async (req, res) => {

  try {

    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Product deleted successfully"
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

});

//Register API
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

app.post("/api/register", async (req, res) => {

  try {

    const { name, email, password, role } = req.body;

    // Check existing user
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists"
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role
    });

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      user
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

});

//Login API
app.post("/api/login", async (req, res) => {

  try {

    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid email or password"
      });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid email or password"
      });
    }

    // Create token
    const token = jwt.sign(
      { id: user._id },
      "secretkey",
      { expiresIn: "7d" }
    );

    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

});

//Place order API
app.post(
  "/api/orders",
  authMiddleware,
  async (req, res) => {

    try {

      const {
        products,
        shippingAddress,
        totalPrice
      } = req.body;

      const platformFee =
        totalPrice * 0.05;

      const vendorPayout =
        totalPrice - platformFee;

      const order = await Order.create({

        user: req.user._id,

        products,

        totalPrice,

        shippingAddress,

        platformFee,

        vendorPayout

      });

      res.status(201).json({
        success: true,
        message: "Order Placed",
        order
      });

    } catch (error) {

      res.status(500).json({
        success: false,
        message: error.message
      });

    }

  }
);
//Get my orders API
app.get(
  "/api/my-orders",
  authMiddleware,
  async (req, res) => {

    try {

      const orders = await Order.find({
        user: req.user._id
      });

      res.status(200).json({
        success: true,
        orders
      });

    } catch (error) {

      res.status(500).json({
        success: false,
        message: error.message
      });

    }

  }
);

//Update order API
app.put(
  "/api/orders/:id",
  authMiddleware,
  async (req, res) => {

    try {

      const { status } = req.body;

      const order = await Order.findByIdAndUpdate(
        req.params.id,
        { status },
        { new: true }
      );

      res.status(200).json({
        success: true,
        order
      });

    } catch (error) {

      res.status(500).json({
        success: false,
        message: error.message
      });

    }

  }
);

//Image upload API
app.post(
  "/api/upload",
  upload.single("image"),
  async (req, res) => {

    try {

      const result = await cloudinary.uploader.upload(
        req.file.path
      );

      res.status(200).json({
        success: true,
        imageUrl: result.secure_url
      });

    } catch (error) {

      res.status(500).json({
        success: false,
        message: error.message
      });
      console.log(error);

    }

  }
);

//Add Review API
app.post(
  "/api/reviews",
  authMiddleware,
  async (req, res) => {

    try {

      const {
        productId,
        rating,
        comment
      } = req.body;

      // Check if user purchased product

      const order = await Order.findOne({

        user: req.user._id,

        "products.productId": productId

      });

      if (!order) {

        return res.status(403).json({
          success: false,
          message:
            "Only buyers can review purchased products"
        });

      }

      const review = await Review.create({

        user: req.user._id,

        product: productId,

        rating,

        comment

      });

      res.status(201).json({
        success: true,
        review
      });

    } catch (error) {

      res.status(500).json({
        success: false,
        message: error.message
      });

    }

  }
);

//Get Review API
app.get(
  "/api/reviews/:productId",
  async (req, res) => {

    try {

      const reviews = await Review.find({

        product: req.params.productId

      });

      res.status(200).json({
        success: true,
        reviews
      });

    } catch (error) {

      res.status(500).json({
        success: false,
        message: error.message
      });

    }

  }
);
// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  serverSelectionTimeoutMS: 30000
})
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

// Server
const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});