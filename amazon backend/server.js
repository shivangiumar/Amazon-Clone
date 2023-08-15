const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Products = require("./Products");
const Users = require("./Users");
const Orders = require("./Orders");

const app = express();
const port = 3001;
const stripe = require("stripe")(
  "sk_test_51N4ItXSA31OzsnIOI1Gek4ilecTcznqohz1LI0si0hgGzU5YDEiOaOdXiaIYFeTBsLJhG0iMFmKoTc5sVZjlAoRu00rqQ6iWPO"
);

//middlewares
app.use(express.json());
app.use(cors());
//connection url
const connection_url =
  "mongodb+srv://shivangiumar64:Shivangi64@cluster0.h8sgvvk.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(connection_url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
//api
app.get("/", (req, res) => res.status(200).send("Hello world"));
//api to add product
app.post("/products/add", (req, res) => {
  const productDetail = req.body;
  console.log(productDetail);
  // Products.create(productDetail, (err, data) => {
  //   if (err) {
  //     res.status(500).send(err.message);
  //     console.log(err);
  //   } else {
  // res.status(201).send(data);
  //   }
  // });

  Products.create(productDetail)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.send(err.message);
      console.log(err);
    });
});
app.get("/products/get", (req, res) => {
  Products.find()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.send(err.message);
      console.log(err);
    });
});
//API for Signup
app.post("/auth/signup", async (req, res) => {
  const { email, password, fullName } = req.body;

  const encrypt_password = await bcrypt.hash(password, 10);

  const userDetail = {
    email: email,
    password: encrypt_password,
    fullName: fullName,
  };

  const user_exist = await Users.findOne({ email: email });

  if (user_exist) {
    res.send({ message: "The Email is already in use !" });
  } else {
    // Users.create(userDetail, (err, result) => {
    //   if (err) {
    //     res.status(500).send({ message: err.message });
    //   } else {
    //     res.send({ message: "User Created Succesfully" });
    //   }
    // });
    Users.create(userDetail)
      .then((result) => {
        res.send({ message: "User Created Succesfully" });
      })
      .catch((err) => {
        res.status(500).send({ message: err.message });
      });
  }
});
// Orders.create(orderDetail)
//     .then((result) => {
//       res.send(result);
//       console.log(result);
//     })
//     .catch((err) => {
//       res.send(err.message);
//       console.log(err);
//     });
// });

// API for LOGIN

app.post("/auth/login", async (req, res) => {
  const { email, password } = req.body;

  const userDetail = await Users.findOne({ email: email });

  if (userDetail) {
    if (await bcrypt.compare(password, userDetail.password)) {
      res.send(userDetail);
    } else {
      res.send({ error: "invaild Password" });
    }
  } else {
    res.send({ error: "user is not exist" });
  }
});
//API for PAyment
app.post("/payment/create", async (req, res) => {
  const total = req.body.amount;
  console.log(total);
  const payment = await stripe.paymentIntents.create({
    amount: total * 100,
    currency: "inr",
  });
  res.status(201).send({
    clientSecret: payment.client_secret,
  });
});
//API to add order details
app.post("/orders/add", (req, res) => {
  const products = req.body.basket;
  const price = req.body.price;
  const email = req.body.email;
  const address = req.body.address;
  const orderDetail = {
    products: products,
    price: price,
    address: address,
    email: email,
  };
  // Orders.create(orderDetail, (err, result) => {
  //   if (err) {
  //     console.log(err);
  //   } else {
  //     console.log("order added to database >> ", result);
  //   }
  // });
  Orders.create(orderDetail)
    .then((result) => {
      res.send(result);
      console.log(result);
    })
    .catch((err) => {
      res.send(err.message);
      console.log(err);
    });
});
// Products.create(productDetail)
// .then((data) => {
//   res.send(data);
// })
// .catch((err) => {
//   res.send(err.message);
//   console.log(err);
// });
app.post("/orders/get", (req, res) => {
  const email = req.body.email;

  // Orders.find((err, result) => {
  //   if (err) {
  //     console.log(err);
  //   } else {
  //     const userOrders = result.filter((order) => order.email === email);
  //     res.send(userOrders);
  //   }
  // });
  Orders.find()
    .then((result) => {
      const userOrders = result.filter((order) => order.email === email);
      res.send(userOrders);
    })
    .catch((err) => {
      res.send(err.message);
      console.log(err);
    });
});

app.listen(port, () => console.log("listening on the port", port));
