const express = require('express');
const router = express.Router();
const products = require('../Models/Products');

// Inserting (Creating) Data
router.post("/insertproduct", async (req, res) => {
    const { ProductName, ProductPrice, ProductBarcode } = req.body;

    try {
        const pre = await products.findOne({ ProductBarcode: ProductBarcode });
        if (pre) {
            return res.status(422).json("Product is already added.");
        }

        const addProduct = new products({ ProductName, ProductPrice, ProductBarcode });
        await addProduct.save();
        return res.status(201).json(addProduct);
    } catch (err) {
        console.error("Error inserting product:", err);
        return res.status(500).json({ error: "Failed to insert product", message: err.message });
    }
});

// Getting (Reading) all Data
router.get('/products', async (req, res) => {
    try {
        const getProducts = await products.find({});
        return res.status(200).json(getProducts);
    } catch (err) {
        console.error("Error fetching products:", err);
        return res.status(500).json({ error: "Failed to fetch products", message: err.message });
    }
});

// Getting (Reading) individual Data
router.get('/products/:id', async (req, res) => {
    try {
        const getProduct = await products.findById(req.params.id);
        if (!getProduct) {
            return res.status(404).json({ error: "Product not found" });
        }
        return res.status(200).json(getProduct);
    } catch (err) {
        console.error("Error fetching product by ID:", err);
        return res.status(500).json({ error: "Failed to fetch product", message: err.message });
    }
});

// Editing (Updating) Data
router.put('/updateproduct/:id', async (req, res) => {
    const { ProductName, ProductPrice, ProductBarcode } = req.body;

    try {
        const updateProduct = await products.findByIdAndUpdate(
            req.params.id,
            { ProductName, ProductPrice, ProductBarcode },
            { new: true }
        );
        if (!updateProduct) {
            return res.status(404).json({ error: "Product not found" });
        }
        return res.status(200).json(updateProduct);
    } catch (err) {
        console.error("Error updating product:", err);
        return res.status(500).json({ error: "Failed to update product", message: err.message });
    }
});

// Deleting Data
router.delete('/deleteproduct/:id', async (req, res) => {
    try {
        const deleteProduct = await products.findByIdAndDelete(req.params.id);
        if (!deleteProduct) {
            return res.status(404).json({ error: "Product not found" });
        }
        return res.status(200).json(deleteProduct);
    } catch (err) {
        console.error("Error deleting product:", err);
        return res.status(500).json({ error: "Failed to delete product", message: err.message });
    }
});

module.exports = router;
