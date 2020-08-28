const validator = require("validator");
const mongoose = require("mongoose");
const integerValidator = require("mongoose");

const produkSchema = new mongoose.Schema({
  namaBarang: {
    type: String,
    unique: true,
    required: [true, "Nama barang harus terisi!"],
  },
  fotoBarang: {
    type: String,
    required: [true, "Foto barang harus terisi!"],
  },
  hargaBeli: {
    type: Number,
    required: [true, "Harga beli harus terisi!"],
    validate: {
      validator: Number.isInteger,
      message: "Tidak bisa input data {VALUE}. Hanya bilangan angka!",
    },
  },
  hargaJual: {
    type: Number,
    required: [true, "Harga jual harus terisi!"],
    validate: {
      validator: Number.isInteger,
      message: "Tidak bisa input data {VALUE}. Hanya bilangan angka!",
    },
  },
  stok: {
    type: Number,
    required: [true, "stok barang harus terisi!"],
    validate: {
      validator: Number.isInteger,
      message: "Tidak bisa input data {VALUE}. Hanya bilangan angka!",
    },
  },
});

const Produk = mongoose.model("Produk", produkSchema);

module.exports = Produk;
