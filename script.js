/* =========================================================
   WATER SAFE — FINAL INTERACTIVE JAVASCRIPT
   CHE110 • Group 13 • LPU
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  /* =========================================================
     BASIC HELPERS
     ========================================================= */

  const $ = (selector, parent = document) =>
    parent.querySelector(selector);

  const $$ = (selector, parent = document) =>
    [...parent.querySelectorAll(selector)];

  const root = document.documentElement;
  const finePointer = window.matchMedia("(pointer:fine)").matches;
  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;


  /* =========================================================
     HEADER + SCROLL PROGRESS
     ========================================================= */

  const header = $("#siteHeader");
  const progressBar = $("#progressBar");

  function updateScrollUI() {

    if (header) {
      header.classList.toggle("scrolled", window.scrollY > 30);
    }

    if (progressBar) {
      const max =
        document.documentElement.scrollHeight - window.innerHeight;

      const progress =
        max > 0 ? (window.scrollY / max) * 100 : 0;

      progressBar.style.width = `${progress}%`;
    }
  }

  window.addEventListener("scroll", updateScrollUI, {
    passive: true
  });

  updateScrollUI();


  /* =========================================================
     MOBILE MENU
     ========================================================= */

  const menuBtn = $("#menuBtn");
  const mobileNav = $("#mobileNav");

  if (menuBtn && mobileNav) {

    menuBtn.addEventListener("click", () => {

      const open = mobileNav.classList.toggle("open");

      menuBtn.setAttribute(
        "aria-expanded",
        String(open)
      );

      menuBtn.textContent = open ? "×" : "☰";
    });

    $$(".mobile-nav a").forEach(link => {

      link.addEventListener("click", () => {

        mobileNav.classList.remove("open");

        menuBtn.textContent = "☰";

        menuBtn.setAttribute(
          "aria-expanded",
          "false"
        );
      });

    });
  }


  /* =========================================================
     SCROLL REVEAL
     ========================================================= */

  const revealObserver = new IntersectionObserver(
    entries => {

      entries.forEach(entry => {

        if (entry.isIntersecting) {

          entry.target.classList.add("visible");

          revealObserver.unobserve(entry.target);
        }

      });

    },
    {
      threshold: 0.12
    }
  );

  $$(".reveal").forEach(element => {
    revealObserver.observe(element);
  });


  /* =========================================================
     HERO PARALLAX
     ========================================================= */

  const hero = $(".hero");
  const heroCard = $("#heroWaterCard");

  if (
    hero &&
    heroCard &&
    finePointer &&
    !reducedMotion
  ) {

    hero.addEventListener("mousemove", event => {

      const x =
        (event.clientX / window.innerWidth - 0.5) * 12;

      const y =
        (event.clientY / window.innerHeight - 0.5) * 12;

      heroCard.style.transform =
        `translate(${x}px, calc(-50% + ${y}px))`;
    });

    hero.addEventListener("mouseleave", () => {

      heroCard.style.transform =
        "translateY(-50%)";
    });
  }


  /* =========================================================
     UNIVERSAL INFORMATION MODAL
     ========================================================= */

  const modal = document.createElement("div");

  modal.className = "info-modal";

  modal.innerHTML = `
    <div class="info-modal-backdrop" data-modal-close></div>

    <div
      class="info-modal-panel"
      role="dialog"
      aria-modal="true"
      aria-labelledby="infoModalTitle"
    >

      <button
        class="info-modal-close"
        type="button"
        aria-label="Close information"
        data-modal-close
      >
        ×
      </button>

      <div class="info-modal-icon" id="infoModalIcon">
        💧
      </div>

      <span
        class="info-modal-category"
        id="infoModalCategory"
      >
        WATER SAFETY
      </span>

      <h2 id="infoModalTitle">
        Information
      </h2>

      <div
        class="info-modal-body"
        id="infoModalBody"
      ></div>

      <div
        class="info-modal-source"
        id="infoModalSource"
      ></div>

    </div>
  `;

  document.body.appendChild(modal);

  const modalIcon = $("#infoModalIcon", modal);
  const modalCategory = $("#infoModalCategory", modal);
  const modalTitle = $("#infoModalTitle", modal);
  const modalBody = $("#infoModalBody", modal);
  const modalSource = $("#infoModalSource", modal);

  let previousFocus = null;


  function openInfoModal({
    title = "Water Safety",
    category = "INFORMATION",
    icon = "💧",
    content = "",
    source = ""
  }) {

    previousFocus = document.activeElement;

    modalIcon.textContent = icon;

    modalCategory.textContent =
      category;

    modalTitle.textContent =
      title;

    modalBody.innerHTML =
      content;

    modalSource.innerHTML =
      source;

    modal.classList.add("open");

    document.body.classList.add(
      "modal-open"
    );

    setTimeout(() => {

      $(".info-modal-close", modal)?.focus();

    }, 50);
  }


  function closeInfoModal() {

    modal.classList.remove("open");

    document.body.classList.remove(
      "modal-open"
    );

    if (
      previousFocus &&
      typeof previousFocus.focus === "function"
    ) {
      previousFocus.focus();
    }
  }


  $$("[data-modal-close]", modal).forEach(
    element => {

      element.addEventListener(
        "click",
        closeInfoModal
      );

    }
  );


  document.addEventListener(
    "keydown",
    event => {

      if (event.key === "Escape") {

        closeInfoModal();

      }

    }
  );


  /* =========================================================
     UNIVERSAL CARD INFORMATION
     ========================================================= */

  const cardInformation = {

    ".hero-water-card": {
      title: "Clean water is more than hydration",
      category: "WATER & HEALTH",
      icon: "💧",
      content: `
        <p>
          Drinking water is essential for life, but safety depends
          on more than simply having access to water.
        </p>

        <p>
          A safe drinking-water system considers the source,
          treatment, distribution, storage and the hygiene practices
          of people using the water.
        </p>

        <div class="modal-highlight">
          <strong>Key idea</strong>
          <span>
            Water safety is a chain. A problem at any stage can
            affect the final drinking-water experience.
          </span>
        </div>
      `
    },

    ".hero-meta span:nth-child(1)": {
      title: "Global water access",
      category: "GLOBAL ACCESS",
      icon: "🌍",
      content: `
        <p>
          Drinking-water access differs greatly between countries,
          communities and households.
        </p>

        <p>
          The WHO/UNICEF Joint Monitoring Programme distinguishes
          between basic access and safely managed drinking water.
        </p>

        <div class="modal-highlight">
          <strong>Safely managed means</strong>
          <span>
            An improved source that is accessible on premises,
            available when needed and free from contamination.
          </span>
        </div>
      `
    },

    ".hero-meta span:nth-child(2)": {
      title: "Water quality",
      category: "WATER QUALITY",
      icon: "🔬",
      content: `
        <p>
          Water quality cannot normally be judged simply by
          looking at the water.
        </p>

        <p>
          Microbial, chemical and physical characteristics may
          require appropriate testing.
        </p>

        <div class="modal-highlight">
          <strong>Remember</strong>
          <span>
            Clear-looking water is not automatically safe water.
          </span>
        </div>
      `
    },

    ".hero-meta span:nth-child(3)": {
      title: "Prevention",
      category: "PREVENTION",
      icon: "🛡️",
      content: `
        <p>
          Prevention includes protecting water sources, maintaining
          infrastructure and practising good hygiene.
        </p>

        <p>
          At the personal level, regularly cleaning reusable bottles,
          washing hands and reporting visibly unsafe water points
          can reduce avoidable hygiene risks.
        </p>
      `
    }

  };


  /* =========================================================
     GLOBAL FACT CARDS
     ========================================================= */

  const factDetails = [
    {
      title: "Safely managed drinking water",
      icon: "🌍",
      content: `
        <p>
          In 2022, about 73% of the world's population used
          safely managed drinking-water services according to WHO.
        </p>

        <p>
          This means billions of people still lacked water that
          met all the conditions of safe management.
        </p>

        <div class="modal-highlight">
          <strong>Definition</strong>
          <span>
            Improved source + accessible + available when needed
            + free from contamination.
          </span>
        </div>
      `
    },

    {
      title: "India's drinking-water progress",
      icon: "🇮🇳",
      content: `
        <p>
          UNICEF India's summary of the latest JMP estimates reports
          safely managed drinking-water coverage of approximately
          76.4% for India in 2024.
        </p>

        <p>
          Access and functionality are different concepts, so water
          infrastructure also needs reliable operation and quality
          monitoring.
        </p>
      `
    },

    {
      title: "Microbial contamination",
      icon: "🦠",
      content: `
        <p>
          Microbial contamination is one of the greatest risks to
          drinking-water safety.
        </p>

        <p>
          Contaminated water can transmit diseases such as diarrhoeal
          diseases, cholera, dysentery, hepatitis A, typhoid and polio.
        </p>

        <div class="modal-highlight">
          <strong>Why it matters</strong>
          <span>
            A water source can look clean while still containing
            harmful microorganisms.
          </span>
        </div>
      `
    }
  ];


  $$(".fact-card").forEach(
    (card, index) => {

      const information =
        factDetails[index] ||
        factDetails[0];

      makeInteractive(
        card,
        () => openInfoModal({
          title: information.title,
          category: "GLOBAL WATER",
          icon: information.icon,
          content: information.content
        })
      );

    }
  );


  /* =========================================================
     WORLD MAP
     ========================================================= */

  const regionData = {

    "india": {
      title: "India",
      stat: "76.4%",
      icon: "🇮🇳",
      content: `
        <p>
          UNICEF India's 2024 summary of JMP estimates reports
          safely managed drinking-water coverage of 76.4% for India.
        </p>

        <p>
          This is a national monitoring statistic and does not mean
          every individual water point is automatically safe.
        </p>
      `
    },

    "asia": {
      title: "Asia",
      stat: "Diverse",
      icon: "🌏",
      content: `
        <p>
          Asia contains extremely diverse water-service conditions.
          Urban systems, rural communities, island regions and
          water-stressed areas can face very different challenges.
        </p>
      `
    },

    "africa": {
      title: "Africa",
      stat: "Diverse",
      icon: "🌍",
      content: `
        <p>
          Water access varies considerably across African countries
          and communities.
        </p>

        <p>
          Infrastructure, climate, affordability, sanitation and
          service reliability all influence water security.
        </p>
      `
    },

    "europe": {
      title: "Europe",
      stat: "High access",
      icon: "🌍",
      content: `
        <p>
          Many European countries have high levels of drinking-water
          service coverage.
        </p>

        <p>
          However, maintaining infrastructure, monitoring contamination
          and managing water resources remain important.
        </p>
      `
    },

    "north-america": {
      title: "North America",
      stat: "High access",
      icon: "🌎",
      content: `
        <p>
          Many populations in North America have high levels of
          access to improved drinking-water services.
        </p>

        <p>
          Infrastructure resilience and contamination events can
          still create local risks.
        </p>
      `
    },

    "south-america": {
      title: "South America",
      stat: "Diverse",
      icon: "🌎",
      content: `
        <p>
          Drinking-water conditions vary considerably between
          countries and between urban and rural communities.
        </p>
      `
    },

    "oceania": {
      title: "Oceania",
      stat: "Diverse",
      icon: "🌊",
      content: `
        <p>
          Island geography, climate variability and infrastructure
          can create distinctive drinking-water challenges.
        </p>
      `
    }

  };


  const regionInfo = $("#regionInfo");

  $$(".continent").forEach(continent => {

    const region =
      continent.dataset.region;

    continent.setAttribute(
      "tabindex",
      "0"
    );

    continent.setAttribute(
      "role",
      "button"
    );

    function selectRegion() {

      $$(".continent").forEach(
        c => c.classList.remove("active")
      );

      continent.classList.add("active");

      const data =
        regionData[region];

      if (!data) return;

      if (regionInfo) {

        regionInfo.innerHTML = `
          <span class="info-label">
            SELECTED REGION
          </span>

          <h3>${data.title}</h3>

          <div class="big-stat">
            ${data.stat}
          </div>

          <p>
            Click the region again to explore
            its water-safety context.
          </p>
        `;

      }
    }

    continent.addEventListener(
      "click",
      () => {

        selectRegion();

        const data =
          regionData[region];

        if (data) {

          openInfoModal({
            title: data.title,
            category: "GLOBAL WATER EXPLORER",
            icon: data.icon,
            content: `
              <div class="modal-stat">
                ${data.stat}
              </div>

              ${data.content}
            `
          });

        }

      }
    );

    continent.addEventListener(
      "keydown",
      event => {

        if (
          event.key === "Enter" ||
          event.key === " "
        ) {

          event.preventDefault();

          continent.click();
        }

      }
    );

  });


  /* =========================================================
     WATER SOURCE EXPLORER
     ========================================================= */

  const sources = {

    surface: {
      kicker: "SOURCE 01",
      tag: "SURFACE WATER",
      icon: "🌊",
      title: "River & lake water",
      description:
        "Surface water can be affected by runoff, sewage, agricultural activity, microbes and other pollutants. Treatment and source protection are important before it becomes drinking water.",
      risk:
        "Microbial contamination and runoff",
      treatment:
        "Source protection + appropriate treatment"
    },

    ground: {
      kicker: "SOURCE 02",
      tag: "GROUNDWATER",
      icon: "🪨",
      title: "Groundwater",
      description:
        "Groundwater can be naturally protected from some surface contaminants, but it may contain naturally occurring chemicals or become contaminated through human activity.",
      risk:
        "Naturally occurring chemicals",
      treatment:
        "Testing + appropriate treatment"
    },

    rain: {
      kicker: "SOURCE 03",
      tag: "RAINWATER",
      icon: "🌧️",
      title: "Rainwater",
      description:
        "Rainwater can be collected for household or institutional use. Roofs, storage tanks and collection surfaces need appropriate hygiene and maintenance.",
      risk:
        "Collection and storage hygiene",
      treatment:
        "Safe collection + appropriate treatment"
    },

    reservoir: {
      kicker: "SOURCE 04",
      tag: "RESERVOIR",
      icon: "🏞️",
      title: "Stored water",
      description:
        "Reservoirs help manage supply, but stored water still needs source protection, monitoring and appropriate treatment.",
      risk:
        "Algal growth and contamination",
      treatment:
        "Monitoring + treatment"
    },

    treated: {
      kicker: "SOURCE 05",
      tag: "TREATED SUPPLY",
      icon: "🚰",
      title: "Treated drinking water",
      description:
        "Treatment plants use processes designed to reduce specific hazards. Safety also depends on distribution, storage and hygiene after treatment.",
      risk:
        "Post-treatment contamination",
      treatment:
        "Treatment + safe distribution"
    }

  };


  const sourceElements = {

    kicker: $("#sourceKicker"),
    tag: $("#sourceTag"),
    orb: $("#sourceOrb"),
    title: $("#sourceTitle"),
    description: $("#sourceDescription"),
    risk: $("#sourceRisk"),
    treatment: $("#sourceTreatment")

  };


  $$(".source-tab").forEach(tab => {

    tab.addEventListener(
      "click",
      () => {

        $$(".source-tab").forEach(
          t => t.classList.remove("active")
        );

        tab.classList.add("active");

        const data =
          sources[tab.dataset.source];

        if (!data) return;

        Object.entries(
          sourceElements
        ).forEach(
          ([key, element]) => {

            if (element) {

              element.textContent =
                data[key] || "";

            }

          }
        );

        if (sourceElements.orb) {

          sourceElements.orb.textContent =
            data.icon;

        }

      }
    );

  });


  /* Make source content clickable */

  const sourceContent =
    $(".source-content");

  if (sourceContent) {

    makeInteractive(
      sourceContent,
      () => {

        const active =
          $(".source-tab.active");

        const data =
          sources[
            active?.dataset.source ||
            "surface"
          ];

        if (!data) return;

        openInfoModal({

          title: data.title,

          category: data.tag,

          icon: data.icon,

          content: `
            <p>
              ${data.description}
            </p>

            <div class="modal-highlight">

              <strong>Main risk</strong>

              <span>
                ${data.risk}
              </span>

            </div>

            <div class="modal-highlight">

              <strong>Safety approach</strong>

              <span>
                ${data.treatment}
              </span>

            </div>
          `

        });

      }
    );

  }


  /* =========================================================
     WATER QUALITY LAB
     ========================================================= */

  const samples = {

    treated: {

      name: "Treated supply",

      ph: "7.2",
      phWidth: 72,

      turb: "0.7",
      turbWidth: 22,
      turbStatus: "low",

      nitrate: "18",
      nitrateWidth: 36,
      nitrateStatus: "below value",

      fluoride: "0.7",
      fluorideWidth: 47,
      fluorideStatus: "below value",

      message:
        "This illustrative sample does not trigger the selected chemical examples above. Real drinking-water safety requires broader testing and risk management."

    },

    surface: {

      name: "Surface-water example",

      ph: "7.9",
      phWidth: 79,

      turb: "6.5",
      turbWidth: 82,
      turbStatus: "elevated",

      nitrate: "28",
      nitrateWidth: 56,
      nitrateStatus: "below value",

      fluoride: "0.8",
      fluorideWidth: 53,
      fluorideStatus: "below value",

      message:
        "The illustrative turbidity value is elevated. Turbidity can indicate suspended particles and may be associated with treatment or microbial-quality concerns."

    },

    nitrate: {

      name: "Nitrate concern example",

      ph: "7.4",
      phWidth: 74,

      turb: "1.1",
      turbWidth: 28,
      turbStatus: "low",

      nitrate: "68",
      nitrateWidth: 100,
      nitrateStatus: "above value",

      fluoride: "0.8",
      fluorideWidth: 53,
      fluorideStatus: "below value",

      message:
        "The illustrative nitrate value is above the WHO guideline value of 50 mg/L as nitrate ion. This is a teaching example, not a real sample."

    },

    fluoride: {

      name: "Fluoride concern example",

      ph: "7.3",
      phWidth: 73,

      turb: "0.9",
      turbWidth: 25,
      turbStatus: "low",

      nitrate: "21",
      nitrateWidth: 42,
      nitrateStatus: "below value",

      fluoride: "2.1",
      fluorideWidth: 100,
      fluorideStatus: "above value",

      message:
        "The illustrative fluoride value is above the WHO guideline value of 1.5 mg/L. This is a teaching example, not a real sample."

    }

  };


  function updateLab(
    key,
    animate = false
  ) {

    const sample =
      samples[key];

    if (!sample) return;

    const setText = (
      selector,
      value
    ) => {

      const element =
        $(selector);

      if (element) {
        element.textContent =
          value;
      }

    };


    setText(
      "#sampleName",
      sample.name
    );

    setText(
      "#phValue",
      sample.ph
    );

    setText(
      "#turbValue",
      sample.turb
    );

    setText(
      "#nitrateValue",
      sample.nitrate
    );

    setText(
      "#fluorideValue",
      sample.fluoride
    );


    const meters = [

      [
        "#phMeter",
        sample.phWidth
      ],

      [
        "#turbMeter",
        sample.turbWidth
      ],

      [
        "#nitrateMeter",
        sample.nitrateWidth
      ],

      [
        "#fluorideMeter",
        sample.fluorideWidth
      ]

    ];


    meters.forEach(
      ([selector, width]) => {

        const element =
          $(selector);

        if (element) {

          element.style.width =
            `${width}%`;

        }

      }
    );


    setText(
      "#turbStatus",
      sample.turbStatus
    );

    setText(
      "#nitrateStatus",
      sample.nitrateStatus
    );

    setText(
      "#fluorideStatus",
      sample.fluorideStatus
    );


    const message =
      $("#labMessage p");

    if (message) {

      message.innerHTML =
        `<strong>Educational interpretation:</strong> ${sample.message}`;

    }


    if (animate) {

      const results =
        $(".lab-results");

      if (results) {

        results.animate(
          [
            {
              transform:
                "scale(.98)",
              opacity: .7
            },

            {
              transform:
                "scale(1)",
              opacity: 1
            }
          ],
          {
            duration: 400,
            easing:
              "ease-out"
          }
        );

      }

    }

  }


  $$(".sample-btn").forEach(btn => {

    btn.addEventListener(
      "click",
      () => {

        $$(".sample-btn").forEach(
          b => b.classList.remove("active")
        );

        btn.classList.add("active");

        updateLab(
          btn.dataset.sample
        );

      }
    );

  });


  const testButton =
    $("#testBtn");

  if (testButton) {

    testButton.addEventListener(
      "click",
      () => {

        const active =
          $(".sample-btn.active");

        const sample =
          active?.dataset.sample ||
          "treated";

        testButton.textContent =
          "Analysing…";

        testButton.disabled =
          true;

        setTimeout(
          () => {

            updateLab(
              sample,
              true
            );

            testButton.textContent =
              "Analysis complete ✓";

            setTimeout(
              () => {

                testButton.textContent =
                  "Run analysis →";

                testButton.disabled =
                  false;

              },
              1400
            );

          },
          650
        );

      }
    );

  }


  /* =========================================================
     LAB PARAMETERS — CLICKABLE
     ========================================================= */

  const parameterInfo = {

    ph: {
      title: "pH",
      icon: "⚗️",
      content: `
        <p>
          pH describes how acidic or alkaline water is.
        </p>

        <p>
          It is an important water-quality parameter because it can
          affect treatment processes, corrosion and the behaviour
          of some chemicals.
        </p>

        <div class="modal-highlight">
          <strong>Important</strong>
          <span>
            pH by itself does not certify that drinking water is safe.
          </span>
        </div>
      `
    },

    turbidity: {
      title: "Turbidity",
      icon: "🔬",
      content: `
        <p>
          Turbidity describes how cloudy or hazy water appears
          because of suspended particles.
        </p>

        <p>
          High turbidity can interfere with treatment and can be
          associated with microbial-quality concerns.
        </p>
      `
    },

    nitrate: {
      title: "Nitrate",
      icon: "🧪",
      content: `
        <p>
          Nitrate can enter water from agricultural runoff,
          wastewater and other sources.
        </p>

        <p>
          The WHO guideline value for nitrate ion is
          50 mg/L.
        </p>

        <div class="modal-highlight">
          <strong>Lab example</strong>
          <span>
            The 68 mg/L example on this website is intentionally
            shown as an educational above-guideline example.
          </span>
        </div>
      `
    },

    fluoride: {
      title: "Fluoride",
      icon: "🧪",
      content: `
        <p>
          Fluoride occurs naturally in many groundwater systems
          and can also be influenced by local geology and other factors.
        </p>

        <p>
          The WHO guideline value for fluoride is
          1.5 mg/L.
        </p>

        <div class="modal-highlight">
          <strong>Lab example</strong>
          <span>
            The 2.1 mg/L example is intentionally above that
            guideline value for teaching purposes.
          </span>
        </div>
      `
    }

  };


  $$(".parameter").forEach(parameter => {

    makeInteractive(
      parameter,
      () => {

        const text =
          parameter.textContent.toLowerCase();

        let key = "ph";

        if (text.includes("turbidity")) {
          key = "turbidity";
        }

        else if (
          text.includes("nitrate")
        ) {
          key = "nitrate";
        }

        else if (
          text.includes("fluoride")
        ) {
          key = "fluoride";
        }

        const info =
          parameterInfo[key];

        openInfoModal({

          title: info.title,

          category:
            "WATER QUALITY LAB",

          icon:
            info.icon,

          content:
            info.content

        });

      }
    );

  });


  /* =========================================================
     SPOT THE RISK GAME
     ========================================================= */

  let riskScore = 0;

  const foundRisks =
    new Set();


  $$(".hotspot").forEach(
    hotspot => {

      hotspot.setAttribute(
        "tabindex",
        "0"
      );

      hotspot.setAttribute(
        "role",
        "button"
      );


      function investigate() {

        const id =
          hotspot.textContent.trim();

        if (
          foundRisks.has(id)
        ) {
          return;
        }


        if (
          hotspot.dataset.correct === "true"
        ) {

          foundRisks.add(id);

          riskScore++;

          hotspot.classList.add(
            "found"
          );

          const feedback =
            $("#gameFeedback");

          if (feedback) {

            feedback.textContent =
              "✓ Good catch. You found a hygiene risk.";

          }

        }

        else {

          hotspot.classList.add(
            "missed"
          );

          const feedback =
            $("#gameFeedback");

          if (feedback) {

            feedback.textContent =
              "Not this one — look for a condition that could contaminate the water or surrounding area.";

          }

          setTimeout(
            () => {
              hotspot.classList.remove(
                "missed"
              );
            },
            700
          );

        }


        const score =
          $("#riskScore");

        if (score) {

          score.textContent =
            riskScore;

        }


        if (
          riskScore >= 5
        ) {

          const message =
            $("#gameMessage");

          if (message) {

            message.textContent =
              "🏆 Water Safety Champion!";

          }

          showToast(
            "You found all 5 water-safety risks!"
          );

        }

      }


      hotspot.addEventListener(
        "click",
        investigate
      );


      hotspot.addEventListener(
        "keydown",
        event => {

          if (
            event.key === "Enter" ||
            event.key === " "
          ) {

            event.preventDefault();

            investigate();

          }

        }
      );

    }
  );


  const resetGame =
    $("#resetGame");

  if (resetGame) {

    resetGame.addEventListener(
      "click",
      () => {

        riskScore = 0;

        foundRisks.clear();

        $$(".hotspot").forEach(
          hotspot => {

            hotspot.classList.remove(
              "found",
              "missed"
            );

          }
        );

        const score =
          $("#riskScore");

        if (score) {
          score.textContent = "0";
        }

        const message =
          $("#gameMessage");

        if (message) {
          message.textContent =
            "Look carefully.";
        }

        const feedback =
          $("#gameFeedback");

        if (feedback) {

          feedback.textContent =
            "Click a numbered hotspot to investigate it.";

        }

      }
    );

  }


  /* =========================================================
     RISK CARDS
     ========================================================= */

  const riskDetails = {

    bottle: {
      title: "Dirty reusable bottles",
      icon: "🧴",
      content: `
        <p>
          Reusable bottles can collect residues and microorganisms
          when they are not cleaned regularly.
        </p>

        <p>
          Cleaning the bottle and its cap helps reduce avoidable
          hygiene risks.
        </p>
      `
    },

    hands: {
      title: "Dirty hands",
      icon: "👐",
      content: `
        <p>
          Hands frequently touch surfaces, phones, doors and other
          objects. Touching the bottle opening or drinking nozzle
          with unclean hands can introduce contamination.
        </p>
      `
    },

    tap: {
      title: "Unclean water-filling areas",
      icon: "🚰",
      content: `
        <p>
          Water points should be maintained so that surrounding
          surfaces do not create unnecessary hygiene risks.
        </p>

        <p>
          Visible dirt, damaged taps or poorly maintained areas
          should be reported.
        </p>
      `
    },

    sharing: {
      title: "Sharing drinking bottles",
      icon: "🥤",
      content: `
        <p>
          Sharing bottles can increase opportunities for transfer
          of microorganisms between people.
        </p>

        <p>
          Using your own clean bottle is a simple hygiene practice.
        </p>
      `
    },

    storage: {
      title: "Poor storage",
      icon: "📦",
      content: `
        <p>
          Water can be affected after treatment if containers or
          storage areas are not kept clean.
        </p>

        <p>
          Safe storage is therefore an important part of the
          drinking-water chain.
        </p>
      `
    }

  };


  $$(".risk-card").forEach(card => {

    makeInteractive(
      card,
      () => {

        const text =
          card.textContent.toLowerCase();

        let info = {
          title: "Drinking-water safety risk",
          icon: "⚠️",
          content: `
            <p>
              This card represents a potential factor that can
              affect drinking-water hygiene or safety.
            </p>
          `
        };


        if (
          text.includes("bottle")
        ) {
          info =
            riskDetails.bottle;
        }

        else if (
          text.includes("hand")
        ) {
          info =
            riskDetails.hands;
        }

        else if (
          text.includes("tap") ||
          text.includes("filling")
        ) {
          info =
            riskDetails.tap;
        }

        else if (
          text.includes("sharing")
        ) {
          info =
            riskDetails.sharing;
        }

        else if (
          text.includes("storage")
        ) {
          info =
            riskDetails.storage;
        }


        openInfoModal({

          title:
            info.title,

          category:
            "WATER SAFETY RISK",

          icon:
            info.icon,

          content:
            info.content

        });

      }
    );

  });


  /* =========================================================
     CAMPUS WATER POINTS
     ========================================================= */

  const pointData = {

    "W-01":
      "Demonstration water point positioned near the Academic Block.",

    "W-02":
      "Demonstration water point positioned near the Central Library.",

    "W-03":
      "Demonstration water point positioned in the Hostel Zone.",

    "W-04":
      "Demonstration water point positioned near the Food Court.",

    "W-05":
      "Demonstration water point positioned near the Sports Complex.",

    "W-06":
      "Demonstration water point positioned near the Main Gate.",

    "W-07":
      "Demonstration water point positioned near the Admin Block.",

    "W-08":
      "Demonstration water point positioned near the Science Labs."

  };


  let selectedPoint = {

    code: "W-01",

    name: "Academic Block"

  };


  $$(".water-point").forEach(
    point => {

      point.setAttribute(
        "tabindex",
        "0"
      );

      point.setAttribute(
        "role",
        "button"
      );


      function selectPoint() {

        $$(".water-point").forEach(
          p => p.classList.remove(
            "active"
          )
        );

        point.classList.add(
          "active"
        );


        selectedPoint = {

          code:
            point.dataset.point,

          name:
            point.dataset.name

        };


        const pointCode =
          $("#pointCode");

        const pointName =
          $("#pointName");

        const pointDescription =
          $("#pointDescription");


        if (pointCode) {

          pointCode.textContent =
            selectedPoint.code;

        }

        if (pointName) {

          pointName.textContent =
            selectedPoint.name;

        }

        if (pointDescription) {

          pointDescription.textContent =
            pointData[
              selectedPoint.code
            ] ||
            "Demonstration water point.";

        }

      }


      point.addEventListener(
        "click",
        () => {

          selectPoint();

          openInfoModal({

            title:
              selectedPoint.name,

            category:
              `WATER POINT ${selectedPoint.code}`,

            icon:
              "📍",

            content: `
              <p>
                ${
                  pointData[
                    selectedPoint.code
                  ] ||
                  "Demonstration water point."
                }
              </p>

              <div class="modal-highlight">
                <strong>Prototype feature</strong>
                <span>
                  In a real campus deployment, this water point
                  could have a unique QR code that opens its
                  reporting page automatically.
                </span>
              </div>
            `

          });

        }
      );


      point.addEventListener(
        "keydown",
        event => {

          if (
            event.key === "Enter" ||
            event.key === " "
          ) {

            event.preventDefault();

            point.click();

          }

        }
      );

    }
  );


  /* =========================================================
     QR REPORTING MODAL
     ========================================================= */

  const reportModal =
    $("#reportModal");

  const reportSuccess =
    $("#reportSuccess");


  function openReportModal() {

    const name =
      $("#modalPointName");

    if (name) {

      name.textContent =
        selectedPoint.name;

    }

    if (reportModal) {

      reportModal.classList.add(
        "open"
      );

      reportModal.setAttribute(
        "aria-hidden",
        "false"
      );

    }

    if (reportSuccess) {

      reportSuccess.classList.remove(
        "show"
      );

    }

  }


  function closeReportModal() {

    if (!reportModal) return;

    reportModal.classList.remove(
      "open"
    );

    reportModal.setAttribute(
      "aria-hidden",
      "true"
    );

  }


  const openReport =
    $("#openReport");

  if (openReport) {

    openReport.addEventListener(
      "click",
      openReportModal
    );

  }


  $$("[data-close-modal]").forEach(
    element => {

      element.addEventListener(
        "click",
        closeReportModal
      );

    }
  );


  const reportForm =
    $("#reportForm");

  if (reportForm) {

    reportForm.addEventListener(
      "submit",
      event => {

        event.preventDefault();


        const issue =
          $("#issueType")?.value ||
          "Other";

        const note =
          $("#reportNote")?.value.trim() ||
          "";


        const reports =
          JSON.parse(
            localStorage.getItem(
              "watersafeReports"
            ) || "[]"
          );


        reports.push({

          point:
            selectedPoint,

          issue:
            issue,

          note:
            note,

          createdAt:
            new Date().toISOString()

        });


        localStorage.setItem(
          "watersafeReports",
          JSON.stringify(reports)
        );


        reportForm.reset();


        if (reportSuccess) {

          reportSuccess.classList.add(
            "show"
          );

        }


        showToast(
          "Demo report recorded locally."
        );

      }
    );

  }


  /* =========================================================
     CONTAMINATION → PREVENTION STORY
     ========================================================= */

  let storyIndex = 0;

  const storySteps =
    $$(".story-step");

  const storyProgress =
    $("#storyProgress");


  function updateStory() {

    storySteps.forEach(
      (step, index) => {

        step.classList.toggle(
          "active",
          index === storyIndex
        );

      }
    );


    if (
      storyProgress &&
      storySteps.length > 1
    ) {

      const percentage =
        storyIndex /
        (storySteps.length - 1) *
        100;


      if (
        window.innerWidth <= 820
      ) {

        storyProgress.style.height =
          `${percentage}%`;

        storyProgress.style.width =
          "100%";

      }

      else {

        storyProgress.style.width =
          `${percentage}%`;

        storyProgress.style.height =
          "";

      }

    }

  }


  storySteps.forEach(
    (step, index) => {

      step.addEventListener(
        "click",
        () => {

          storyIndex =
            index;

          updateStory();


          const title =
            step.querySelector("h3")?.textContent ||
            `Water-safety stage ${index + 1}`;

          const paragraph =
            step.querySelector("p")?.textContent ||
            "This stage explains one part of the water-safety chain.";


          openInfoModal({

            title:
              title,

            category:
              "CONTAMINATION → PREVENTION",

            icon:
              "🔄",

            content: `
              <p>
                ${paragraph}
              </p>

              <div class="modal-highlight">
                <strong>Water-safety chain</strong>
                <span>
                  Water safety depends on controlling risks from
                  the source all the way to the person consuming it.
                </span>
              </div>
            `

          });

        }
      );

    }
  );


  const storyNext =
    $("#storyNext");

  const storyPrev =
    $("#storyPrev");


  if (storyNext) {

    storyNext.addEventListener(
      "click",
      () => {

        storyIndex =
          Math.min(
            storyIndex + 1,
            storySteps.length - 1
          );

        updateStory();

      }
    );

  }


  if (storyPrev) {

    storyPrev.addEventListener(
      "click",
      () => {

        storyIndex =
          Math.max(
            storyIndex - 1,
            0
          );

        updateStory();

      }
    );

  }


  /* =========================================================
     SOLUTION / HABIT SCORE
     ========================================================= */

  const habits =
    $$(".habit");


  function updateHabitScore() {

    if (!habits.length) return;


    const checked =
      habits.filter(
        habit => habit.checked
      ).length;


    const percentage =
      Math.round(
        checked /
        habits.length *
        100
      );


    const degrees =
      percentage * 3.6;


    const score =
      $("#habitScore");

    if (score) {

      score.textContent =
        `${percentage}%`;

    }


    const ring =
      $("#scoreRing");

    if (ring) {

      ring.style.background =
        `conic-gradient(
          #37ce9c ${degrees}deg,
          rgba(255,255,255,.08) ${degrees}deg
        )`;

    }


    let message =
      "Start checking the habits you follow.";


    if (
      percentage >= 90
    ) {

      message =
        "Excellent routine — you are protecting the full chain.";

    }

    else if (
      percentage >= 65
    ) {

      message =
        "Strong start. A few more habits can make the routine even better.";

    }

    else if (
      percentage >= 35
    ) {

      message =
        "Good beginning. Keep building consistent habits.";

    }

    else if (
      percentage > 0
    ) {

      message =
        "Every small improvement helps.";

    }


    const messageElement =
      $("#habitMessage");

    if (messageElement) {

      messageElement.textContent =
        message;

    }

  }


  habits.forEach(
    habit => {

      habit.addEventListener(
        "change",
        updateHabitScore
      );

    }
  );


  /* =========================================================
     SOLUTION LABELS — CLICKABLE EXPLANATIONS
     ========================================================= */

  $$(".checklist label").forEach(
    label => {

      const text =
        label.textContent.trim();

      const infoButton =
        document.createElement("button");

      infoButton.type =
        "button";

      infoButton.className =
        "habit-info";

      infoButton.textContent =
        "i";

      infoButton.setAttribute(
        "aria-label",
        `More information about ${text}`
      );


      infoButton.addEventListener(
        "click",
        event => {

          event.preventDefault();

          event.stopPropagation();


          openInfoModal({

            title:
              text,

            category:
              "WATER-SAFE HABIT",

            icon:
              "✅",

            content: `
              <p>
                This habit can help reduce avoidable hygiene
                or drinking-water handling risks.
              </p>

              <div class="modal-highlight">
                <strong>Why it matters</strong>
                <span>
                  Good water safety is not only about the original
                  water source. Storage, handling and personal
                  hygiene also matter.
                </span>
              </div>
            `

          });

        }
      );


      label.appendChild(
        infoButton
      );

    }
  );


  /* =========================================================
     DISEASE INFORMATION
     ========================================================= */

  const diseaseInfo = {

    cholera: {
      title: "Cholera",
      icon: "🦠",
      content: `
        <p>
          Cholera is an acute diarrhoeal infection associated with
          ingestion of food or water contaminated with the bacterium
          Vibrio cholerae.
        </p>

        <p>
          Safe water, sanitation and hygiene are important tools
          for prevention.
        </p>
      `
    },

    typhoid: {
      title: "Typhoid",
      icon: "🦠",
      content: `
        <p>
          Typhoid fever is caused by Salmonella Typhi and can spread
          through contaminated food or water.
        </p>

        <p>
          Safe water, sanitation, hygiene and appropriate healthcare
          measures help reduce transmission.
        </p>
      `
    },

    hepatitis: {
      title: "Hepatitis A",
      icon: "🦠",
      content: `
        <p>
          Hepatitis A is a viral infection that can spread through
          contaminated food or water.
        </p>

        <p>
          Hygiene and access to safe drinking water are important
          parts of prevention.
        </p>
      `
    },

    dysentery: {
      title: "Dysentery",
      icon: "🦠",
      content: `
        <p>
          Dysentery refers to diarrhoeal illness in which blood may
          occur in the stool. Several infectious organisms can cause it.
        </p>

        <p>
          Contaminated water and poor sanitation can contribute to
          transmission.
        </p>
      `
    },

    polio: {
      title: "Polio",
      icon: "🦠",
      content: `
        <p>
          Poliovirus can spread through the faecal–oral route,
          including through contaminated water in settings with
          inadequate sanitation.
        </p>
      `
    },

    diarrhoea: {
      title: "Diarrhoeal diseases",
      icon: "🦠",
      content: `
        <p>
          Contaminated water can contribute to diarrhoeal diseases
          caused by bacteria, viruses and parasites.
        </p>

        <p>
          Safe water, sanitation and hygiene are key prevention
          measures.
        </p>
      `
    }

  };


  $$(".disease-grid article").forEach(
    article => {

      makeInteractive(
        article,
        () => {

          const text =
            article.textContent.toLowerCase();


          let info =
            diseaseInfo.diarrhoea;


          if (
            text.includes("cholera")
          ) {

            info =
              diseaseInfo.cholera;

          }

          else if (
            text.includes("typhoid")
          ) {

            info =
              diseaseInfo.typhoid;

          }

          else if (
            text.includes("hepatitis")
          ) {

            info =
              diseaseInfo.hepatitis;

          }

          else if (
            text.includes("dysentery")
          ) {

            info =
              diseaseInfo.dysentery;

          }

          else if (
            text.includes("polio")
          ) {

            info =
              diseaseInfo.polio;

          }


          openInfoModal({

            title:
              info.title,

            category:
              "WATER-RELATED DISEASE",

            icon:
              info.icon,

            content:
              info.content

          });

        }
      );

    }
  );


  /* =========================================================
     RESEARCH / REFERENCES
     ========================================================= */

  const researchDetails = {

    who: {

      title:
        "WHO Drinking-water Fact Sheet",

      icon:
        "🌐",

      content: `
        <p>
          The World Health Organization explains drinking-water
          safety, global access and health risks associated with
          contaminated water.
        </p>

        <div class="modal-highlight">
          <strong>Useful for this project</strong>
          <span>
            Global statistics, water-safety definitions and
            disease-related information.
          </span>
        </div>
      `,

      url:
        "https://www.who.int/news-room/fact-sheets/detail/drinking-water/"

    },

    jmp: {

      title:
        "WHO/UNICEF Joint Monitoring Programme",

      icon:
        "📊",

      content: `
        <p>
          The WHO/UNICEF Joint Monitoring Programme tracks progress
          in drinking-water, sanitation and hygiene services around
          the world.
        </p>

        <div class="modal-highlight">
          <strong>Important definition</strong>
          <span>
            Safely managed drinking water means an improved source
            that is accessible, available when needed and free from
            contamination.
          </span>
        </div>
      `,

      url:
        "https://washdata.org/"

    },

    india: {

      title:
        "UNICEF India — Jal Jeevan Mission",

      icon:
        "🇮🇳",

      content: `
        <p>
          UNICEF India's material provides context on drinking-water
          access and the progress of the Jal Jeevan Mission.
        </p>

        <p>
          The page also discusses functionality and service-level
          considerations rather than looking only at whether a tap
          connection exists.
        </p>
      `,

      url:
        "https://www.unicef.org/india/stories/unicefs-partnership-journey-jal-jeevan-mission"

    },

    guidelines: {

      title:
        "WHO Guidelines for Drinking-water Quality",

      icon:
        "📘",

      content: `
        <p>
          WHO's Guidelines for Drinking-water Quality provide a
          framework for managing drinking-water risks from the
          source through to the consumer.
        </p>

        <div class="modal-highlight">
          <strong>Selected values used in this prototype</strong>
          <span>
            Fluoride: 1.5 mg/L<br>
            Nitrate: 50 mg/L as nitrate ion
          </span>
        </div>
      `,

      url:
        "https://www.who.int/teams/environment-climate-change-and-health/water-sanitation-and-health/water-safety-and-quality/drinking-water-quality-guidelines"

    }

  };


  $$(".research-card, .research-grid article").forEach(
    card => {

      makeInteractive(
        card,
        () => {

          const text =
            card.textContent.toLowerCase();


          let info =
            researchDetails.who;


          if (
            text.includes("jmp") ||
            text.includes("monitoring")
          ) {

            info =
              researchDetails.jmp;

          }

          else if (
            text.includes("india") ||
            text.includes("jal jeevan")
          ) {

            info =
              researchDetails.india;

          }

          else if (
            text.includes("guideline") ||
            text.includes("who guidelines")
          ) {

            info =
              researchDetails.guidelines;

          }


          openInfoModal({

            title:
              info.title,

            category:
              "RESEARCH & REFERENCES",

            icon:
              info.icon,

            content:
              info.content,

            source:
              `
                <a
                  class="modal-source-link"
                  href="${info.url}"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Open original source ↗
                </a>
              `

          });

        }
      );

    }
  );


  /* =========================================================
     TEAM MEMBERS
     ========================================================= */

  $$(".team-grid div").forEach(
    member => {

      makeInteractive(
        member,
        () => {

          const name =
            member.querySelector("h3")?.textContent ||
            member.querySelector("strong")?.textContent ||
            "Project team member";


          const details =
            member.querySelector("small")?.textContent ||
            member.querySelector("p")?.textContent ||
            "Member of the WaterSafe Campus project team.";


          openInfoModal({

            title:
              name,

            category:
              "PROJECT TEAM",

            icon:
              "🎓",

            content: `
              <p>
                ${details}
              </p>

              <div class="modal-highlight">
                <strong>Project</strong>
                <span>
                  Drinking Water Safety Awareness Through Technology
                  — CHE110, Group 13.
                </span>
              </div>
            `

          });

        }
      );

    }
  );


  /* =========================================================
     ABOUT / TEACHER / ACADEMIC INFORMATION
     ========================================================= */

  $$(".teacher, .academic-note, .about-card").forEach(
    card => {

      makeInteractive(
        card,
        () => {

          openInfoModal({

            title:
              "About the project",

            category:
              "CHE110 • GROUP 13 • LPU",

            icon:
              "🎓",

            content: `
              <p>
                <strong>
                  Drinking Water Safety Awareness Through Technology
                </strong>
              </p>

              <p>
                This website is an educational prototype created
                for Environmental Chemistry (CHE110) at Lovely
                Professional University.
              </p>

              <div class="modal-highlight">
                <strong>Purpose</strong>
                <span>
                  Demonstrate how digital technology could improve
                  drinking-water awareness, education and reporting
                  around a university campus.
                </span>
              </div>
            `

          });

        }
      );

    }
  );


  /* =========================================================
     UNIVERSAL INTERACTION FUNCTION
     ========================================================= */

  function makeInteractive(
    element,
    action
  ) {

    if (!element) return;

    if (
      element.dataset.interactiveBound === "true"
    ) {
      return;
    }

    element.dataset.interactiveBound =
      "true";


    element.classList.add(
      "interactive-card"
    );


    element.setAttribute(
      "tabindex",
      "0"
    );


    element.setAttribute(
      "role",
      "button"
    );


    element.addEventListener(
      "click",
      event => {

        /*
          Do not hijack actual links,
          buttons or form controls.
        */

        if (
          event.target.closest(
            "a, button, input, select, textarea, label"
          )
        ) {
          return;
        }

        action();

      }
    );


    element.addEventListener(
      "keydown",
      event => {

        if (
          event.key === "Enter" ||
          event.key === " "
        ) {

          if (
            event.target.closest(
              "a, button, input, select, textarea, label"
            )
          ) {
            return;
          }

          event.preventDefault();

          action();

        }

      }
    );

  }


  /* =========================================================
     APPLY CARD INTERACTION MAP
     ========================================================= */

  Object.entries(
    cardInformation
  ).forEach(
    ([selector, information]) => {

      const element =
        $(selector);

      if (!element) return;

      makeInteractive(
        element,
        () => {

          openInfoModal({

            title:
              information.title,

            category:
              information.category,

            icon:
              information.icon,

            content:
              information.content

          });

        }
      );

    }
  );


  /* =========================================================
     SOURCE GRID
     ========================================================= */

  $$(".source-card").forEach(
    card => {

      makeInteractive(
        card,
        () => {

          const title =
            card.querySelector("h3")?.textContent ||
            "Water source";

          const text =
            card.querySelector("p")?.textContent ||
            "Learn more about this water source.";


          openInfoModal({

            title:
              title,

            category:
              "WATER SOURCE",

            icon:
              "💧",

            content: `
              <p>
                ${text}
              </p>

              <div class="modal-highlight">
                <strong>Explore further</strong>
                <span>
                  Use the water-source explorer above to compare
                  different sources and their major safety considerations.
                </span>
              </div>
            `

          });

        }
      );

    }
  );


  /* =========================================================
     PREVENTION CARDS
     ========================================================= */

  $$(".prevention-card").forEach(
    card => {

      makeInteractive(
        card,
        () => {

          const title =
            card.querySelector("h3")?.textContent ||
            "Prevention";

          const text =
            card.querySelector("p")?.textContent ||
            "A practical water-safety prevention measure.";


          openInfoModal({

            title:
              title,

            category:
              "PREVENTION",

            icon:
              "🛡️",

            content: `
              <p>
                ${text}
              </p>

              <div class="modal-highlight">
                <strong>Practical idea</strong>
                <span>
                  Small hygiene and maintenance actions can help
                  protect the final stage of the drinking-water chain.
                </span>
              </div>
            `

          });

        }
      );

    }
  );


  /* =========================================================
     GENERAL INFORMATION BLOCKS
     ========================================================= */

  const generalInteractiveSelectors = [

    ".challenge-copy",

    ".map-title",

    ".campus-legend",

    ".lab-disclaimer",

    ".footnote",

    ".info-note",

    ".journey",

    ".source-grid b",

    ".game-message"

  ];


  generalInteractiveSelectors.forEach(
    selector => {

      $$(selector).forEach(
        element => {

          makeInteractive(
            element,
            () => {

              const title =
                element.querySelector("h3")?.textContent ||
                element.querySelector("h4")?.textContent ||
                element.textContent.trim().slice(
                  0,
                  60
                ) ||
                "Project information";


              openInfoModal({

                title:
                  title,

                category:
                  "WATER SAFETY",

                icon:
                  "💧",

                content: `
                  <p>
                    ${element.textContent.trim()}
                  </p>

                  <div class="modal-highlight">
                    <strong>Educational prototype</strong>
                    <span>
                      This section is designed to help visitors
                      understand drinking-water safety through
                      interactive exploration.
                    </span>
                  </div>
                `

              });

            }
          );

        }
      );

    }
  );


  /* =========================================================
     RESEARCH LINKS
     ========================================================= */

  $$(
    'a[href*="who.int"], a[href*="unicef.org"], a[href*="washdata.org"]'
  ).forEach(
    link => {

      link.target =
        "_blank";

      link.rel =
        "noopener noreferrer";

    }
  );


  /* =========================================================
     ACTIVE NAVIGATION
     ========================================================= */

  const navLinks =
    $$(".desktop-nav a");

  const sections =
    $$("main section[id]");


  if (
    navLinks.length &&
    sections.length
  ) {

    const navObserver =
      new IntersectionObserver(
        entries => {

          entries.forEach(
            entry => {

              if (
                entry.isIntersecting
              ) {

                navLinks.forEach(
                  link => {

                    link.classList.toggle(
                      "on",
                      link.getAttribute("href") ===
                      `#${entry.target.id}`
                    );

                  }
                );

              }

            }
          );

        },
        {
          rootMargin:
            "-45% 0px -50% 0px"
        }
      );


    sections.forEach(
      section => {

        navObserver.observe(
          section
        );

      }
    );

  }


  /* =========================================================
     COUNT-UP ANIMATION
     ========================================================= */

  if (!reducedMotion) {

    $$(".fact-card strong").forEach(
      element => {

        const match =
          element.textContent.match(
            /[\d.]+/
          );

        if (!match) return;


        const end =
          parseFloat(match[0]);

        const decimals =
          (
            match[0].split(".")[1] ||
            ""
          ).length;


        const prefix =
          element.textContent.slice(
            0,
            match.index
          );

        const suffix =
          element.textContent.slice(
            match.index +
            match[0].length
          );


        element.textContent =
          prefix +
          (0).toFixed(decimals) +
          suffix;


        const observer =
          new IntersectionObserver(
            entries => {

              if (
                !entries[0].isIntersecting
              ) {
                return;
              }


              observer.disconnect();


              const start =
                performance.now();


              function animate(
                timestamp
              ) {

                const progress =
                  Math.min(
                    1,
                    (timestamp - start) /
                    1600
                  );


                const eased =
                  1 -
                  Math.pow(
                    1 - progress,
                    3
                  );


                const value =
                  end * eased;


                element.textContent =
                  prefix +
                  value.toFixed(decimals) +
                  suffix;


                if (
                  progress < 1
                ) {

                  requestAnimationFrame(
                    animate
                  );

                }

              }


              requestAnimationFrame(
                animate
              );

            },
            {
              threshold: 0.6
            }
          );


        observer.observe(
          element
        );

      }
    );

  }


  /* =========================================================
     CURSOR SPOTLIGHT
     ========================================================= */

  if (
    finePointer &&
    !reducedMotion
  ) {

    const spotlight =
      document.createElement("div");

    spotlight.className =
      "spotlight";

    document.body.appendChild(
      spotlight
    );


    window.addEventListener(
      "pointermove",
      event => {

        root.style.setProperty(
          "--mx",
          `${event.clientX}px`
        );

        root.style.setProperty(
          "--my",
          `${event.clientY}px`
        );

      },
      {
        passive: true
      }
    );


    $$(".interactive-card").forEach(
      card => {

        card.addEventListener(
          "pointermove",
          event => {

            const rect =
              card.getBoundingClientRect();


            const x =
              (
                event.clientX -
                rect.left
              ) /
              rect.width *
              100;


            const y =
              (
                event.clientY -
                rect.top
              ) /
              rect.height *
              100;


            card.style.setProperty(
              "--gx",
              `${x}%`
            );

            card.style.setProperty(
              "--gy",
              `${y}%`
            );

          }
        );

      }
    );

  }


  /* =========================================================
     HERO BUBBLE CANVAS
     ========================================================= */

  if (
    hero &&
    !reducedMotion
  ) {

    const canvas =
      document.createElement(
        "canvas"
      );

    canvas.className =
      "hero-canvas";

    hero.prepend(
      canvas
    );


    const context =
      canvas.getContext("2d");


    let width;
    let height;
    let visible = true;


    function resizeCanvas() {

      width =
        canvas.width =
        canvas.offsetWidth;

      height =
        canvas.height =
        canvas.offsetHeight;

    }


    resizeCanvas();


    window.addEventListener(
      "resize",
      resizeCanvas
    );


    function createBubble(
      initial = false
    ) {

      return {

        x:
          Math.random() *
          width,

        y:
          initial
            ? Math.random() * height
            : height + 20,

        radius:
          2 +
          Math.random() * 9,

        speed:
          .25 +
          Math.random() * .7,

        wave:
          Math.random() * 6

      };

    }


    const bubbles =
      Array.from(
        {
          length:
            width < 700
              ? 20
              : 44
        },
        () =>
          createBubble(true)
      );


    const visibilityObserver =
      new IntersectionObserver(
        entries => {

          visible =
            entries[0].isIntersecting;

        }
      );


    visibilityObserver.observe(
      canvas
    );


    function drawBubbles(
      time
    ) {

      requestAnimationFrame(
        drawBubbles
      );


      if (!visible) return;


      context.clearRect(
        0,
        0,
        width,
        height
      );


      bubbles.forEach(
        (bubble, index) => {

          bubble.y -=
            bubble.speed;


          bubble.x +=
            Math.sin(
              time / 900 +
              bubble.wave
            ) *
            .3;


          if (
            bubble.y <
            -20
          ) {

            bubbles[index] =
              createBubble(false);

          }


          const gradient =
            context.createRadialGradient(
              bubble.x -
                bubble.radius * .3,

              bubble.y -
                bubble.radius * .3,

              0,

              bubble.x,

              bubble.y,

              bubble.radius
            );


          gradient.addColorStop(
            0,
            "rgba(255,255,255,.35)"
          );


          gradient.addColorStop(
            1,
            "rgba(124,236,255,.06)"
          );


          context.fillStyle =
            gradient;


          context.beginPath();


          context.arc(
            bubble.x,
            bubble.y,
            bubble.radius,
            0,
            Math.PI * 2
          );


          context.fill();


          context.strokeStyle =
            "rgba(124,236,255,.22)";


          context.stroke();

        }
      );

    }


    requestAnimationFrame(
      drawBubbles
    );

  }


  /* =========================================================
     QUIZ
     ========================================================= */

  const questions = [

    {
      q:
        "What does “safely managed drinking water” include?",

      options: [

        "Only water that looks clear",

        "An improved source that is accessible, available when needed and free from contamination",

        "Only bottled water",

        "Water with exactly the same mineral composition everywhere"

      ],

      answer: 1,

      feedback:
        "Correct. The WHO/UNICEF JMP definition combines source type, accessibility, availability and quality."

    },


    {
      q:
        "Which is a major drinking-water safety concern?",

      options: [

        "Microbial contamination",

        "The shape of the bottle",

        "The colour of the tap",

        "The size of a water glass"

      ],

      answer: 0,

      feedback:
        "Correct. Microbial contamination is one of the greatest risks to drinking-water safety."

    },


    {
      q:
        "Why should reusable bottles be cleaned regularly?",

      options: [

        "Only to make them look new",

        "To remove residues and reduce hygiene risks",

        "Because water becomes carbonated",

        "It is only necessary once a year"

      ],

      answer: 1,

      feedback:
        "Correct. Cleaning helps remove residues and reduce opportunities for microbial growth."

    },


    {
      q:
        "Which statement about the water-quality lab is correct?",

      options: [

        "One number proves water is completely safe",

        "Clear-looking water is always safe",

        "Real safety assessment needs appropriate testing and risk management",

        "TDS alone determines whether water is safe"

      ],

      answer: 2,

      feedback:
        "Correct. Drinking-water safety is multi-parameter and risk-based."

    },


    {
      q:
        "What is one useful campus technology idea?",

      options: [

        "Hide water points",

        "Use QR codes to identify water points and make reporting easier",

        "Allow only anonymous rumours",

        "Remove maintenance records"

      ],

      answer: 1,

      feedback:
        "Correct. A QR-linked reporting flow can connect a specific water point with a structured issue report."

    }

  ];


  let quizIndex = 0;
  let quizScore = 0;
  let quizAnswered = false;


  const quizQuestion =
    $("#quizQuestion");

  const quizOptions =
    $("#quizOptions");

  const quizCount =
    $("#quizCount");

  const quizProgress =
    $("#quizProgress");

  const quizFeedback =
    $("#quizFeedback");

  const quizNext =
    $("#quizNext");


  function renderQuiz() {

    if (
      !quizQuestion ||
      !quizOptions
    ) {
      return;
    }


    const question =
      questions[quizIndex];


    quizAnswered =
      false;


    if (quizCount) {

      quizCount.textContent =
        `Question ${
          quizIndex + 1
        } / ${
          questions.length
        }`;

    }


    if (quizProgress) {

      quizProgress.style.width =
        `${
          (
            (quizIndex + 1) /
            questions.length
          ) * 100
        }%`;

    }


    quizQuestion.textContent =
      question.q;


    quizOptions.innerHTML =
      "";


    if (quizFeedback) {

      quizFeedback.textContent =
        "";

    }


    if (quizNext) {

      quizNext.disabled =
        true;

      quizNext.classList.remove(
        "enabled"
      );

      quizNext.textContent =
        quizIndex ===
        questions.length - 1
          ? "Finish challenge →"
          : "Next question →";

    }


    question.options.forEach(
      (option, index) => {

        const button =
          document.createElement(
            "button"
          );


        button.className =
          "quiz-option";


        button.type =
          "button";


        button.textContent =
          option;


        button.addEventListener(
          "click",
          () => {

            answerQuiz(
              index,
              button
            );

          }
        );


        quizOptions.appendChild(
          button
        );

      }
    );

  }


  function answerQuiz(
    selectedIndex,
    clickedButton
  ) {

    if (
      quizAnswered
    ) {
      return;
    }


    quizAnswered =
      true;


    const question =
      questions[quizIndex];


    const options =
      $$(".quiz-option");


    options.forEach(
      (button, index) => {

        if (
          index ===
          question.answer
        ) {

          button.classList.add(
            "correct"
          );

        }

      }
    );


    if (
      selectedIndex ===
      question.answer
    ) {

      quizScore++;

      if (quizFeedback) {

        quizFeedback.textContent =
          `✓ ${question.feedback}`;

      }

    }

    else {

      clickedButton.classList.add(
        "wrong"
      );

      if (quizFeedback) {

        quizFeedback.textContent =
          `✕ Not quite. ${question.feedback}`;

      }

    }


    if (quizNext) {

      quizNext.disabled =
        false;

      quizNext.classList.add(
        "enabled"
      );

    }

  }


  function showQuizResult() {

    const percentage =
      Math.round(
        quizScore /
        questions.length *
        100
      );


    if (quizCount) {

      quizCount.textContent =
        "CHALLENGE COMPLETE";

    }


    if (quizQuestion) {

      quizQuestion.textContent =
        percentage >= 80
          ? "🏆 Water Safety Champion!"
          : percentage >= 60
            ? "💧 Strong water-safety awareness!"
            : "🌱 Good start — explore the sections once more!";

    }


    if (quizOptions) {

      quizOptions.innerHTML = `
        <div
          style="
            padding:25px;
            border-radius:15px;
            background:rgba(255,255,255,.06);
            text-align:center;
          "
        >

          <strong
            style="
              font:700 40px Manrope;
              color:#7cecff;
            "
          >
            ${quizScore}/${questions.length}
          </strong>

          <p
            style="
              margin-top:8px;
              color:rgba(255,255,255,.5);
              font-size:12px;
            "
          >
            You scored ${percentage}%.
          </p>

        </div>
      `;

    }


    if (quizFeedback) {

      quizFeedback.textContent =
        "The goal is understanding, not memorising.";

    }


    if (quizNext) {

      quizNext.textContent =
        "Try again →";

      quizNext.disabled =
        false;

      quizNext.classList.add(
        "enabled"
      );


      quizNext.onclick =
        () => {

          quizIndex = 0;

          quizScore = 0;

          quizNext.onclick =
            null;

          renderQuiz();

        };

    }

  }


  if (quizNext) {

    quizNext.addEventListener(
      "click",
      () => {

        if (
          !quizAnswered
        ) {
          return;
        }


        if (
          quizIndex <
          questions.length - 1
        ) {

          quizIndex++;

          renderQuiz();

        }

        else {

          showQuizResult();

        }

      }
    );

  }


  renderQuiz();


  /* =========================================================
     TOAST
     ========================================================= */

  let toastTimer;


  function showToast(
    message
  ) {

    const toast =
      $("#toast");


    if (!toast) {
      return;
    }


    toast.textContent =
      message;


    toast.classList.add(
      "show"
    );


    clearTimeout(
      toastTimer
    );


    toastTimer =
      setTimeout(
        () => {

          toast.classList.remove(
            "show"
          );

        },
        2600
      );

  }


  /* =========================================================
     STORY RESPONSIVENESS
     ========================================================= */

  window.addEventListener(
    "resize",
    () => {

      if (
        storySteps.length
      ) {

        updateStory();

      }

    }
  );


  /* =========================================================
     ACCESSIBILITY
     ========================================================= */

  $$(".water-point").forEach(
    point => {

      point.setAttribute(
        "aria-label",
        `Water point ${
          point.dataset.point ||
          ""
        }, ${
          point.dataset.name ||
          ""
        }`
      );

    }
  );


  $$(".hotspot").forEach(
    hotspot => {

      hotspot.setAttribute(
        "aria-label",
        `Investigate hotspot ${
          hotspot.textContent.trim()
        }`
      );

    }
  );


  const sourceTabs =
    $(".source-tabs");

  if (sourceTabs) {

    sourceTabs.setAttribute(
      "role",
      "tablist"
    );

  }


  $$(".source-tab").forEach(
    tab => {

      tab.setAttribute(
        "role",
        "tab"
      );

    }
  );


  /* =========================================================
     YEAR
     ========================================================= */

  const year =
    $("#year");

  if (year) {

    year.textContent =
      new Date().getFullYear();

  }


  /* =========================================================
     DEFAULT INDIA REGION
     ========================================================= */

  const defaultIndia =
    $('.continent[data-region="india"]');


  if (defaultIndia) {

    defaultIndia.classList.add(
      "active"
    );

  }


  /* =========================================================
     FOOTER DISCLAIMER
     ========================================================= */

  const footerNote =
    $(".footer-bottom span:last-child");


  if (footerNote) {

    footerNote.textContent =
      footerNote.textContent.replace(
        "Informations shared in this website are",
        "Information shared on this website is"
      );

  }


  /* =========================================================
     INITIAL STORY STATE
     ========================================================= */

  updateStory();


  /* =========================================================
     FINISHED
     ========================================================= */

  console.log(
    "WaterSafe Campus — Interactive experience loaded successfully."
  );

});