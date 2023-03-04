
const { validationResult } = require("express-validator");

const Model = require("../models/model");

const config = require("../config/index");

exports.index = async (req, res, next) => {
  const models = await Model.find().select("name").sort({ _id: -1 });


  res.status(200).json({
    data: models,
  });
};


exports.show = async (req, res, next) => {
  const { id } = req.params;
  const model = await Model.findById({
    _id: id,
  })
  res.status(200).json({
    data: model,
  });
};

exports.insert = async (req, res, next) => {
  try {
    const { name} = req.body;

    //validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error("ข้อมูลที่ได้รับมาไม่ถูกต้อง");
      error.statusCode = 422;
      error.validation = errors.array();
      throw error;
    }

    const existModel = await Model.findOne({ name: name });
    if (existModel) {
      const error = new Error("รุ่นนี้มีในระบบแล้ว");
      error.statusCode = 400;
      throw error;
    }

    let model = new Model({
      name: name,
    });
    await model.save();
    res.status(200).json({
      message: "เพิ่มข้อมูลแบรนด์เรียบร้อยแล้ว",
    });
  } catch (error) {
    next(error);
  }
};

exports.update = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, price , color } = req.body;
    const model = await Model.findByIdAndUpdate(id, {
      name: name,
      price: price,
      color:color
    });
    console.log(model);

    res.status(200).json({
      message: "แก้ไขข้อมูลเรียบร้อยแล้ว",
    });
  } catch (error) {
    next(error);
  }
};

exports.destroy = async (req, res, next) => {
  try {
    const { id } = req.params;
    const model = await Model.deleteOne({
      _id: id,
    });

    if (model.deleteCount === 0) {
      const error = new Error("ไม่สามารถลบข้อมูลได้/ไม่พบข้อมูลแบรนด์");
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