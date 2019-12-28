const express = require("express");
const router = express.Router();

const admincontroller = require("../controllers/admin.controller");

router.get("/", (req, res) => {
  res.redirect("/admin/category");
});
router.get("/category", admincontroller.category);
router.get("/product", admincontroller.product);

router.get("/product/delete", admincontroller.deleteProduct);

router.get("/category/add", admincontroller.fillCategory);
router.post("/category/add", admincontroller.addCategory);
router.get("/category/update", admincontroller.fillUpdateCategory);
router.post("/category/update", admincontroller.updateCategory);
router.get("/category/delete", admincontroller.deleteCategory);

router.get("/category/addPT", admincontroller.fillProductType);
router.post("/category/addPT", admincontroller.addProductType);
router.get("/category/updatePT", admincontroller.fillUpdateProductType);
router.post("/category/updatePT", admincontroller.updateProductType);
router.get("/category/deletePT", admincontroller.deleteProductType);

module.exports = router;
