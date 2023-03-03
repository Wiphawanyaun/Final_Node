var express = require("express");
var router = express.Router();
const branchController = require("../controllers/branchController");
const passportJWT = require("../middleware/passportJWT");
const checkAdmin = require("../middleware/checkAdmin")

router.get("/",[passportJWT.isLogin],[checkAdmin.isAdmin], branchController.index);

router.get("/:id", branchController.show);

router.delete("/:id", branchController.destroy);

router.put("/:id", branchController.update);

router.post("/", branchController.insert);

module.exports = router;
