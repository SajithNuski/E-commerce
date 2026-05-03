import Product from "../models/productmodel.js";
import cloudinary from "../config/cloudinary.js";
import { json } from "express";
import productModel from "../models/productmodel.js";

// funtion for add product
const addProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      category,
      subcategory,
      size,
      bestseller,
    } = req.body;
    const image1 = req.files.image1[0].path;
    const image2 = req.files.image2[0].path;
    const image3 = req.files.image3[0].path;
    const image4 = req.files.image4[0].path;

    const images = [image1, image2, image3, image4].filter(
      (item) => item !== undefined,
    );

    const imagesUrl = await Promise.all(
      images.map(async (item) => {
        let result = await cloudinary.uploader.upload(item.path, {
          resource_type: "image",
        });
        return result.secure_url;
      }),
    );

    const productData = {
      name,
      description,
      category,
      price: Number(price),
      subcategory,
      bestseller: bestseller === "true" ? true : false,
      sizes: json.parse(size),
      images: imagesUrl,
      date: Date.now(),
    };
    console.log(productData);
    const product = new productModel(productData);
    await product.save();
    res.json({success: true, message: "Product added successfully"});

  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "Error occurred while adding product",
    });
  }
};

// function for list product
const listProducts = async (req, res) => {};
// function for remove product
const removeProducts = async (req, res) => {};
// function for single product
const singleProduct = async (req, res) => {};

export { addProduct, listProducts, removeProducts, singleProduct };
