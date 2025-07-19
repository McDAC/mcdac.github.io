// Переключение темы
const themeToggle = document.getElementById('theme-toggle');
themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');
    const isDark = document.body.classList.contains('dark-theme');
    themeToggle.textContent = isDark ? 'Светлая тема' : 'Тёмная тема';
});


// poems-data.js
const poems = [
  {id: 1, title: "Без названия", year: 2023, category: "Любовная лирика"},
  {id: 2, title: "Рассвет", year: 2024, category: "Природа"}
];