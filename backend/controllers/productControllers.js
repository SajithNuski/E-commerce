import { v2 as cloudinary } from "cloudinary";
import productModel from "../models/productModel.js";

// funtion for add product
const addProduct = async (req, res) => {
  try {
    console.log("addProduct called");
    console.log("body:", req.body);
    console.log(
      "files:",
      Object.keys(req.files || {}).reduce((acc, k) => {
        acc[k] = req.files[k] && req.files[k].length;
        return acc;
      }, {}),
    );
    const {
      name,
      description,
      price,
      category,
      subCategory,
      subcategory,
      sizes,
      size,
      bestseller,
    } = req.body;
    const image1 = req.files?.image1?.[0]?.path;
    const image2 = req.files?.image2?.[0]?.path;
    const image3 = req.files?.image3?.[0]?.path;
    const image4 = req.files?.image4?.[0]?.path;

    const images = [image1, image2, image3, image4].filter(Boolean);

    let imagesUrl = [];
    if (images.length > 0) {
      imagesUrl = await Promise.all(
        images.map(async (item) => {
          const result = await cloudinary.uploader.upload(item, {
            resource_type: "image",
          });
          return result.secure_url;
        }),
      );
    }

    const productSizes = Array.isArray(sizes)
      ? sizes
      : typeof sizes === "string" && sizes
        ? JSON.parse(sizes)
        : Array.isArray(size)
          ? size
          : typeof size === "string" && size
            ? JSON.parse(size)
            : [];

    const productData = {
      name,
      description,
      category,
      price: Number(price),
      subCategory: subCategory || subcategory,
      bestseller: bestseller === "true" ? true : false,
      sizes: productSizes,
      image: imagesUrl,
      date: Date.now(),
    };
    console.log(productData);
    const product = new productModel(productData);
    await product.save();
    res.json({ success: true, message: "Product added successfully" });
  } catch (error) {
    console.error("addProduct error:", error && error.message);
    console.error(error && error.stack);
    res.status(500).json({
      success: false,
      message: "Error occurred while adding product",
      error: error && error.message,
    });
  }
};

// function for list product
const listProducts = async (req, res) => {
  try {
    const products = await productModel.find({});
    res.json({ success: true, products });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "Error occurred while fetching products",
    });
  }
};

// function for remove product
const removeProducts = async (req, res) => {
  try {
    await productModel.findByIdAndDelete(req.body.id);
    res.json({ success: true, message: "Product removed successfully" });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "Error occurred while removing product",
    });
  }
};
// function for single product
const singleProduct = async (req, res) => {
  try {
    const { productId } = req.body;
    const product = await productModel.findById(productId);
    res.json({ success: true, product });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "Error occurred while removing product",
    });
  }
};

export { addProduct, listProducts, removeProducts, singleProduct };
