const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const mapStyleSchema = new Schema({
    image: {type: String, require: true},
    mapName: {type: String, require: true},
    mapLink: {type: String, require: true}
})

const MapStyle = mongoose.model('MapStyle', mapStyleSchema)

module.exports = MapStyle;