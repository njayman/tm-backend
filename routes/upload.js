const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());
const multer = require('multer');
const fs = require('fs');
const router = express.Router();
const Topic = require('../models/Topic');


router.post("/file/:topicid/:stepid/:name/:title", async (req, res) => {
    const filePath = `./uploads/${req.params.name}/${req.params.title}`;
    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            fs.exists(filePath, exist => {
                if (!exist) {
                    return fs.mkdir(filePath, error => cb(error, filePath))
                }
                return cb(null, filePath)
            })
            cb(null, filePath);
        },
        filename: function (req, file, cb) {
            cb(null, file.originalname);
        }
    });
    const upload = multer({ storage: storage }).single("training_file");
    upload(req, res, (err) => {
        async function setUrl(fileUrl,fileType) {
            const step = await Topic.updateOne({ _id: req.params.topicid, "steps._id": req.params.stepid }, {
                "$set": {
                    "steps.$.url": fileUrl,
                    "steps.$.type": fileType
                }
            })
        }
        if (err) {
            res.status(400).send("Something went wrong!");
            console.log(err)
        }
        const url = req.file.path;
        const type = req.file.mimetype;
        setUrl(url,type)
        res.json(url)
    });

});

module.exports = router;