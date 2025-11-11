// Хранилище данных
let blocks = [];
let emailBlocks = [];
let currentEditingBlock = null;
let currentAdminEditingBlock = null;
let currentEditorContext = null;

// Версия дефолтных блоков
const BLOCKS_VERSION = '2025-11-10-welcome-urls-v3';

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    loadBlocksFromStorage();
    initializeEventListeners();
    renderAvailableBlocks();
});

// Загрузка блоков из localStorage
function loadBlocksFromStorage() {
    const savedBlocks = localStorage.getItem('emailBlocks');
    const savedVersion = localStorage.getItem('emailBlocksVersion');

    if (savedBlocks && savedVersion === BLOCKS_VERSION) {
        try {
            const parsed = JSON.parse(savedBlocks);
            if (Array.isArray(parsed) && parsed.length > 0) {
                blocks = parsed;
                return;
            }
        } catch (e) {
            console.error('Ошибка загрузки блоков:', e);
        }
    }

    // Если блоки не загружены или версия не совпадает, загружаем по умолчанию
    loadDefaultBlocks();
}

// Загрузка блоков по умолчанию
function loadDefaultBlocks() {
        blocks = getWelcomeLetterBlocks();
        saveBlocksToStorage();
}

function getWelcomeLetterBlocks() {
        return [
            {
                id: generateId(),
                name: 'М2: Обложка с изображением',
                html: `<table width="100%" cellpadding="0" cellspacing="0" border="0" role="presentation">
    <tr>
        <td align="center" style="padding: 0 20px;">
            <table width="100%" cellpadding="0" cellspacing="0" border="0" role="presentation" style="max-width: 600px; background: #ffffff; border-radius: 4px 4px 0 0;">
                <tr>
                    <td>
                        <img src="https://cdn.m2.ru/assets/file-upload-server/eaf2ec70a17447646eba32d7d60c5fa0.png" alt="main-image" width="100%" height="auto" style="display: block; width: 100%; height: auto; border-radius: 4px 4px 0 0;" data-editable-src="src" data-editable-alt="alt" />
                    </td>
                </tr>
            </table>
        </td>
    </tr>
</table>`
            },
            {
                id: generateId(),
                name: 'М2: Приветствие',
                html: `<table width="100%" cellpadding="0" cellspacing="0" border="0" role="presentation">
    <tr>
        <td align="center" style="padding: 0 20px;">
            <table width="100%" cellpadding="0" cellspacing="0" border="0" role="presentation" style="max-width: 600px; background: #ffffff;">
                <tr>
                    <td style="padding: 32px 20px 24px 20px; text-align: left;">
                        <h1 style="font-size: 28px; margin: 0; font-weight: 600;" data-editable="text">Привет<strong style="color:#5F37EB"> Username,</strong></h1>
                        <p style="line-height: 140%; margin: 20px 0 0 0; font-size: 20px;" data-editable="text">С&nbsp;сегодняшнего дня ты&nbsp;— часть команды М2. Ура!</p>
                    </td>
                </tr>
            </table>
        </td>
    </tr>
</table>`
            },
            {
                id: generateId(),
                name: 'М2: Заголовок с таймлайном',
                html: `<table width="100%" cellpadding="0" cellspacing="0" border="0" role="presentation">
    <tr>
        <td align="center" style="padding: 0 20px;">
            <table width="100%" cellpadding="0" cellspacing="0" border="0" role="presentation" style="max-width: 600px; background: #ffffff;">
                <tr>
                    <td style="padding: 0 20px 32px 20px; text-align: left;">
                        <h2 style="font-size: 22px; margin: 0 0 20px 0; font-weight: 600;" data-editable="text">Что тебя ждёт в&nbsp;ближайшие три&nbsp;месяца</h2>
                        <img src="https://cdn.m2.ru/assets/file-upload-server/a9725695bc0e05f53e8545b4224cf647.png" alt="timeline" width="100%" height="auto" style="display: block; width: 100%; height: auto;" data-editable-src="src" data-editable-alt="alt" />
                    </td>
                </tr>
            </table>
        </td>
    </tr>
</table>`
            },
            {
                id: generateId(),
                name: 'М2: План адаптации',
                html: `<table width="100%" cellpadding="0" cellspacing="0" border="0" role="presentation">
    <tr>
        <td align="center" style="padding: 0 20px;">
            <table width="100%" cellpadding="0" cellspacing="0" border="0" role="presentation" style="max-width: 600px; background: #ffffff;">
                <tr>
                    <td style="padding: 0 20px 32px 20px; text-align: left;">
                        <p style="padding: 0 0 4px 0; font-size: 20px;" data-editable="text"><strong style="color: #5F37EB;">В первый день</strong> ты подпишешь трудовой договор, получишь оборудование, почтовый аккаунт, личную страницу на портале, необходимые доступы и станешь участником рабочих чатов</p>
                        <p style="padding: 0 0 4px 0; font-size: 20px;" data-editable="text"><strong style="color: #5F37EB;">В течение первой недели</strong> познакомишься с командой и получишь задачи на испытательный срок от руководителя. А коллеги из команды обучения пришлют тебе приглашение в календарь на welcome-встречу, где ты узнаешь ещё больше о М2.</p>
                        <p style="padding: 0 0 4px 0; font-size: 20px;" data-editable="text"><strong style="color: #5F37EB;">Через две-три недели состоятся две встречи 1:1.</strong><br>Первая — с твоим HR, на которой вы обсудите первые дни в команде. Вторая — с руководителем, чтобы уточнить и закрепить задачи на испытательный срок.</p>
                        <p style="padding: 0 0 4px 0; font-size: 20px;" data-editable="text"><strong style="color: #5F37EB;">Через полтора месяца</strong> тебя ждёт ещё одна встреча с HR. Нам важно понимать, всё ли хорошо, как проходит адаптация и продвигается работа, нужна ли помощь или поддержка.</p>
                        <p style="font-size: 20px;" data-editable="text"><strong style="color: #5F37EB;">Через три месяца</strong> мы организуем итоговую встречу с HR и руководителем. На ней обсудим первые месяцы работы и результаты испытательного срока.</p>
                    </td>
                </tr>
            </table>
        </td>
    </tr>
</table>`
            },
            {
                id: generateId(),
                name: 'М2: Важные шаги и иллюстрация',
                html: `<table width="100%" cellpadding="0" cellspacing="0" border="0" role="presentation">
    <tr>
        <td align="center" style="padding: 0 20px;">
            <table width="100%" cellpadding="0" cellspacing="0" border="0" role="presentation" style="max-width: 600px; background: #ffffff;">
                <tr>
                    <td style="padding: 0 20px 32px 20px; text-align: left;">
                        <h2 style="font-size: 22px; margin: 0 0 20px 0; font-weight: 600;" data-editable="text">Что ещё важно сделать?</h2>
                        <img src="https://cdn.m2.ru/assets/file-upload-server/bc24a66002cdbefd7d9a8de45aa9cff8.png" alt="plans" width="100%" height="auto" style="display: block; width: 100%; height: auto;" data-editable-src="src" data-editable-alt="alt" />
                        <p style="padding-bottom:4px; font-size: 20px; margin: 24px 0 0 0;" data-editable="text"><strong style="color: #5F37EB;">Перейди на портал</strong><br>Для входа используй данные от&nbsp;почтового аккаунта. Обрати внимание, портал доступен только из&nbsp;внутренней сети.</p>
                        <p style="font-size: 20px;" data-editable="text"><strong style="color: #5F37EB;">Изучи <a href="https://portal.m2.ru/university/learning/course.php?COURSE_ID=33&INDEX=Y" style="color: #5F37EB;" data-editable-href="href">курс по адаптации «Лёгкий старт»</a></strong><br>В&nbsp;нём много полезной информации о&nbsp;М2, наших процессах, зарплатном проекте и других важных особенностях работы в компании. Если у тебя остались какие-то вопросы, смело задавай их своему HR или руководителю. Они обязательно ответят или направят тебя к тому, кто сможет помочь.</p>
                        <p style="font-size: 20px;" data-editable="text">Рады, что ты с нами, желаем отличного старта!<br><strong>Добро пожаловать в М2</strong></p>
                    </td>
                </tr>
            </table>
        </td>
    </tr>
</table>`
            },
            {
                id: generateId(),
                name: 'М2: Бот Random Drink',
                html: `<table width="100%" cellpadding="0" cellspacing="0" border="0" role="presentation">
    <tr>
        <td align="center" style="padding: 0 20px;">
            <table width="100%" cellpadding="0" cellspacing="0" border="0" role="presentation" style="max-width: 600px; background: #ffffff;">
                <tr>
                    <td style="padding: 0 20px 32px 20px;">
                        <table width="100%" cellpadding="0" cellspacing="0" border="0" role="presentation">
                            <tr>
                                <td style="width: 148px; vertical-align: top; padding-right: 20px;">
                                    <p style="font-size: 14px; padding-top: 16px;" data-editable="text">Регистрируйся в&nbsp;боте <a href="https://mm.m2.ru/m2/pl/wk6x5nj1oigh5j74mfh4ah4osw" style="color: #000;" data-editable-href="href"><strong>«Random Drink M2»</strong></a> для&nbsp;знакомств с&nbsp;коллегами!</p>
                                </td>
                                <td style="vertical-align: top; text-align: right;">
                                    <img src="https://cdn.m2.ru/assets/file-upload-server/2e095e6e720819d96aacaaf0b63fa85f.png" alt="random-drink-m2" width="240" height="auto" style="display: block; width: 240px; height: auto; margin-left: auto;" data-editable-src="src" data-editable-alt="alt" />
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
        </td>
    </tr>
</table>`
            },
            {
                id: generateId(),
                name: 'М2: Подпись HR с иконкой',
                html: `<table width="100%" cellpadding="0" cellspacing="0" border="0" role="presentation">
    <tr>
        <td align="center" style="padding: 0 20px 40px 20px;">
            <table width="100%" cellpadding="0" cellspacing="0" border="0" role="presentation" style="max-width: 600px; background: #ffffff; border-radius: 0 0 4px 4px;">
                <tr>
                    <td style="padding: 24px 20px;">
                        <table width="100%" cellpadding="0" cellspacing="0" border="0" role="presentation">
                            <tr>
                                <td style="padding-bottom: 4px; width: 172px;">
                                    <p style="font-size: 20px;" data-editable="text">Твоя команда HR</p>
                                </td>
                                <td style="padding-bottom: 4px; text-align: right;">
                                    <img src="https://cdn.m2.ru/assets/file-upload-server/f75c273fe671c1ccf779f203d4f009a5.png" alt="heart" width="24" height="24" style="display: inline-block; width: 24px; height: 24px;" data-editable-src="src" data-editable-alt="alt" />
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
        </td>
    </tr>
</table>`
            }
        ];
}

