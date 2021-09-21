const db = require("../models/")
const Item = db.items

exports.findAll = (req, res) => {
    const search = req.query.search ? req.query.search : ''
    let query = {
        $or : [
            {
                nama_sparepart : { $regex : search , $options : "i" }
            },
            {
                kode_sparepart : { $regex : search , $options : "i" }
            }
        ]
    };

    Item.find(query)
        .then((result) => {
            res.send(result)
        }).catch((err) => {
            console.log(err)
            res.send({
                message: err.message || "tidak bisa ambil data"
            })
        });
}

exports.findOneData = async (req, res) => {
    Item.findOne({kode_sparepart:req.params.kode_sparepart})
    .then((result) => {
        if(!result){
            res.status(404).send({
                message: "Item tidak ditemukan"
            })
        } else {
            res.send(result)
        }
    }).catch((err) => {
        res.send({
            message: err.message || "tidak bisa ambil data"
        })
    });
}

exports.create = async (req, res) => {
    const item = new Item({
        kode_sparepart: req.body.kode_sparepart,
        nama_sparepart: req.body.nama_sparepart,
        satuan: req.body.satuan,
        harga_sparepart: req.body.harga_sparepart
    })

    Item.findOne({kode_sparepart:req.body.kode_sparepart})
    .then((code) => {
        if(!code){
            item.save(item)
                .then((result) => {
                    res.send(result)
                }).catch((err) => {
                    res.status(409).send({
                        message: err.message || "error saat membuat data baru"
                    })
                });
            } else {
                res.json({
                    message: "kode sparepart telah tersedia",
                    code
                })
            }
    }).catch((err) => {
        res.send({
            message: err.message || "tidak bisa ambil data"
        })
    });
}

exports.update = async (req, res) => {
    const id = req.params.id

    Item.findByIdAndUpdate(id, req.body)
        .then((result) => {
            if(!result){
                res.status(404).send({
                    message: "Post Not Found"
                })
            } else {
                res.send({
                    message: "Data Has Been Updated"
                })
            }
        }).catch((err) => {
            res.status(500).send({
                message: err.message || "error saat update data"
            })
        })
}

exports.delete = async (req, res) => {
    const id = req.params.id

    Item.findByIdAndRemove(id)
    .then((result) => {
        if(!result) {
            res.status(404).send({
                message: "Post Not Found"
            })
        } else {
            res.send({
                message: "item berhasil dihapus"
            })
        }
    }).catch((err) => {
        res.status(500).send({
            message: err.message || "error while update posts"
        })
    });
}