const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Папка с музыкой
const musicFolder = path.join(__dirname, 'music');

// Отдача статичных файлов (HTML, CSS, JS)
app.use(express.static(__dirname));

// API для получения списка треков
app.get('/api/tracks', (req, res) => {
    fs.readdir(musicFolder, (err, files) => {
        if (err) {
            console.error('Ошибка чтения папки:', err);
            res.status(500).send('Ошибка сервера');
            return;
        }
        // Фильтрация только .mp3 файлов
        const tracks = files
            .filter(file => path.extname(file).toLowerCase() === '.mp3')
            .map(file => ({
                title: file.replace('.mp3', ''), // Убираем расширение
                src: `/music/${file}` // Путь к файлу
            }));
        res.json(tracks);
    });
});

// Запуск сервера
app.listen(PORT, () => {
    console.log(`Сервер запущен на http://localhost:${PORT}`);
});
