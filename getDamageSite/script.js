$(document).ready(function () {
    $.getJSON('file.json',function(data){
	let word = Object.keys(data)[Math.floor(Math.random()*Object.keys(data).length)].toUpperCase().split('');
    $('.cell').first().focus();
    function createCells(){
        for(let u=0;u<6;u++){
            let row = $('<div class="row"></div>');
            $(".field").append(row);
            for(let i=0;i<word.join('').length;i++){
                let cell = $('<input class="cell" type="text">');
                cell.attr('maxlength', '1');
                $('.row').append(cell);
            }
            if($('.row').children().length>word.join('').length){
                $('.row').each(function(){$(this).children().slice(word.join('').length).remove();});
            }
        }
    }
    function parentcheck(){
        $('.row').children().filter(':focus').parent().addClass('Focused');  
    }
    function endGame(){
        $('.victoryWindow').css('visibility','visible');
	
	setTimeout(()=>$('.NewGame').focus(),50);
    }
    function check(){
	//if(!Object.keys(data).includes($('.Focused').children().map(function(){return $(this).val()}).get().join(''))){alert('Введите существующее слово');return}
        $('.Focused').children().each(function(index){
            if($(this).val() !== word[index] && !word.includes($(this).val())){
                $(this).addClass('cell-failer');
                $(this).parent().addClass('row-failer');
                if(!($(".MissingLetters")).includes($(this).val())){
                    $(".MissingLetters").append($(this).val())
                }
		        parentchanging();
            }else if(word.includes($(this).val()) && $(this).val() !== word[index]){
                $(this).addClass('cell-half-success');
                $(this).parent().addClass('row-failer');
		        parentchanging();
            }else{
                $(this).addClass('cell-success');
	        }
        });
        if($('.Focused').children().hasClass('cell-success')){
            endGame();
        }
	if($('.row').toArray().every(element=>$(element).hasClass('row-failer'))){
	    $('.VictoryText').text('Вы проиграли.Словом было:'+word.join(''));
	    endGame();
	}
	for(let i=0; i<"АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ".length;i++){
		if($('.Focused').children().map(function(){return $(this).val()}).get().join('').indexOf("АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ".split('')[i]) == -1){
		    $(".NotCheckedLetters").append("АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ".split('')[i])
		}
	}
    }
    function parentchanging(){
        $('.Focused.row').next().children().first().focus();
        $('.Focused').removeClass('Focused');
    }
    createCells();
    $('.cell').first().focus();
    $('.NewGame').click(()=>location.reload());
    $('.NewGame').keydown(event=>{if(event.keyCode == 13){location.reload()}})
    setInterval(function(){
        if($(".cell:focus").val() != ''){
            if($(".cell:last").val() !=''){
                return
            }
	    if($(".cell:focus").val() == "\\"){
	        $(".cell:focus").val('');
		return
	    }
            $('.cell:focus').next().focus();
        }
        $('.cell:focus').on('input',function(){$(this).val($(this).val().toUpperCase())});
    },100);
    $('.cell').keydown(function(event){
        if(event.keyCode == 8 && $('.cell:focus').val() ==''){
            $('.cell:focus').prev().focus();
        }
        if(event.keyCode == 13){
            parentcheck();
            if($('.Focused').children().map(function(){return $(this).val()}).get().join('').length == word.length){
                check();
            }
        }
        if(event.keyCode == 220){ 
            console.log(word.join(''));
        }
	if(event.keyCode == 9){
	    if(window.confirm('Вы уверены что хотите сдаться?')){
	    $('.VictoryText').html('Вы проиграли.<br>Словом было:'+word.join(''));
	    endGame();
	    }else{
		return
	    }
	}
	if(event.keyCode == 37){
	    $('.cell:focus').prev().focus();
	}
	if(event.keyCode == 39){
	    $('.cell:focus').next().focus();
	}
    });
    });
}); 