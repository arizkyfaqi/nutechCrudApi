const multer = require("multer");
const sharp = require("sharp");
const Produk = require("../models/produkModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const APIFeatures = require("../utils/apiFeature");

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (
    file.mimetype.startsWith("image/jpeg") ||
    file.mimetype.startsWith("image/png")
  ) {
    cb(null, true);
  } else {
    cb(new AppError("File format hanya JPEG dan PNG!", 400));
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

exports.uploadFoto = upload.fields([{ name: "fotoBarang", maxCount: 1 }]);

exports.resizeFoto = catchAsync(async (req, res, next) => {
  if (!req.files.fotoBarang) return next();

  const fotoBarangFilename = `nutech-barang-${Date.now()}-${
    req.files.fotoBarang[0].originalname
  }`;
  await sharp(req.files.fotoBarang[0].buffer)
    .resize(1000)
    .toFormat("jpeg")
    .jpeg({ quality: 75 })
    .toFile(`foto_barang/${fotoBarangFilename}`);
  req.body.fotoBarang = fotoBarangFilename;

  next();
});

exports.getAllProduk = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(Produk.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();

  const produks = await features.query;

  res.status(200).json({
    status: "success",
    result: produks.length,
    data: {
      produks,
    },
  });
});

exports.createProduk = catchAsync(async (req, res, next) => {
  const newProduk = await Produk.create(req.body);

  res.status(201).json({
    status: "success",
    data: {
      newProduk,
    },
  });
});

exports.getOneProduk = catchAsync(async (req, res, next) => {
  const produks = await Produk.findById(req.params.id);

  res.status(200).json({
    status: "success",
    data: {
      produks,
    },
  });
});

exports.updateProduk = catchAsync(async (req, res, next) => {
  const produk = await Produk.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: "success",
    data: {
      produk,
    },
  });
});

exports.deleteProduk = catchAsync(async (req, res, next) => {
  await Produk.findByIdAndDelete(req.params.id);

  res.status(200).json({
    status: "success",
    data: null,
  });
});
