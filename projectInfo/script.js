

$(document).ready(()=>{
    let container = $('.container')
    $.getJSON('themes.json', function(data) {
        for(i=0;i<Object.keys(data).length;i++){
            if ($('.controls').children().filter(()=>{return $(this).attr('data-filter')==Object.values(data)[i]['class']}).length==0) {
                console.log($('.controls').children().filter(()=>{return $(this).attr('data-filter')==Object.values(data)[i]['class']}).length);
                $('.controls').children().each(()=>{console.log($(this).attr('data-filter'))})
                
                $('.controls').append(`<button type="button" class="btn btn-secondary" data-filter=".${Object.values(data)[i]['class']}">${Object.values(data)[i]['class']}</button>`)
            }
            container.append(`<div class="mix ${Object.values(data)[i]["class"]}">
            <div class="card">
            <div class="card-body">
            <h5 class="card-title">${Object.values(data)[i]['name']}</h5>
            <p class="card-text">Description</p>
            </div>
            <div class="card-footer"><button class="btn btn-primary">Подробнее</button></div>
            </div>
            </div>`)
        }
        let mixer = mixitup(container) 
    })
    
})
