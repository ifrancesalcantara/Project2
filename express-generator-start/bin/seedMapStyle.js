const mongoose = require('mongoose');
const maps = require('./../models/MapStyle');


const dbName = hoody;

const maps = {

}


//CONNECT DATABASE

mongoose.connect('mongodb://localhost:27017/hoody', {useNewUrlParser: true})
    .then(() => {
        return MapStyle.create(maps);
    })
    .then((insertedMaps) => {
        console.log('Inserted Maps:', insertedMaps.length);
        mongoose.connection.close()
    })
    .catch((err) => console.log(err))