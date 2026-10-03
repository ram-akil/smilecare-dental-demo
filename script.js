document.addEventListener("DOMContentLoaded", () => {
  const nav = document.getElementById("mainNav");
  const backTop = document.getElementById("backTop");

  window.addEventListener("scroll", () => {
    nav.classList.toggle("scrolled", window.scrollY > 20);
    backTop.classList.toggle("show", window.scrollY > 500);
  });
  backTop.addEventListener("click", () => window.scrollTo({top:0, behavior:"smooth"}));

  document.querySelectorAll("#navMenu .nav-link, #navMenu .btn").forEach(link => {
    link.addEventListener("click", () => {
      const menu = document.getElementById("navMenu");
      if (menu.classList.contains("show")) bootstrap.Collapse.getOrCreateInstance(menu).hide();
    });
  });

  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  }, {threshold:.12});
  document.querySelectorAll(".reveal").forEach(el => revealObserver.observe(el));

  const counterObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = Number(el.dataset.counter);
      let current = 0;
      const duration = 1000;
      const start = performance.now();
      const tick = now => {
        const progress = Math.min((now-start)/duration, 1);
        current = Math.floor(target * (1 - Math.pow(1-progress, 3)));
        el.textContent = target >= 1000 ? current.toLocaleString() : current;
        if (progress < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
      counterObserver.unobserve(el);
    });
  }, {threshold:.7});
  document.querySelectorAll("[data-counter]").forEach(el => counterObserver.observe(el));

  const modal = new bootstrap.Modal("#infoModal");
  document.querySelectorAll(".learn-more").forEach(btn => {
    btn.addEventListener("click", () => {
      document.getElementById("infoModalTitle").textContent = btn.dataset.service;
      document.getElementById("infoModalBody").innerHTML = `
        <p class="mb-2">This is a demo interaction for <strong>${btn.dataset.service}</strong>.</p>
        <p class="text-secondary small">On the live clinic website, this panel can contain the treatment overview, candidacy, typical process, FAQs and a direct appointment CTA.</p>
      `;
      modal.show();
    });
  });

  document.querySelectorAll(".doctor-profile").forEach(btn => {
    btn.addEventListener("click", () => {
      document.getElementById("infoModalTitle").textContent = btn.dataset.doctor;
      document.getElementById("infoModalBody").innerHTML = `
        <p class="mb-2"><strong>${btn.dataset.doctor}</strong> is a fictional profile used for this demo.</p>
        <p class="text-secondary small">Replace this with the verified dentist's qualifications, specialization, experience, memberships and a concise patient-friendly bio.</p>
      `;
      modal.show();
    });
  });

  const galleryModal = new bootstrap.Modal("#galleryModal");
  document.querySelectorAll(".gallery-item").forEach(item => {
    item.addEventListener("click", () => {
      document.getElementById("galleryTitle").textContent = item.dataset.gallery;
      document.getElementById("galleryName").textContent = item.dataset.gallery + " placeholder";
      galleryModal.show();
    });
  });

  const form = document.getElementById("appointmentForm");
  const status = document.getElementById("formStatus");
  const dateInput = document.getElementById("date");
  dateInput.min = new Date().toISOString().split("T")[0];

  form.addEventListener("submit", e => {
    e.preventDefault();
    if (!form.checkValidity()) {
      form.classList.add("was-validated");
      status.textContent = "";
      return;
    }
    status.textContent = " Demo request received — this form is front-end only.";
    form.reset();
    form.classList.remove("was-validated");
  });
});
