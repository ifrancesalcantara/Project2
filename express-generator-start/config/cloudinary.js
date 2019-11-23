const cloudinary = require('cloudinary');
const cloudinaryStorage = require('multer-storage-cloudinary');
const multer = require('multer');

cloudinary.config({
    cloud_name: 'de5vajugq',
    api_key: '724236887916765',
    api_secret: '-BTZM15vS7uuKL11xyMd6akpVpQ'
});

const storage = cloudinaryStorage({
    cloudinary: cloudinary,
    folder: 'name folder',
    allowedFormats: ['jpg', 'png']
});

const parser = multer({ storage: storage });

module.exports = parser;