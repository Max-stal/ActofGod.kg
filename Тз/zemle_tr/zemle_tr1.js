    // Создаём карту и устанавливаем начальный масштаб и центр (весь мир)
    const map = L.map('map').setView([20, 0], 1);

    // Добавляем слой карты (из OpenStreetMap)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: 'Карта © OpenStreetMap',
    }).addTo(map);

    // Функция для загрузки данных о землетрясениях
    async function loadEarthquakes() {
      const url = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_hour.geojson';
      const response = await fetch(url);
      const data = await response.json();

      data.features.forEach(eq => {
        const [lon, lat, depth] = eq.geometry.coordinates;
        const magnitude = eq.properties.mag;
        const place = eq.properties.place;
        const time = new Date(eq.properties.time).toLocaleString();

        // Отображаем точку землетрясения на карте
        L.circleMarker([lat, lon], {
          radius: magnitude * 2, // размер зависит от магнитуды
          color: 'red',
          fillColor: '#f03',
          fillOpacity: 0.5
        }).bindPopup(`
          <b>${place}</b><br>
          Магнитуда: ${magnitude}<br>
          Глубина: ${depth} км<br>
          Время: ${time}
        `).addTo(map);
      });
    }

    // Загружаем данные при загрузке страницы
    loadEarthquakes();

    // Обновляем данные каждые 5 минут (300 000 миллисекунд)
    setInterval(() => {
      map.eachLayer(layer => {
        if (layer instanceof L.CircleMarker) {
          map.removeLayer(layer);
        }
      });
      loadEarthquakes();
    }, 300000);

    //Картинки
    const images = ['img/img1.1.jpg','img/img1.2.webp','img/img1.3.jpg','img/img1.4.webp']; // список путей к картинкам
let currentIndex = 0;

const imgElement = document.getElementById('my_img');
const btn = document.getElementById('add_button');
const btn1 = document.getElementById('add_button1');

btn.addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % images.length; // переход по кругу
  imgElement.src = images[currentIndex];
});

btn1.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    imgElement.src = images[currentIndex];
  });