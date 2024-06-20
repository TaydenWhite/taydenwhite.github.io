---
title: Content
linkTitle: Content
menu: {main: {weight: 10}}
---

{{% blocks/cover title="Content" image_anchor="bottom" height="auto" %}}

The purpose of this is to integrate content from my personal use.
{.mt-5}

{{% /blocks/cover %}}

# New York Weather

Stay updated with the current weather in New York City:

<a class="weatherwidget-io" href="https://forecast7.com/en/40d71n74d01/new-york/" data-label_1="NEW YORK" data-label_2="WEATHER" data-theme="original" >NEW YORK WEATHER</a>
<script>
!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0];if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src='https://weatherwidget.io/js/widget.min.js';fjs.parentNode.insertBefore(js,fjs);}}(document,'script','weatherwidget-io-js');
</script>

---

# Nikunj Dani YouTube Video

Explore this insightful video from my Dad filmed in 2014:

<iframe width="560" height="315" src="https://www.youtube.com/embed/2gKGoYYufd0" frameborder="0" allowfullscreen></iframe>

---

## Data Table

Here is a searchable table displaying different speeds of cars:

{{< searchable-table id="Speed" csvFile="https://docs.google.com/spreadsheets/d/e/2PACX-1vRps3APzgmwwc2DIkKENuy4VZxGP3__2DN2AoiUOKsBZCq7ViPLKUJi68yG-Lk-tfNoA6jzVyYKEaQj/pub?output=csv" downloadLink="https://docs.google.com/spreadsheets/d/e/2PACX-1vRps3APzgmwwc2DIkKENuy4VZxGP3__2DN2AoiUOKsBZCq7ViPLKUJi68yG-Lk-tfNoA6jzVyYKEaQj/pub?output=csv">}} 

---

<!-- Particles Background -->
<!-- This section adds a dynamic particles background to your page. -->
<div id="particles-js" style="position: absolute; width: 100%; height: 100%;"></div>
<script src="https://cdn.jsdelivr.net/particles.js/2.0.0/particles.min.js"></script>
<script>
  document.addEventListener('DOMContentLoaded', function() {
    particlesJS('particles-js', {
      particles: {
        number: { value: 80, density: { enable: true, value_area: 800 } },
        color: { value: "#ffffff" },
        shape: { type: "circle" },
        opacity: { value: 0.5 },
        size: { value: 3 },
        line_linked: { enable: true, distance: 150, color: "#ffffff", opacity: 0.4, width: 1 },
        move: { enable: true, speed: 2 }
      },
      interactivity: {
        detect_on: "canvas",
        events: { onhover: { enable: true, mode: "repulse" }, onclick: { enable: true, mode: "push" } },
        modes: { repulse: { distance: 100 }, push: { particles_nb: 4 } }
      }
    });
  });
</script>