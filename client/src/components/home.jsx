import { Fragment } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { useGetAllProductsQuery } from "../redux/features/productApi";
import { addToCart } from "../redux/features/cartSlice";

export const Home = () => {
  const { data, error, isLoading } = useGetAllProductsQuery();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    navigate("/cart");
  };

  console.log({ data, error, isLoading });
  return (
    <section className="home-container">
      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>An error occured</p>
      ) : (
        <Fragment>
          <h2>New Arrivals</h2>
          <div className="products d-flex justify-content-between ">
            {data?.products?.map((product) => (
              <div
                key={product.id}
                className="product d-flex column justify-content-between"
              >
                <h3>{product.name}</h3>
                <img src={product.image} alt="" />

                <div className="details d-flex align-item-center justify-content-between">
                  <span>{product.desc}</span>
                  <span className="price">${product.price}</span>
                </div>

                <button onClick={() => handleAddToCart(product)}>
                  Add To Cart
                </button>
              </div>
            ))}
          </div>
        </Fragment>
      )}
    </section>
  );
};
