async function loadMudflowData() {
    const tableBody = document.querySelector('#mudflowTable tbody');

    try {


      // Для демонстрации используем фиктивные данные
      const data = [
        { region: 'Баткенская область', precipitation: 20, riskLevel: 'Moderate', description: 'Умеренный риск из-за прогнозируемых дождей.' },
        { region: 'Джалал-Абадская область', precipitation: 25, riskLevel: 'High', description: 'Сильные дожди увеличили риск селевых потоков.' },
        { region: 'Иссык-Кульская область', precipitation: 10, riskLevel: 'Low', description: 'Низкий риск при текущих погодных условиях.' },
        { region: 'Нарынская область', precipitation: 0, riskLevel: 'Unknown', description: 'Недостаточно данных.' },
        { region: 'Ошская область', precipitation: 30, riskLevel: 'High', description: 'Сильные дожди увеличили риск селевых потоков.' },
        { region: 'Таласская область', precipitation: 15, riskLevel: 'Moderate', description: 'Умеренный риск из-за прогнозируемых дождей.' },
        { region: 'Чуйская область', precipitation: 5, riskLevel: 'Low', description: 'Низкий риск при текущих погодных условиях.' },
        { region: 'г. Бишкек', precipitation: 3, riskLevel: 'Low', description: 'Низкий риск при текущих погодных условиях.' },
        { region: 'г. Ош', precipitation: 4, riskLevel: 'Low', description: 'Низкий риск при текущих погодных условиях.' }
      ];

      tableBody.innerHTML = ''; // Очистка предыдущих данных

      data.forEach(item => {
        const row = document.createElement('tr');
        row.className = item.riskLevel;

        row.innerHTML = `
          <td>${item.region}</td>
          <td>${item.precipitation}</td>
          <td>${item.riskLevel}</td>
          <td>${item.description}</td>
        `;

        tableBody.appendChild(row);
      });

    } catch (error) {
      tableBody.innerHTML = `<tr><td colspan="4">Ошибка загрузки данных</td></tr>`;
      console.error('Ошибка при загрузке данных:', error);
    }
  }

  loadMudflowData();
  setInterval(loadMudflowData, 300000); // Обновление каждые 5 минут