const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, 'images');
    },
    filename(req, file, cb) {
        cb(null, new Date().toISOString() + '-' + file.originalname)
    }
});


const fileFilter = function (req, file, callback) {
    const ext = path.extname(file.originalname);
    if(ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
        return callback(null, false);
    }
    callback(null, true)
}

module.exports = multer({
    storage, fileFilter,
    limits:{
        fileSize: 1024 * 1024
    }
})