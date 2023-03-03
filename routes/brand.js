var express = require("express");
var router = express.Router();
const brandController = require("../controllers/brandController");
const { body } = require("express-validator");

router.get("/", brandController.index);

router.get("/model", brandController.model);

router.get("/:id", brandController.show);

router.put("/:id", brandController.update);

router.delete("/:id", brandController.destroy);

router.post(
  "/",
  [
    body("name").not().isEmpty().withMessage("กรุณาป้อนชื่อแบรนด์ด้วย"),
  ],
  brandController.insert
);


module.exports = router;
