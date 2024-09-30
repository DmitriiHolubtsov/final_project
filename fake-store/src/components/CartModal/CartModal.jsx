import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { IconButton, Button, DialogTitle, DialogContent } from "@mui/material";
import { useNavigate } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import { removeItem, updateItemQuantity } from "../../redux/cartSlice";
import styles from "./CartModal.module.scss";

const CartModal = ({ onClose }) => {
  const cart = useSelector((state) => state.cart.items); // Access cart items from Redux
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRemove = (id) => {
    dispatch(removeItem(id));
  };

  const handleCheckout = () => {
    navigate("/checkout"); // Redirect to checkout page
    onClose(); // Close the modal
  };

  const handleQuantityChange = (id, quantity) => {
    dispatch(updateItemQuantity({ id, quantity }));
  };

  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  if (!cart || cart.length === 0) {
    return (
      <div>
        <DialogTitle className={styles.modalTitle}>
          Your Cart
          <IconButton
            aria-label="close"
            onClick={onClose}
            style={{ position: "absolute", right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <div>Your cart is empty.</div>
      </div>
    );
  }

  return (
    <div>
      <DialogTitle>
        Your Cart
        <IconButton
          aria-label="close"
          onClick={onClose}
          style={{ position: "absolute", right: 8, top: 8 }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent>
        <ul>
          {cart.map((item, index) => (
            <li key={index}>
              <h2>{item.title}</h2>
              <p>Price: ${item.price}</p>
              <p>
                Quantity:
                <input
                  type="number"
                  value={item.quantity}
                  min="1"
                  onChange={(e) =>
                    handleQuantityChange(item.id, Number(e.target.value))
                  }
                />
              </p>
              <Button onClick={() => handleRemove(item.id)}>Remove</Button>
            </li>
          ))}
        </ul>
        <h3>Total Price: ${totalPrice.toFixed(2)}</h3>

        <Button variant="contained" color="primary" onClick={handleCheckout}>
          Go to Checkout
        </Button>
      </DialogContent>
    </div>
  );
};

export default CartModal;
