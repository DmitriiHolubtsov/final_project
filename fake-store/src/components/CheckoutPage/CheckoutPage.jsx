import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import { Link } from "react-router-dom";
import styles from "./CheckoutPage.module.scss";

const CheckoutPage = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const [town, setTown] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [deliveryMethod, setDeliveryMethod] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  const handleClosePopup = () => {
    setIsSubmitted(false);
  };

  return (
    <div>
      <h1>Checkout</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <FormControl fullWidth>
            <InputLabel id="town-label">Choose Your Town</InputLabel>
            <Select
              labelId="town-label"
              value={town}
              onChange={(e) => setTown(e.target.value)}
              required
            >
              <MenuItem value="Kyiv">Kyiv</MenuItem>
              <MenuItem value="Lviv">Lviv</MenuItem>
              <MenuItem value="Odesa">Odesa</MenuItem>
            </Select>
          </FormControl>
        </div>

        <h2>Your Order</h2>
        <ul>
          {cartItems.map((item) => (
            <li key={item.id}>
              {item.title} - Quantity: {item.quantity} - Price: $
              {item.price * item.quantity}
            </li>
          ))}
        </ul>
        <h3>Total Price: ${totalPrice}</h3>

        <TextField
          label="Name"
          variant="outlined"
          fullWidth
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <TextField
          label="Phone Number"
          variant="outlined"
          fullWidth
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />

        <FormControl fullWidth>
          <InputLabel id="delivery-label">Delivery Method</InputLabel>
          <Select
            labelId="delivery-label"
            value={deliveryMethod}
            onChange={(e) => setDeliveryMethod(e.target.value)}
            required
          >
            <MenuItem value="Courier">Courier</MenuItem>
            <MenuItem value="Pickup">Pickup</MenuItem>
          </Select>
        </FormControl>

        <FormControl fullWidth>
          <InputLabel id="payment-label">Payment Method</InputLabel>
          <Select
            labelId="payment-label"
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            required
          >
            <MenuItem value="Cash">Cash</MenuItem>
            <MenuItem value="Card">Card</MenuItem>
          </Select>
        </FormControl>

        <Button
          type="submit"
          variant="contained"
          color="primary"
          style={{ marginRight: "10px" }}
        >
          Make an Order
        </Button>
        <Button
          component={Link}
          to="/cart"
          variant="outlined"
          color="secondary"
        >
          Edit Order
        </Button>
      </form>

      {isSubmitted && (
        <div className={styles.popup}>
          <h2>Congratulations!</h2>
          <p>Your order has been placed successfully.</p>
          <Button onClick={handleClosePopup}>Close</Button>
        </div>
      )}
    </div>
  );
};

export default CheckoutPage;
