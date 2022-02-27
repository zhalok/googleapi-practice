const express = require('express');
const { google } = require('googleapis');
const dotenv = require('dotenv');
const sheetRoute = require('./routes/sheet-route');
const app = express();

dotenv.config();
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

app.use('/', express.static('public'));

app.use('/sheet', sheetRoute);

app.use((err, req, res, next) => {
	console.log(err);
});

app.listen(process.env.PORT, () => {
	console.log('listening on port 5000');
});
