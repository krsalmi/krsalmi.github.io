/* These two functions control the (fade-in/fade-out displaying) of the 
'carousel-arrows' which are situated on each side of the carousel images.
The 'else' case in the first function is for when an image is changed
automatically by the slideshow or we don't want any fade to happen and the
display to stay as 'block'. In this case, the display:block has to 
happen with a slight delay, otherwise it is overturned by the original
display:none in the 'carousel-arrows'.
*/

function displaySlowlyOnHover(stay_visible) {
    const element = document.getElementById('carousel-arrows');
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

function hideElement(stay_visible) {
    const element = document.getElementById('carousel-arrows');
    if (stay_visible === 0){
        element.classList.remove("fade-in-div");
        element.classList.add("fade-out-div");
        setTimeout(function() {
        element.style.display = "none";
        //console.log("im hiding and timer");
        }, 500);
    }

}

 /* This function checks to see if any of the 'sections' in the 'section_list'
 is displayed at the top of the window. If so, it searches for the second child of
 that 'selection' (which is the .under_navbar div) and changes its background color,
 because otherwise the see-through menu bar wouldn't be properly visible. If the
 element is not at the top of the screen, its child div will be white.
 */

function changeColorUnderNavbar() {
    var section_list = ["sect_services", "sect_team", "sect_contact"];
    section_list.forEach(checkPos);
    function checkPos(item){
        var sect_item = document.getElementById(item);
        var under_nav = sect_item.childNodes;
        if (sect_item.getBoundingClientRect().top == 0) {
            under_nav[1].style.backgroundColor = "#A30000";
            under_nav[1].classList.add("fade-in-div");
        } else {
            under_nav[1].style.backgroundColor = 'white';
            under_nav[1].classList.remove("fade-in-div");
        }
    }
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

 function displayPics(n) {
     var i;
     var slides = document.getElementsByClassName("pics");
     var dots = document.getElementsByClassName("dot");
     var carousel = document.getElementsByClassName("carousel");
     if (n==undefined){
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
     dots[index-1].className += " active";
     timer = setTimeout(displayPics, 3500);

     var carousel = document.getElementById("carousel");
     var arrows = document.getElementById("carousel-arrows")
     carousel.addEventListener("mouseover", displaySlowlyOnHover);
 }
