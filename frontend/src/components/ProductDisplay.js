import React, { useState, useEffect } from "react";
import ProductCard from "./ProductCard.js";
import Grid from "@mui/material/Grid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

const ProductDisplay = ({ isAuthenticated, is_admin }) => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const res = await fetch(
        `${process.env.REACT_APP_API_URL}/products/products-list`
      );
      res
        .json()
        .then((res) => setProducts(res))
        .catch((err) => console.log(err, "error..."));
    }

    fetchData();
  }, []);
  return (
    <>
      <div>
        {isAuthenticated && is_admin && (
          <>
            <h3>Add Products</h3>
            <Link to={"/add-products"}>
              <FontAwesomeIcon
                icon={faPlusCircle}
                size="4x"
                style={{ color: "#1976d2" }}
              />
            </Link>
            <br /> <br />
            <hr />
          </>
        )}
      </div>
      <div>
        <Grid container spacing={10} style={{ padding: "24px" }}>
          {products.map((products) => (
            <Grid key={products.id} item xs={12} sm={6} md={4} lg={4} xl={3}>
              <ProductCard
                key={products.id}
                product_id={products.id}
                product_image={products.product_image}
                product_name={products.product_name}
                product_price={products.product_price}
                pub_date={products.pub_date}
                product_author={products.product_author}
              />
            </Grid>
          ))}
        </Grid>
      </div>
    </>
  );
};
// }
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  is_admin: state.auth.is_admin,
});
export default connect(mapStateToProps)(ProductDisplay);
