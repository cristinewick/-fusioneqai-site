(function () {
  const requestTypeMap = {
    LENS: 'LENS premium course',
    READ: 'READ premium course',
    CLEAR: 'CLEAR premium course',
    'premium-courses': 'Not sure yet',
    report: 'Deal Readiness Report',
    presentation: 'Presentation Readiness Report',
    book: 'Book updates',
    brief: 'Executive brief'
  };
  const requestNoteMap = {
    LENS: "You're exploring FusionEQ LENS™ for your team. We'll help you confirm whether FusionEQ LENS™, FusionEQ READ™, FusionEQ CLEAR™, Foundations, or a readiness report is the right next step.",
    READ: "You're exploring FusionEQ READ™ for sellers. We'll help you confirm whether FusionEQ READ™, Foundations, FusionEQ LENS™, FusionEQ CLEAR™, or a readiness report is the right next step.",
    CLEAR: "You're exploring FusionEQ CLEAR™ for managers. We'll help you confirm whether FusionEQ CLEAR™, Foundations, FusionEQ LENS™, FusionEQ READ™, or a readiness report is the right next step.",
    'premium-courses': "You're exploring the premium course path. We'll help you confirm whether FusionEQ LENS™, FusionEQ READ™, FusionEQ CLEAR™, Foundations, or a readiness report is the right next step.",
    report: "You're requesting a complimentary Deal Readiness Read. We'll help you confirm the opportunity context, readiness question, evidence available, and whether a full Deal Readiness Report is useful.",
    presentation: "You're requesting a Presentation Readiness Report. We'll help you confirm the audience, message goal, decision context, and right next step.",
    book: "You're joining the book update list. We'll share updates on The Deal Behind the Deal and help you decide whether a readiness report or education path is also relevant.",
    brief: "You're exploring an executive brief. We'll help you confirm whether a readiness report, Foundations, FusionEQ LENS™, FusionEQ READ™, or FusionEQ CLEAR™ is the right next step."
  };

  const requestParam = new URLSearchParams(window.location.search).get('request');
  const requestValue = requestTypeMap[requestParam];
  const requestNote = requestNoteMap[requestParam];
  const requestSelect = document.querySelector('select[name="request_type"]');
  const requestNoteEl = document.querySelector('[data-request-path-note]');

  if (requestSelect && requestValue) {
    requestSelect.value = requestValue;
  }

  if (requestNoteEl && requestNote) {
    requestNoteEl.textContent = requestNote;
    requestNoteEl.hidden = false;
  }

  const enhancedForms = document.querySelectorAll('form[data-fusioneq-notify="true"]');

  enhancedForms.forEach((form) => {
    form.addEventListener('submit', async function handleSubmit(event) {
      event.preventDefault();

      const submitButton = form.querySelector('button[type="submit"]');
      const originalLabel = submitButton ? submitButton.textContent : '';

      if (submitButton) {
        submitButton.disabled = true;
        submitButton.textContent = 'Sending...';
      }

      const formData = new FormData(form);
      const payload = Object.fromEntries(formData.entries());
      payload.formName = payload['form-name'] || form.getAttribute('name') || 'FusionEQ form';
      payload.page = window.location.href;
      const thankYouRequestMap = {
        'Deal Readiness Report': 'report',
        'Sample report review': 'report',
        'Presentation Readiness Report': 'presentation',
        'LENS premium course': 'LENS',
        'READ premium course': 'READ',
        'CLEAR premium course': 'CLEAR',
        'Book updates': 'book',
        'Executive brief': 'brief',
        'Not sure yet': 'premium-courses'
      };
      const thankYouRequest = thankYouRequestMap[payload.request_type];

      if (thankYouRequest) {
        form.action = `thank-you.html?request=${encodeURIComponent(thankYouRequest)}`;
      }

      try {
        await fetch('/.netlify/functions/form-notification', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(payload),
          keepalive: true
        });
      } catch (error) {
        // Netlify Forms remains the source of record if the notification layer is unavailable.
      } finally {
        if (submitButton) {
          submitButton.textContent = originalLabel;
        }
        HTMLFormElement.prototype.submit.call(form);
      }
    }, { once: true });
  });
})();
