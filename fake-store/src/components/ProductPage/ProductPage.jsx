import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { useGetProductByIdQuery } from "../../redux/productApiSlice";
import { addItem } from "../../redux/cartSlice";
import { Button, CircularProgress } from "@mui/material";
import Header from "../Header/Header";

const ProductPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { data: product, isLoading, error } = useGetProductByIdQuery(id);

  const [quantity, setQuantity] = useState(1);

  if (isLoading) return <CircularProgress />;
  if (error) return <div>Error loading product.</div>;

  const handleAddToCart = () => {
    dispatch(
      addItem({
        id: product.id,
        title: product.title,
        price: product.price,
        quantity,
      })
    );
  };

  return (
    <>
      <Header />
      <div>
        <h1>{product.title}</h1>
        <img
          src={product.image}
          alt={product.title}
          style={{ width: "300px" }}
        />
        <p>{product.description}</p>
        <p>${product.price}</p>
        <input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          min="1"
        />
        <Button onClick={handleAddToCart}>Add to Cart</Button>
      </div>
    </>
  );
};

export default ProductPage;
