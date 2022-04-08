const express = require('express');
const path = require('path');

const router = express.Router();

router.get('/:dirpath/:filename', async(req, res) => {
    const dirpath = req.params.dirpath;
    const filename = req.params.filename;
    
    res.sendFile(path.join(__dirname, '../template/' + dirpath + '/' + filename));
})

module.exports = router;