const publicKey = 'ВАШ_PUBLIC_VAPID_KEY_СЮДА';

async function registerServiceWorker() {
  const reg = await navigator.serviceWorker.register('zemle_tr1_service.js');
  console.log('Service worker зарегистрирован');

  const permission = await Notification.requestPermission();
  if (permission !== 'granted') {
    alert('Разрешите уведомления для получения предупреждений');
    return;
  }

  const sub = await reg.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlBase64ToUint8Array(publicKey)
  });

  await fetch('/subscribe', {
    method: 'POST',
    body: JSON.stringify(sub),
    headers: { 'Content-Type': 'application/json' }
  });

  console.log('Пользователь подписан');
}

function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
  const raw = atob(base64);
  return new Uint8Array([...raw].map(char => char.charCodeAt(0)));
}

if ('serviceWorker' in navigator && 'PushManager' in window) {
  registerServiceWorker();
}