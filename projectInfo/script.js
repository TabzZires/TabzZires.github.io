$(document).ready(() => {
    let container = $('.card-container');
    let mixer;
    
    $.getJSON('themes.json', function(data) {
        // Добавление кнопок категорий из data.tags
        data.tags.forEach(tag => {
            $('.controls').append(`<button type="button" class="control btn btn-secondary" data-filter=".${tag}">${tag}</button>`);
        });
        
        // Создание карточек тем и модальных окон
        $.each(data, function(key, theme) {
            if (key === "tags") return;
            container.append(`
                <div class="mix ${theme.class}" data-title="${theme.name.toLowerCase()} ${theme.shortDesc.toLowerCase()}">
                    <div class="card shadow-sm mb-3">
                        <div class="card-body">
                            <h5 class="card-title">${theme.name}</h5>
                            <p class="card-text">${theme.shortDesc}</p>
                        </div>
                        <div class="card-footer">
                            <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#modal${key}">Подробнее</button>
                        </div>
                    </div>
                </div>
            `);
            $('body').append(`
                <div class="modal fade" id="modal${key}" tabindex="-1">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title">${theme.name}</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                <p>${theme.LongDesc}</p>
                            </div>
                        </div>
                    </div>
                </div>
            `);
        });
        
        // Инициализация MixItUp с настройкой анимации
        mixer = mixitup(container[0], {
           controls: { toggleLogic: 'and' },
           animation: { duration: 300 }
        });
    });
    
    // Поиск через MixItUp: фильтруем карточки по атрибуту data-title
    $('#searchInput').on('input', function() {
        let searchVal = $(this).val().toLowerCase();
        if (searchVal === '') {
            mixer.filter('all');
        } else {
            mixer.filter(function(item) {
                return item.dom.el.getAttribute('data-title').indexOf(searchVal) !== -1;
            });
        }
    });
  });
  