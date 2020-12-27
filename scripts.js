var links = ["#studio", "#footer"]
var i = 0

function changeDirect() {
    if (i < links.length) {
        document.getElementById("link_direction").href = links[i];
        i += 1;
        console.log("Hyperlink Changed");
    }
}

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
        Support click to open if dealing with a touchscreen
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