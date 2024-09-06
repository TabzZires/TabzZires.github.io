let timer = $(".clockTimer");
let clock = $(".clock")
let sun = $("<div class='sun'></div>")
clock.append(sun)
sun.css("transform",`translate(calc(200px*cos(${15*(new Date().getHours())}deg)), calc(-200px*sin(${15*(new Date().getHours())}deg)))`);      
if((new Date()).getMonth()>=8 && (new Date()).getMonth()<=10){
    clock.css("background","radial-gradient(circle, rgba(255,227,150,1) 40%, rgba(255,187,0,1) 100%)")
}else if((new Date()).getMonth()>=2 && (new Date()).getMonth()<=4){
    clock.css("background","radial-gradient(circle, rgba(177,255,150,1) 30%, rgba(0,255,196,1) 100%)")
}else if((new Date()).getMonth()>=5 && (new Date()).getMonth()<=7){
    clock.css("background","radial-gradient(circle, rgba(252,255,142,1) 30%, rgba(159,255,0,1) 100%)")
}else{
    clock.css("background","radial-gradient(circle, rgba(255,255,255,1) 30%, rgba(216,255,252,1) 35%, rgba(181,255,249,1) 70%, rgba(77,255,241,1) 100%)")
}
setInterval(()=>{timer.text((new Date()).toLocaleTimeString())}, 1000)
setInterval(()=>{
    sun.css("transform",`translate(calc(200px*cos(${15*(new Date().getHours())}deg)), calc(-200px*sin(${15*(new Date().getHours())}deg)))`);      
}, 60000);