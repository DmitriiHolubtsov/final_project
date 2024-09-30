import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  List,
  ListItem,
  ListItemText,
  Typography,
  TextField,
} from "@mui/material";
import { Link } from "react-router-dom";
import { removeItem, updateItemQuantity } from "../../redux/cartSlice";
import Header from "../Header/Header";

const CartPage = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.items); // Access cart items from Redux

  // If cart is undefined or empty
  if (!cart || cart.length === 0) {
    return <div>Your cart is empty.</div>;
  }

  const handleRemoveItem = (id) => {
    dispatch(removeItem(id));
  };

  const handleQuantityChange = (id, quantity) => {
    if (quantity > 0) {
      dispatch(updateItemQuantity({ id, quantity }));
    }
  };

  // Total price for all items
  const totalPrice = cart.reduce((total, item) => total + item.totalPrice, 0);

  return (
    <>
      <Header />
      <div>
        <h1>Your Cart</h1>
        <List>
          {cart.map((item) => (
            <ListItem key={item.id} divider>
              <ListItemText
                primary={item.title}
                secondary={`Price: $${item.price} | Total: $${item.totalPrice}`}
              />
              <TextField
                type="number"
                label="Quantity"
                value={item.quantity}
                onChange={(e) =>
                  handleQuantityChange(item.id, Number(e.target.value))
                }
                inputProps={{ min: 1 }}
                style={{ width: "60px", marginRight: "10px" }}
              />
              <Button
                variant="contained"
                color="secondary"
                onClick={() => handleRemoveItem(item.id)}
              >
                Remove Item
              </Button>
            </ListItem>
          ))}
        </List>

        <Typography variant="h6" style={{ marginTop: "20px" }}>
          Total Items: {cart.reduce((total, item) => total + item.quantity, 0)}
        </Typography>
        <Typography
          variant="h6"
          style={{ marginTop: "10px", fontWeight: "bold" }}
        >
          Total Price: ${totalPrice.toFixed(2)}
        </Typography>
        <Button
          component={Link}
          to="/checkout"
          variant="contained"
          color="primary"
          style={{ marginTop: "20px" }}
        >
          Go to Checkout
        </Button>
      </div>
    </>
  );
};

export default CartPage;
