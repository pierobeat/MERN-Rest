module.exports = (app) => {
    const items = require("../controllers/itemController")
    const router = require('express').Router()

    router.get("/", items.findAll)
    router.get("/:kode_sparepart", items.findOneData)
    router.post("/", items.create)
    router.put("/:id", items.update)
    router.delete("/:id", items.delete)

    app.use("/items", router)
}