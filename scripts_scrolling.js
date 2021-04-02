// smooth scrolling script from https://codepen.io/stefan12/pen/LvRqWN
//I added code so that scrolling would be smooth even with scroll-snap
//sections.

window.addEventListener('DOMContentLoaded', function () {
	(function() {
		let d = document;
		let scroll_div = d.getElementById("scroll-container");
		console.log(scroll_div);
		
		function init() {
			//Links on 'live' page 
			let link_tour1  = d.getElementById('link_tour1');
			let link_media1  = d.getElementById('link_media1');
			let link_shop1  = d.getElementById('link_shop1');
			let link_booking1  = d.getElementById('link_booking1');
			//Anchors
			let sect_tour      = d.getElementById('sect_tour');
			let sect_media      = d.getElementById('sect_media');
			let sect_shop      = d.getElementById('sect_shop');
			let sect_booking      = d.getElementById('sect_booking');

			//links on 'studio' page
			let link_ref1 = d.getElementById('link_ref1');
			let link_services1 = d.getElementById('link_services1');
			let link_team1 = d.getElementById('link_team1');
			let link_contact1 = d.getElementById('link_contact1');
			//Anchors
			let sect_carousel = d.getElementById('sect_carousel');
			let sect_services = d.getElementById('sect_services');
			let sect_team = d.getElementById('sect_team');
			let sect_contact = d.getElementById('sect_contact');

			if (link_tour1)
			{
				console.log("link_tour1 exists");
				link_tour1.addEventListener('click', (e) => { scrollTo(sect_tour, e) }, false);
			}
			if (link_media1)
				link_media1.addEventListener('click', (e) => { scrollTo(sect_media, e) }, false);
			if (link_shop1)
				link_shop1.addEventListener('click', (e) => { scrollTo(sect_shop, e) }, false);
			if (link_booking1)
				link_booking1.addEventListener('click', (e) => { scrollTo(sect_booking.offsetTop, e) }, false);
			
			if (link_ref1)
			{
				console.log("link_ref1 exists");
				link_ref1.addEventListener('click', (e) => { scrollTo(sect_carousel, e) }, false);
			}
			if (link_services1)
				link_services1.addEventListener('click', (e) => { scrollTo(sect_services, e) }, false);
			if (link_team1)
				link_team1.addEventListener('click', (e) => { scrollTo(sect_team, e) }, false);
			if (link_contact1)
				link_contact1.addEventListener('click', (e) => { scrollTo(sect_contact.offsetTop, e) }, false);
			else
				console.log("link_contact1 doesnt exists!");
		}
		
		function scrollTopValue(domElement) { //DEBUG
			return 'scrollTopValue:', domElement.scrollTop;
		}
		function offsetTopValue(domElement) { //DEBUG
			return 'offsetTopValue:', domElement.offsetTop;
		}


		//cf. https://gist.github.com/james2doyle/5694700
		// requestAnimationFrame for Smart Animating https://goo.gl/sx5sts
		var requestAnimFrame = (function() {
			return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function(callback) {
				window.setTimeout(callback, 1000 / 60);
			};
		})();

		function scrollTo(to, callback, duration = 1500) {
			
			scroll_div.classList.remove("scroll-container");
			
			if (isDomElement(to)) {

				to = to.offsetTop;
			}
			
			function move(amount) {
			
				document.documentElement.scrollTop = amount;
				document.body.parentNode.scrollTop = amount;
				document.body.scrollTop = amount;
			}

			function position() {
				return document.documentElement.offsetTop || document.body.parentNode.offsetTop || document.body.offsetTop;
			}
			
			var start = position(),
				change = to - start,
				currentTime = 0,
				increment = 20;
			console.log('start:', start); //DEBUG
			console.log('to:', to); //DEBUG
			console.log('change:', change); //DEBUG
			
			var animateScroll = function() {
				// increment the time
				currentTime += increment;
				// find the value with the quadratic in-out easing function
				var val = Math.easeInOutQuad(currentTime, start, change, duration);
				// move the document.body
				move(val);
				// do the animation unless its over
				if (currentTime < duration) {
					requestAnimFrame(animateScroll);
				}
				else {
					if (callback && typeof(callback) === 'function') {
						// the animation is done so lets callback
						callback();
					}
				}
			};
			
			animateScroll();
			scroll_div.classList.add("scroll-container");

		}

		init();
	})();

	//-------------------- Unimportant js functions --------------------
	// easing functions https://goo.gl/5HLl8
	//t = current time
	//b = start value
	//c = change in value
	//d = duration
	Math.easeInOutQuad = function(t, b, c, d) {
		t /= d / 2;
		if (t < 1) {
			return c / 2 * t * t + b
		}
		t--;
		return -c / 2 * (t * (t - 2) - 1) + b;
	};

	Math.easeInCubic = function(t, b, c, d) {
		var tc = (t /= d) * t * t;
		return b + c * (tc);
	};

	Math.inOutQuintic = function(t, b, c, d) {
		var ts = (t /= d) * t,
			tc = ts * t;
		return b + c * (6 * tc * ts + -15 * ts * ts + 10 * tc);
	};

	function isDomElement(obj) {
		return obj instanceof Element;
	}

	function isMouseEvent(obj) {
		return obj instanceof MouseEvent;
	}

	function findScrollingElement(element) { //FIXME Test this too
		do {
			if (element.clientHeight < element.scrollHeight || element.clientWidth < element.scrollWidth) {
				return element;
			}
		} while (element = element.parentNode);
	}
})