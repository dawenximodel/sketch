(function(doc, win) {
	const UI = {
		width: 750,
		baseonFontsize: 31
	};
	
	let docEl = doc.documentElement,
		resizeEvt = "orientationchange" in window ? "orientationchange" : "resize",
		recalc = function() {
			
			const isPC = !(navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i));

			if (isPC) {
				docEl.style.fontSize = "14px";
				return;
			}

			let clientWidth = docEl.clientWidth;
			if (!clientWidth) return;
			if (clientWidth >= UI.width) {
				docEl.style.fontSize = UI.baseonFontsize + "px";
			} else {
				docEl.style.fontSize = UI.baseonFontsize * (clientWidth / UI.width) + "px";
			}
		};

	if (!doc.addEventListener) return;
	win.addEventListener(resizeEvt, recalc, false);
	doc.addEventListener("DOMContentLoaded", recalc, false);
})(document, window);
