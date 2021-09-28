require('../node_modules/@salesforce-ux/design-system/assets/styles/salesforce-lightning-design-system.css');

var SDK = require('blocksdk');
var sdk = new SDK(null, null, true); // 3rd argument true bypassing https requirement: not prod worthy

var address, width, height, zoom, link, mapsKey;

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
	document.getElementById('text-input-id-1').value = address;
	document.getElementById('slider-id-01').value = width;
	document.getElementById('slider-id-02').value = height;
	document.getElementById('slider-id-03').value = zoom;
}

function paintSliderValues () {
	document.getElementById('slider-id-01-val').innerHTML = document.getElementById('slider-id-01').value;
	document.getElementById('slider-id-02-val').innerHTML = document.getElementById('slider-id-02').value;
	document.getElementById('slider-id-03-val').innerHTML = document.getElementById('slider-id-03').value;
}

function paintMap() {
	mapsKey = document.getElementById('text-input-id-0').value;
	address = document.getElementById('text-input-id-1').value;
	width = document.getElementById('slider-id-01').value;
	height = document.getElementById('slider-id-02').value;
	zoom = document.getElementById('slider-id-03').value;
	link = document.getElementById('text-input-id-2').value;
	if (!address) {
		return;
	}
	sdk.setContent('<div>+mapsKey+</div>');
	sdk.setData({
		mapsKey: mapsKey
	});
	localStorage.setItem('googlemapsapikeyforblock', mapsKey);
}

sdk.getData(function (data) {
	mapsKey = data.mapsKey || localStorage.getItem('googlemapsapikeyforblock');
});

document.getElementById('workspace').addEventListener("input", function () {
	debounce(paintMap, 500)();
	paintSliderValues();
});
