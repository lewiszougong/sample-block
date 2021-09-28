require('../node_modules/@salesforce-ux/design-system/assets/styles/salesforce-lightning-design-system.css');

var SDK = require('blocksdk');
var sdk = new SDK(null, null, true); // 3rd argument true bypassing https requirement: not prod worthy

var link, mapsKey;

function debounce (func, wait, immediate) {
	var timeout;
	return function() {
		var context = this, args = arguments;
		var later = function() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		var callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
}

function paintSettings () {
	document.getElementById('text-input-id-0').value = mapsKey;
}

function paintSliderValues () {
}

function paintMap() {
	mapsKey = document.getElementById('text-input-id-0').value;
	link = document.getElementById('text-input-id-2').value;

//	var url = 'https://maps.googleapis.com/maps/api/staticmap?center=' +
//		address.split(' ').join('+') + '&size=' + width + 'x' + height + '&zoom=' + zoom +
//		'&markers=' + address.split(' ').join('+') + '&key=' + mapsKey;
	sdk.setContent(mapsKey);
	sdk.setData({
		link: link,
		mapsKey: mapsKey
	});
	localStorage.setItem('consent', mapsKey);
}

sdk.getData(function (data) {
	link = data.link || '';
	mapsKey = data.mapsKey || localStorage.getItem('consent');
	paintSettings();
	paintSliderValues();
	paintMap();
});

document.getElementById('workspace').addEventListener("input", function () {
	debounce(paintMap, 500)();
	paintSliderValues();
});
