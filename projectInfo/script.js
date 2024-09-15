$(document).ready(()=>{
  let container = $('.container');
  $.getJSON('themes.json', function(data) {
      for(let i of data.tags){
        $('.controls').append(`<button type="button" class="control btn btn-secondary" data-toggle=".${i}">${i}</button>`);
      }
      for(let i = 0; i < Object.keys(data).length-1; i++){          
          container.append(`<div class="mix ${Object.values(data)[i]["class"]}">
              <div class="card">
                  <div class="card-body">
                      <h5 class="card-title">${Object.values(data)[i]['name']}</h5>
                      <p class="card-text">${Object.values(data)[i]['shortDesc']}</p>
                  </div>
                  <div class="card-footer">
                      <button class="btn btn-primary" data-bs-target="#modal${i}" data-bs-toggle="modal">Подробнее</button>
                      <div class="modal" id="modal${i}">
                          <div class="modal-dialog">
                              <div class="modal-content">
                                  <div class="modal-header">
                                      <h5 class="modal-title">${Object.values(data)[i]['class']}</h5>
                                      <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                  </div>
                                  <div class="modal-body">
                                      <p>${Object.values(data)[i]['LongDesc']}</p>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </div>`);
          
          $(`#modal${i}`).modal({
              show: false
          });
      }
      let mixer = mixitup(container, {controls:{toggleLogic: 'and'}});
  });
});
