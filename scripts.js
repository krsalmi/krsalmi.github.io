window.addEventListener("resize", function () {
    var w = window.innerWidth;
    if (w < 750) {
        document.getElementById("hidden_div").style.display="block";
    }
    else {
        document.getElementById("hidden_div").style.display="none";
    }
})

function showElement() {
    var w = window.innerWidth;
    if (w > 750) {
        document.getElementById("hidden_div").style.display="block";
    }
}

function hideElement() {
    var w = window.innerWidth;
    if (w > 750) {
        document.getElementById("hidden_div").style.display="none";
    }
}
