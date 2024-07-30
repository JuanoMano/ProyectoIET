function mostrar1(){
    console.log(document.getElementById("formulario2").style.display = "none");
    console.log(document.getElementById("formulario3").style.display = "none");
    console.log(document.getElementById("formulario1").style.display = "block");
}
function mostrar2(){
    console.log(document.getElementById("formulario1").style.display = "none");
    console.log(document.getElementById("formulario3").style.display = "none");
    console.log(document.getElementById("formulario2").style.display = "block");
}
function mostrar3(){
    console.log(document.getElementById("formulario1").style.display = "none");
    console.log(document.getElementById("formulario2").style.display = "none");
    console.log(document.getElementById("formulario3").style.display = "block");
}