const { google } = require('googleapis');

const spreadsheetController = {};

const auth = new google.auth.GoogleAuth({
	keyFile: 'key.json', //the key file
	//url to spreadsheets API
	scopes: 'https://www.googleapis.com/auth/spreadsheets',
});

spreadsheetController.readData = async (req, res, next) => {
	const authClientObject = await auth.getClient();
	const googleSheetsInstance = google.sheets({
		version: 'v4',
		auth: authClientObject,
	});
	const { spreadsheetId } = req.params;
	// console.log(req.params);
	// console.log(spreadSheetId);

	const readData = await googleSheetsInstance.spreadsheets.values.get({
		auth, //auth object
		spreadsheetId, // spreadsheet id
		range: 'Active students!A:Z', //range of cells to read from.
	});

	const keys = readData.data.values[0];
	const arr = [];
	for (let i = 1; i < readData.data.values.length; i++) {
		let cur = readData.data.values[i];
		const cur_obj = {};
		for (let j = 1; j < cur.length; j++) {
			cur_obj[keys[j]] = cur[j];
		}
		arr.push(cur_obj);
	}
	// res.json(arr);

	res.render('datas.ejs', {
		data: arr[0]['full name'],
	});
};

module.exports = spreadsheetController;
