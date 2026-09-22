
    /* ── Cursor ── */
    const c = document.getElementById('cur'), r = document.getElementById('curR');
    let mx = 0, my = 0, rx = 0, ry = 0;
    document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });
    (function tick() {
      c.style.left = mx + 'px'; c.style.top = my + 'px';
      rx += (mx - rx) * .13; ry += (my - ry) * .13;
      r.style.left = rx + 'px'; r.style.top = ry + 'px';
      requestAnimationFrame(tick);
    })();

    /* ── Mobile nav ── */
    document.getElementById('mbtn').addEventListener('click', () => {
      document.getElementById('mnav').classList.toggle('open');
    });
    document.querySelectorAll('#mnav a').forEach(a =>
      a.addEventListener('click', () => document.getElementById('mnav').classList.remove('open'))
    );

    /* ── Typing animation ── */
    const words = ['Software Developer', 'Python Full-Stack Developer', 'ML Enthusiast', 'UI/UX Designer'];
    let wi = 0, ci = 0, del = false;
    const el = document.getElementById('typed');
    function type() {
      const w = words[wi];
      if (!del) { el.textContent = w.slice(0, ++ci); if (ci === w.length) { del = true; setTimeout(type, 1800); return; } }
      else { el.textContent = w.slice(0, --ci); if (ci === 0) { del = false; wi = (wi + 1) % words.length; setTimeout(type, 300); return; } }
      setTimeout(type, del ? 48 : 85);
    }
    setTimeout(type, 1200);

    /* ── Scroll reveal ── */
    const obs = new IntersectionObserver(es => {
      es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('on'); obs.unobserve(e.target); } });
    }, { threshold: .1 });
    document.querySelectorAll('.rv').forEach(el => obs.observe(el));

    /* ── Skill bars (trigger on section visible) ── */
    const skillsObs = new IntersectionObserver(es => {
      es.forEach(e => {
        if (e.isIntersecting) {
          document.querySelectorAll('.pfill').forEach(f => f.classList.add('on'));
          skillsObs.disconnect();
        }
      });
    }, { threshold: .2 });
    const ss = document.getElementById('skills');
    if (ss) skillsObs.observe(ss);

    /* ── Resume iframe fallback ── */
    const iframe = document.getElementById('resume-frame');
    const fb = document.getElementById('rfallback');
    if (iframe) {
      iframe.onerror = () => { iframe.style.display = 'none'; fb.style.display = 'block'; };
      // Detect about:blank inside iframe (happens when PDF path not found locally)
      iframe.onload = function () {
        try {
          const doc = this.contentDocument || this.contentWindow.document;
          if (doc.body && doc.body.innerHTML.trim() === '') {
            this.style.display = 'none'; fb.style.display = 'block';
          }
        } catch (e) {/* cross-origin — PDF is loading fine */ }
      };
    }

    /* ── Active nav highlight ── */
    const secs = document.querySelectorAll('section[id]');
    const nls = document.querySelectorAll('nav ul a[href^="#"]');
    new IntersectionObserver(es => {
      es.forEach(e => {
        if (e.isIntersecting)
          nls.forEach(l => { l.style.color = l.getAttribute('href') === '#' + e.target.id ? 'var(--cyan)' : ''; });
      });
    }, { threshold: .35 }).observe && secs.forEach(s =>
      new IntersectionObserver(es => {
        es.forEach(e => {
          if (e.isIntersecting)
            nls.forEach(l => { l.style.color = l.getAttribute('href') === '#' + e.target.id ? 'var(--cyan)' : ''; });
        });
      }, { threshold: .35 }).observe(s)
    );
    /* ══════════ CONTACT FORM SUBMISSION ══════════ */
/* ── Contact Form Submission ── */

const contactForm = document.getElementById("contactForm");
const successPopup = document.getElementById("successPopup");
const successClose = document.getElementById("successClose");

if (contactForm) {

    contactForm.addEventListener("submit", function (e) {

        // IMPORTANT: Stop the browser from opening
        // the Google Apps Script success page
        e.preventDefault();

        const submitButton =
            contactForm.querySelector('button[type="submit"]');

        submitButton.disabled = true;

        submitButton.innerHTML =
            '<i class="fas fa-spinner fa-spin mr-2"></i>Sending...';

        const formData = new FormData(contactForm);

        fetch(contactForm.action, {
            method: "POST",
            body: formData,
            mode: "no-cors"
        })
        .then(function () {

            // Clear the form
            contactForm.reset();

            // Restore button
            submitButton.disabled = false;

            submitButton.innerHTML =
                '<i class="fas fa-paper-plane mr-2"></i>Send Message';

            // Show your popup
            successPopup.classList.add("show");

        })
        .catch(function (error) {

            console.error("Submission error:", error);

            submitButton.disabled = false;

            submitButton.innerHTML =
                '<i class="fas fa-paper-plane mr-2"></i>Send Message';

            alert("Unable to send your message. Please try again.");

        });

    });

}


/* ── Close Success Popup ── */

if (successClose) {

    successClose.addEventListener("click", function () {

        successPopup.classList.remove("show");

    });

}


/* ── Close popup by clicking outside ── */

if (successPopup) {

    successPopup.addEventListener("click", function (e) {

        if (e.target === successPopup) {
            successPopup.classList.remove("show");
        }

    });

}
