import { useState } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";

import { PrimaryButton } from "./commonStyled";
import { productsCreate } from "../../redux/features/productSlice";

export const CreateProducts = () => {
  const dispatch = useDispatch();

  const [productImg, setProductImg] = useState("");
  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [price, Setprice] = useState("");
  const [desc, setDesc] = useState("");

  const handleProductImageUpload = (e) => {
    const file = e.target.files[0];

    TransformFile(file);
  };

  const TransformFile = (file) => {
    const reader = new FileReader();

    if (file) {
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setProductImg(reader.result);
      };
    } else {
      setProductImg("");
    }
  };

  const hanldeSubmit = (e) => {
    e.preventDefault();
    dispatch(
      productsCreate({
        name,
        brand,
        price,
        desc,
        image: productImg,
      })
    );
  };

  return (
    <StyledCreateProduct>
      <StyledForm onSubmit={hanldeSubmit}>
        <h3>Create a Product</h3>
        <input
          type="file"
          name=""
          id=""
          accept="image/"
          onChange={handleProductImageUpload}
          required
        />

        <select
          name=""
          id=""
          onChange={({ target }) => setBrand(target.value)}
          required
        >
          <option value="">Select Brand</option>
          <option value="iphone">iPhone</option>
          <option value="samsung">Samsung</option>
          <option value="xiaomi">Xiaomi</option>
          <option value="other">Other</option>
        </select>

        <input
          type="text"
          name=""
          id=""
          required
          placeholder="Name"
          value={name}
          onChange={({ target }) => setName(target.value)}
        />

        <input
          type="text"
          name=""
          id=""
          required
          placeholder="Price"
          value={price}
          onChange={({ target }) => Setprice(target.value)}
        />

        <input
          type="text"
          name=""
          id=""
          required
          placeholder="Short Description"
          value={desc}
          onChange={({ target }) => setDesc(target.value)}
        />
        <PrimaryButton type="submit">Submit</PrimaryButton>
      </StyledForm>
      <ImagePreview>
        {productImg ? (
          <img src={productImg} alt="product" />
        ) : (
          <p>Image preview will appear here!</p>
        )}
      </ImagePreview>
    </StyledCreateProduct>
  );
};

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  max-width: 300px;
  margin-top: 2rem;
  select,
  input {
    padding: 7px;
    min-height: 30px;
    outline: none;
    border-radius: 5px;
    border: 1px solid rgb(182, 182, 182);
    margin: 0.3rem 0;
    &:focus {
      border: 2px solid rgb(0, 208, 255);
    }
  }
  select {
    color: rgb(95, 95, 95);
  }
`;

const StyledCreateProduct = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ImagePreview = styled.div`
  margin: 2rem 0 2rem 2rem;
  padding: 2rem;
  border: 1px solid rgb(183, 183, 183);
  max-width: 300px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  color: rgb(78, 78, 78);
  img {
    max-width: 100%;
  }
`;
