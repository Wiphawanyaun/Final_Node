var express = require("express");
var router = express.Router();
const userController = require("../controllers/userController");
const { body } = require("express-validator");
const passportJWT = require("../middleware/passportJWT");
const checkAdmin = require("../middleware/checkAdmin")

router.get("/",[passportJWT.isLogin],[checkAdmin.isAdmin], userController.all);
router.post(
  "/",
  [
    body("name").not().isEmpty().withMessage("กรุณาป้อนชื่อสกุลด้วย"),
    body("email")
      .not()
      .isEmpty()
      .withMessage("กรุณาป้อนอีเมลด้วย")
      .isEmail()
      .withMessage("รูปแบบอีเมลไม่ถูกต้อง"),
    body("password")
      .not()
      .isEmpty()
      .withMessage("กรุณากรอกรหัสผ่านด้วย")
      .isLength({ min: 5 })
      .withMessage("รหัสผ่านต้อง 5 ตัวอักษรขึ้นไป"),
  ],
  userController.register
);

router.post(
  "/login",
  [
    body("email")
      .not()
      .isEmpty()
      .withMessage("กรุณาป้อนอีเมลด้วย")
      .isEmail()
      .withMessage("รูปแบบอีเมลไม่ถูกต้อง"),
    body("password")
      .not()
      .isEmpty()
      .withMessage("กรุณาใส่รหัสผ่าน")
  ],
  userController.login
);

router.put("/:id", userController.updaterole);


router.get("/profile",[passportJWT.isLogin],userController.profile)

module.exports = router;
