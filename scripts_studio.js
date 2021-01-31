
 function curPic(n) {
     clearTimeout(timer);
     displayPics(index = n);
 }

 function displayPics(n) {
     var i;
     var slides = document.getElementsByClassName("pics");
     var dots = document.getElementsByClassName("dot");
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
     timer = setTimeout(displayPics, 5000);
 }