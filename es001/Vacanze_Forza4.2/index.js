"use strict"

const RIGHE=6;
const COLONNE=7;
const GREY="gray";

let _wrapper;
let _nextPlayer;
let stop=false;

window.onload=function () {
    _wrapper=document.getElementById("wrapper");
    _nextPlayer=document.getElementById("nextPlayer");
    let _div;
    for (let i=0;i<RIGHE;i++){
        for (let j=0;j<COLONNE;j++){
            _div=document.createElement("div");
            _div.setAttribute("class","pedina");
            _div.style.backgroundColor=GREY;
            _div.setAttribute("id","div-"+i+"-"+j);
            _wrapper.appendChild(_div);
            if (i==RIGHE-1){
                _div.addEventListener("click", visualizza);
            }
        }
    }
    _nextPlayer.setAttribute("class","pedina");
    _nextPlayer.style.backgroundColor="yellow";
    _nextPlayer.style.coloreNascosto="red";
}

function visualizza() {
    let id=this.getAttribute("id");
    let aus=id.split('-');
    let riga=parseInt(aus[1]);
    let colonna=parseInt(aus[2]);
    if (!stop) {
        this.style.backgroundColor = _nextPlayer.style.backgroundColor;
        this.removeEventListener("click", visualizza);
        cambiaColore();
        if (ritornaVincita() == false) {
            if (riga > 0) {
                let _div = document.getElementById("div-" + (riga - 1) + "-" + colonna);
                _div.addEventListener("click", visualizza);
            }
        } else {
            alert("Hai vinto!");
            stop=true;
        }
    }
}

function cambiaColore() {
    let aus=_nextPlayer.style.backgroundColor;
    _nextPlayer.style.backgroundColor=_nextPlayer.style.coloreNascosto;
    _nextPlayer.style.coloreNascosto=aus;
}

function ritornaVincita() {
    let vinto=false;
    for (let i=0;i<RIGHE;i++){
        for (let j=0;j<COLONNE-3;j++){
            let _current=document.getElementById("div-"+i+"-"+j);
            let next1=document.getElementById("div-"+i+"-"+(j+1));
            let next2=document.getElementById("div-"+i+"-"+(j+2));
            let next3=document.getElementById("div-"+i+"-"+(j+3));
            if (_current.style.backgroundColor!=GREY){
                if (_current.style.backgroundColor == next1.style.backgroundColor && _current.style.backgroundColor == next2.style.backgroundColor && _current.style.backgroundColor == next3.style.backgroundColor) {
                    vinto = true;
                    i = RIGHE;
                    j = COLONNE - 3;
                }
            }
        }
    }
    if (!vinto) {
        for (let j = 0; j < COLONNE; j++) {
            for (let i = 0; i < RIGHE - 3; i++) {
                let _current = document.getElementById("div-" + i + "-" + j);
                let next1 = document.getElementById("div-" + (i + 1) + "-" + j);
                let next2 = document.getElementById("div-" + (i + 2) + "-" + j);
                let next3 = document.getElementById("div-" + (i + 3) + "-" + j);
                if (_current.style.backgroundColor != GREY){
                    if (_current.style.backgroundColor == next1.style.backgroundColor && _current.style.backgroundColor == next2.style.backgroundColor && _current.style.backgroundColor == next3.style.backgroundColor) {
                        vinto = true;
                        i = RIGHE-3;
                        j = COLONNE;
                    }
                }
            }
        }
    }

    return vinto;
}