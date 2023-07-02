const multer = require('multer');
const path = require('path');

const storageUser = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../public/images/user'));
    },
    filename: function (req, file, cb) {
        const timestamp = new Date().getTime();
        const parsed = path.parse(file.originalname);
        const newFileName = `${parsed.name}-${timestamp}${parsed.ext}`;
        cb(null, newFileName);
    }
});

const storageProduct = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../public/images/product'));
    },
    filename: function (req, file, cb) {
        const timestamp = new Date().getTime();
        const parsed = path.parse(file.originalname);
        const newFileName = `${parsed.name}-${timestamp}${parsed.ext}`;
        cb(null, newFileName);
    }
});
const storageBanner = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../public/images/banner'));
    },
    filename: function (req, file, cb) {
        const timestamp = new Date().getTime();
        const parsed = path.parse(file.originalname);
        const newFileName = `${parsed.name}-${timestamp}${parsed.ext}`;
        cb(null, newFileName);
    }
});

const imageFilter = function (req, file, cb) {
    if (file.mimetype.startsWith('image/')) {
        cb(null, true);
    } else {
        cb(new Error('Tệp không phải là hình ảnh!'), false);
    }

};

const uploadUser = multer({
    storage: storageUser,
    fileFilter: imageFilter,
    limits: { fileSize: 2 * 1024 * 1024 }
});


const uploadProduct = multer({
    storage: storageProduct,
    fileFilter: imageFilter,
    limits: { fileSize: 2 * 1024 * 1024 }
});

const uploadBanner = multer({
    storage: storageBanner,
    fileFilter: imageFilter,
    limits: { fileSize: 2 * 1024 * 1024 }
});

module.exports = { uploadUser, uploadProduct,uploadBanner };
