document.addEventListener('DOMContentLoaded', () => {
    const form            = document.querySelector('.rsvp-form');
    const responseMessage = document.getElementById('responseMessage');
    const overlay         = document.getElementById('overlay');
  
    form.addEventListener('submit', async e => {
      e.preventDefault();
  
      // show overlay + spinner
      overlay.style.display = 'block';
  
      // gather form data
      const formData = new FormData(form);
      const data     = {};
      formData.forEach((v,k) => data[k] = v);
  
      const scriptURL = 'https://script.google.com/macros/s/AKfycbyJrSteZBstiZwuq2M1zTTZg5X5DmdmLegqZ-EuMRvURcwXla8qDlebOVAiJ3QrM9bT/exec';
  
      try {
        await fetch(scriptURL, {
          method:  'POST',
          mode:    'no-cors',  // or 'cors' if CORS is set up
          headers: { 'Content-Type':'application/json' },
          body:    JSON.stringify(data)
        });
  
        responseMessage.textContent = 'Рахмет! RSVP жіберілді.';
        responseMessage.style.color = 'green';
        form.reset();
      } catch (err) {
        console.error(err);
        responseMessage.textContent = 'Қате пайда болды. Қайтадан көріңіз.';
        responseMessage.style.color = 'red';
      } finally {
        // hide overlay
        overlay.style.display = 'none';
      }
    });
  });