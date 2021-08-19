const router = require("express").Router();
const { Category, Product, ProductTag } = require("../../models");

// The `/api/categories` endpoint

router.get("/", async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  const categoryData = await Category.findAll({
    include: [{ model: Product }],
  });
  res.json(categoryData);
});

router.get("/:id", async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  const categoryIDData = await Category.findByPk(req.params.id, {
    include: [Product],
  }).catch((err) => {
    res.status(500).json(err);
  });
  if (!categoryIDData)
    return res
      .status(404)
      .json({ message: `There is no Category by the ID of ${req.params.id}` });
  res.status(200).json(categoryIDData);
});

router.post("/", async (req, res) => {
  // create a new category
  const newCategoryData = await Category.create(req.body).catch((err) =>
    res.status(500).json(err.message)
  );
  res.status(200).json(newCategoryData);
});

router.put("/:id", async (req, res) => {
  // update a category by its `id` value
  const updateIDCategoryData = await Category.update(req.body, {
    where: { id: req.params.id },
  }).catch((err) => res.status(500).json(err.message));
  if (!updateIDCategoryData[0])
    return res.status(404).json({
      message: `Please check your Category ID of ${req.params.id} and what you are updating`,
    });
  else res.status(200).json({ message: `Updated ID ${req.params.id}` });
});

router.delete("/:id", async (req, res) => {
  // delete a category by its `id` value
  const deleteIDData = await Category.destroy({ where: { id: req.params.id } });
  if (!deleteIDData)
    return res
      .status(404)
      .json({ message: `There is no data by ID ${req.params.id}` });
  res.status(200).json({ message: `You have DELETED ID ${req.params.id}` });
});

module.exports = router;
