import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  IconButton,
  Badge,
  Dialog,
  DialogContent
} from "@mui/material";
import CartModal from "../CartModal/CartModal";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import classNames from "classnames";
import styles from "./Header.module.scss";

const Header = ({ onSearch }) => {
  const cart = useSelector((state) => state.cart.items);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    onSearch(event.target.value);
  };

  const handleCartOpen = () => setIsCartOpen(true);
  const handleCartClose = () => setIsCartOpen(false);

  return (
    <header className={styles.header}>
      <div className={styles.headerContent}>
        <div className={styles.logo}>
          <a href="/">My Store</a>
        </div>

        <form
          className={styles.searchForm}
          onSubmit={(e) => e.preventDefault()}
        >
          <input
            type="text"
            className={classNames(styles.searchInput)}
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search products..."
          />
          <button type="submit" className={styles.searchButton}>
            Search
          </button>
        </form>

        <nav className={styles.nav}>
          <a href="/">Catalog</a>
          <a href="/cart">Cart</a>
        </nav>
        <IconButton onClick={handleCartOpen}>
          <Badge badgeContent={cart.length} color="secondary">
            <ShoppingCartIcon />
          </Badge>
        </IconButton>

        {/* Cart Modal */}
        <Dialog
          open={isCartOpen}
          onClose={handleCartClose}
          maxWidth="sm"
          fullWidth
        >
          <DialogContent>
            <CartModal onClose={handleCartClose} />
          </DialogContent>
        </Dialog>
      </div>
    </header>
  );
};

export default Header;
