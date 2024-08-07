// controllers/productController.js
const products = [
    { id: 1, name: 'Book 1', quantity: 10 },
    { id: 2, name: 'Book 2', quantity: 5 },
    { id: 3, name: 'Book 3', quantity: 8 }
];

const getAllProducts = (req, res) => {
    res.json(products);
};

const addToCart = (req, res) => {
    const productId = req.body.id;
    const quantity = req.body.quantity;

    const product = products.find(p => p.id === productId);
    if (!product) {
        return res.status(404).json({ message: 'Product not found' });
    }

    if (quantity > product.quantity) {
        return res.status(400).json({ message: 'Insufficient quantity available' });
    }

    product.quantity -= quantity;
    res.json({ message: 'Product added to cart successfully' });
};

const buyNow = (req, res) => {
    const productId = req.body.id;
    const quantity = req.body.quantity;

    const product = products.find(p => p.id === productId);
    if (!product) {
        return res.status(404).json({ message: 'Product not found' });
    }

    if (quantity > product.quantity) {
        return res.status(400).json({ message: 'Insufficient quantity available' });
    }

    product.quantity -= quantity;
    res.json({ message: 'Product purchased successfully' });
};

module.exports = {
    getAllProducts,
    addToCart,
    buyNow
};
