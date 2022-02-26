const express = require('express');
const spreadsheetController = require('../controllers/spreadSheetController');
const router = express.Router();

router.get('/:spreadsheetId', spreadsheetController.readData);

module.exports = router;
