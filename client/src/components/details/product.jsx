import styled from "styled-components";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, Fragment } from "react";
import { useDispatch } from "react-redux";

import { getProductApi } from "../../api";
import { addToCart } from "../../redux/features/cartSlice";

export const Product = () => {
  const params = useParams();
  const dispath = useDispatch();
  const navigate = useNavigate();
  const [product, setProduct] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      try {
        const response = await getProductApi(params.id);
        setProduct(response.product);
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, [params.id]);

  const handleAddToCart = (product) => {
    dispath(addToCart(product));
    navigate("/cart");
  };

  return (
    <StyledProduct>
      <ProductContainer>
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <Fragment>
            <ImageContainer>
              <img src={product.image} alt="" />
            </ImageContainer>
            <ProductDetails>
              <h3>{product.name}</h3>
              <p>
                <span>Brand:</span>
                {product.brand}
              </p>
              <p>
                <span>Description:</span>
                {product.desc}
              </p>
              <Price>${product.price?.toLocaleString()}</Price>

              <button
                className="product-add-to-cart"
                onClick={() => handleAddToCart(product)}
              >
                Add To Cart
              </button>
            </ProductDetails>
          </Fragment>
        )}
      </ProductContainer>
    </StyledProduct>
  );
};

const StyledProduct = styled.div`
  margin: 3rem;
  display: flex;
  justify-content: center;
`;

const ProductContainer = styled.div`
  max-width: 500px;
  width: 100%;
  height: auto;
  display: flex;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  border-radius: 4px;
  padding: 2rem;
`;

const ImageContainer = styled.div`
  flex: 1;

  img {
    width: 100%;
  }
`;

const ProductDetails = styled.div`
  flex: 2;
  margin-left: 2rem;

  h3 {
    font-size: 36px;
  }

  p span {
    font-weight: bold;
  }
`;

const Price = styled.div`
  margin: 1rem 0;
  font-weight: bold;
  font-size: 24px;
`;
