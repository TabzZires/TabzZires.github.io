class Grid{
        constructor(){
            this.colors = {
                0: 'white',  
                1: 'pink',
                2: 'firebrick',
                3: 'orange',
                4: 'yellow',
                5: 'yellowgreen', 
                6: '#6495ed',
                7: 'blue',
                8: 'purple',
                9: 'black' 
              }
            this.field = $('<table class="field"></table>')
            $('body').append(this.field)
            this.colorChanging = this.colorChanging.bind(this);
        }
        createGrid(size){
            this.field.children().remove();
            for(let i=0; i<size; i++){
                let Row = $(`<tr class='row'></tr>`);
                this.field.append(Row)
                for(let j=0; j<size;j++){
                    let Cell = $(`<td class='cell' x=${j} y=${i} color=${0}></td>`)
                    Row.append(Cell)
                    Cell.css('background-color', this.colors[Cell.attr('color')])
                    Cell.css('width', `${Math.floor(500/size)}px`)
                    Cell.css('height', `${Math.floor(500/size)}px`)
                }
            }
            this.colorChanging();
        }
        colorChanging(){
            $('.cell').off('contextmenu mousedown');
            $('.cell').on('contextmenu', event=>event.preventDefault())
            $('.cell').mousedown((event) => {
                if(event.button === 0){
                    $(event.target).css('background-color', this.colors[Number($(event.target).attr('color'))+1]);
                    if (Number($(event.target).attr('color')) >= 9) {
                        $(event.target).attr('color', 0);    
                        $(event.target).css('background-color', this.colors[0]);
                    } else {
                        $(event.target).attr('color', Number($(event.target).attr('color'))+1);
                    }    
                }else if(event.button === 2){
                    $(event.target).css('background-color', this.colors[Number($(event.target).attr('color'))-1]);
                    if (Number($(event.target).attr('color')) <= 0) {
                        $(event.target).attr('color', 9);    
                        $(event.target).css('background-color', this.colors[9]);
                    } else {
                        $(event.target).attr('color', Number($(event.target).attr('color'))-1);
                    }    
                }
                
              });
        }
        destroyGrid(){
            this.field.children().remove()
        }
        takeScreenshot() {
    const canvas = document.getElementById('gridCanvas');
    const ctx = canvas.getContext('2d');

    // Очистить canvas
    canvas.width = this.field.width();
    canvas.height = this.field.height();
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Рендерить сетку на canvas
    const fieldClone = this.field.clone();
    $('body').append(fieldClone);
    const options = {
        width: this.field.width(),
        height: this.field.height(),
        pixelRatio: window.devicePixelRatio || 1, // Использовать разрешение экрана для более четкого изображения
        allowTaint: true, // Разрешить рендеринг изображений из других источников
        useCORS: true, // Использовать CORS для загрузки изображений из других источников
    };

    html2canvas(fieldClone[0], options).then(canvas => {
        const dataURL = canvas.toDataURL('image/png');
        fieldClone.remove();

        // Создать ссылку для скачивания
        const downloadLink = document.createElement('a');
        downloadLink.download = 'grid-screenshot.png';
        downloadLink.href = dataURL;

        // Триггер клика на ссылке для начала скачивания
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
    });
}
    }
let grid;
$(document).ready(()=>{
    grid = new Grid()
    grid.createGrid(5)
    $('.btn-menu').children().click(function() {
        if (typeof grid[$(this).data('action')] === 'function') {
            grid[$(this).data('action')]($('.size').val());
        }
    });
    setInterval(grid.colorChanging(), 100)
})
