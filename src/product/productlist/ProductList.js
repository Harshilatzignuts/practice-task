import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { editProduct, removeProduct } from "../../redux/action/ProductAction";
import { Button, Card, Grid } from "@mui/material";
import "./ProductCard.css";
import Vendor from "./Vendor";

const ProductList = () => {
  const products = useSelector((state) => state.products.products);

  const Navigate = useNavigate();
  const dispatch = useDispatch();

  const handleDelete = (id) => {
    dispatch(removeProduct(id));
  };

  const handleEdit = (productId) => {
    dispatch(editProduct(productId));

    Navigate(`/edit/${productId}`);
  };

  return (
    <div className="product_list">
      <Grid container spacing={2}>
        {products && products.length > 0 ? (
          products.map((product) => (
            <Grid item xs={12} key={product.id}>
              <Card className="product_card">
                <h2>{product.name}</h2>
                <h3 className="desc">{product.description}</h3>

                <Vendor product={product} />

                <div className="group_button">
                  <Button
                    variant="contained"
                    onClick={() => handleEdit(product.id)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => handleDelete(product.id)}
                  >
                    Delete
                  </Button>
                </div>
              </Card>
            </Grid>
          ))
        ) : (
          <Grid item xs={12}>
            <Card className="product_card no_data">
              <h3>No Product Found</h3>
              <Button variant="contained" onClick={() => Navigate("/create")}>
                Add Product
              </Button>
            </Card>
          </Grid>
        )}
      </Grid>
    </div>
  );
};

export default ProductList;
