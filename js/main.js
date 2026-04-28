/* =========================================================================
   main.js
   Holder seg bevisst kort. Tre ansvarsområder:

     1. Sticky nav: legg til .is-scrolled når siden er rullet et stykke ned.
     2. Reveal: fade inn elementer med .reveal når de kommer i viewport.
     3. Filter: filtrer arbeids-listen i arbeid.html basert på data-filter.

   Ingen frameworks. Ingen avhengigheter. Vanilla.
   ========================================================================= */

(function () {
  "use strict";

  // ---- 1. Sticky nav --------------------------------------------------------
  // Toggle .is-scrolled på <header.nav> når siden er rullet > 24px.
  // Threshold er lav slik at navigasjonen reagerer tidlig nok til at den
  // ikke "hopper" på korte sider. Sider som ikke har hero (alle utenom
  // index) har .is-scrolled satt fra start i HTML, og overstyres ikke her.
  const nav = document.getElementById("nav");
  if (nav) {
    const onScroll = () => {
      if (window.scrollY > 24) nav.classList.add("is-scrolled");
      else if (!nav.dataset.lockScrolled) nav.classList.remove("is-scrolled");
    };
    // Hvis siden ikke har hero, fryser vi tilstanden slik at scroll-up
    // ikke gjør nav transparent igjen.
    if (nav.classList.contains("is-scrolled")) {
      nav.dataset.lockScrolled = "true";
    } else {
      window.addEventListener("scroll", onScroll, { passive: true });
      onScroll();
    }
  }

  // ---- 2. Reveal on scroll --------------------------------------------------
  // IntersectionObserver er billig og effektiv. Bruker rootMargin slik at
  // elementer fades inn litt før de er fullt synlige (føles mer naturlig
  // enn å vente til de når viewport-kanten).
  const revealEls = document.querySelectorAll(".reveal");
  if (revealEls.length && "IntersectionObserver" in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.05 });
    revealEls.forEach((el) => io.observe(el));
  } else {
    // Fallback: vis alt umiddelbart hvis IO ikke er tilgjengelig.
    revealEls.forEach((el) => el.classList.add("is-visible"));
  }

  // ---- 3. Filter på arbeid.html ---------------------------------------------
  // Knappene har data-filter. Hvert kort har data-cat. Vi viser/skjuler
  // ved å toggle .is-hidden, ikke display-property direkte, slik at
  // styling holder seg i CSS.
  const filterButtons = document.querySelectorAll(".filter[data-filter]");
  const workItems     = document.querySelectorAll(".work-item[data-cat]");

  if (filterButtons.length && workItems.length) {
    filterButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        const value = btn.dataset.filter;

        // Visuell tilstand på knappene.
        filterButtons.forEach((b) => {
          b.classList.toggle("is-active", b === btn);
          b.setAttribute("aria-selected", b === btn ? "true" : "false");
        });

        // Skjul / vis kort.
        workItems.forEach((item) => {
          const match = value === "all" || item.dataset.cat === value;
          item.classList.toggle("is-hidden", !match);
        });
      });
    });
  }

})();
