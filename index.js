const express = require('express');
const { google } = require('googleapis');
const dotenv = require('dotenv');
const sheetRoute = require('./routes/sheet-route');
const app = express();
dotenv.config();
app.set('view engine', 'ejs');

app.get('/', (req, res, next) => {
	res.render('datas.ejs');
});

app.use('/sheet', sheetRoute);

app.use((err, req, res, next) => {
	console.log(err);
});

app.listen(5000, () => {
	console.log('listening on port 5000');
});
