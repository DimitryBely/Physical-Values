"use strict";

window.addEventListener('DOMContentLoaded', () => {

// Change Language

    let lang = '';
    document.querySelectorAll('.lang')[0].classList.contains('selectedLang') ? lang = 'ru': lang = 'en';

// ---------

// Calculator

    const   btns = document.querySelectorAll('.calculator .btn'),
            display = document.querySelector('.display > input'),
            calc = document.querySelector('.calculator > div'),
            callCalc = document.querySelector('.calculator > span > div');

    let buffer = '';
    const list = {
        search: function(i) {
            if(i == '+'){list.equal();list.sum()}
            else if(i == '-'){list.equal();list.sub()}
            else if(i == '*'){list.equal();list.mul()}
            else if(i == '/'){list.equal();list.div()}
            else if(i == '√'){list.equal();list.sqrt()}
            else if(i == '='){list.equal()}
        },

        sum: function() {
            let arr = display.value.split('+');
            if(arr.length > 1){
                display.value = +arr[0] + +arr[1];
                list.equal();
            }
            buffer = 'sum';
        },

        sub: function() {
            let arr = display.value.split('-');
            if(arr.length > 1){
                display.value = +arr[0] - +arr[1];
                list.equal();
            }
            buffer = 'sub';
        },

        mul: function() {
            let arr = display.value.split('*');
            if(arr.length > 1){
                display.value = +arr[0] * +arr[1];
                list.equal();
            }
            buffer = 'mul';
        },

        div: function() {
            let arr = display.value.split('/');
            if(arr.length > 1){
                display.value = +arr[0] / +arr[1];
                list.equal();
            }
            buffer = 'div';
        },

        sqrt: function() {
            list.equal();
            display.value = Math.sqrt(+display.value.split('√'));
            buffer = '';
        },

        equal: function() {
            if(buffer == 'sum'){list.sum()}
            else if(buffer == 'sub'){list.sub()}
            else if(buffer == 'mul'){list.mul()}
            else if(buffer == 'div'){list.div()}
            buffer = '';
        }
    }

    btns.forEach( (i) => {
        i.addEventListener('click', () => {
            list.search(i.textContent);
            if(i.textContent != '=' && i.textContent != '√') display.value += i.textContent; 
        });
    });

    function moveCalc(x) {
        if(calcX >= -200 && calcX <= 0){
            calcX += x;
            calc.style.transform = `translateX(${calcX}px)`;

            if(calcX > -200 && boolClickCallCalc == true){
                setTimeout( () => { moveCalc(-5) }, 10);
            } else if( calcX < 0 && boolClickCallCalc == false ){
                setTimeout( () => { moveCalc(5) }, 10);
            }

            if(calcX == -200){
                boolClickCallCalc = false;
            } else if(calcX == 0){
                boolClickCallCalc = true;
            }
        }
    }

    let boolClickCallCalc = false,
        calcX = -200;

    callCalc.addEventListener('click', () => {
        if(calcX == 0){
            moveCalc(-5);
        } else if(calcX == -200){
            moveCalc(5);
        }
    });

// ----------

// Navigation
    
    const   nav = document.querySelectorAll('nav li'),
            nav_ul = document.querySelectorAll('.nav-ul'),
            welcomeBtn = document.querySelector('#btn_00'),
            path = document.querySelectorAll('.path');

    let now = '00';

    welcomeBtn.addEventListener( 'click', () => {
        document.querySelector(`#page_${now}`).classList.add('d-none');
        now = '00';
        document.querySelector(`#page_00`).classList.remove('d-none');
        lang == 'ru' ? path[0].textContent = 'Главное Меню' : path[0].textContent = 'Main Menu';
        path[1].textContent = '';
    });

    nav_ul.forEach( (btn) => {
        btn.addEventListener('click', () => {
            let first = btn.id.slice(0, 2);
            let last = btn.id.slice(-2);
            nav.forEach( (li) => {
                if(+li.id.slice(-2) >= +first && +li.id.slice(-2) <= +last){
                    if(li.classList.contains('d-none')) {
                        li.classList.remove('d-none');
                        li.classList.add('d-flex');
                    } else {
                        li.classList.remove('d-flex');
                        li.classList.add('d-none');
                    }
                }
            });
        });
    });

    nav.forEach( (btn) => {
        btn.addEventListener( 'click', () => {
            document.querySelector(`#page_${now}`).classList.add('d-none');
            now = btn.id.slice(-2);
            document.querySelector(`#page_${btn.id.slice(-2)}`).classList.remove('d-none');
            if(+now == 0) {path[0].textContent = ''}
            else if(+now <= 3) {lang == 'ru' ? path[0].textContent = 'Плотности' : path[0].textContent = 'Densities';}
            else if(+now <= 7) {lang == 'ru' ? path[0].textContent = 'Плотности' : path[0].textContent = 'Transcalencies';}
            else if(+now == 8) {lang == 'ru' ? path[0].textContent = 'Плотности' : path[0].textContent = 'Electrical Resistivity';}
            path[1].textContent = `/${btn.textContent}`;
        });
    });

// ---------

});