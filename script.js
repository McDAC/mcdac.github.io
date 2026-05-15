// Настройки пагинации
const itemsPerPage = 12;
let currentPage = 1;
let filteredPoems = [...poems];
let currentFilter = 'all';

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
  // Обновляем информацию об общем количестве стихов
  document.getElementById('total-items').textContent = poems.length;

  // Инициализируем отображение стихов
  displayPoems();

  // Назначаем обработчики событий
  setupEventListeners();
});

// Функция отображения стихов
function displayPoems() {
  const container = document.getElementById('poems-container');
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const poemsToShow = filteredPoems.slice(startIndex, endIndex);

  container.innerHTML = '';

  poemsToShow.forEach(poem => {
    const poemCard = document.createElement('a');
    poemCard.href = `poems/poem-${poem.id}.html`;
    poemCard.className = 'poem-card';
    poemCard.innerHTML = `
      <div class="poem-title">${poem.title}</div>
      <div class="poem-meta">${poem.date}</div>
    `;
    container.appendChild(poemCard);
  });

  updatePagination();
  updatePageInfo();
}

// Функция обновления пагинации
function updatePagination() {
  const totalPages = Math.ceil(filteredPoems.length / itemsPerPage);
  const paginationContainer = document.getElementById('pagination');

  paginationContainer.innerHTML = '';

  if (totalPages <= 1) return;

  // Кнопка "Назад"
  if (currentPage > 1) {
    const prevBtn = document.createElement('button');
    prevBtn.className = 'page-btn';
    prevBtn.innerHTML = '&laquo;';
    prevBtn.addEventListener('click', () => {
      currentPage--;
      displayPoems();
      window.scrollTo(0, 0);
    });
    paginationContainer.appendChild(prevBtn);
  }

  // Нумерация страниц
  const startPage = Math.max(1, currentPage - 2);
  const endPage = Math.min(totalPages, startPage + 4);

  for (let i = startPage; i <= endPage; i++) {
    const pageBtn = document.createElement('button');
    pageBtn.className = `page-btn ${i === currentPage ? 'active' : ''}`;
    pageBtn.textContent = i;
    pageBtn.addEventListener('click', () => {
      currentPage = i;
      displayPoems();
      window.scrollTo(0, 0);
    });
    paginationContainer.appendChild(pageBtn);
  }

  // Кнопка "Вперед"
  if (currentPage < totalPages) {
    const nextBtn = document.createElement('button');
    nextBtn.className = 'page-btn';
    nextBtn.innerHTML = '&raquo;';
    nextBtn.addEventListener('click', () => {
      currentPage++;
      displayPoems();
      window.scrollTo(0, 0);
    });
    paginationContainer.appendChild(nextBtn);
  }
}

// Функция обновления информации о странице
function updatePageInfo() {
  const startIndex = (currentPage - 1) * itemsPerPage + 1;
  const endIndex = Math.min(filteredPoems.length, currentPage * itemsPerPage);
  document.getElementById('items-shown').textContent = `${startIndex}-${endIndex}`;
}

// Поиск стихов
function setupSearch() {
  document.getElementById('search-input').addEventListener('input', function(e) {
    const searchTerm = e.target.value.toLowerCase();

    if (searchTerm) {
      filteredPoems = poems.filter(poem =>
        poem.title.toLowerCase().includes(searchTerm)
      );
    } else {
      // Если поисковой запрос пуст, применяем текущий фильтр по годам
      applyYearFilter(currentFilter);
      return;
    }

    currentPage = 1;
    displayPoems();
  });
}

// Фильтрация по годам
function applyYearFilter(year) {
  currentFilter = year;

  if (year === 'all') {
    filteredPoems = [...poems];
  } else {
    filteredPoems = poems.filter(poem => poem.year === parseInt(year));
  }

  currentPage = 1;
  displayPoems();
}

// Назначение обработчиков для кнопок фильтрации
function setupYearFilters() {
  document.querySelectorAll('.year-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      document.querySelectorAll('.year-btn').forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      applyYearFilter(this.dataset.year);
    });
  });
}

// Настройка всех обработчиков событий
function setupEventListeners() {
  setupYearFilters();
}
