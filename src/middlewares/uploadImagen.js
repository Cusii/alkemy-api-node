const path = require('path');
const multer = require('multer');
const uuid = require('uuid');

const storage = multer.diskStorage({
    destination: path.join(__dirname, '../../public/images/characters'),
    filename:(req,file, cb) => {
        cb(null, 'img-' +'uuid.v4()' + path.extname(file.originalname))
    }
})

const upload = multer ({
    storage,
    dest: path.join(__dirname, '../../public/images/characters'),
    fileFilter: (req,file, cb) => {
        const filetype = /jpeg|jpg|png|gif|/;
        const mimetype = filetype.test(file.mimetype);
        const extname = filetype.test(path.extname(file.originalname));
        if (mimetype && extname) {
            return cb(null, true)
        }
        cb('Error: The file arent imagen')
    }
}).single('imagen')

module.exports = multer({
    storage: storage,
    upload: upload
}
)