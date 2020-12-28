var links = [null, "live", "studio", "footer"]
var i = 0
const element = document.documentElement;

/*
** Function, which triggered the first time, scrolls down so that the thinner
** "info" div is visible on the bottom of the screen, and each time after, scrolls through
** the divs listed in the array "links".
*/
function scrollWin() {
    if (i == 0) {
        /*
        var intElemClientHeight = element.clientHeight;
        var halfway = intElemClientHeight / 10 * 6.2;
        window.scrollBy(0, halfway); */
        let intViewportHeight = window.innerHeight;
        window.scrollBy(0, intViewportHeight / 10 * 6.5);
        i += 1;
    }
    else {
        if (i < links.length) {
            var destination = document.getElementById(links[i]);
            destination.scrollIntoView();
            console.log(destination);
            i += 1;
        }
        else {
            window.scrollTo(0,0);
            i = 0;
        }
    }
}

/*
** Not my own function, credits to @mozzgov (github).
** In jquery, handles the hover dropdown nav menu and turns it into a clickable nav when a touch
** screen device is used.
*/

$(function()
{
    var $dropdowns = $('li.dropdown');

    $dropdowns
        .on('mouseover', function()
        {
            var $this = $(this);
            if ($this.prop('hoverTimeout')) {
                $this.prop('hoverTimeout', clearTimeout($this.prop('hoverTimeout')));
            }
            $this.prop('hoverIntent', setTimeout(function() {
                $this.addClass('hover');
            }, 250));
        })
        .on('mouseleave', function() {
            var $this = $(this);
            if ($this.prop('hoverIntent')) {
                $this.prop('hoverIntent', clearTimeout($this.prop('hoverIntent')));
            }
            $this.prop('hoverTimeout', setTimeout(function() {
                $this.removeClass('hover');
            }, 250));
        });

    /**
    **  Support click to open if dealing with a touchscreen.
     */
    if ('ontouchstart' in document.documentElement) {
        $dropdowns.each(function()
        {
            var $this = $(this);
            this.addEventListener('touchstart', function(e) {
                if (e.touches.length === 1) {
                    e.stopPropagation();

                    if (!$this.hasClass('hover')) {
                        // Prevent link on first touch
                        if (e.target === this || e.target.parentNode === this) {
                            e.preventDefault();
                        }

                        // Hide other open dropdowns
                        $dropdowns.removeClass('hover');
                        $this.addClass('hover');

                        // Hide dropdown on touch outside
                        document.addEventListener('touchstart', closeDropdown = function(e) {
                            e.stopPropagation();

                            $this.removeClass('hover');
                            document.removeEventListener('touchstart', closeDropdown);
                        });
                    }
                }
            }, false);
        });
    }
});