// Сброс блоков к значениям по умолчанию
function resetToDefaultBlocks() {
    if (!confirm('Вы уверены, что хотите сбросить все блоки к значениям по умолчанию? Это удалит все ваши пользовательские блоки!')) {
        return;
    }
    
    loadDefaultBlocks();
    renderAdminBlocks();
    renderAvailableBlocks();
    alert('Блоки успешно восстановлены к значениям по умолчанию!');
}

// Экспорт блоков в JSON файл
function exportBlocks() {
    if (blocks.length === 0) {
        alert('Нет блоков для экспорта');
        return;
    }
    
    const dataStr = JSON.stringify(blocks, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `email-blocks-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    alert('Блоки успешно экспортированы!');
}

// Импорт блоков из JSON файла
function importBlocks(event) {
    const file = event.target.files[0];
    if (!file) return;
    
    if (!file.name.endsWith('.json')) {
        alert('Пожалуйста, выберите JSON файл');
        event.target.value = '';
        return;
    }
    
    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const importedBlocks = JSON.parse(e.target.result);
            
            if (!Array.isArray(importedBlocks)) {
                throw new Error('Неверный формат данных');
            }
            
            // Проверяем структуру блоков
            const isValid = importedBlocks.every(block => 
                block.id && block.name && block.html
            );
            
            if (!isValid) {
                throw new Error('Некоторые блоки имеют неверную структуру');
            }
            
            // Спрашиваем пользователя, как импортировать
            const action = confirm(
                `Найдено ${importedBlocks.length} блоков.\n\n` +
                'OK - Заменить все существующие блоки\n' +
                'Отмена - Добавить к существующим блокам'
            );
            
            if (action) {
                // Заменить все блоки
                blocks = importedBlocks;
            } else {
                // Добавить к существующим, обновляя ID для избежания конфликтов
                importedBlocks.forEach(block => {
                    block.id = generateId();
                    blocks.push(block);
                });
            }
            
            saveBlocksToStorage();
            renderAdminBlocks();
            renderAvailableBlocks();
            
            alert(`Успешно импортировано ${importedBlocks.length} блоков!`);
            
        } catch (error) {
            alert('Ошибка импорта: ' + error.message);
        }
        
        // Очищаем input для возможности повторного импорта того же файла
        event.target.value = '';
    };
    
    reader.onerror = function() {
        alert('Ошибка чтения файла');
        event.target.value = '';
    };
    
    reader.readAsText(file);
}

// Сохранение блоков в localStorage
function saveBlocksToStorage() {
    localStorage.setItem('emailBlocks', JSON.stringify(blocks));
    localStorage.setItem('emailBlocksVersion', BLOCKS_VERSION);
}

// Генерация уникального ID
function generateId() {
    return 'block_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
}

// Инициализация обработчиков событий
function initializeEventListeners() {
    // Управление блоками
    document.getElementById('addBlock').addEventListener('click', addNewBlock);

    // Панель пользователя
    document.getElementById('clearEmail').addEventListener('click', clearEmail);
    document.getElementById('previewEmail').addEventListener('click', showPreview);
    document.getElementById('exportEmail').addEventListener('click', showExport);

    // Редактор
    document.getElementById('closeEditor').addEventListener('click', function() {
        document.querySelector('.editor-panel').classList.add('hidden');
        resetEditorContext();
    });
    
    // Переключение режимов редактора
    document.querySelectorAll('.editor-mode-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.editor-mode-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            switchEditorMode(this.dataset.mode);
        });
    });

    // Модальные окна
    document.getElementById('closePreview').addEventListener('click', function() {
        document.getElementById('previewModal').classList.add('hidden');
    });

    document.getElementById('closeExport').addEventListener('click', function() {
        document.getElementById('exportModal').classList.add('hidden');
    });

    document.getElementById('copyHTML').addEventListener('click', copyToClipboard);
    document.getElementById('downloadHTML').addEventListener('click', downloadHTMLFile);
    
    // Обработчик табуляции для blockHTML (как в VS Code)
    const blockHTML = document.getElementById('blockHTML');
    if (blockHTML) {
        blockHTML.addEventListener('keydown', handleBlockHTMLTab);
    }
}

// Добавление нового блока администратором
function addNewBlock() {
    const modal = document.getElementById('editBlockModal');
    const isEditing = modal && !modal.classList.contains('hidden') && modal.dataset.editingId;
    
    if (isEditing) {
        // Если в режиме редактирования, сохраняем изменения
        saveEditedBlock();
        return;
    }
    
    const name = document.getElementById('blockName').value.trim();
    const html = document.getElementById('blockHTML').value.trim();

    if (!name || !html) {
        alert('Пожалуйста, заполните название и HTML код блока');
        return;
    }

    const newBlock = {
        id: generateId(),
        name: name,
        html: html
    };

    blocks.push(newBlock);
    saveBlocksToStorage();
    renderAdminBlocks();
    renderAvailableBlocks();

    // Очистка полей
    document.getElementById('blockName').value = '';
    document.getElementById('blockHTML').value = '';

    alert('Блок успешно добавлен!');
}

// Удаление блока администратором
function deleteBlock(blockId) {
    if (!confirm('Вы уверены, что хотите удалить этот блок?')) {
        return;
    }

    blocks = blocks.filter(block => block.id !== blockId);
    saveBlocksToStorage();
    renderAdminBlocks();
    renderAvailableBlocks();
}

// Отображение блоков в админ панели (теперь просто обновляет список)
function renderAdminBlocks() {
    renderAvailableBlocks();
}

// Редактирование блока администратором
function editAdminBlock(blockId) {
    const block = blocks.find(b => b.id === blockId);
    if (!block) return;
    
    // Заполняем поля формы данными блока
    document.getElementById('blockName').value = block.name;
    document.getElementById('blockHTML').value = block.html;
    
    // Показываем модальное окно редактирования
    const modal = document.getElementById('editBlockModal');
    modal.classList.remove('hidden');
    modal.dataset.editingId = blockId;
    
    // Обновляем UI
    document.getElementById('editingIndicator').classList.remove('hidden');
    document.getElementById('addBlock').textContent = 'Сохранить изменения';
    
    // Прокручиваем к форме
    document.getElementById('blockName').scrollIntoView({ behavior: 'smooth', block: 'center' });
}

// Сохранение отредактированного блока
function saveEditedBlock() {
    const modal = document.getElementById('editBlockModal');
    const blockId = modal.dataset.editingId;
    
    if (!blockId) return;
    
    const name = document.getElementById('blockName').value.trim();
    const html = document.getElementById('blockHTML').value.trim();
    
    if (!name || !html) {
        alert('Пожалуйста, заполните название и HTML код блока');
        return;
    }
    
    const block = blocks.find(b => b.id === blockId);
    if (block) {
        block.name = name;
        block.html = html;
        
        saveBlocksToStorage();
        renderAdminBlocks();
        renderAvailableBlocks();
        
        // Очищаем форму и закрываем режим редактирования
        cancelEditBlock();
        
        alert('Блок успешно обновлен!');
    }
}

// Отмена редактирования блока
function cancelEditBlock() {
    const modal = document.getElementById('editBlockModal');
    modal.classList.add('hidden');
    modal.dataset.editingId = '';
    
    // Очищаем форму
    document.getElementById('blockName').value = '';
    document.getElementById('blockHTML').value = '';
    
    // Восстанавливаем UI
    document.getElementById('editingIndicator').classList.add('hidden');
    document.getElementById('addBlock').textContent = 'Добавить блок';
}

// Отображение доступных блоков для пользователя
function renderAvailableBlocks() {
    const container = document.getElementById('availableBlocks');
    container.innerHTML = '';

    if (blocks.length === 0) {
        container.innerHTML = '<p style="color: #999; text-align: center; padding: 20px;">Нет доступных блоков</p>';
        return;
    }

    blocks.forEach(block => {
        const blockElement = document.createElement('div');
        blockElement.className = 'block-item';
        
        // Заголовок блока
        const title = document.createElement('h4');
        title.textContent = block.name;
        blockElement.appendChild(title);
        
        // Превью блока
        const preview = document.createElement('div');
        preview.className = 'block-preview';
        preview.innerHTML = block.html;
        blockElement.appendChild(preview);
        
        // Кнопка добавления (при наведении)
        const addButton = document.createElement('div');
        addButton.className = 'block-add-overlay';
        addButton.innerHTML = '<span>+ Добавить</span>';
        blockElement.appendChild(addButton);
        
        // Кнопки управления блоком
        const controls = document.createElement('div');
        controls.className = 'block-item-controls';
        controls.style.cssText = 'display: flex; gap: 5px; margin-top: 8px; padding-top: 8px; border-top: 1px solid #e0e0e0;';
        
        const editBtn = document.createElement('button');
        editBtn.textContent = '✏️';
        editBtn.className = 'btn-edit-admin';
        editBtn.style.cssText = 'padding: 4px 8px; font-size: 12px;';
        editBtn.onclick = (e) => {
            e.stopPropagation();
            editAdminBlock(block.id);
        };
        controls.appendChild(editBtn);
        
        const visualBtn = document.createElement('button');
        visualBtn.textContent = '👁️';
        visualBtn.className = 'btn-visual-admin';
        visualBtn.style.cssText = 'padding: 4px 8px; font-size: 12px;';
        visualBtn.onclick = (e) => {
            e.stopPropagation();
            editAdminBlockVisual(block.id);
        };
        controls.appendChild(visualBtn);
        
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = '🗑️';
        deleteBtn.className = 'btn-delete-admin';
        deleteBtn.style.cssText = 'padding: 4px 8px; font-size: 12px;';
        deleteBtn.onclick = (e) => {
            e.stopPropagation();
            deleteBlock(block.id);
        };
        controls.appendChild(deleteBtn);
        
        blockElement.appendChild(controls);
        
        blockElement.addEventListener('click', () => addBlockToEmail(block));
        container.appendChild(blockElement);
    });
}

// Добавление блока в email
function addBlockToEmail(block) {
    const emailBlock = {
        id: generateId(),
        sourceId: block.id,
        name: block.name,
        html: block.html
    };

    emailBlocks.push(emailBlock);
    renderEmailCanvas();
}

// Отображение email canvas
function renderEmailCanvas() {
    const canvas = document.getElementById('emailCanvas');
    canvas.innerHTML = '';

    if (emailBlocks.length === 0) {
        canvas.innerHTML = '<div class="empty-state"><p>👈 Выберите блоки из библиотеки слева</p></div>';
        return;
    }

    emailBlocks.forEach((block, index) => {
        const blockElement = document.createElement('div');
        blockElement.className = 'canvas-block';
        blockElement.innerHTML = `
            <div class="canvas-block-content">${block.html}</div>
            <div class="canvas-block-controls">
                <button class="edit-btn" onclick="editBlock('${block.id}')">✏️ Редактировать</button>
                ${index > 0 ? `<button class="move-up-btn" onclick="moveBlock('${block.id}', 'up')">↑</button>` : ''}
                ${index < emailBlocks.length - 1 ? `<button class="move-down-btn" onclick="moveBlock('${block.id}', 'down')">↓</button>` : ''}
                <button class="delete-btn" onclick="deleteEmailBlock('${block.id}')">🗑️ Удалить</button>
            </div>
        `;
        canvas.appendChild(blockElement);
    });
}

// Редактирование блока
function editBlock(blockId) {
    const block = emailBlocks.find(b => b.id === blockId);
    if (!block) return;

    currentEditingBlock = blockId;
    currentAdminEditingBlock = null;
    currentEditorContext = { type: 'email', blockId, originalHtml: block.html };

    setEditorModeButtons('visual');
    currentEditorMode = 'visual';

    renderVisualBlockEditor(block);
}

function editAdminBlockVisual(blockId) {
    const block = blocks.find(b => b.id === blockId);
    if (!block) return;

    currentAdminEditingBlock = blockId;
    currentEditingBlock = null;
    currentEditorContext = { type: 'admin', blockId, originalHtml: block.html };

    setEditorModeButtons('visual');
    currentEditorMode = 'visual';

    renderVisualBlockEditor(block);
}

function setEditorModeButtons(mode) {
    document.querySelectorAll('.editor-mode-btn').forEach(btn => {
        if (btn.dataset.mode === mode) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
}

function getCurrentContextBlock() {
    if (!currentEditorContext) return null;

    if (currentEditorContext.type === 'email') {
        return emailBlocks.find(b => b.id === currentEditorContext.blockId) || null;
    }

    if (currentEditorContext.type === 'admin') {
        return blocks.find(b => b.id === currentEditorContext.blockId) || null;
    }

    return null;
}

function renderVisualBlockEditor(block) {
    const editorPanel = document.querySelector('.editor-panel');
    const editorContent = document.getElementById('editorContent');
    if (!editorPanel || !editorContent) return;
    
    // Парсим HTML и подготавливаем элементы для редактирования
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = block.html;
    
    const editableElements = tempDiv.querySelectorAll('[data-editable], [data-editable-href], [data-editable-src], [data-editable-alt]');
    
    editorContent.innerHTML = '<p style="color: #666; margin-bottom: 20px;">Редактируйте содержимое блока:</p>';
    
    // Добавляем контрол для фона всего блока
    const blockBgField = document.createElement('div');
    blockBgField.className = 'editable-field';
    const blockBgLabel = document.createElement('label');
    blockBgLabel.textContent = '🎨 Фон всего блока:';
    blockBgField.appendChild(blockBgLabel);
    
    const mainTable = tempDiv.querySelector('table');
    const currentBlockBg = mainTable ? (mainTable.getAttribute('style')?.match(/background\s*:\s*([^;]+)/)?.[1] || mainTable.style.background || mainTable.style.backgroundColor || '#ffffff') : '#ffffff';
    
    const blockBgInput = document.createElement('input');
    blockBgInput.type = 'color';
    blockBgInput.value = rgbToHex(currentBlockBg);
    blockBgInput.id = 'blockBackgroundColor';
    blockBgInput.className = 'color-input';
    blockBgField.appendChild(blockBgInput);
    
    editorContent.appendChild(blockBgField);
    
    const separator = document.createElement('hr');
    separator.style.margin = '20px 0';
    separator.style.border = 'none';
    separator.style.borderTop = '2px solid #e0e0e0';
    editorContent.appendChild(separator);
    
    if (editableElements.length === 0) {
        editorContent.innerHTML += '<p style="color: #999;">Этот блок не содержит редактируемых элементов</p>';
    } else {
        editableElements.forEach((element, index) => {
            const field = document.createElement('div');
            field.className = 'editable-field';
            
            if (element.hasAttribute('data-editable')) {
                const label = document.createElement('label');
                label.textContent = `Текст ${index + 1}:`;
                field.appendChild(label);
                
                const wysiwygContainer = document.createElement('div');
                wysiwygContainer.className = 'wysiwyg-container';
                
                const toolbar = document.createElement('div');
                toolbar.className = 'wysiwyg-toolbar';
                toolbar.innerHTML = `
                    <button type="button" onclick="formatText('bold', ${index})" title="Жирный"><b>B</b></button>
                    <button type="button" onclick="formatText('italic', ${index})" title="Курсив"><i>I</i></button>
                    <button type="button" onclick="formatText('underline', ${index})" title="Подчеркнутый"><u>U</u></button>
                    <span class="toolbar-separator">|</span>
                    <button type="button" onclick="insertLink(${index})" title="Вставить ссылку">🔗 Ссылка</button>
                    <button type="button" onclick="formatText('insertUnorderedList', ${index})" title="Список">• Список</button>
                    <span class="toolbar-separator">|</span>
                    <button type="button" onclick="formatText('removeFormat', ${index})" title="Очистить">🗑️</button>
                `;
                wysiwygContainer.appendChild(toolbar);
                
                const editableDiv = document.createElement('div');
                editableDiv.className = 'wysiwyg-editor';
                editableDiv.contentEditable = true;
                editableDiv.innerHTML = element.innerHTML || element.textContent;
                editableDiv.dataset.index = index;
                editableDiv.dataset.type = 'text';
                editableDiv.id = `wysiwyg-${index}`;
            
                editableDiv.addEventListener('input', function() {
                    const allElements = this.querySelectorAll('*');
                    allElements.forEach(el => {
                        if (el.style) {
                            el.style.margin = '';
                            el.style.padding = '';
                            el.style.marginTop = '';
                            el.style.marginBottom = '';
                            el.style.paddingTop = '';
                            el.style.paddingBottom = '';
            
                            if (!el.style.cssText || el.style.cssText.trim() === '') {
                                el.removeAttribute('style');
                            }
                        }
                    });
                });
            
                editableDiv.addEventListener('paste', function(e) {
                    e.preventDefault();
                    const text = (e.clipboardData || window.clipboardData).getData('text/plain');
                    document.execCommand('insertText', false, text);
                });
                
                wysiwygContainer.appendChild(editableDiv);
                field.appendChild(wysiwygContainer);
                
                const stylesContainer = document.createElement('div');
                stylesContainer.className = 'style-controls';
                
                const computedStyle = element.style || {};
                const currentColor = computedStyle.color || getComputedColor(element, 'color') || '#333333';
                const currentBgColor = computedStyle.backgroundColor || getComputedColor(element, 'background-color') || '#ffffff';
                const currentFontWeight = computedStyle.fontWeight || window.getComputedStyle(element).fontWeight || 'normal';
                const isBold = currentFontWeight === 'bold' || currentFontWeight === '700' || parseInt(currentFontWeight) >= 700;
                
                const boldContainer = document.createElement('div');
                boldContainer.className = 'style-control-item';
                const boldCheckbox = document.createElement('input');
                boldCheckbox.type = 'checkbox';
                boldCheckbox.id = `bold-${index}`;
                boldCheckbox.checked = isBold;
                boldCheckbox.dataset.index = index;
                boldCheckbox.dataset.type = 'bold';
                const boldLabel = document.createElement('label');
                boldLabel.htmlFor = `bold-${index}`;
                boldLabel.textContent = '🅱️ Жирный';
                boldContainer.appendChild(boldCheckbox);
                boldContainer.appendChild(boldLabel);
                stylesContainer.appendChild(boldContainer);
                
                const fontSizeContainer = document.createElement('div');
                fontSizeContainer.className = 'style-control-item';
                const fontSizeLabel = document.createElement('label');
                fontSizeLabel.textContent = '🔤 Размер шрифта (px):';
                const fontSizeInput = document.createElement('input');
                fontSizeInput.type = 'number';
                fontSizeInput.min = '8';
                fontSizeInput.max = '72';
                fontSizeInput.step = '1';
                const currentFontSize = computedStyle.fontSize || window.getComputedStyle(element).fontSize || '16px';
                fontSizeInput.value = parseInt(currentFontSize);
                fontSizeInput.dataset.index = index;
                fontSizeInput.dataset.type = 'fontSize';
                fontSizeInput.className = 'small-input';
                fontSizeContainer.appendChild(fontSizeLabel);
                fontSizeContainer.appendChild(fontSizeInput);
                stylesContainer.appendChild(fontSizeContainer);
            
                const lineHeightContainer = document.createElement('div');
                lineHeightContainer.className = 'style-control-item';
                const lineHeightLabel = document.createElement('label');
                lineHeightLabel.textContent = '📏 Межстрочный интервал:';
                const lineHeightInput = document.createElement('input');
                lineHeightInput.type = 'number';
                lineHeightInput.min = '0.5';
                lineHeightInput.max = '3';
                lineHeightInput.step = '0.1';
                let currentLineHeight = element.style.lineHeight || getComputedStyle(element, 'line-height') || window.getComputedStyle(element).lineHeight || '1.5';
                if (currentLineHeight === 'normal') {
                    currentLineHeight = '1.5';
                }
                const trimmedLineHeight = typeof currentLineHeight === 'string' ? currentLineHeight.trim() : String(currentLineHeight);
                let lineHeightUnit = '';
                if (trimmedLineHeight.endsWith('%')) {
                    lineHeightUnit = '%';
                } else if (trimmedLineHeight.endsWith('px')) {
                    lineHeightUnit = 'px';
                }
                const parsedLineHeight = parseFloat(trimmedLineHeight);
                lineHeightInput.value = !isNaN(parsedLineHeight) ? parsedLineHeight : 1.5;
                lineHeightInput.dataset.index = index;
                lineHeightInput.dataset.type = 'lineHeight';
                if (lineHeightUnit) {
                    lineHeightInput.dataset.unit = lineHeightUnit;
                } else {
                    delete lineHeightInput.dataset.unit;
                }
                lineHeightInput.className = 'small-input';
                lineHeightContainer.appendChild(lineHeightLabel);
                lineHeightContainer.appendChild(lineHeightInput);
                stylesContainer.appendChild(lineHeightContainer);
                
                const colorContainer = document.createElement('div');
                colorContainer.className = 'style-control-item';
                const colorLabel = document.createElement('label');
                colorLabel.textContent = '🎨 Цвет текста:';
                const colorInput = document.createElement('input');
                colorInput.type = 'color';
                colorInput.value = rgbToHex(currentColor);
                colorInput.dataset.index = index;
                colorInput.dataset.type = 'color';
                colorInput.className = 'color-input';
                colorContainer.appendChild(colorLabel);
                colorContainer.appendChild(colorInput);
                stylesContainer.appendChild(colorContainer);
                
                const bgColorContainer = document.createElement('div');
                bgColorContainer.className = 'style-control-item';
                const bgColorLabel = document.createElement('label');
                bgColorLabel.textContent = '🖌️ Цвет фона:';
                const bgColorInput = document.createElement('input');
                bgColorInput.type = 'color';
                bgColorInput.value = rgbToHex(currentBgColor);
                bgColorInput.dataset.index = index;
                bgColorInput.dataset.type = 'backgroundColor';
                bgColorInput.className = 'color-input';
                bgColorContainer.appendChild(bgColorLabel);
                bgColorContainer.appendChild(bgColorInput);
                stylesContainer.appendChild(bgColorContainer);
                
                field.appendChild(stylesContainer);
            }
            
            if (element.hasAttribute('data-editable-href')) {
                const label = document.createElement('label');
                label.textContent = `Ссылка ${index + 1}:`;
                field.appendChild(label);
                
                const input = document.createElement('input');
                input.type = 'url';
                input.value = element.getAttribute('href') || '';
                input.dataset.index = index;
                input.dataset.type = 'href';
                field.appendChild(input);
            }
            
            if (element.hasAttribute('data-editable-src')) {
                const label = document.createElement('label');
                label.textContent = `Изображение ${index + 1}:`;
                field.appendChild(label);
                
                const input = document.createElement('input');
                input.type = 'url';
                input.value = element.getAttribute('src') || '';
                input.dataset.index = index;
                input.dataset.type = 'src';
                input.placeholder = 'URL изображения или base64';
                field.appendChild(input);
                
                const uploadContainer = document.createElement('div');
                uploadContainer.className = 'image-upload-container';
                
                const fileInput = document.createElement('input');
                fileInput.type = 'file';
                fileInput.accept = 'image/*';
                fileInput.id = `fileInput-${index}`;
                fileInput.style.display = 'none';
                fileInput.dataset.index = index;
                fileInput.addEventListener('change', function(e) {
                    handleImageUpload(e, index);
                });
                
                const uploadBtn = document.createElement('button');
                uploadBtn.className = 'btn-upload-image';
                uploadBtn.textContent = '📁 Загрузить изображение';
                uploadBtn.type = 'button';
                uploadBtn.addEventListener('click', function() {
                    fileInput.click();
                });
                
                uploadContainer.appendChild(fileInput);
                uploadContainer.appendChild(uploadBtn);
                field.appendChild(uploadContainer);
            }
            
            if (element.hasAttribute('data-editable-alt')) {
                const label = document.createElement('label');
                label.textContent = `Alt-текст ${index + 1}:`;
                field.appendChild(label);
            
                const input = document.createElement('input');
                input.type = 'text';
                input.value = element.getAttribute('alt') || '';
                input.dataset.index = index;
                input.dataset.type = 'alt';
                field.appendChild(input);
            }
            
            editorContent.appendChild(field);
        });
    }
        
        const saveBtn = document.createElement('button');
        saveBtn.className = 'btn-primary';
        saveBtn.textContent = 'Сохранить изменения';
        saveBtn.style.marginTop = '20px';
        saveBtn.addEventListener('click', saveBlockEdits);
        editorContent.appendChild(saveBtn);
    
    editorPanel.classList.remove('hidden');
}

// Вспомогательные функции для работы со стилями
function parseStyleString(styleString) {
    const styleObj = {};
    if (!styleString) return styleObj;
    
    const styles = styleString.split(';');
    styles.forEach(style => {
        const trimmed = style.trim();
        if (trimmed) {
            const [key, ...valueParts] = trimmed.split(':');
            if (key && valueParts.length > 0) {
                const value = valueParts.join(':').trim();
                styleObj[key.trim()] = value;
            }
        }
    });
    return styleObj;
}

function objectToStyleString(styleObj) {
    return Object.entries(styleObj)
        .map(([key, value]) => `${key}: ${value}`)
        .join('; ');
}

function mergeStyles(originalStyle, currentStyle) {
    const originalObj = parseStyleString(originalStyle);
    const currentObj = parseStyleString(currentStyle);
    
    // Объединяем: сначала исходные стили, затем текущие (текущие имеют приоритет)
    const merged = { ...originalObj, ...currentObj };
    return objectToStyleString(merged);
}

// Сохранение изменений блока
function saveBlockEdits() {
    const block = getCurrentContextBlock();
    if (!block) return;
    
    // Используем исходный HTML из контекста, если он есть, иначе текущий HTML блока
    const originalHtml = currentEditorContext?.originalHtml || block.html;
    
    const originalDiv = document.createElement('div');
    originalDiv.innerHTML = originalHtml;
    
    // Сохраняем стили и атрибуты всех таблиц из исходного HTML
    const originalTables = originalDiv.querySelectorAll('table');
    const tableStyles = [];
    originalTables.forEach((table, idx) => {
        tableStyles.push({
            style: table.getAttribute('style') || '',
            width: table.getAttribute('width') || '',
            cellpadding: table.getAttribute('cellpadding') || '',
            cellspacing: table.getAttribute('cellspacing') || '',
            border: table.getAttribute('border') || '',
            align: table.getAttribute('align') || '',
            role: table.getAttribute('role') || ''
        });
    });
    
    // Сохраняем стили и атрибуты всех td, tr, img и других важных элементов из исходного HTML
    // Используем селекторы для более надежного поиска
    const originalTds = originalDiv.querySelectorAll('td');
    const originalTrs = originalDiv.querySelectorAll('tr');
    const originalImgs = originalDiv.querySelectorAll('img');
    
    const tdStyles = Array.from(originalTds).map(td => ({
        style: td.getAttribute('style') || '',
        width: td.getAttribute('width') || '',
        align: td.getAttribute('align') || '',
        valign: td.getAttribute('valign') || ''
    }));
    
    const trStyles = Array.from(originalTrs).map(tr => ({
        style: tr.getAttribute('style') || ''
    }));
    
    const imgStyles = Array.from(originalImgs).map(img => ({
        style: img.getAttribute('style') || '',
        width: img.getAttribute('width') || '',
        height: img.getAttribute('height') || '',
        alt: img.getAttribute('alt') || '',
        src: img.getAttribute('src') || ''
    }));
    
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = originalHtml; // Начинаем с исходного HTML
    
    const editableElements = tempDiv.querySelectorAll('[data-editable], [data-editable-href], [data-editable-src], [data-editable-alt]');
    const editableElementsArray = Array.from(editableElements);
    const controls = document.querySelectorAll('#editorContent [data-index]');
    
    // Применяем изменения к редактируемым элементам
    controls.forEach(control => {
        const index = parseInt(control.dataset.index);
        const type = control.dataset.type;
        const element = editableElements[index];
        
        if (!element) return;
        
        if (type === 'text') {
            const wysiwygEditor = document.getElementById(`wysiwyg-${index}`);
            if (wysiwygEditor) {
                const cleanedHTML = cleanWysiwygHTML(wysiwygEditor.innerHTML);
                element.innerHTML = cleanedHTML;
            }
        } else if (type === 'href') {
            element.setAttribute('href', control.value);
        } else if (type === 'src') {
            element.setAttribute('src', control.value);
        } else if (type === 'alt') {
            element.setAttribute('alt', control.value);
        } else if (type === 'bold') {
            if (control.checked) {
                element.style.fontWeight = 'bold';
            } else {
                element.style.fontWeight = 'normal';
            }
        } else if (type === 'fontSize') {
            element.style.fontSize = control.value + 'px';
        } else if (type === 'lineHeight') {
            const unit = control.dataset.unit || '';
            const value = control.value;
            element.style.lineHeight = unit ? `${value}${unit}` : value;
        } else if (type === 'color') {
            element.style.color = control.value;
        } else if (type === 'backgroundColor') {
            element.style.backgroundColor = control.value;
        }
    });
    
    // Восстанавливаем стили всех таблиц напрямую (это не влияет на редактируемые элементы)
    const tables = tempDiv.querySelectorAll('table');
    tables.forEach((table, idx) => {
        if (idx < tableStyles.length) {
            const tableData = tableStyles[idx];
            // Восстанавливаем атрибуты
            if (tableData.width) table.setAttribute('width', tableData.width);
            if (tableData.cellpadding) table.setAttribute('cellpadding', tableData.cellpadding);
            if (tableData.cellspacing) table.setAttribute('cellspacing', tableData.cellspacing);
            if (tableData.border) table.setAttribute('border', tableData.border);
            if (tableData.align) table.setAttribute('align', tableData.align);
            if (tableData.role) table.setAttribute('role', tableData.role);
            
            // Восстанавливаем стили, но обновляем background если нужно
            if (tableData.style) {
                const styleObj = parseStyleString(tableData.style);
                // Если это главная таблица и есть input для фона, обновляем background
                if (idx === 0) {
                    const blockBgInput = document.getElementById('blockBackgroundColor');
                    if (blockBgInput) {
                        styleObj.background = blockBgInput.value;
                    }
                }
                table.setAttribute('style', objectToStyleString(styleObj));
            } else if (idx === 0) {
                // Если у таблицы не было стилей, но нужно обновить фон
                const blockBgInput = document.getElementById('blockBackgroundColor');
                if (blockBgInput) {
                    table.setAttribute('style', `background: ${blockBgInput.value};`);
                }
            }
        }
    });
    
    // Восстанавливаем стили td элементов (только для нередактируемых)
    const tds = tempDiv.querySelectorAll('td');
    tds.forEach((td, idx) => {
        // Пропускаем редактируемые элементы
        if (editableElementsArray.includes(td)) return;
        
        if (idx < tdStyles.length) {
            const tdData = tdStyles[idx];
            if (tdData.width) td.setAttribute('width', tdData.width);
            if (tdData.align) td.setAttribute('align', tdData.align);
            if (tdData.valign) td.setAttribute('valign', tdData.valign);
            if (tdData.style) {
                td.setAttribute('style', tdData.style);
            }
        }
    });
    
    // Восстанавливаем стили tr элементов
    const trs = tempDiv.querySelectorAll('tr');
    trs.forEach((tr, idx) => {
        if (idx < trStyles.length && trStyles[idx].style) {
            tr.setAttribute('style', trStyles[idx].style);
        }
    });
    
    // Восстанавливаем стили img элементов (только для нередактируемых)
    const imgs = tempDiv.querySelectorAll('img');
    imgs.forEach((img, idx) => {
        // Пропускаем редактируемые элементы
        if (editableElementsArray.includes(img)) return;
        
        if (idx < imgStyles.length) {
            const imgData = imgStyles[idx];
            if (imgData.width) img.setAttribute('width', imgData.width);
            if (imgData.height) img.setAttribute('height', imgData.height);
            if (imgData.style) img.setAttribute('style', imgData.style);
        }
    });
    
    block.html = tempDiv.innerHTML;
    
    if (currentEditorContext?.type === 'email') {
    renderEmailCanvas();
    } else if (currentEditorContext?.type === 'admin') {
        saveBlocksToStorage();
        renderAdminBlocks();
        renderAvailableBlocks();
        syncAdminFormWithBlock(block.id, block.html);
    }
    
    document.querySelector('.editor-panel').classList.add('hidden');
    resetEditorContext();
    alert('Изменения сохранены!');
}

// Перемещение блока
function moveBlock(blockId, direction) {
    const index = emailBlocks.findIndex(b => b.id === blockId);
    if (index === -1) return;
    
    if (direction === 'up' && index > 0) {
        [emailBlocks[index], emailBlocks[index - 1]] = [emailBlocks[index - 1], emailBlocks[index]];
    } else if (direction === 'down' && index < emailBlocks.length - 1) {
        [emailBlocks[index], emailBlocks[index + 1]] = [emailBlocks[index + 1], emailBlocks[index]];
    }
    
    renderEmailCanvas();
}

// Удаление блока из email
function deleteEmailBlock(blockId) {
    emailBlocks = emailBlocks.filter(b => b.id !== blockId);
    renderEmailCanvas();
}

// Очистка email
function clearEmail() {
    if (emailBlocks.length === 0) return;
    
    if (confirm('Вы уверены, что хотите очистить письмо?')) {
        emailBlocks = [];
        document.getElementById('emailSubject').value = '';
        renderEmailCanvas();
    }
}

// Предпросмотр email
function showPreview() {
    if (emailBlocks.length === 0) {
        alert('Сначала добавьте блоки в письмо');
        return;
    }
    
    const subject = document.getElementById('emailSubject').value || 'Без темы';
    const html = generateFullEmailHTML();
    
    document.querySelector('.preview-subject').textContent = `Тема: ${subject}`;
    
    const iframe = document.getElementById('previewFrame');
    const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
    iframeDoc.open();
    iframeDoc.write(html);
    iframeDoc.close();
    
    document.getElementById('previewModal').classList.remove('hidden');
}

// Экспорт HTML
function showExport() {
    if (emailBlocks.length === 0) {
        alert('Сначала добавьте блоки в письмо');
        return;
    }
    
    const html = generateFullEmailHTML();
    document.getElementById('exportHTML').value = html;
    document.getElementById('exportModal').classList.remove('hidden');
}

// Генерация полного HTML письма
function generateFullEmailHTML() {
    const subject = document.getElementById('emailSubject').value || 'Без темы';
    const blocksHTML = emailBlocks.map(block => block.html).join('\n');
    
    return `<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${escapeHtml(subject)}</title>
    <style>
        body {
            margin: 0;
            padding: 0;
            font-family: Arial, sans-serif;
            background-color: #E1D9FF;
        }
        table {
            border-collapse: collapse;
        }
    </style>
</head>
<body bgcolor="#E1D9FF" style="margin: 0; padding: 0; background-color: #E1D9FF;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
        <tr>
            <td align="center" style="padding: 0;">
        ${blocksHTML}
            </td>
        </tr>
    </table>
</body>
</html>`;
}

// Копирование HTML в буфер обмена
function copyToClipboard() {
    const textarea = document.getElementById('exportHTML');
    textarea.select();
    document.execCommand('copy');
    alert('HTML скопирован в буфер обмена!');
}

// Скачивание HTML файла
function downloadHTMLFile() {
    const html = document.getElementById('exportHTML').value;
    const subject = document.getElementById('emailSubject').value || 'letter';
    
    // Создаем безопасное имя файла из темы письма
    const fileName = subject
        .toLowerCase()
        .replace(/[^a-zа-яё0-9\s-]/gi, '') // Удаляем специальные символы
        .replace(/\s+/g, '-') // Заменяем пробелы на дефисы
        .substring(0, 50) // Ограничиваем длину
        || 'letter';
    
    // Создаем Blob с HTML содержимым
    const blob = new Blob([html], { type: 'text/html;charset=utf-8' });
    
    // Создаем временную ссылку для скачивания
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${fileName}.html`;
    
    // Запускаем скачивание
    document.body.appendChild(link);
    link.click();
    
    // Очищаем
    document.body.removeChild(link);
    URL.revokeObjectURL(link.href);
    
    alert('HTML файл скачан!');
}

// Экранирование HTML
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Очистка HTML из WYSIWYG редактора
function cleanWysiwygHTML(html) {
    if (!html || html.trim() === '') {
        return '';
    }
    
    // Создаем временный элемент для обработки
    const temp = document.createElement('div');
    temp.innerHTML = html;
    
    // Удаляем все inline стили с margin и padding
    temp.querySelectorAll('*').forEach(el => {
        if (el.style) {
            // Удаляем margin и padding из style
            el.style.margin = '';
            el.style.padding = '';
            el.style.marginTop = '';
            el.style.marginBottom = '';
            el.style.paddingTop = '';
            el.style.paddingBottom = '';
            
            // Если style пустой, удаляем атрибут
            if (!el.style.cssText || el.style.cssText.trim() === '') {
                el.removeAttribute('style');
            }
        }
    });
    
    // Обрабатываем все div элементы - заменяем на содержимое + br
    // Важно: обрабатываем в обратном порядке, чтобы не сломать индексы
    const divs = Array.from(temp.querySelectorAll('div'));
    divs.forEach(div => {
        const parent = div.parentNode;
        if (!parent) return;
        
        const getPrevContentSibling = node => {
            let prev = node.previousSibling;
            while (prev) {
                if (prev.nodeType === Node.TEXT_NODE && prev.textContent.trim() === '') {
                    prev = prev.previousSibling;
                    continue;
                }
                return prev;
            }
            return null;
        };

        const prevContent = getPrevContentSibling(div);
        if (prevContent && prevContent.nodeName !== 'BR') {
            parent.insertBefore(document.createElement('br'), div);
        }
        
        const children = Array.from(div.childNodes);
        children.forEach(child => {
            parent.insertBefore(child, div);
        });
        
        div.remove();
    });
    
    // Убираем пустые элементы
    temp.querySelectorAll('span:empty, strong:empty, b:empty, i:empty, em:empty').forEach(el => el.remove());
    
    // Убираем лишние <br> в начале
    while (temp.firstChild && (temp.firstChild.nodeName === 'BR' || 
           (temp.firstChild.nodeType === 3 && temp.firstChild.textContent.trim() === ''))) {
        temp.removeChild(temp.firstChild);
    }
    
    // Получаем результат
    let result = temp.innerHTML;
    
    // Убираем все inline стили с margin/padding через regex
    result = result.replace(/\s*style="[^"]*margin[^"]*"/gi, '');
    result = result.replace(/\s*style="[^"]*padding[^"]*"/gi, '');
    result = result.replace(/\s*style="[^"]*webkit[^"]*"/gi, '');
    
    // Убираем пустые style атрибуты
    result = result.replace(/\s*style="\s*"/gi, '');
    
    // Убираем множественные <br> подряд (больше 2)
    result = result.replace(/(<br\s*\/?>[\s\n]*){3,}/gi, '<br><br>');
    
    // Убираем пустые параграфы
    result = result.replace(/<p>\s*<\/p>/gi, '');
    result = result.replace(/<p\s+[^>]*>\s*<\/p>/gi, '');
    
    return result.trim();
}

// Обработка табуляции в blockHTML (как в VS Code)
function handleBlockHTMLTab(e) {
    if (e.key === 'Tab') {
        e.preventDefault();
        
        const textarea = e.target;
        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const selectedText = textarea.value.substring(start, end);
        const beforeText = textarea.value.substring(0, start);
        const afterText = textarea.value.substring(end);
        
        // Определяем отступ (4 пробела, как в VS Code по умолчанию)
        const tab = '    ';
        
        if (e.shiftKey) {
            // Shift+Tab - уменьшение отступа
            if (selectedText.includes('\n')) {
                // Если выделено несколько строк
                const lines = selectedText.split('\n');
                const unindentedLines = lines.map(line => {
                    if (line.startsWith(tab)) {
                        return line.substring(tab.length);
                    } else if (line.startsWith(' ')) {
                        // Удаляем до 4 пробелов
                        let spacesToRemove = 0;
                        for (let i = 0; i < Math.min(4, line.length); i++) {
                            if (line[i] === ' ') spacesToRemove++;
                            else break;
                        }
                        return line.substring(spacesToRemove);
                    }
                    return line;
                });
                const newText = unindentedLines.join('\n');
                
                textarea.value = beforeText + newText + afterText;
                textarea.selectionStart = start;
                textarea.selectionEnd = start + newText.length;
            } else {
                // Одна строка - убираем отступ в начале строки
                const lineStart = beforeText.lastIndexOf('\n') + 1;
                const lineBeforeText = textarea.value.substring(0, lineStart);
                const currentLine = textarea.value.substring(lineStart, start) + selectedText;
                const restOfLine = afterText.split('\n')[0];
                const afterLine = afterText.substring(restOfLine.length);
                
                let newLine = currentLine + restOfLine;
                if (newLine.startsWith(tab)) {
                    newLine = newLine.substring(tab.length);
                } else if (newLine.startsWith(' ')) {
                    let spacesToRemove = 0;
                    for (let i = 0; i < Math.min(4, newLine.length); i++) {
                        if (newLine[i] === ' ') spacesToRemove++;
                        else break;
                    }
                    newLine = newLine.substring(spacesToRemove);
                }
                
                textarea.value = lineBeforeText + newLine + afterLine;
                const newCursorPos = Math.max(lineStart, start - tab.length);
                textarea.selectionStart = textarea.selectionEnd = newCursorPos;
            }
        } else {
            // Tab - добавление отступа
            if (selectedText.includes('\n')) {
                // Если выделено несколько строк, добавляем отступ к каждой
                const lines = selectedText.split('\n');
                const indentedLines = lines.map(line => tab + line);
                const newText = indentedLines.join('\n');
                
                textarea.value = beforeText + newText + afterText;
                textarea.selectionStart = start;
                textarea.selectionEnd = start + newText.length;
            } else {
                // Одна строка или ничего не выделено - вставляем таб
                textarea.value = beforeText + tab + selectedText + afterText;
                textarea.selectionStart = textarea.selectionEnd = start + tab.length;
            }
        }
    }
}

// Получение вычисленного цвета элемента
function getComputedColor(element, property) {
    try {
        if (!element) return '';
        if (element.style && element.style[property]) {
            return element.style[property];
        }
        const computed = window.getComputedStyle(element);
        if (!computed) return '';
        const value = computed.getPropertyValue(property) || computed[property];
        return value ? value.trim() : '';
    } catch (e) {
        return '';
    }
}

// Получение вычисленного стиля элемента
function getComputedStyle(element, property) {
    try {
        if (!element) return '';
        if (element.style && element.style[property]) {
            return element.style[property];
        }
        const computed = window.getComputedStyle(element);
        if (!computed) return '';
        const value = computed.getPropertyValue(property) || computed[property];
        return value ? value.trim() : '';
    } catch (e) {
        return '';
    }
}

// Конвертация RGB в HEX
function rgbToHex(color) {
    // Если уже в hex формате
    if (color.startsWith('#')) {
        return color;
    }
    
    // Если в rgb/rgba формате
    if (color.startsWith('rgb')) {
        const match = color.match(/\d+/g);
        if (match && match.length >= 3) {
            const r = parseInt(match[0]);
            const g = parseInt(match[1]);
            const b = parseInt(match[2]);
            return '#' + componentToHex(r) + componentToHex(g) + componentToHex(b);
        }
    }
    
    // Если название цвета или что-то другое
    const tempDiv = document.createElement('div');
    tempDiv.style.color = color;
    document.body.appendChild(tempDiv);
    const computedColor = window.getComputedStyle(tempDiv).color;
    document.body.removeChild(tempDiv);
    
    if (computedColor && computedColor.startsWith('rgb')) {
        const match = computedColor.match(/\d+/g);
        if (match && match.length >= 3) {
            const r = parseInt(match[0]);
            const g = parseInt(match[1]);
            const b = parseInt(match[2]);
            return '#' + componentToHex(r) + componentToHex(g) + componentToHex(b);
        }
    }
    
    return '#333333';
}

// Конвертация компонента цвета в hex
function componentToHex(c) {
    const hex = c.toString(16);
    return hex.length == 1 ? '0' + hex : hex;
}

// Переключение режима редактора
let currentEditorMode = 'visual';

function switchEditorMode(mode) {
    currentEditorMode = mode;
    setEditorModeButtons(mode);

    const block = getCurrentContextBlock();
    if (!block) return;
    
    if (mode === 'code') {
        showCodeEditor(block);
    } else {
        renderVisualBlockEditor(block);
    }
}

// Показать редактор кода
function showCodeEditor(block) {
    const editorContent = document.getElementById('editorContent');
    editorContent.innerHTML = '<p style="color: #666; margin-bottom: 20px;">Редактируйте HTML код блока:</p>';
    
    const textarea = document.createElement('textarea');
    textarea.id = 'codeEditor';
    textarea.value = formatHtml(block.html);
    textarea.style.cssText = 'width: 100%; min-height: 400px; padding: 15px; font-family: "Fira Code", "Consolas", "Monaco", monospace; font-size: 13px; line-height: 1.6; background: #1e1e1e; color: #d4d4d4; border: 2px solid #e0e0e0; border-radius: 8px; resize: vertical;';
    editorContent.appendChild(textarea);
    
    const saveBtn = document.createElement('button');
    saveBtn.className = 'btn-primary';
    saveBtn.textContent = 'Сохранить код';
    saveBtn.style.marginTop = '20px';
    saveBtn.addEventListener('click', function() {
        const updatedHtml = textarea.value.trim();
        block.html = updatedHtml;
        
        if (currentEditorContext?.type === 'email') {
            renderEmailCanvas();
        } else if (currentEditorContext?.type === 'admin') {
            saveBlocksToStorage();
            renderAdminBlocks();
            renderAvailableBlocks();
            syncAdminFormWithBlock(block.id, updatedHtml);
        }
        
            document.querySelector('.editor-panel').classList.add('hidden');
            resetEditorContext();
            alert('Код сохранен!');
    });
    editorContent.appendChild(saveBtn);
}

// Форматирование HTML для читаемости
function formatHtml(html) {
    // Простое форматирование для читаемости
    return html
        .replace(/></g, '>\n<')
        .replace(/<table/g, '\n<table')
        .replace(/<\/table>/g, '</table>\n')
        .replace(/<tr>/g, '\n  <tr>')
        .replace(/<\/tr>/g, '</tr>\n')
        .replace(/<td/g, '\n    <td')
        .replace(/<\/td>/g, '</td>');
}

// Форматирование текста в WYSIWYG редакторе
function formatText(command, index) {
    const editor = document.getElementById(`wysiwyg-${index}`);
    if (!editor) return;
    
    editor.focus();
    document.execCommand(command, false, null);
}

// Вставка ссылки
function insertLink(index) {
    const editor = document.getElementById(`wysiwyg-${index}`);
    if (!editor) return;
    
    // Получаем выделенный текст
    const selection = window.getSelection();
    if (!selection.rangeCount) {
        alert('Пожалуйста, выделите текст для создания ссылки');
        return;
    }
    
    const range = selection.getRangeAt(0);
    const selectedText = range.toString();
    
    if (!selectedText || selectedText.trim() === '') {
        alert('Пожалуйста, выделите текст для создания ссылки');
        return;
    }
    
    // Запрашиваем URL
    const url = prompt('Введите URL ссылки:', 'https://');
    if (!url || url.trim() === '' || url === 'https://') {
        return;
    }
    
    // Создаем ссылку вручную, чтобы избежать лишних отступов
    const link = document.createElement('a');
    link.href = url;
    link.style.color = '#5F37EB';
    link.style.textDecoration = 'underline';
    link.textContent = selectedText;
    
    // Удаляем выделенный текст и вставляем ссылку
    range.deleteContents();
    range.insertNode(link);
    
    // Перемещаем курсор после ссылки
    range.setStartAfter(link);
    range.setEndAfter(link);
    selection.removeAllRanges();
    selection.addRange(range);
    
    editor.focus();
}

// Обработка загрузки изображения
function handleImageUpload(event, index) {
    const file = event.target.files[0];
    if (!file) return;
    
    // Проверка типа файла
    if (!file.type.startsWith('image/')) {
        alert('Пожалуйста, выберите файл изображения');
        return;
    }
    
    // Проверка размера (максимум 2MB)
    if (file.size > 2 * 1024 * 1024) {
        alert('Размер изображения не должен превышать 2MB');
        return;
    }
    
    const reader = new FileReader();
    reader.onload = function(e) {
        const base64 = e.target.result;
        // Находим соответствующий input для URL
        const urlInput = document.querySelector(`input[data-index="${index}"][data-type="src"]`);
        if (urlInput) {
            urlInput.value = base64;
        }
    };
    reader.readAsDataURL(file);
}

function syncAdminFormWithBlock(blockId, html) {
    const modal = document.getElementById('editBlockModal');
    if (modal && !modal.classList.contains('hidden') && modal.dataset.editingId === blockId) {
        const nameInput = document.getElementById('blockName');
        const htmlTextarea = document.getElementById('blockHTML');
        const block = blocks.find(b => b.id === blockId);

        if (block && nameInput) {
            nameInput.value = block.name;
        }
        if (htmlTextarea) {
            htmlTextarea.value = html;
        }
    }
}

function resetEditorContext() {
    currentEditorContext = null;
    currentEditingBlock = null;
    currentAdminEditingBlock = null;
    currentEditorMode = 'visual';
    setEditorModeButtons('visual');
}

