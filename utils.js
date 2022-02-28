const utils = {};
utils.matcher = (text1, text2) => {
	const arr1 = text1.split(' ');
	const arr2 = text2.split(' ');
	let _text1 = '';
	let _text2 = '';
	for (let i = 0; i < arr1.length; i++) _text1 += arr1[i];
	for (let i = 0; i < arr2.length; i++) _text2 += arr2[i];
	_text1 = _text1.toLowerCase();
	_text2 = _text2.toLowerCase();
	if (_text1.length > _text2.length) {
		if (_text1.includes(_text2)) return true;
		else return false;
	} else {
		if (_text2.includes(_text1)) return true;
		else return false;
	}
};

utils.sheetDataParse = (sheetData) => {
	const keys = sheetData.data.values[0];
	const arr = [];
	for (let i = 1; i < sheetData.data.values.length; i++) {
		let cur = sheetData.data.values[i];
		const cur_obj = {};
		for (let j = 1; j < cur.length; j++) {
			cur_obj[keys[j]] = cur[j];
		}
		arr.push(cur_obj);
	}
	return arr;
};

module.exports = utils;

// const text1 = 'hello';
// const text2 = 'hel';
// console.log(text1.includes(text2));
