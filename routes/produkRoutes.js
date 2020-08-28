const express = require("express");
const produkController = require("../controllers/produkController");

const router = express.Router();

router
  .route("/")
  .get(produkController.getAllProduk)
  .post(
    produkController.uploadFoto,
    produkController.resizeFoto,
    produkController.createProduk
  );

router
  .route("/:id")
  .get(produkController.getOneProduk)
  .patch(produkController.updateProduk)
  .delete(produkController.deleteProduk);

module.exports = router;
