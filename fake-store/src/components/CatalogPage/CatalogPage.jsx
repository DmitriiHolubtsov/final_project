import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useGetProductsQuery } from "../../redux/productApiSlice";
import { addItem } from "../../redux/cartSlice";
import {
  Button,
  Select,
  MenuItem,
  CircularProgress,
  TextField,
} from "@mui/material";
import { Link } from "react-router-dom";
import Header from "../Header/Header";
import classNames from "classnames";
import styles from "./CatalogPage.module.scss";

const CatalogPage = () => {
  const dispatch = useDispatch();
  const { data: products, isLoading, error } = useGetProductsQuery();
  const [sortOrder, setSortOrder] = useState("Sort By");
  const [searchQuery, setSearchQuery] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    if (products) {
      const allCategories = [
        ...new Set(products.map((product) => product.category)),
      ];
      setCategories(allCategories);
    }
  }, [products]);

  if (isLoading) return <CircularProgress />;
  if (error) return <div>Error loading products.</div>;

  const filteredProducts = products
    .filter((product) =>
      product.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter((product) =>
      selectedCategory ? product.category === selectedCategory : true
    )
    .filter((product) => (minPrice ? product.price >= minPrice : true))
    .filter((product) => (maxPrice ? product.price <= maxPrice : true));

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortOrder === "low-to-high") return a.price - b.price;
    if (sortOrder === "high-to-low") return b.price - a.price;
    return 0;
  });

  // Calculate the current products to display
  const indexOfLastProduct = currentPage * itemsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
  const currentProducts = sortedProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const handleAddToCart = (product, e) => {
    e.stopPropagation();
    dispatch(addItem({ ...product, quantity: 1 }));
  };

  // Calculate total pages
  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);

  return (
    <>
      <Header onSearch={setSearchQuery} />
      <div className={styles.catalogContainer}>
        <aside className={styles.filterSidebar}>
          <h3>Categories:</h3>
          <ul className={styles.categoryList}>
            <li
              className={classNames(styles.categoryItem, {
                [styles.active]: selectedCategory === "",
              })}
              onClick={() => setSelectedCategory("")}
            >
              All Categories
            </li>
            {categories.map((category) => (
              <li
                key={category}
                className={classNames(styles.categoryItem, {
                  [styles.active]: selectedCategory === category,
                })}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </li>
            ))}
          </ul>

          <h3>Price:</h3>
          <TextField
            label="Min Price"
            type="number"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Max Price"
            type="number"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            fullWidth
            margin="normal"
          />
        </aside>

        <div className={styles.productListWrapper}>
          <div className={styles.productListWrapperHeader}>
            <Select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
            >
              <MenuItem value="Sort By" selected>
                Sort By
              </MenuItem>
              <MenuItem value="low-to-high">Price: Low to High</MenuItem>
              <MenuItem value="high-to-low">Price: High to Low</MenuItem>
            </Select>
          </div>

          <div className={styles.productList}>
            {currentProducts.map((product) => (
              <div key={product.id} className={styles.productItem}>
                <Link
                  to={`/products/${product.id}`}
                  className={styles.productLink}
                >
                  <img
                    src={product.image}
                    alt={product.title}
                    style={{ width: "100%" }}
                  />
                  <div className={styles.productTitle}>{product.title}</div>
                  <div className={styles.productPrice}>${product.price}</div>
                </Link>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={(e) => handleAddToCart(product, e)}
                >
                  Add to Cart
                </Button>
              </div>
            ))}
          </div>

          <div className={styles.pagination}>
            <Button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              Previous
            </Button>
            <span>{`Page ${currentPage} of ${totalPages}`}</span>
            <Button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CatalogPage;
