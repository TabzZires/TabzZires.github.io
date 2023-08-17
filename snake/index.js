$(document).ready(function() {
    // размеры поля
    let rows = 10;
    let columns = 10;
    // создание поля
    let table = $('<table></table>');
    for (let i = 0; i < rows; i++) {
        let row = $('<tr></tr>');
        for (let j = 0; j < columns; j++) {
            let cell = $('<td></td>');
            row.append(cell);
        }
        table.append(row);
    }
    $('body').append(table);
    // начальные координаты змейки
    let snake = [{x: 5, y: 5}];
    // направление движения змейки
    let direction = 'right';
    // координаты яблока
    let apple = generateApple();
    // счетчик очков
    let score = 0;
    // функция для генерации нового яблока
    function generateApple() {
        let newApple = {x: Math.floor(Math.random() * columns), y: Math.floor(Math.random() * rows)};
        // проверка на то, что новое яблоко не совпадает с координатами змейки
        while (snake.some(segment => segment.x === newApple.x && segment.y === newApple.y)) {
            newApple.x = Math.floor(Math.random() * columns);
            newApple.y = Math.floor(Math.random() * rows);
        }
        return newApple;
    }
    // функция для отрисовки змейки, яблока и счетчика очков
    function draw() {
        // очистка предыдущего положения змейки и яблока
        $('td').removeClass('snake snake_head apple empty_cell');
        // отрисовка нового положения змейки
        for (let i = 0; i < snake.length; i++) {
            let cell = $('tr').eq(snake[i].y).find('td').eq(snake[i].x);
            cell.addClass('snake');
            if (i === 0) {
                cell.addClass('snake_head');
            }
        }
        // отрисовка яблока
        let appleCell = $('tr').eq(apple.y).find('td').eq(apple.x);
        appleCell.addClass('apple');
        // отрисовка пустых клеток
        $('td:not(.snake):not(.apple)').addClass('empty_cell');
        // отрисовка счетчика очков
        $('#score').text(`Очки: ${score}`);
    }
    // функция для обновления координат змейки и яблока
    function updateCoordinates() {
        // обновление координат змейки
        if (snake.length === 0) {
            return;
        }
        let newX = snake[0].x;
        let newY = snake[0].y;
        if (direction === 'right') {
            newX++;
            if (newX >= columns) {
                newX = 0;
            }
        } else if (direction === 'left') {
            newX--;
            if (newX < 0) {
                newX = columns - 1;
            }
        } else if (direction === 'up') {
            newY--;
            if (newY < 0) {
                newY = rows - 1;
            }
        } else if (direction === 'down') {
            newY++;
            if (newY >= rows) {
                newY = 0;
            }
        }
        snake.unshift({x: newX, y: newY});
        // проверка на столкновение с хвостом
        if(snake.length == rows*columns){
            alert(`Поздравляем! Вы выиграли! Ваш счет: ${score}`);
            score=0;
            snake=[{x:5, y:5}, {x:5, y:5}];
            direction='right';
            apple=generateApple();    
        }
        if (snake.slice(1).some(segment => segment.x === snake[0].x && segment.y === snake[0].y)) {
            alert(`Игра окончена! Ваш счет: ${score}`);
            score = 0;
            snake = [{x:5, y:5}, {x:5, y:5}];
            direction = 'right';
            apple = generateApple();
        }
        // проверка на съедание яблока
        if (snake[0].x === apple.x && snake[0].y === apple.y) {
            score++;
            apple = generateApple();
        } else {
            snake.pop();
        }
    }
    // функция для обработки нажатия клавиш
    $(document).keydown(function(event) {
        if (event.key === 'ArrowRight') {
            direction = 'right';
        } else if (event.key === 'ArrowLeft') {
            direction = 'left';
        } else if (event.key === 'ArrowUp') {
            direction = 'up';
        } else if (event.key === 'ArrowDown') {
            direction = 'down';
        }
    });
    // добавление счетчика очков
    $('body').append('<div id="score"></div>');
    // запуск игры
    setInterval(function() {
        updateCoordinates();
        draw();
    }, 100);
});
