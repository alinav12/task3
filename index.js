function drawMaskedView({regExpPattern, title, inputID}) {
    let form = document.getElementById('maskedInputsForm');

    let label = document.createElement('label');
    label.innerText = title;
    label.htmlFor = inputID;
    form.appendChild(label);

    let divBlock = document.createElement('div');
    divBlock.className = 'input-div-block';
    divBlock.style.width = '200px';
    divBlock.style.height = '25px';
    form.appendChild(divBlock);

    let input = document.createElement('input');
    input.maxLength = regExpPattern.length;
    input.type = 'number';
    divBlock.appendChild(input);
    input.addEventListener('input', onChange);
    input.id = inputID;

    let symbolsNum = regExpPattern.replaceAll(/(\{|\})/g, '').length;

    let divTextWidth = parseInt(divBlock.style.width) / symbolsNum;
    

    let constSymbolFlag = false;
    let variableCounter = 0;

    for (let i = 0; i < regExpPattern.length; i++){
        
        const char = regExpPattern[i];
        if(char === '{'){
            constSymbolFlag = true;
            continue;
        }
        if(char === '}'){
            constSymbolFlag = false;
            continue;
        }

        const div = document.createElement('div');
        div.classList.add('input-single-div');
        div.style.width = `${divTextWidth}px`;

        if(constSymbolFlag ||  !Number.isInteger(parseInt(char))){
            div.classList.add('const-div');
            div.innerHTML = char;
        }else{
            div.classList.add('variable-div');
            variableCounter++;
        }
        divBlock.appendChild(div);
    }

    input.maxLength = variableCounter;

    input.addEventListener('click', () => {
        input.parentElement.getElementsByClassName('variable-div')[0].classList.add('active')
    
    }, {once : true});

}

const onChange = e => {

    let divs = e.target.parentElement.getElementsByClassName('variable-div');

    if(e.data){
        divs[e.target.value.length-1].innerHTML = e.data;
        divs[e.target.value.length-1].classList.remove('active');
        if(e.target.value.length !== e.target.maxLength) divs[e.target.value.length].classList.add('active');
    }else{
        divs[e.target.value.length].innerHTML = '';
        divs[e.target.value.length+1].classList.remove('active');
        divs[e.target.value.length].classList.add('active');
    }

    if(e.target.value.length === e.target.maxLength){
        let commonDivs = e.target.parentElement.getElementsByClassName('input-single-div');
        let result = Array.from(commonDivs).reduce((acc, element) => acc + element.innerHTML, '');
        alert(`Your input is ${result}`);

    }
}



drawMaskedView({regExpPattern: '+{380} (00) 000 00 00', title: 'Phone number', inputID: 'phoneInput'});

drawMaskedView({regExpPattern: '255.255.255.255', title: 'IP Address', inputID: 'idAddressInput'});