document.title = '';
window.onload = function() {
	// route('/', window.location.pathname);
	let req = new XMLHttpRequest();
	req.open('GET','/routes.json',true);
	req.send();
	req.onreadystatechange = function() {
		if (req.readyState == 4 && req.status === 200) {
			let RouteJson = JSON.parse(req.responseText);
			// console.log(RouteJson["routes"]);
			for (key in RouteJson['routes']) {
				let val = RouteJson['routes'][key];
				console.log([key, val]);
				if (window.location.pathname == key) {
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
		console.log(e.target);
		e.preventDefault()
		route(e.target.href, e.target.nodeName);
		// alert(e.target.innerText);
	}
});

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
				console.log(titleCollection.remove());
			}
		};
	} catch (err) {
		console.log(err);
	}
}

let links = document.querySelectorAll('a');
for (value in links) {
	console.log()
};
// links.forEach(function(value) {
// 	console.log(value);
// });

// history.pushState(null, null,"/second");
// console.log(window.location.pathname);
