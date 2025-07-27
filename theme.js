// Проверяем загрузку DOM
document.addEventListener('DOMContentLoaded', function() {
  const toggle = document.getElementById('theme-toggle');
  
  // Проверяем, существует ли кнопка
  if (!toggle) {
    console.error('Кнопка theme-toggle не найдена!');
    return;
  }

  // Функция переключения темы
  function setTheme(theme) {
    document.body.classList.toggle('dark-theme', theme === 'dark');
    localStorage.setItem('theme', theme);
  }

  // Загружаем сохранённую тему
  const savedTheme = localStorage.getItem('theme') || 
                    (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  setTheme(savedTheme);

  // Обработчик клика
  toggle.addEventListener('click', () => {
    const isDark = document.body.classList.contains('dark-theme');
    setTheme(isDark ? 'light' : 'dark');
  });
  
  console.log('Скрипт темы загружен!'); // Для отладки
});