$(document).ready(function () {
    let direction;
    let size = 4;
    let field;
    let movingEnabled = false;

    class TableClass {
        constructor() {
            this.colors = [
                'lightblue',
                'rgb(159, 201, 232)',
                'rgb(144, 187, 234)',
                'rgb(130, 172, 236)',
                'rgb(115, 157, 237)',
                'rgb(100, 149, 237)',
                'rgb(85, 140, 237)',
                'rgb(69, 130, 236)',
                'rgb(54, 107, 201)',
                'rgb(38, 79, 167)',
                'rgb(25, 25, 112)'
            ];
            this.createTable();
            this.generateNewCell();
        }

        createTable() {
            let table = $('<table class="field"></table>');
            $('body').append(table);
            for (let row = 0; row < size; row++) {
                let rowTr = $('<tr class="row"></tr>').attr('y', row);
                table.append(rowTr);
                for (let column = 0; column < size; column++) {
                    let cell = $(`<td class="cell"></td>`).attr('x', column).attr('y', row);
                    rowTr.append(cell);
                }
            }
        }

        colorizeCell(cell) {
            let value = $(cell).text();
            if (value !== '') {
                if (Math.log2(value) < this.colors.length) {
                    $(cell).css('background-color', this.colors[Math.log2(value)]);
                }
            } else {
                $(cell).css('background-color', '');
            }
        }

        generateNewCell() {
            let emptyCells = $('.cell').filter(function () {
                return $(this).text() === '';
            });

            if (emptyCells.length > 0) {
                let randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
                $(randomCell).text('1');
                this.colorizeCell(randomCell);
            } else {
                movingEnabled = false; // Отключаем перемещение, если нет свободных клеток
            }
        }

        moveCells() {
            if (!movingEnabled) return; // Не выполняем перемещение, если оно отключено

            let moved = false;
            let cellsToMove = [];

            $('.cell').filter(function () {
                return $(this).text() !== '';
            }).each(function () {
                let cell = $(this);
                let x = parseInt(cell.attr('x'));
                let y = parseInt(cell.attr('y'));
                let newX = x;
                let newY = y;

                switch (direction) {
                    case 'top':
                        newY = y - 1;
                        break;
                    case 'down':
                        newY = y + 1;
                        break;
                    case 'right':
                        newX = x + 1;
                        break;
                    case 'left':
                        newX = x - 1;
                        break;
                }

                // Проверка границ игрового поля
                if (newX >= 0 && newX < size && newY >= 0 && newY < size) {
                    let targetCell = $(`.cell[x=${newX}][y=${newY}]`);
                    let currentValue = parseInt(cell.text());
                    let targetValue = parseInt(targetCell.text());

                    if (targetCell.text() === '') { // Если клетка пустая
                        cellsToMove.push({ cell, targetCell, value: currentValue, priority: this.getPriority(cell, direction) });
                    } else if (currentValue === targetValue) { // Если значения совпадают
                        cellsToMove.push({ cell, targetCell, value: currentValue + targetValue, priority: this.getPriority(cell, direction) });
                    }
                }
            });

            // Сортировка клеток по приоритету перемещения
            cellsToMove.sort((a, b) => b.priority - a.priority);

            cellsToMove.forEach(({ cell, targetCell, value }) => {
                targetCell.text(value);
                field.colorizeCell(targetCell);
                cell.text('');
                field.colorizeCell(cell);
                moved = true;
            });

            if (moved) {
                field.generateNewCell();
            }
        }

        getPriority(cell, direction) {
            let x = parseInt(cell.attr('x'));
            let y = parseInt(cell.attr('y'));

            switch (direction) {
                case 'top':
                    return size - y;
                case 'down':
                    return y + 1;
                case 'right':
                    return size - x;
                case 'left':
                    return x + 1;
                default:
                    return 0;
            }
        }
    }

    field = new TableClass();

    $(document).keydown(function (event) {
        let newDirection;
        switch (event.key) {
            case 'ArrowRight':
                newDirection = 'right';
                break;
            case 'ArrowLeft':
                newDirection = 'left';
                break;
            case 'ArrowUp':
                newDirection = 'top';
                break;
            case 'ArrowDown':
                newDirection = 'down';
                break;
        }
        if (newDirection !== undefined && direction !== newDirection) {
            direction = newDirection;
            movingEnabled = true; // Включаем перемещение при нажатии клавиши стрелки
            field.moveCells();
        }
    });
});