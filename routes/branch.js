var express = require("express");
var router = express.Router();
const branchController = require("../controllers/branchController");
const passportJWT = require("../middleware/passportJWT");
const checkAdmin = require("../middleware/checkAdmin");
const { body } = require("express-validator");

router.get(
  "/",
  [passportJWT.isLogin],
  [checkAdmin.isAdmin],
  branchController.index
);

router.get("/:id", branchController.show);

router.delete("/:id", branchController.destroy);

router.put("/:id", branchController.update);

router.post(
  "/",
  [
    body("name").not().isEmpty().withMessage("กรุณาใส่ชื่อสาขา"),
    body("address.province").not().isEmpty().withMessage("กรุณาใส่ที่อยู่"),
  ],
  branchController.insert
);

module.exports = router;
