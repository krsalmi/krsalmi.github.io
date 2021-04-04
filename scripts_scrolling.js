/* A function to make scrolling to different sections on the page smooth. But in a
		way that preserves the snap scroll functionality. To do this, the 'scroll-container' class
		which has the snap attribute, must be removed. When this happens, by default the page scrolls
		to the top, so the current position must be saved in 'pos'. 
		Function will only happen, if browser is google chrome.
		*/
		
		function slowScrollToggleClass(pos, href) {
			var target;

			target = $(href).offset().top + pos;
			$("#scroll-container").removeClass("scroll-container");
			$("#scroll-container").scrollTop(pos); //back to original position, because when scroll-container class is removed, the window goes to top
			
			$("#scroll-container").animate({ scrollTop: target }, 800);
			
			setTimeout(function() {
				console.log("adding class back");
				$("#scroll-container").addClass("scroll-container");	
			}, 800);
		}

		function handleScroll(e, href, pos) {
			// Parts concerning determining the browser are from 
			//https://stackoverflow.com/questions/4565112/javascript-how-to-find-out-if-the-user-browser-is-chrome/13348618#13348618
			var isChromium = window.chrome;
			var winNav = window.navigator;
			var vendorName = winNav.vendor;
			var isOpera = typeof window.opr !== "undefined";
			var isIEedge = winNav.userAgent.indexOf("Edge") > -1;
			var isIOSChrome = winNav.userAgent.match("CriOS");
			
			// console.log("triggered"); //debug
			// console.log(pos);
			
			if (href != "studio.html" && href != "live.html" && (isIOSChrome ||
				(isChromium !== null && typeof isChromium !== "undefined" &&
					vendorName === "Google Inc." && isOpera === false && isIEedge === false))) {
				e.preventDefault();
        		slowScrollToggleClass(pos, href);
    			sole.log("else is happening with timeout");
			}	
		}