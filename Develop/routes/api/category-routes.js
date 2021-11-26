
const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  // be sure to include its associated Prodres
  // res.send('Crystal is a nice person!')
  Category.findAll().then(result=> res.status(200).send(result))
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  Category.findAll({
    where: {
      id:req.params.id
    }
  }).then(result=> res.status(200).send(result))
});

router.post('/', async(req, res) => {
  // create a new category
    try {
      const categoryData= await Category.create(req.body);
      res.status(200).json(categoryData);
    } catch (err) {
      res.status(400).json(err);
    }
  });

// router.put("/:id", (req, res) => {
  // update a category by its `id` value
  router.put("/:id", async (req, res) => {
    try {
      const categoryData = await Category.update(req.body, {
        where: {
          id: req.params.id,
        },
      });
      if (!categoryData[0]) {
        res.status(404).json({ message: "No Catergory" });
        return;
      }
      res.status(200).json(categoryData);
    } catch (err) {
      res.status(500).json(err);
    }
  });

  router.delete("/:id", async(req, res) => {
    // delete a category by its `id` value
      try {
        const categoryData= await Category.destroy({
          where: {
            id: req.params.id,
          },
        });
        if (!categoryData) {
          res.status(404).json({ message: "no cat with ID!" });
          return;
        }
        res.status(200).json(categoryData);
      } catch (err) {
        res.status(500).json(err);
      }
    });
  // });


module.exports = router;
