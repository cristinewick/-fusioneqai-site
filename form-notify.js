(function () {
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
