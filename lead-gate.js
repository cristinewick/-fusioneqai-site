(function () {
  var config = window.FUSIONEQ_LEAD_GATE || {};
  var gate = document.querySelector("[data-lead-gate]");
  var fallback = document.querySelector("[data-lead-gate-fallback]");
  var gateMessage = document.querySelector("[data-lead-gate-message]");
  var analyzerCard = document.querySelector("[data-analyzer-link-card]");
  var analyzerPlaceholder = document.querySelector("[data-analyzer-placeholder]");
  var analyzerLink = document.querySelector("[data-analyzer-link]");
  var contentType = config.contentType || "sample";
  var storageKey = "fusioneqAccessGateUnlocked:v1:" + contentType;

  function unlockContent() {
    try {
      window.localStorage.setItem(storageKey, "true");
    } catch (error) {}

    document.body.classList.remove("is-lead-gated");

    if (gate) {
      gate.setAttribute("hidden", "");
    }

    if (config.analyzerUrl && config.analyzerUrl !== "YOUR_ANALYZER_LINK") {
      showAnalyzerLink();
    }
  }

  function showAnalyzerLink() {
    if (!analyzerCard || !analyzerLink) {
      return;
    }

    analyzerLink.href = config.analyzerUrl;
    analyzerCard.removeAttribute("hidden");

    if (analyzerPlaceholder) {
      analyzerPlaceholder.setAttribute("hidden", "");
    }
  }

  function hasHubSpotConfig() {
    return Boolean(
      config.portalId &&
      config.formId &&
      config.portalId !== "YOUR_PORTAL_ID" &&
      config.formId !== "YOUR_FORM_ID"
    );
  }

  function hasAccessCodeConfig() {
    return Boolean(config.accessCode && config.accessCode !== "YOUR_ACCESS_CODE");
  }

  function setGateMessage(message) {
    if (gateMessage) {
      gateMessage.textContent = message;
    }
  }

  try {
    if (window.localStorage.getItem(storageKey) === "true") {
      unlockContent();
      return;
    }
  } catch (error) {}

  if (config.gateType === "access-code" && fallback) {
    fallback.addEventListener("submit", function (event) {
      var accessCode = fallback.querySelector("[name='access-code']");
      var submittedCode = accessCode ? accessCode.value.trim() : "";

      event.preventDefault();

      if (!hasAccessCodeConfig()) {
        unlockContent();
        return;
      }

      if (submittedCode === config.accessCode) {
        unlockContent();
        return;
      }

      setGateMessage("That access code did not match. Please check the code provided after your consultation.");
    });
  } else if (hasHubSpotConfig()) {
    var loadHubSpot = function () {
      if (!window.hbspt || !window.hbspt.forms) {
        window.setTimeout(loadHubSpot, 120);
        return;
      }

      if (fallback) {
        fallback.setAttribute("hidden", "");
      }

      window.hbspt.forms.create({
        region: config.region || "na1",
        portalId: config.portalId,
        formId: config.formId,
        target: "#hubspot-lead-form",
        onFormSubmitted: unlockContent
      });
    };

    loadHubSpot();
  } else if (fallback) {
    fallback.addEventListener("submit", function (event) {
      event.preventDefault();
      unlockContent();
    });
  }
})();
