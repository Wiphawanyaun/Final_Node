
const { validationResult } = require("express-validator");

const Brand = require("../models/brand");

const Model = require("../models/model");

const config = require("../config/index");

exports.index = async (req, res, next) => {
  const brands = await Brand.find().select("name").sort({ _id: -1 });


  res.status(200).json({
    data: brands,
  });
};

exports.model = async (req, res, next) => {
  const model = await Model.find().populate("brand");

  res.status(200).json({
    data: model,
  });
};

exports.show = async (req, res, next) => {
  const { id } = req.params;
  const brand = await Brand.findById({
    _id: id,
  })
    .populate("model")
    .select("name");

  res.status(200).json({
    data: brand,
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

    const existBrand = await Brand.findOne({ name: name });
    if (existBrand) {
      const error = new Error("แบรนด์นี้มีในระบบแล้ว");
      error.statusCode = 400;
      throw error;
    }

    let brand = new Brand({
      name: name,
    });
    await brand.save();
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
    const { name, photo } = req.body;
    const brand = await Brand.findByIdAndUpdate(id, {
      name: name,
      photo: photo,
    });
    console.log(brand);

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
    const brand = await Brand.deleteOne({
      _id: id,
    });

    if (brand.deleteCount === 0) {
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