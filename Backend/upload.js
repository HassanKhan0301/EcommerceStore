import multer from 'multer';
import path from 'path';

// Set up storage location and filename
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Directory where files will be saved
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
    },
});

// Set up the upload
const upload = multer({ storage: storage });

export default upload;
