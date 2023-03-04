var express = require("express");
var router = express.Router();
const modelController = require("../controllers/modelController");
const { body } = require("express-validator");

router.get("/", modelController.index);

router.get("/:id", modelController.show);

router.put("/:id", modelController.update);

router.delete("/:id", modelController.destroy);

router.post(
  "/",
  [body("name").not().isEmpty().withMessage("กรุณาป้อนชื่อ model ด้วย"),
  body("price").not().isEmpty().withMessage("กรุณาระบุราคาด้วย"),
  body("color").not().isEmpty().withMessage("กรุณาใส่สีด้วย")],
  modelController.insert
);

module.exports = router;