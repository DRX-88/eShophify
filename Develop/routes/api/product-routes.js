const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');

// The `/api/products` endpoint

// get all products
  router.get('/', async (req, res) => {
    try {
      const productData = await Product.findAll({
        include: [{ model: Category }, { model: Tag, through: ProductTag, as: 'tags' }],
      });
      res.status(200).json(productData);
    } catch (err) {
      res.status(500).json(err);
    }
  }
  );

// get one product
router.get('/:id', async (req, res) => {
   try {
    const productData = await Product.findByPk(req.params.id, {
      include: [{ model: Category, attributes: ['id', 'category_name'] }, 
      { model: Tag, attributes: ['id', 'tag_name'] }],
    });

    if (!productData) {
      res.status(404).json({ message: 'No product found with that id!' });
      return;
    }

    res.status(200).json(productData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// create new product
router.post('/', async (req, res) => {
  try { 
    const productData = await Product.create(req.body);
    res.status(200).json(productData);
  } catch (err) {
    res.status(400).json(err);
  } 
}
);

  



// update product
router.put('/:id', async (req, res) => {
  try {
    const productData = await Product.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!productData) {
      res.status(404).json({ message: 'No product found with that id!' });
      return;
    }
    res.status(200).json(productData);
  }
  catch (err) {
    res.status(500).json(err);
  }
}
);

router.delete('/:id', async (req, res) => {
  try {
    const productData = await Product.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!productData) {
      res.status(404).json({ message: 'No product found with that id!' });
      return;
    }
    res.status(200).json(productData);
  }
  catch (err) {
    res.status(500).json(err);
  } 
});

module.exports = router;
