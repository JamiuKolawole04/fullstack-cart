import { Fragment } from "react";

import { useGetAllProductsQuery } from "../redux/features/productApi";

export const Home = () => {
  const { data, error, isLoading } = useGetAllProductsQuery();

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

                <button>Add To Cart</button>
              </div>
            ))}
          </div>
        </Fragment>
      )}
    </section>
  );
};
