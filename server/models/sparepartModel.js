module.exports = (mongoose) => {
    const schema = mongoose.Schema(
        {
            kode_sparepart: {
                type: String,
                required: true
            },
            nama_sparepart: {
                type: String,
                required: true
            },
            satuan: {
                type: Number,
                default:0
            },
            harga_sparepart: {
                type: String,
                required: true
            }
        },
        {
            timestamps: true
        }
    )
    
    schema.method("toJSON", function() {
        const {__v, _id, ...object} = this.toObject()
        object.id = _id
        return object
    })

    const Item = mongoose.model("items", schema)
    return Item
}