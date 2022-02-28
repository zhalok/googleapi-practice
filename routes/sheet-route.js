const express = require('express');
const spreadsheetController = require('../controllers/spreadSheetController');
const router = express.Router();

router.get('/getInfo/:spreadsheetId', spreadsheetController.readData);
router.get('/sort', spreadsheetController.sortData);

module.exports = router;
