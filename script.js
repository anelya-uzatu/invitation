document.addEventListener('DOMContentLoaded', () => {
  const form            = document.querySelector('.rsvp-form');
  const overlay         = document.getElementById('overlay');
  const modal           = document.getElementById('thankyouModal');
  const modalMessage    = document.getElementById('modalMessage');
  const modalClose      = document.getElementById('modalClose');
  const scriptURL       = 'https://script.google.com/macros/s/AKfycbyJrSteZBstiZwuq2M1zTTZg5X5DmdmLegqZ-EuMRvURcwXla8qDlebOVAiJ3QrM9bT/exec';

  // close the modal when "Жабу" is clicked
  modalClose.addEventListener('click', () => {
    modal.style.display = 'none';
  });

  form.addEventListener('submit', async e => {
    e.preventDefault();

    overlay.style.display = 'block';

    const formData = new FormData(form);
    const data = {};
    formData.forEach((v,k) => data[k] = v);

    try {
      await fetch(scriptURL, {
        method:  'POST',
        mode:    'no-cors',  // or 'cors' when CORS is set up
        headers: { 'Content-Type':'application/json' },
        body:    JSON.stringify(data)
      });
      // success
      modalMessage.textContent = 'Рахмет! Жауабыңыз жіберілді.';
    } catch (err) {
      console.error(err);
      // failure
      modalMessage.textContent = 'Қате пайда болды. Қайтадан көріңіз.';
    } finally {
      overlay.style.display = 'none';
      modal.style.display   = 'flex';
      form.reset();
    }
  });
});