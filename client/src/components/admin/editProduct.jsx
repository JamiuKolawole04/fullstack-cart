import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";

import { PrimaryButton } from "./commonStyled";
import { productsCreate } from "../../redux/features/productSlice";

export const EditProduct = ({ productId }) => {
  const [open, setOpen] = React.useState(false);

  const dispatch = useDispatch();
  const { items } = useSelector((state) => state.products);

  const [productImg, setProductImg] = React.useState("");
  const [name, setName] = React.useState("");
  const [brand, setBrand] = React.useState("");
  const [price, Setprice] = React.useState("");
  const [desc, setDesc] = React.useState("");
  const [currentProduct, setCurrentProduct] = React.useState({});
  const [previewImg, setPreviewImg] = React.useState("");

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

  const handleClickOpen = () => {
    setOpen(true);
    let selectedProduct = items.filter((item) => item._id === productId);
    selectedProduct = selectedProduct[0];

    setCurrentProduct(selectedProduct);
    setPreviewImg(selectedProduct.image);
    setProductImg("");
    setBrand(selectedProduct.brand);
    setName(selectedProduct.name);
    Setprice(selectedProduct.price);
    setDesc(selectedProduct.desc);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Edit onClick={handleClickOpen}>Edit</Edit>
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth={true}
        maxWidth={"md"}
      >
        <DialogTitle>Edit product</DialogTitle>
        <DialogContent>
          <StyledEditProduct>
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
                value={brand}
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
              {previewImg ? (
                <img src={previewImg} alt="product" />
              ) : (
                <p>Image preview will appear here!</p>
              )}
            </ImagePreview>
          </StyledEditProduct>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Subscribe</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

const Edit = styled.button`
  border: none;
  outline: none;
  padding: 2px 4px;
  color: white;
  border-radius: 4px;
  cursor: pointer;
  background: #4b70e2;
`;

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

const StyledEditProduct = styled.div`
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
