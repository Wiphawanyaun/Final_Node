const Branch = require("../models/branch");

exports.index = async (req, res, next) => {
  const branch = await Branch.find().sort({ _id: -1 });

  res.status(200).json({
    data: branch,
  });
};

exports.show = async (req, res, next) => {
  try {
    const { id } = req.params;
    const branch = await Branch.findOne({
      _id: id,
    });

    if (!branch) {
      const error = new Error("ไม่พบสาขา");
      error.statusCode = 400;
      throw error;
    } else {
      res.status(200).json({
        data: branch,
      });
    }
  } catch (error) {
    next(error);
  }
};

exports.insert = async (req, res, next) => {
  const {
    name,
    address: { province },
  } = req.body;

  let branch = new Branch({
    name: name,
    address: {
      province: province,
    },
  });
  await branch.save();
  res.status(200).json({
    message: "เพิ่มข้อมูลเรียบร้อยแล้ว",
  });
};

exports.destroy = async (req, res, next) => {
  try {
    const { id } = req.params;
    const branch = await Branch.deleteOne({
      _id: id,
    });

    if (branch.deleteCount === 0) {
      const error = new Error("ไม่สามารถลบข้อมูลได้/ไม่พบข้อมูลสาขา");
      error.statusCode = 400;
      throw error;
    } else {
      res.status(200).json({
        message: "ลบข้อมูลเรียบร้อยแล้ว",
      });
    }
  } catch (error) {
    next(error);
  }
};

exports.update = async (req, res, next) => {
  try {
    const { id } = req.params;
    const {
      name,
      address: { province },
    } = req.body;

    const branch = await Branch.findByIdAndUpdate(id, {
      name: name,
      address: {
        province: province,
      },
    });

    console.log(branch);

    res.status(200).json({
      message: "แก้ไขข้อมูลเรียบร้อยแล้ว",
    });
  } catch (error) {
    next(error);
  }
};
