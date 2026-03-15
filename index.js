let RouteJson;
document.title = '';

function route(str, url = null) {
	// console.log(window.location);
	try {
		let req = new XMLHttpRequest();
		req.open('GET', str, true);
		req.send();
		req.onreadystatechange = function() {
			if (req.readyState == 4 && req.status === 200) {
				let htmlContent = req.responseText;
				let titleStart = htmlContent.toLowerCase().toLowerCase().indexOf("<title>") + 7;
				let titleEnd = htmlContent.toLowerCase().toLowerCase().indexOf("</title>");
				let pageTitle = htmlContent.substring(titleStart, titleEnd)
				document.title = pageTitle;
				document.getElementById('root').innerHTML = htmlContent;

				// console.log(titleStart);
				// console.log(pageTitle)
				// console.log(titleEnd);
				let titleCollection = document.getElementsByTagName('title')[1]
				history.pushState(null, null, url);
				titleCollection.remove();
			}
		};
	} catch (err) {
		console.log(err);
	}
}

window.onload = function() {
	// route('/', window.location.pathname);
	let req = new XMLHttpRequest();
	req.open('GET','/routes.json',true);
	req.send();
	req.onreadystatechange = function() {
		if (req.readyState == 4 && req.status === 200) {
			RouteJson = JSON.parse(req.responseText);
			// console.log(RouteJson["routes"]);
			for (key in RouteJson['routes']) {
				let val = RouteJson['routes'][key];
				if (window.location.pathname == key) {
					// console.log([key, val]);
					route(val, key);
					return 0;
				}
			}
		}
	}
}

document.body.addEventListener("click", function(e) {
	// e.target was the clicked element
	if(e.target && e.target.nodeName == "A") {
		// console.log(e.target);
		e.preventDefault()
		for (key in RouteJson['routes']) {
			let gotolink = window.location.protocol + "//" + window.location.host + key;
			let gotlink = e.target.href.substr(0, e.target.href.length);
			let value = RouteJson.routes[key];
			// console.log([key, value]);
			if (gotlink === gotolink) {
				// console.log(`storelink: ${gotlink}
// gotolink: ${gotolink}`);
				localStorage.setItem('lastLink', gotolink);
				// console.log(localStorage);
				route(value, key);
			}
		}
		// alert(e.target.innerText);
	}
});

window.addEventListener('popstate', (e) => {
	e.preventDefault();
	console.log(window.location.pathname);
	// route(localStorage.getItem('lastLink'), "a");
	console.log();
	route(RouteJson.routes[window.location.pathname]);
});

// console.log(history);
let links = document.querySelectorAll('a');
for (value in links) {
	// console.log()
};

// history.pushState(null, null,"/second");
// console.log(window.location.pathname);
