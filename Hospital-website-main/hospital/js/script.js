let menu = document.querySelector('#menu-btn');
let navbar = document.querySelector('.navbar');

menu.onclick = () => {
  menu.classList.toggle('fa-times');
  navbar.classList.toggle('active');
};

window.onscroll = () => {
  menu.classList.remove('fa-times');
  navbar.classList.remove('active');
};

document.getElementById('appointmentForm').addEventListener('submit', function(event) {
  event.preventDefault(); // Formun varsayılan gönderimini engellemek için

  // Form verilerini alın
  var name = document.getElementById('name').value;
  var number = document.getElementById('number').value;
  var email = document.getElementById('email').value;
  var date = document.getElementById('date').value;

  // Verileri bir nesne olarak paketleyin
  var appointmentData = {
    name: name,
    number: number,
    email: email,
    date: date
  };

  // Verileri bir POST isteğiyle sunucuya gönderin
  fetch('http://localhost:3000/submit', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(appointmentData)
  })
    .then(function(response) {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.text();
    })
    .then(function(responseText) {
      console.log('Randevu başarıyla kaydedildi:', responseText);
      alert('Randevu başarıyla kaydedildi');
    })
    .catch(function(error) {
      console.error('Randevu kaydedilemedi:', error);
      alert('Randevu kaydedilemedi, lütfen tekrar deneyin.');
    });
});
