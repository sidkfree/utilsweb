/* UtilsWeb — home page renderer.
 *
 * - Groups tools by `category` from window.UTILSWEB_CATEGORIES + UTILSWEB_TOOLS.
 * - Renders category sections + a filter pill bar.
 * - Adds a cursor-tracking glow on each tool card.
 */
(function () {
    const TOOLS = window.UTILSWEB_TOOLS || [];
    const CATS  = window.UTILSWEB_CATEGORIES || [];
    const pillsRoot = document.getElementById("filterPills");
    const catsRoot  = document.getElementById("categoriesRoot");
    const toolsRoot = document.getElementById("toolsRoot");
    const liveCount = document.getElementById("liveCount");

    if (!catsRoot || !pillsRoot) return; // not the home page
    if (liveCount) liveCount.textContent = `${TOOLS.length} tools live`;

    // ── Build the filter pills ────────────────────────────
    function makePill(id, label, icon, count) {
        const b = document.createElement("button");
        b.className = "pill";
        b.dataset.cat = id;
        b.innerHTML = `${icon ? `<span>${icon}</span>` : ""}<span>${label}</span><span class="pill-count">${count}</span>`;
        return b;
    }
    pillsRoot.appendChild(makePill("all", "All", "✨", TOOLS.length));
    for (const c of CATS) {
        const n = TOOLS.filter(t => t.category === c.id).length;
        if (n > 0) pillsRoot.appendChild(makePill(c.id, c.name, c.icon, n));
    }
    pillsRoot.querySelector('[data-cat="all"]').classList.add("active");

    // ── Render each category section ──────────────────────
    function escapeHtml(s) { return String(s).replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#39;"}[c])); }
    function badgeHtml(b) {
        if (!b) return "";
        const label = b === "live" ? "Live" : b === "ai" ? "AI" : b === "new" ? "New" : b;
        return `<span class="tool-badge ${escapeHtml(b)}">${escapeHtml(label)}</span>`;
    }
    function pickAccent(gradient) {
        // Extract first hex colour from a "linear-gradient(135deg, #XXXXXX, ...)" string
        const m = gradient.match(/#[0-9A-Fa-f]{3,8}/);
        return m ? m[0] : "#00E5FF";
    }
    function gradientBorder(gradient) {
        // For the card's ::before mask trick — strip the "linear-gradient(...)" prefix? No, pass as-is.
        return gradient;
    }
    function makeCard(t) {
        const a = document.createElement("a");
        a.className = "tool-card";
        a.href = t.path;
        a.dataset.cat = t.category || "utility";
        const accent = pickAccent(t.color);
        a.style.setProperty("--card-accent", accent);
        a.style.setProperty("--card-accent-gradient", t.color);
        a.innerHTML = `
            ${badgeHtml(t.badge)}
            <div class="tool-icon" style="background: ${t.color};">${t.icon}</div>
            <h3>${escapeHtml(t.name)}</h3>
            <p>${escapeHtml(t.tagline)}</p>
            <span class="tool-go">Launch <span class="arrow">→</span></span>
        `;
        // Cursor-tracking radial highlight
        a.addEventListener("mousemove", (e) => {
            const r = a.getBoundingClientRect();
            a.style.setProperty("--mx", `${e.clientX - r.left}px`);
            a.style.setProperty("--my", `${e.clientY - r.top}px`);
        });
        return a;
    }

    if (TOOLS.length === 0) {
        catsRoot.innerHTML = `
            <div class="empty-state">
                <p>🛠 No tools yet.</p>
                <p class="small">Send <code>Utilsweb &lt;idea&gt;</code> on Telegram to propose the next one.</p>
            </div>`;
        return;
    }

    for (const c of CATS) {
        const items = TOOLS.filter(t => t.category === c.id);
        if (items.length === 0) continue;
        const section = document.createElement("section");
        section.className = "category";
        section.id = `cat-${c.id}`;
        section.dataset.cat = c.id;
        section.innerHTML = `
            <header class="category-head">
                <span class="cat-icon" style="color: ${c.accent};">${c.icon}</span>
                <h2 class="cat-title">${escapeHtml(c.name)}</h2>
                <span class="cat-desc">${escapeHtml(c.desc)}</span>
                <span class="cat-count">${items.length} tool${items.length === 1 ? "" : "s"}</span>
            </header>
            <div class="tool-grid"></div>
        `;
        const grid = section.querySelector(".tool-grid");
        for (const t of items) grid.appendChild(makeCard(t));
        catsRoot.appendChild(section);
    }

    // ── Filter pills wiring ───────────────────────────────
    pillsRoot.addEventListener("click", (e) => {
        const pill = e.target.closest(".pill");
        if (!pill) return;
        const cat = pill.dataset.cat;
        for (const p of pillsRoot.querySelectorAll(".pill")) p.classList.toggle("active", p === pill);
        for (const sec of catsRoot.querySelectorAll(".category")) {
            sec.dataset.filtered = (cat !== "all" && sec.dataset.cat !== cat);
        }
        toolsRoot.classList.toggle("filtered", cat !== "all");
        // Scroll into view smoothly when not "all"
        if (cat !== "all") {
            const target = document.getElementById(`cat-${cat}`);
            if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
        } else {
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    });
})();
