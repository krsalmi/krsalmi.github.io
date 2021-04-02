var scroll_times = 0;

var scroll_index = 0;

/* This function listens to the change in video fullscreen settings, and
when it is out of fullscreen, the window is scrolled where it should be, by 
the video. Otherwise, the window would be scrolled to the top of the page.
*/
window.addEventListener('DOMContentLoaded', function () {

    var sect_team = document.getElementById("sect_team");

    document.addEventListener("fullscreenchange", function() {
        scroll_index++;
        if (scroll_index % 2 == 0) {
            sect_team.scrollIntoView();
        }
    }, false);

    document.addEventListener("msfullscreenchange", function() {
        scroll_index++;
        if (scroll_index % 2 == 0) {
            sect_team.scrollIntoView();
        }
    }, false);

    document.addEventListener("mozfullscreenchange", function() {
        scroll_index++;
        if (scroll_index % 2 == 0) {
            sect_team.scrollIntoView();
        }
    }, false);

    document.addEventListener("webkitfullscreenchange", function() {
        scroll_index++;
        if (scroll_index % 2 == 0) {
            sect_team.scrollIntoView();
        }
    }, false);
})
/* These two functions control the (fade-in/fade-out displaying) of the 
'carousel-arrows' which are situated on each side of the carousel images.
The 'else' case in the first function is for when an image is changed
automatically by the slideshow or we don't want any fade to happen and the
display to stay as 'block'. In this case, the display:block has to 
happen with a slight delay, otherwise it is overturned by the original
display:none in the 'carousel-arrows'. Also, if screen width is smaller
than 800, nothing will happen at all.
*/

function displaySlowlyOnHover(stay_visible) {
    var w = window.innerWidth;
    const element = document.getElementById('carousel-arrows');

    if (w > 800) {
        if (stay_visible  === 0) {
            element.classList.remove("fade-out-div");
            element.classList.add("fade-in-div");
            element.style.display = "block";
        } else {
            setTimeout(function(){
                element.style.display = "block";
            }, 500);
        }
    }
}


function hideElement(stay_visible) {
    var w = window.innerWidth;
    const element = document.getElementById('carousel-arrows');

    if (w > 800) {
        if (stay_visible === 0){
            element.classList.remove("fade-in-div");
            element.classList.add("fade-out-div");
            setTimeout(function() {
            element.style.display = "none";
            //console.log("im hiding and timer");
            }, 500);
        }
    }
}

 /* This function checks to see if any of the 'sections' in the 'section_list'
 is displayed at the top of the window. If so, it searches for the second child of
 that 'selection' (which is the .under_navbar div) and changes its background color,
 because otherwise the see-through menu bar wouldn't be properly visible. If the
 element is not at the top of the screen, its child div will be white. It also
 controls the events in which we arrive directly to the section via the navbar
 links. In this case there will be no fade-in.
 */

function changeColorUnderNavbar(clicked) {
	console.log("gonna change color under navbar");
    var section_list = ["sect_services", "sect_team", "sect_contact", "sect_media", "sect_shop", "sect_booking"];
    var live_side = ["sect_media", "sect_shop", "sect_booking"];
    section_list.forEach(checkPos);
    function checkPos(item){
        scroll_times++;
        if (clicked == 1) {
            scroll_times = 0;
        }
        var sect_item = document.getElementById(item);
        if (sect_item) {
            var under_nav = sect_item.childNodes;
            if (sect_item.getBoundingClientRect().top == 0) {
                if (live_side.includes(item)) {
                    under_nav[1].style.backgroundColor = "#003ca3"
                }
                else {
                    under_nav[1].style.backgroundColor = "#a30000";
                }
                if (scroll_times > 30) {
                    under_nav[1].classList.add("fade-in-div");
                    scroll_times = 0;
                }
            } else {
                under_nav[1].style.backgroundColor = 'white';
                under_nav[1].classList.remove("fade-in-div");
            }
        }
    }
    return (scroll_times);
}

/* Inspired by W3.School
Image carousel slideshow with automatic as well as manual changing.
When the image changes, if the cursor is on the 'carousel' div,
it will send to 'displaySlowlyOnHover' as the special 'else' case.
*/

 function curPic(n) {
     clearTimeout(timer);
     displayPics(index = n);
 }

 function nextPic(n) {
    clearTimeout(timer);
    displayPics(index += n);
  }


  /* This will only happen in Safari, the other browsers work fine with
  css only.
  */
  function fadeInImage(element) {
    var op = 0.5;  // initial opacity
    var img_timer = setInterval(function () {
        if (op >= 1){
            clearInterval(img_timer);
        }
        element.style.opacity = op;
        op += 0.1;
    }, 40);
}


 function displayPics(n) {
     var i;
     var slides = document.getElementsByClassName("pics");
     var dots = document.getElementsByClassName("dot");
     var carousel = document.getElementsByClassName("carousel_pics");
     if (n == undefined){
        n = ++index;
     }
     if (n > slides.length) {
         index = 1;
     }
     if (n < 1) {
         index = slides.length;
     }
     for (i = 0; i < slides.length; i++) {
         slides[i].style.display = "none";
     }
     for (i = 0; i < dots.length; i++) {
         dots[i].className = dots[i].className.replace(" active", "");
     }
     slides[index-1].style.display = "block";

     if (navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf('Chrome') == -1) {
        fadeInImage(slides[index-1]);}

     dots[index-1].className += " active";
     timer = setTimeout(displayPics, 3500);

     var carousel = document.getElementById("carousel_pics");
     var arrows = document.getElementById("carousel-arrows")
     carousel.addEventListener("mouseover", displaySlowlyOnHover);
 }

 var menu_i = 0;
 function displayMenu() {
    var navigation = document.getElementById("navbar");
    menu_i++;
    if (menu_i % 2 != 0) {
        navigation.style.height="294px";
        document.getElementById("navbarSupportedContent").style.display="block";
        document.getElementById("collapse_menu").style.backgroundColor="rgba(19, 18, 18, 0.9)";
    } else {
        navigation.style.height="65px";
        document.getElementById("navbarSupportedContent").style.display="none";
        document.getElementById("collapse_menu").style.backgroundColor="";
    }
        
 }
