$(document).ready(function () {
    // размеры поля
    let rows = 10;
    let columns = 10;
    let AIon = false;
    let collapse = false;
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
    function createOverlayMenu(container, buttons) {
        var overlay = $("<div>").addClass("overlay");
        var content_button = $("<div>").addClass("overlay-content");
        var content_var = $("<div>").addClass("overlay-var")
        buttons.forEach(function (button) {
            var btn = $("<button>").text(button.text).addClass("menu-button");
            btn.click(button.onClick);
            content_button.append(btn);
        });
        
        overlay.append(content_button);
        container.append(overlay);

        return {
            show: function () {
                overlay.show();
            },
            hide: function () {
                overlay.hide();
            }
        };
    }
    var menu = createOverlayMenu($("body"), [
        {
            text: "Запуск",
            onClick: function () {
                game()
                menu.hide()
            }
        },
        {
            text: "ИИ",
            onClick: function () {
                AIon = !AIon
            }
        }, { text: 'Врезание в себя', onClick: function () { collapse = !collapse } }
    ]);
    menu.show()
    function game() {
        // начальные координаты змейки
        let snake = [{ x: 5, y: 5 }];
        // направление движения змейки
        let direction = 'право';
        let prevdirection = direction;
        // координаты яблока
        let apple = generateApple();
        // счетчик очков
        let score = 0;
        let pause = false;
        // функция для генерации нового яблока
        function generateApple() {
            let newApple = { x: Math.floor(Math.random() * columns), y: Math.floor(Math.random() * rows) };
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
        function reset() {
            $('td').removeClass();
            $('#display').remove();
            $('#score').remove();
            // Сброс переменных
            snake = [{ x: 5, y: 5 }];
            direction = 'право';
            apple = generateApple();
            score = 0;

            // Сброс таймера
            stopwatch.reset();

            // Показать меню
            menu.show();
            $('body').append('<div id="score"></div>');
        }
        function zigzagAI() {
            if (!collapse) {
                if (snake.length > 2) {
                    if (direction === 'право' && snake[0].x === columns - 1) {
                        direction = 'вниз';
                    } else if (direction === 'вниз' && snake[0].y % 2 === 1) {
                        direction = 'лево';
                    } else if (direction === 'лево' && snake[0].x === 0) {
                        direction = 'вниз';
                    } else if (direction === 'вниз' && snake[0].y % 2 === 0) {
                        direction = 'право';
                    } else if (direction === 'вверх' && snake[0].y % 2 === 1) {
                        direction = 'право';
                    } else if (direction === 'вверх' && snake[0].y % 2 === 0) {
                        direction = 'лево';
                    }
                } else {
                    if (snake[0].x < apple.x) {
                        direction = 'право';
                    } else if (snake[0].x > apple.x) {
                        direction = 'лево';
                    } else if (snake[0].y > apple.y) {
                        direction = 'вверх';
                    } else if (snake[0].y < apple.y) {
                        direction = 'вниз';
                    }
                }
            }
            if (collapse) {
                if (snake[0].x < apple.x) {
                    direction = 'право';
                } else if (snake[0].x > apple.x) {
                    direction = 'лево';
                } else if (snake[0].y > apple.y) {
                    direction = 'вверх';
                } else if (snake[0].y < apple.y) {
                    direction = 'вниз';
                }
            }

        }
        function createStopwatch() {
            var startTime;
            var pauseTime = 0;
            var interval;
            var elapsedTime = 0;

            var display = $("<div>").attr("id", "display").text("0.000");
            //var display2;
            display = $("<div>").attr("id", "display").text("0.000");
            //display2 = $("<div>").attr("id", "display2").text("0.000");
            startTime = Date.now() - elapsedTime;
            interval = setInterval(function printTime() {

                if (!pause) {
                    if (pauseTime) {
                        elapsedTime = Date.now() - pauseTime - startTime;
                        display.text((elapsedTime / 1000).toFixed(3));
                        //display2.text((pauseTime/1000).toFixed(3));
                    } else {
                        elapsedTime = Date.now() - startTime;
                        display.text((elapsedTime / 1000).toFixed(3));
                        //display2.text((pauseTime/1000).toFixed(3));
                    }
                } else {
                    pauseTime = Date.now() - elapsedTime - startTime
                }
            }, 10);

            $('body').append(display);
            //$('body').append(display2);
            return {
                reset: function () {
                    clearInterval(interval);
                    elapsedTime = 0;
                    display.text("0.000");
                    startTime = Date.now() - elapsedTime;
                    interval = setInterval(function printTime() {
                        if (!pause) {
                            if (pauseTime) {
                                elapsedTime = Date.now() - pauseTime - startTime;
                                display.text((elapsedTime / 1000).toFixed(3));
                                //display2.text((pauseTime/1000).toFixed(3));
                            } else {
                                elapsedTime = Date.now() - startTime;
                                display.text((elapsedTime / 1000).toFixed(3));
                                //display2.text((pauseTime/1000).toFixed(3));
                            }
                        } else {
                            pauseTime = Date.now() - elapsedTime - startTime
                        }
                    }, 10);
                }
            };
        }
        let stopwatch = createStopwatch();
        // функция для обновления координат змейки и яблока
        function updateCoordinates() {
            if (AIon) {
                zigzagAI();
            }
            // обновление координат змейки
            if (snake.length === 0 || pause) {
                return;
            }
            let newX = snake[0].x;
            let newY = snake[0].y;
            if (direction === 'право') {
                newX++;
                if (newX >= columns) {
                    newX = 0;
                }
            } else if (direction === 'лево') {
                newX--;
                if (newX < 0) {
                    newX = columns - 1;
                }
            } else if (direction === 'вверх') {
                newY--;
                if (newY < 0) {
                    newY = rows - 1;
                }
            } else if (direction === 'вниз') {
                newY++;
                if (newY >= rows) {
                    newY = 0;
                }
            }
            snake.unshift({ x: newX, y: newY });
            // проверка на столкновение с хвостом
            if (snake.length == rows * columns) {
                alert(`Поздравляем! Вы выиграли! Ваш счет: ${score}`);
                pause = !pause
                reset()
            }
            if (!collapse) {
                if (snake.slice(1).some(segment => segment.x === snake[0].x && segment.y === snake[0].y)) {
                    alert(`Игра окончена! Ваш счет: ${score}`);
                    pause = !pause
                    reset()
                }
            }
            // проверка на съедание яблока
            if (snake[0].x === apple.x && snake[0].y === apple.y) {
                score++;
                apple = generateApple();
            } else {
                snake.pop();
            }
            if (prevdirection != direction) {
                $('#directions').append(`<p>${direction}</p>`)
                if ($('#directions').children().length > 9) {
                    $('#directions').children().first().remove()
                }
            }
            prevdirection = direction;
        }
        // функция для обработки нажатия клавиш
        $(document).keydown(function (event) {
            if (event.key === 'ArrowRight' && (snake.length === 1 || direction != 'лево')) {
                direction = 'право';
            } else if (event.key === 'ArrowLeft' && (snake.length === 1 || direction != 'право')) {
                direction = 'лево';
            } else if (event.key === 'ArrowUp' && (snake.length === 1 || direction != 'вниз')) {
                direction = 'вверх';
            } else if (event.key === 'ArrowDown' && (snake.length === 1 || direction != 'вверх')) {
                direction = 'вниз';
            } else if (event.key === 'p') {
                AIon = !AIon
            } else if (event.key === ' ') {
                pause = !pause;
            }
        });
        // добавление счетчика очков
        $('body').append('<div id="score"></div>');
        $('body').append('<div id="directions"></div>');
        // запуск игры
        if (!pause) {
            let lastFrameTime = 0;
            function animate(time) {
                if (!snake.length) return;
                if (time - lastFrameTime < 100) {
                    requestAnimationFrame(animate);
                    return;
                }
                lastFrameTime = time;
                updateCoordinates();
                draw();
                requestAnimationFrame(animate);
            }
            requestAnimationFrame(animate);
        }
    }
});
