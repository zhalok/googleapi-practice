const express = require('express');
const { google } = require('googleapis');
const app = express();
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
	const spreadsheetId = '1Tbtn_-g_RNnL1BpEnoBelGnDIwz6t2VVqlHZwFnJthU';

	const readData = await googleSheetsInstance.spreadsheets.values.get({
		auth, //auth object
		spreadsheetId, // spreadsheet id
		range: 'Form Responses 1!A:A', //range of cells to read from.
	});
	res.json(readData);
});

app.listen(5000, () => {
	console.log('listening on port 5000');
});
