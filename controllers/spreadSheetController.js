const { google } = require('googleapis');
const utils = require('../utils');

const spreadsheetController = {};

const auth = new google.auth.GoogleAuth({
	keyFile: 'key.json', //the key file
	//url to spreadsheets API
	scopes: 'https://www.googleapis.com/auth/spreadsheets',
});

spreadsheetController.readData = async (req, res, next) => {
	let { name } = req.query;
	const authClientObject = await auth.getClient();
	const googleSheetsInstance = google.sheets({
		version: 'v4',
		auth: authClientObject,
	});
	const { spreadsheetId } = req.params;

	const readData = await googleSheetsInstance.spreadsheets.values.get({
		auth, //auth object
		spreadsheetId, // spreadsheet id
		range: 'Active students!A:Z', //range of cells to read from.
	});
	// console.log(readData);
	// res.json(readData);
	// readData.json();
	// console.log(readData);
	// const keys = readData.data.values[0];
	// const arr = [];
	// for (let i = 1; i < readData.data.values.length; i++) {
	// 	let cur = readData.data.values[i];
	// 	const cur_obj = {};
	// 	for (let j = 1; j < cur.length; j++) {
	// 		cur_obj[keys[j]] = cur[j];
	// 	}
	// 	arr.push(cur_obj);
	// }
	const arr = utils.sheetDataParse(readData);

	// res.json(arr);
	// console.log(name);
	// console.log(arr[0]['full name']);
	// res.json(arr);

	// console.log(arr[0]['full name']);
	// res.json(arr[0]['full name']);
	const result = [];
	name = name.trim();
	// // console.log(name);
	for (let i = 0; i < arr.length; i++) {
		// console.log(arr[i]['full name']);
		if (
			name &&
			arr[i]['full name'] &&
			utils.matcher(arr[i]['full name'], name)
		) {
			result.push(arr[i]);
		}
	}
	res.json(result);
	// res.render('error.ejs');

	// res.render('datas.ejs', {
	// 	data: arr[0]['full name'],
	// });
};

spreadsheetController.sortData = async (req, res, next) => {
	const { spreadsheetId } = req.query;

	// res.json('hello');
	const authClientObject = await auth.getClient();
	const googleSheetsInstance = google.sheets({
		version: 'v4',
		auth: authClientObject,
	});
	const readData = await googleSheetsInstance.spreadsheets.values.get({
		auth, //auth object
		spreadsheetId, // spreadsheet id
		range: 'Form Responses 1!A:Z', //range of cells to read from.
	});
	const arr = utils.sheetDataParse(readData);
	arr.map((e) => (e.Group = parseInt(e.Group)));
	arr.sort((a, b) => a.Group - b.Group);
	res.json(arr);
};
module.exports = spreadsheetController;
