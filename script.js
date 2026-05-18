/* Brew2Bloom — interactions */

/* ---------- Mobile nav ---------- */
const nav = document.querySelector(".nav");
const toggle = document.querySelector(".nav-toggle");
if (toggle && nav) {
  toggle.addEventListener("click", () => nav.classList.toggle("open"));
  document.querySelectorAll(".mobile-menu a").forEach((a) =>
    a.addEventListener("click", () => nav.classList.remove("open"))
  );
}

/* ---------- Impact counters ---------- */
const counters = document.querySelectorAll(".impact-num, .count-up");

const animateCount = (el) => {
  const target = Number(el.dataset.target);
  if (!target) return;
  const duration = 1800;
  const start = performance.now();
  const tick = (now) => {
    const t = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - t, 3);
    el.textContent = Math.round(target * eased).toLocaleString("en-US");
    if (t < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
};

if (counters.length) {
  const obs = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCount(entry.target);
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.4 }
  );
  counters.forEach((c) => obs.observe(c));
}

/* ---------- Reveal on scroll ---------- */
const revealItems = document.querySelectorAll("[data-reveal]");
if (revealItems.length) {
  const revealObs = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          revealObs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -60px 0px" }
  );
  revealItems.forEach((el) => revealObs.observe(el));
}

/* ---------- FAQ accordion ---------- */
document.querySelectorAll(".faq-q").forEach((btn) => {
  btn.addEventListener("click", () => {
    const item = btn.closest(".faq-item");
    item.classList.toggle("open");
  });
});

/* ---------- Newsletter (visual only) ---------- */
document.querySelectorAll(".newsletter-form").forEach((form) => {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const input = form.querySelector("input");
    const button = form.querySelector("button");
    if (!input.value.includes("@")) {
      input.style.borderColor = "var(--earth-deep)";
      return;
    }
    button.textContent = "Got it ✓";
    input.value = "";
    setTimeout(() => (button.textContent = "Subscribe"), 2400);
  });
});

/* ---------- Map filter (sidebar list) ---------- */
const filterButtons = document.querySelectorAll(".map-filter button");
const locationCards = document.querySelectorAll(".location-card");
filterButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    filterButtons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    const filter = btn.dataset.filter;
    locationCards.forEach((card) => {
      if (filter === "all" || card.dataset.type === filter) {
        card.style.display = "";
      } else {
        card.style.display = "none";
      }
    });
  });
});

/* ---------- Blog category filter ---------- */
document.querySelectorAll(".blog-categories button").forEach((btn) => {
  btn.addEventListener("click", () => {
    document
      .querySelectorAll(".blog-categories button")
      .forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    const cat = btn.dataset.cat;
    document.querySelectorAll(".article-grid .article-card").forEach((card) => {
      if (cat === "all" || card.dataset.cat === cat) {
        card.style.display = "";
      } else {
        card.style.display = "none";
      }
    });
  });
});

/* ---------- Leaflet map (only if present) ---------- */
const mapEl = document.getElementById("leaflet-map");
if (mapEl && typeof L !== "undefined") {
  const locations = [
    { id: 1, name: "Café Roest", type: "drop", lat: 47.4125, lng: 9.7417, addr: "Marktstraße 12, Dornbirn", note: "Saves 50 kg of grounds every month." },
    { id: 2, name: "Bloom Hub Bregenz", type: "pickup", lat: 47.5031, lng: 9.7471, addr: "Kaiserstraße 28, Bregenz", note: "Pick up your kit & substrate refills." },
    { id: 3, name: "Drip & Co", type: "drop", lat: 47.2382, lng: 9.5996, addr: "Neustadt 14, Feldkirch", note: "Daily 3kg of premium grounds." },
    { id: 4, name: "The Loop", type: "drop", lat: 47.5050, lng: 9.7400, addr: "Rathausstraße 6, Bregenz", note: "Customers love picking up kits here." },
    { id: 5, name: "Bloom Hub Dornbirn", type: "pickup", lat: 47.4100, lng: 9.7350, addr: "Schulgasse 9, Dornbirn", note: "Workshops every Saturday." },
    { id: 6, name: "Espresso Park", type: "drop", lat: 47.4264, lng: 9.6581, addr: "Maria-Theresien-Straße 3, Lustenau", note: "Organic single-origin only." },
    { id: 7, name: "Daily Grind", type: "drop", lat: 47.3656, lng: 9.6878, addr: "Bahnhofstraße 22, Hohenems", note: "Open 7 days a week." },
    { id: 8, name: "Bloom Hub Bludenz", type: "pickup", lat: 47.1547, lng: 9.8221, addr: "Mutterstraße 4, Bludenz", note: "Community garden out back." },
  ];

  const map = L.map("leaflet-map", { zoomControl: true, scrollWheelZoom: false }).setView([47.38, 9.72], 11);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution: "© OpenStreetMap",
  }).addTo(map);

  const dropIcon = L.divIcon({
    className: "b2b-marker",
    html: '<div style="width:20px;height:20px;background:#8C3D1F;border:3px solid #F5F5DC;border-radius:50%;box-shadow:0 4px 12px rgba(0,0,0,0.3)"></div>',
    iconSize: [20, 20],
    iconAnchor: [10, 10],
  });
  const pickupIcon = L.divIcon({
    className: "b2b-marker",
    html: '<div style="width:20px;height:20px;background:#6FA86C;border:3px solid #F5F5DC;border-radius:50%;box-shadow:0 4px 12px rgba(0,0,0,0.3)"></div>',
    iconSize: [20, 20],
    iconAnchor: [10, 10],
  });

  const markers = {};
  locations.forEach((loc) => {
    const marker = L.marker([loc.lat, loc.lng], {
      icon: loc.type === "pickup" ? pickupIcon : dropIcon,
    }).addTo(map);
    marker.bindPopup(
      `<h3>${loc.name}</h3><p>${loc.note}</p><p style="font-size:0.78rem;color:#76706A;font-family:'Space Grotesk',sans-serif">${loc.addr}</p>`
    );
    markers[loc.id] = marker;
  });

  document.querySelectorAll(".location-card").forEach((card) => {
    card.addEventListener("click", () => {
      const id = Number(card.dataset.id);
      const loc = locations.find((l) => l.id === id);
      if (!loc) return;
      map.flyTo([loc.lat, loc.lng], 14, { duration: 0.8 });
      markers[id].openPopup();
      document.querySelectorAll(".location-card").forEach((c) => c.classList.remove("active"));
      card.classList.add("active");
    });
  });

  map.on("click", () => map.scrollWheelZoom.enable());
}

/* ---------- Active nav link ---------- */
const path = location.pathname.split("/").pop() || "index.html";
document.querySelectorAll(".nav-links a, .mobile-menu a").forEach((link) => {
  const href = link.getAttribute("href");
  if (href && href.endsWith(path)) link.classList.add("active");
});
