const utils = {};
utils.matcher = (text1, text2) => {
	const arr1 = text1.split(' ');
	const arr2 = text2.split(' ');
	const _text1 = '';
	const _text2 = ' ';
	for (let i = 0; i < arr1.length; i++) text1 += arr1[i];
	for (let i = 0; i < arr2.length; i++) text2 += arr2[i];
	text1 = text1.toLowerCase();
	text2 = text2.toLowerCase();
	if (text1.length > text2.length) {
		if (text1.includes(text2)) return true;
		else return false;
	} else {
		if (text2.includes(text1)) return true;
		else return false;
	}
};

module.exports = utils;
