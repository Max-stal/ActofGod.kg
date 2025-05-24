self.addEventListener('push', event => {
    const data = event.data.json();
    self.registration.showNotification('⚠ Землетрясение поблизости', {
      body: data.body,
      icon: 'https://cdn-icons-png.flaticon.com/512/2698/2698194.png'
    });
  });