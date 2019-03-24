"use strict";

window.addEventListener('DOMContentLoaded', () => {

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
    
    const   densityStages = document.querySelectorAll('.stage'),
            densityTables = document.querySelectorAll('.density-table');

    const   nav_1 = document.querySelectorAll('.nav-1 > li');

    nav_1.forEach( (btn) => {
        btn.addEventListener( 'click', () => {
            densityStages[0].textContent = 'Density';
            densityStages[1].textContent = btn.textContent;
            if(btn.textContent == 'Metal') { 
                densityTables[0].classList.remove('d-none');
                densityTables[1].classList.add('d-none');
                densityTables[2].classList.add('d-none');
            } else if(btn.textContent == 'Liquid'){
                densityTables[0].classList.add('d-none');
                densityTables[1].classList.remove('d-none');
                densityTables[2].classList.add('d-none');
            } else if(btn.textContent == 'Gas'){
                densityTables[0].classList.add('d-none');
                densityTables[1].classList.add('d-none');
                densityTables[2].classList.remove('d-none');
            }
        });
    });

// ---------

});