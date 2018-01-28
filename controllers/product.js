const Model = require('../model');
const {Product, Manufacturer} = Model;

const productController = {
    all (req, res) {
        // Return all products
        Product.find({})
            .populate('manufacturer')
            .exec((err, products) => res.json(products))
    },
    byId (req, res) {
        const idParam = req.params.id;
        Product
            .findOne({_id: idParam})
            .populate('manufacturer')
            .exec( (err, product) => res.json(product));
    },
    create (req, res) {
        const requestBody = req.body;
        console.log(requestBody);
        const newProduct = new Product(requestBody);
        newProduct.save( (err, saved) => {
            console.log(err);
            Product
                .findOne({_id: saved._id})
                .populate('manufacturer')
                .exec( (err, product) => {
                    console.log(product);
                    res.json(product)
                });
        })
    },
    update (req, res) {
        const idParam = req.params.id;
        let product = req.body;
        Product.findOne({_id: idParam}, (err, data) => {
            data.name = product.name;
            data.description = product.description;
            data.image = product.image;
            data.price = product.price;
            data.manufacturer = product.manufacturer;
            data.save((err, updated) => res.json(updated));
        })
    },
    remove (req, res) {
        const idParam = req.params.id;
        Product.findOne({_id: idParam}).remove( (err, removed) => res.json(idParam));
    }
};

module.exports = productController;
