import express from "express";
import session from "express-session";

const app = express();
const port = 3000;

const viewsDirectory =
  "C:\\Users\\Mads\\Desktop\\datamatiker\\3. semester\\DIP\\dip\\16-session\\opgaver\\shop\\views";
app.set("view engine", "pug");
app.set("views", viewsDirectory);
app.use(
  session({
    secret: "hemmelig",
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 20 },
    resave: false,
  })
);
app.use(express.json());

const products = [
  { id: 1, name: "Milk", price: 10 },
  { id: 2, name: "Cheese", price: 20 },
  { id: 3, name: "Butter", price: 5 },
  { id: 4, name: "Bread", price: 15 },
];

app.get("/", (req, res) => {
  res.render("index", {
    products,
    cart: req.session.cart,
  });
});

app.post("/buy", (req, res) => {
  console.log("buying product with id " + req.body.id);

  const product = products.find(p => p.id === parseInt(req.body.id));
  if (!product) return res.status(404).send("Product not found");

  let cart = req.session.cart || [];
  cart.push(product);
  req.session.cart = cart;
  res.render("index", {
    products,
    cart,
  });
});

app.listen(port, () => console.log(`Server listening on port ${port}...`));
