const send = document.querySelector('.send');
const rstsend = document.querySelector('.rst');
const bmilist = document.querySelector('.main-bmi');
const delBtn = document.querySelector('.delBtn');
let data = JSON.parse(localStorage.getItem('listData')) || [];


updateList(data);
function updateList(item){
    let str = '';
    let len = item.length;
    for(let i = 0; len > i; i++) {
        str += '<li><h3></h3><div><p>BMI:<span>'+item[i].BMI+'</span></p><p>weight:<span>'+item[i].W+'</span>kg</p><p>height:<span>'+item[i].H+'</span>cm</p></div><div>'+item[i].DATE+'</div></li>';
    }
    bmilist.innerHTML = str;

    let el = document.querySelectorAll('.main-bmi li');
    let h3 = document.querySelectorAll('h3');
    let rst = document.querySelector('.rst p');
    for(let j = 0; len>j ;j++){
        let str = item[j].BMI;
        if(str<18.5){
            el[j].setAttribute('class','t');
            h3[j].textContent='過輕';
            rst.textContent='過輕';
        }else if(18.5<=str && str<24){
            el[j].setAttribute('class','ok');
            h3[j].textContent='理想';
            rst.textContent='理想';
        }else if(24<=str && str<27){
            el[j].setAttribute('class','f');
            h3[j].textContent='過重';
            rst.textContent='過重';
        }else if(27<=str && str<30){
            el[j].setAttribute('class','sf');
            h3[j].textContent='輕度肥胖';
            rst.textContent='輕度肥胖';
        }else if(30<=str && str<35){
            el[j].setAttribute('class','mf');
            h3[j].textContent='中度肥胖';
            rst.textContent='中度肥胖';
        }else if(35<=str){
            el[j].setAttribute('class','lf');
            h3[j].textContent='重度肥胖';
            rst.textContent='重度肥胖';
        }
    }
}

send.addEventListener('click',addData);
function addData(e){
    e.preventDefault();
    let height = document.querySelector('.height').value;
    let weight = document.querySelector('.weight').value;
    let bmi = weight/(height/100)**2;
    let add = {
        BMI:bmi.toFixed(2),
        W:weight,
        H:height,
        DATE:new Date().getFullYear()+'/'+(new Date().getMonth()+1)+'/'+new Date().getDate()
    };

    if(height==''||weight==''){
        alert('身高體重，不可為空！');
        return;
    } else if(isNaN(height)==true||isNaN(weight)==true){
        alert('請輸入數字！');
        return;
    }
    send.classList.toggle('rst');
    rstsend.classList.toggle('open');
    data.push(add);
    updateList(data);
    localStorage.setItem('listData',JSON.stringify(data));
    document.querySelector('.height').value="";
    document.querySelector('.weight').value="";
};

rstsend.addEventListener('click',rst);
function rst(e){
    send.classList.toggle('rst');
    rstsend.classList.toggle('open');
}


delBtn.addEventListener('click',delList);
function delList(e){
    e.preventDefault();
    data = [];
    localStorage.setItem('listData',JSON.stringify(data));
    updateList(data);
}

