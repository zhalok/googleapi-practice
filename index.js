const express = require('express');
const { google } = require('googleapis');
const dotenv = require('dotenv');
const app = express();
dotenv.config();
app.set('view engine', 'ejs');

const auth = new google.auth.GoogleAuth({
	keyFile: 'key.json', //the key file
	//url to spreadsheets API
	scopes: 'https://www.googleapis.com/auth/spreadsheets',
});

app.get('/', async (req, res, next) => {
	const authClientObject = await auth.getClient();
	const googleSheetsInstance = google.sheets({
		version: 'v4',
		auth: authClientObject,
	});
	const spreadsheetId = process.env.spreadsheetId;

	const readData = await googleSheetsInstance.spreadsheets.values.get({
		auth, //auth object
		spreadsheetId, // spreadsheet id
		range: 'Form Responses 1!A:Z', //range of cells to read from.
	});

	const keys = readData.data.values[0];
	const arr = [];
	for (let i = 1; i < readData.data.values.length; i++) {
		let cur = readData.data.values[i];
		const cur_obj = {};
		for (let j = 0; j < cur.length; j++) {
			cur_obj[keys[j]] = cur[j];
		}
		arr.push(cur_obj);
	}
	res.json(arr);
});

app.listen(5000, () => {
	console.log('listening on port 5000');
});
