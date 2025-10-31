# 📋 Шпаргалка - Конструктор HTML писем

## 🔑 Пароли доступа
- **Пользователь**: `user-m2`
- **Администратор**: `admin-m2`

## 📂 Структура файлов
```
Конструктор писем/
├── index.html                      # Главная страница приложения
├── styles.css                      # Все стили
├── app.js                          # Вся логика приложения
├── examples.html                   # 13 готовых примеров блоков
│
├── README.md                       # Полная документация
├── QUICK_START.md                  # Быстрый старт
├── SECURITY.md                     # Изменение паролей
├── DEPLOYMENT.md                   # Полная инструкция деплоя
├── GITHUB_PAGES_QUICKSTART.md     # Быстрый деплой на GitHub Pages
├── CHEATSHEET.md                  # Этот файл
│
├── .gitignore                      # Игнорируемые файлы
├── .nojekyll                       # Отключение Jekyll для GitHub Pages
├── deploy.sh                       # Скрипт деплоя (Mac/Linux)
└── deploy.bat                      # Скрипт деплоя (Windows)
```

## 🚀 Быстрые команды Git

### Первый раз (инициализация)
```bash
cd "/Users/yaroslav/Desktop/Конструктор писем"
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/USERNAME/REPO.git
git push -u origin main
```

### Обновление (после изменений)
```bash
git add .
git commit -m "Описание изменений"
git push
```

### Использование скриптов деплоя
```bash
# Mac/Linux
./deploy.sh

# Windows
deploy.bat
```

## 🎨 Атрибуты для редактируемых блоков

### Редактируемый текст
```html
<p data-editable="text">Текст</p>
<h1 data-editable="text">Заголовок</h1>
<div data-editable="text">Блок текста</div>
```

### Редактируемая ссылка
```html
<a href="URL" data-editable="text" data-editable-href="href">
    Текст ссылки
</a>
```

### Редактируемое изображение
```html
<img src="URL" data-editable-src="src" alt="Описание" />
```

### Комбинированный пример
```html
<div style="text-align: center; padding: 20px;">
    <img src="https://example.com/image.jpg" 
         data-editable-src="src" 
         style="max-width: 100%;" />
    <h2 data-editable="text">Заголовок</h2>
    <p data-editable="text">Описание</p>
    <a href="https://example.com" 
       data-editable="text" 
       data-editable-href="href"
       style="display: inline-block; padding: 10px 20px; background: #667eea; color: white;">
        Кнопка
    </a>
</div>
```

## 💻 Локальный веб-сервер (для тестирования)

### Python 3
```bash
python3 -m http.server 8000
# Откройте: http://localhost:8000
```

### Node.js
```bash
npm install -g http-server
http-server
# Откройте: http://localhost:8080
```

### PHP
```bash
php -S localhost:8000
# Откройте: http://localhost:8000
```

## 🔐 Изменение паролей

### 1. Откройте app.js
Найдите строки 8-12:
```javascript
const PASSWORDS = {
    admin: 'admin-m2',
    user: 'user-m2'
};
```

### 2. Измените пароли
```javascript
const PASSWORDS = {
    admin: 'новый-пароль-админа',
    user: 'новый-пароль-пользователя'
};
```

### 3. Скройте подсказки на экране входа
Откройте `index.html` и закомментируйте блок (строки 33-37):
```html
<!-- 
<div class="login-hint">
    <p>💡 Подсказка:</p>
    <p>Пользователь: <code>user-m2</code></p>
    <p>Администратор: <code>admin-m2</code></p>
</div>
-->
```

## 📧 Рекомендации для email HTML

### ✅ Хорошие практики
- Используйте **inline-стили** вместо классов
- Максимальная ширина: **600px**
- Используйте **таблицы** для сложных макетов
- **Абсолютные URL** для всех изображений
- Безопасные шрифты: Arial, Helvetica, Times New Roman
- Избегайте JavaScript в блоках

### ❌ Избегайте
- Flexbox и Grid
- Внешние CSS файлы
- JavaScript
- Видео (используйте превью с ссылкой)
- Веб-шрифты (могут не работать)

### 📐 Базовый шаблон блока
```html
<div style="padding: 20px; background: #ffffff;">
    <table width="100%" cellpadding="0" cellspacing="0" border="0">
        <tr>
            <td style="padding: 10px; text-align: center;">
                <!-- Ваш контент здесь -->
            </td>
        </tr>
    </table>
</div>
```

## 🌐 URL GitHub Pages

### Стандартный
```
https://username.github.io/repository-name/
```

### С собственным доменом
1. Создайте файл `CNAME` с содержимым:
```
yourdomain.com
```

2. Настройте DNS записи у регистратора

## 🐛 Быстрое решение проблем

| Проблема | Решение |
|----------|---------|
| Не загружается на GitHub Pages | Подождите 2-3 минуты, проверьте Settings → Pages |
| Стили не применяются | Проверьте относительные пути в index.html |
| localStorage не работает | Проверьте настройки браузера (cookies) |
| Ошибка 404 | Убедитесь, что файл называется `index.html` |
| Не сохраняются блоки | Очистите кэш браузера, проверьте консоль (F12) |

## ⌨️ Горячие клавиши

| Клавиша | Действие |
|---------|----------|
| Enter | Войти в систему (на экране входа) |
| F5 / Cmd+R | Обновить страницу |
| F12 | Открыть консоль разработчика |
| Cmd+C / Ctrl+C | Скопировать HTML (в окне экспорта) |

## 📊 Размеры блоков (рекомендации)

- **Общая ширина**: 600px
- **Padding блоков**: 20-30px
- **Шрифт заголовков**: 20-32px
- **Шрифт текста**: 14-16px
- **Размер кнопок**: padding 12-15px, font-size 14-16px
- **Изображения**: max-width 100%, height auto

## 🔄 Workflow разработки

1. **Локальная разработка**
   - Открыть `index.html` локально
   - Внести изменения
   - Протестировать

2. **Коммит изменений**
   ```bash
   git add .
   git commit -m "Описание"
   ```

3. **Деплой**
   ```bash
   git push
   ```

4. **Проверка**
   - Открыть сайт на GitHub Pages
   - Проверить функционал
   - При необходимости повторить 1-3

## 📱 Контакты и ссылки

- **GitHub Pages Docs**: https://pages.github.com/
- **Git Cheat Sheet**: https://education.github.com/git-cheat-sheet-education.pdf
- **HTML Email Guide**: https://www.emailonacid.com/blog/article/email-development/
- **Can I Email**: https://www.caniemail.com/ (проверка поддержки CSS)

---

**Сохраните этот файл в закладки для быстрого доступа! 📌**

