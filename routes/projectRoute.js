const express = require('express');
const passport = require('passport');
const fs = require('fs');
const path = require('path');
const Project = require('../model/Project');
const { validateNewProject } = require('../validation/project');
const router = express.Router();

router.post('/', passport.authenticate('jwt', {session: false}), async(req, res) => {
    const {errors, isValid} = validateNewProject(req.body);
    if(!isValid) {
        return res.status(400).json(errors);
    }
    const proj = await Project.findOne({ name: req.body.name, user: req.user.id });
    if(proj) {
        return res.status(400).json({ name: 'Project already exist' });
    }

    if(!fs.existsSync(path.join(__dirname, '../upload'))) {
        fs.mkdir(path.join(__dirname, '../upload'), (err) => {
            if (err) {
                return console.error(err);
            }
            console.log('Upload directory created successfully!');
        });
    }

    fs.mkdir(path.join(__dirname, `../upload/${req.user.id}_${req.body.name}`), function(err) {
        if (err) {
            console.log(err)
        } else {
            console.log("New project directory successfully created.")
        }
    })

    // make ref number
    let rand = 0;
    do {
        rand = randomRefNumber(10000)
    }
    while(!isExistRef(rand));

    const newProject = new Project({
        name: req.body.name,
        user: req.user.id,
        ref_number: rand
    });
    const updated_project = await newProject.save();
    return res.json(updated_project);
})

const randomRefNumber = (max) => {
    return parseInt(Math.floor(Math.random() * max));
}

const isExistRef = async (num) => {
    let is_exist = false;
    const project = await Project.findOne({ ref_number: num });
    if(project) {
        is_exist = true;
    }
    return is_exist;
}

router.get('/:name', passport.authenticate('jwt', { session: false }), async(req, res) => {
    const project = await Project.findOne({
        user: req.user.id,
        name: req.params.name
    });
    return res.json(project)
})

router.get('/', passport.authenticate('jwt', { session: false }), async (req, res) => {
    const projects = await Project.find({ user: req.user.id });
    return res.json(projects);
})

router.post('/upload', passport.authenticate('jwt', { session: false }), async(req, res) => {
    const newpath = path.join(__dirname, `../upload/${req.user.id}_${req.body.project_name}`);

    const filenames = [];
    const file = req.files.images;
    if(file instanceof Array) {
        await file.forEach(f => {
            const filename = f.name;
            filenames.push(filename);
            f.mv(`${newpath}/${filename}`);
        });
    } else {
        const filename = file.name;
        filenames.push(filename);
        await file.mv(`${newpath}/${filename}`);
    }

    const project = await Project.findOne({
        user: req.user.id,
        name: req.body.project_name
    });
    if(project) {
        filenames.forEach(filename => {
            if(project.images.indexOf(filename) === -1) {
                project.images.push({
                    filename: filename,
                    is_build: 0
                });
            }
        })
        const updated_project = await project.save();
        return res.json(updated_project);
    } else {
        return res.status(400).json({message: "Project does not exist"});
    }
})

router.get('/:dirpath/:filename', async(req, res) => {
    const dirpath = req.params.dirpath;
    const filename = req.params.filename;
    res.sendFile(path.join(__dirname, '../upload/' + dirpath + '/' + filename));
})

router.post('/build', passport.authenticate('jwt', { session: false }), async(req, res) => {
    const upload_path = path.join(__dirname, `../upload/${req.user.id}_${req.body.project_name}`);

    const project = await Project.findOne({
        user: req.user.id,
        name: req.body.project_name
    });
    const files_will_upload = project.images.filter(img => img.is_build === 0);

    try {
        const usdz_files = req.files.usdz;
        if(usdz_files instanceof Array) {
            await usdz_files.forEach((f, index) => {
                const filename = files_will_upload[index].filename;
                f.mv(`${upload_path}/${filename.split(".")[0]}.usdz`);
            });
        } else {
            const filename = files_will_upload[0].filename;
            await usdz_files.mv(`${upload_path}/${filename.split(".")[0]}.usdz`);
        }

        const glb_files = req.files.glb;
        if(glb_files instanceof Array) {
            await glb_files.forEach((f, index) => {
                const filename = files_will_upload[index].filename;
                f.mv(`${upload_path}/${filename.split(".")[0]}.glb`);
            });
        } else {
            const filename = files_will_upload[0].filename;
            await glb_files.mv(`${upload_path}/${filename.split(".")[0]}.glb`);
        }

        project.images.filter(img => img.is_build === 0).map(i => i.is_build = 1);
        await project.save();


        return res.json({ success: true, project: project });
    } catch (err) {
        console.log(err);
        return res.json({ success: false });
    }
})

module.exports = router;