const express = require('express');
const path = require('path');
const fs = require('fs');
const passport = require('passport');
const Template = require('../model/Template');
const isEmpty = require('../validation/is-empty');

const router = express.Router();

router.get('/:dirpath/:filename', async(req, res) => {
    const dirpath = req.params.dirpath;
    const filename = req.params.filename;
    
    res.sendFile(path.join(__dirname, '../template/' + dirpath + '/' + filename));
})

router.get('/', passport.authenticate('jwt', { session: false }), async( req, res ) => {
    const templates = await Template.find();
    return res.json(templates)
});

router.post('/', passport.authenticate('jwt', { session: false }), async(req, res) => {
    let errors = {};
    if(isEmpty(req.body.template_name)) {
        errors.name = "Template name is required";
    }
    if(isEmpty(req.files.images)) {
        errors.file = "Please select files to upload";
    }
    if(!isEmpty(errors)) {
        return res.status(400).json(errors);
    }

    const newpath = path.join(__dirname, `../template/${req.body.template_name}`);
    if(!fs.existsSync(newpath)) {
        fs.mkdir(newpath, { recursive: true }, function(err) {
            if (err) {
                console.log(err)
            } else {
                console.log("New directory successfully created.")
            }
        })
    }
    const filenames = [];
    const file = req.files.images;
    if(file instanceof Array) {
        await file.forEach(f => {
            let fileData = {
                filename: f.name,
                filetype: "image"
            };
            if(f.mimetype.indexOf("image") > -1) {
                fileData.filetype = "image";
            } else {
                const len = f.name.split(".").length;
                fileData.filetype = f.name.split(".")[len - 1];
            }
            filenames.push(fileData);
            f.mv(`${newpath}/${f.name}`);
        });
    } else {
        let fileData = {
            filename: f.name
        };
        if(file.mimetype.indexOf("image") > -1) {
            fileData.filetype = "image";
        } else {
            const len = file.name.split(".").length;
            fileData.filetype = file.name.split(".")[len - 1];
        }
        filenames.push(fileData);
        await file.mv(`${newpath}/${file.name}`);
    }

    const template = await Template.findOne({ name: req.body.template_name });
    if(!isEmpty(template)) {
        return res.status(400).json({ name: "Template name already exist" });
    }
    const newTemplate = new Template({
        name: req.body.template_name,
        files: filenames
    });
    await newTemplate.save();
    return res.json(newTemplate);
})

module.exports = router;