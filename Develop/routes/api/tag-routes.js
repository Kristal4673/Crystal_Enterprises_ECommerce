const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

// router.get('/', (req, res) => {

  
  router.get("/", (req, res) => {
    // find all tags
    // be sure to include its associated Product data
  Tag.findAll().then((result) => res.status(200).send(result));
  });
// });
  
  router.get("/:id", (req, res) => {
    // find a single tag by its `id`
    // be sure to include its associated Product data
    // get one product
    ProductTag.findAll({
      where: {
        id: req.params.id,
      },
    }).then((result) => res.status(200).send(result));
  });

router.post('/', (req, res) => {
  // create a new tag
  ProductTag.create(req.body)
    .then((product) => {
      // if there's product tags, we need to create pairings to bulk create in the ProductTag model
      if (req.body.tagIds.length) {
        const productTagIdArr = req.body.tagIds.map((tag_id) => {
          return {
            product_id: product.id,
            tag_id,
          };
        });
        return ProductTag.bulkCreate(productTagIdArr);
      }
    });
}); 

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  // update product data
  ProductTag.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
});

router.delete('/:id', async(req, res) => {
  // delete on tag by its `id` value
      try {
        const tagData= await Category.destroy({
          where: {
            id: req.params.id,
          },
        });
        if (!tagData) {
          res.status(404).json({ message: "no cat with ID!" });
          return;
        }
        res.status(200).json(tagData);
      } catch (err) {
        res.status(500).json(err);
      }
    });
 

module.exports = router;
