function drawMaskedView({regExpPattern, title, inputID}) {
    let form = document.getElementById('maskedInputsForm');

    let label = document.createElement('label');
    label.innerText = title;
    label.htmlFor = inputID;
    form.appendChild(label);

    let input = document.createElement('input');
    input.type = 'text';
    input.id = inputID;
    input.maxLength = 19;
    form.appendChild(input);


    input.addEventListener('input', (e) => {handleMaskedInput(e, regExpPattern)});

}

function handleMaskedInput(e, regExpPattern){
    if(e.target.id.toLowerCase().includes('phone')){
        if (e.target.value){
            let x;
            if(e.target.value.length === 1){
                x = e.target.value.replace(/\D/g, '').match(regExpPattern);
            }else{
                x = e.target.value.slice(4).replace(/\D/g, '').match(regExpPattern);
            }
            e.target.value = (!x[0] ? '' : '+380') + (x[1] ? `(${x[1]})` : '') + (x[2] ? ` ${x[2]}` : '') + (x[3] ? ` ${x[3]}` : '') + (x[4] ? ` ${x[4]}` : '');

            if(e.target.value[e.target.value.length-1] == ')') {
                e.target.value = e.target.value.slice(0, -1);
            }
            
        }
    }
    if(e.target.id.toLowerCase().includes('ipaddress')){

        if (e.target.value){
            let x = e.target.value.replace(/\D/g, '').match(regExpPattern);

            e.target.value = (x[1] ? `${x[1]}` : '') + (x[2] ? `.${x[2]}` : '') + (x[3] ? `.${x[3]}` : '') + (x[4] ? `.${x[4]}` : '');

            
        }
    }
    
}

drawMaskedView({regExpPattern: /(\d{0,2})(\d{0,3})(\d{0,2})(\d{0,2})/, title: 'Phone number', inputID: 'phoneNumberMask'});

drawMaskedView({regExpPattern: /(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)?(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)?(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)?(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)?/, title: 'IP Address', inputID: 'ipAddressMask'});

