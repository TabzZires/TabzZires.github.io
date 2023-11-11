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
        }
        createGrid(size){
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
        }
        colorChanging(){
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
    }
$(document).ready(()=>{
    
    let grid = new Grid()
    grid.createGrid(5)
    setInterval(grid.colorChanging(), 100)
})
