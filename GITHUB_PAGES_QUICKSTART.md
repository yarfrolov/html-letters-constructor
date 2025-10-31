# ⚡ GitHub Pages - Быстрый старт

## Самый простой способ (GitHub Desktop)

### 1. Скачайте GitHub Desktop
Перейдите на https://desktop.github.com/ и скачайте приложение

### 2. Войдите в GitHub
Откройте GitHub Desktop и войдите в свой аккаунт GitHub

### 3. Добавьте проект
1. File → Add Local Repository
2. Выберите папку "Конструктор писем"
3. Если появится ошибка "not a git repository", нажмите "create a repository"

### 4. Опубликуйте
1. Нажмите кнопку "Publish repository" вверху
2. Введите название (например, `email-constructor`)
3. Снимите галочку "Keep this code private" если хотите публичный репозиторий
4. Нажмите "Publish repository"

### 5. Включите GitHub Pages
1. Откройте браузер и перейдите на github.com
2. Откройте ваш репозиторий
3. Нажмите **Settings** (вверху справа)
4. В левом меню выберите **Pages**
5. В разделе "Source" выберите:
   - Branch: `main`
   - Folder: `/ (root)`
6. Нажмите **Save**

### 6. Готово! 🎉
Через 1-2 минуты ваш сайт будет доступен по адресу:
```
https://ваш-username.github.io/название-репозитория/
```

---

## Через командную строку (для опытных)

```bash
# 1. Перейдите в папку проекта
cd "/Users/yaroslav/Desktop/Конструктор писем"

# 2. Инициализируйте Git (если еще не сделано)
git init

# 3. Добавьте все файлы
git add .

# 4. Создайте первый коммит
git commit -m "Initial commit"

# 5. Переименуйте ветку в main
git branch -M main

# 6. Подключите GitHub репозиторий (замените на ваш URL)
git remote add origin https://github.com/ваш-username/ваш-repo.git

# 7. Отправьте код на GitHub
git push -u origin main
```

Затем включите GitHub Pages в настройках репозитория (см. пункт 5 выше).

---

## ⚠️ Важно перед публикацией!

### Измените пароли
Откройте `index.html` и удалите или закомментируйте блок с подсказками:

```html
<!-- Закомментируйте этот блок:
<div class="login-hint">
    <p>💡 Подсказка:</p>
    <p>Пользователь: <code>user-m2</code></p>
    <p>Администратор: <code>admin-m2</code></p>
</div>
-->
```

И/или измените пароли в файле `app.js`:
```javascript
const PASSWORDS = {
    admin: 'ваш-новый-пароль-админа',
    user: 'ваш-новый-пароль-пользователя'
};
```

---

## 📝 Обновление сайта

### Через GitHub Desktop:
1. Внесите изменения в файлы
2. Откройте GitHub Desktop
3. Напишите описание изменений внизу слева
4. Нажмите "Commit to main"
5. Нажмите "Push origin" вверху

### Через командную строку:
```bash
git add .
git commit -m "Описание изменений"
git push
```

Изменения появятся на сайте через 1-2 минуты!

---

## 🔧 Решение проблем

### Сайт не открывается
1. Подождите 2-3 минуты после первой публикации
2. Проверьте, что GitHub Pages включен в Settings → Pages
3. Проверьте URL (должен быть вида: `username.github.io/repo-name`)

### Стили не загружаются
1. Проверьте консоль браузера (F12)
2. Убедитесь, что пути в `index.html` относительные (без `/` в начале)

### LocalStorage не работает
GitHub Pages полностью поддерживает localStorage. Проверьте настройки браузера.

---

## 📞 Нужна помощь?

- Полная инструкция: [`DEPLOYMENT.md`](DEPLOYMENT.md)
- Безопасность: [`SECURITY.md`](SECURITY.md)
- Основная документация: [`README.md`](README.md)

---

**Успехов! 🚀**

