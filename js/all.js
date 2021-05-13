const sendBtn = document.querySelector('.header-send');
const rstBtn = document.querySelector('.header-rst');
const smallalert = document.querySelector('.header-alert');
const bmilist = document.querySelector('.main-bmi');
const delBtn = document.querySelector('.delBtn');

let data = JSON.parse(localStorage.getItem('listData')) || [];


updateList(data);
function updateList(item) {
    let str = '';
    let len = item.length;
    for (let i = 0; len > i; i++) {
        str += '<li data-item="' + i + '"><h3></h3><div><p>BMI:<span>' + item[i].BMI + '</span></p><p>weight:<span>' + item[i].W + '</span>kg</p><p>height:<span>' + item[i].H + '</span>cm</p></div><div>' + item[i].DATE + '</div><div><a href="#"">刪除</a></div></li>';
    }
    bmilist.innerHTML = str;

    let el = document.querySelectorAll('.main-bmi li');
    let h3 = document.querySelectorAll('.main-bmi h3');
    let rstBMI = document.querySelector('.rst h2');
    let BMItext = document.querySelector('.header-rst > p');
    let rstcolor = document.querySelector('.header-rst button');
    let rstspan = document.querySelector('.header-rst span');
    for (let j = 0; len > j; j++) {
        let str = item[j].BMI;
        rstBMI.textContent = str;
        if (str < 18.5) {
            el[j].setAttribute('class', 't');
            h3[j].textContent = '過輕';
            BMItext.textContent = '過輕';
            BMItext.setAttribute('style', 'color:#31BAF9;');
            rstcolor.setAttribute('style', 'color: #31BAF9;border: 3px solid #31BAF9;');
            rstspan.setAttribute('style', 'background:#31BAF9;');
        } else if (18.5 <= str && str < 24) {
            el[j].setAttribute('class', 'ok');
            h3[j].textContent = '理想';
            BMItext.textContent = '理想';
            BMItext.setAttribute('style', 'color:#86D73F;');
            rstcolor.setAttribute('style', 'color: #86D73F;border: 3px solid #86D73F;');
            rstspan.setAttribute('style', 'background:#86D73F;');
        } else if (24 <= str && str < 27) {
            el[j].setAttribute('class', 'f');
            h3[j].textContent = '過重';
            BMItext.textContent = '過重';
            BMItext.setAttribute('style', 'color:#FF982D;');
            rstcolor.setAttribute('style', 'color: #FF982D;border: 3px solid #FF982D;');
            rstspan.setAttribute('style', 'background:#FF982D;');
        } else if (27 <= str && str < 30) {
            el[j].setAttribute('class', 'sf');
            h3[j].textContent = '輕度肥胖';
            BMItext.textContent = '輕度肥胖';
            BMItext.setAttribute('style', 'color:#FF6C03;');
            rstcolor.setAttribute('style', 'color: #FF6C03;border: 3px solid #FF6C03;');
            rstspan.setAttribute('style', 'background:#FF6C03;');
        } else if (30 <= str && str < 35) {
            el[j].setAttribute('class', 'mf');
            h3[j].textContent = '中度肥胖';
            BMItext.textContent = '中度肥胖';
            BMItext.setAttribute('style', 'color:#FF6C03;');
            rstcolor.setAttribute('style', 'color: #FF6C03;border: 3px solid #FF6C03;');
            rstspan.setAttribute('style', 'background:#FF6C03;');
        } else if (35 <= str) {
            el[j].setAttribute('class', 'lf');
            h3[j].textContent = '重度肥胖';
            BMItext.textContent = '重度肥胖';
            BMItext.setAttribute('style', 'color:#FF1200;');
            rstcolor.setAttribute('style', 'color: #FF1200;border: 3px solid #FF1200;');
            rstspan.setAttribute('style', 'background:#FF1200;');
        }
    }
    if (len != 0) {
        delBtn.className = "delBtn on";
    } else {
        return;
    }
}

sendBtn.addEventListener('click', addData);
function addData(e) {
    e.preventDefault();
    let height = document.querySelector('.height').value;
    let weight = document.querySelector('.weight').value;
    let bmi = weight / (height / 100) ** 2;
    let add = {
        BMI: bmi.toFixed(2),
        W: weight,
        H: height,
        DATE: new Date().getFullYear() + '/' + (new Date().getMonth() + 1) + '/' + new Date().getDate()
    };
    let str = '';
    if (height == '' || weight == '') {
        str += '<small>身高體重，不可為空！</small>'
        smallalert.innerHTML = str;
        return;
    } else if (isNaN(height) == true || isNaN(weight) == true) {
        str += '<small>請輸入數字！</small>'
        smallalert.innerHTML = str;
        return;
    }
    sendBtn.classList.toggle('rst');
    rstBtn.classList.toggle('open');
    smallalert.innerHTML = '';
    data.push(add);
    updateList(data);
    localStorage.setItem('listData', JSON.stringify(data));
    document.querySelector('.height').value = "";
    document.querySelector('.weight').value = "";
};

rstBtn.addEventListener('click', rst);
function rst() {
    sendBtn.classList.toggle('rst');
    rstBtn.classList.toggle('open');
}


delBtn.addEventListener('click', delList);
function delList(e) {
    e.preventDefault();
    data = [];
    localStorage.setItem('listData', JSON.stringify(data));
    updateList(data);
    delBtn.className = "delBtn";
}

bmilist.addEventListener('click', delonelist);
function delonelist(e) {
    e.preventDefault();
    if(e.target.nodeName !== 'A') {return;}
    let item = e.target.parentNode.parentNode.dataset.item;
    data.splice(item, 1);
    if (data.length !== 0) {
      localStorage.setItem('listData', JSON.stringify(data));
      updateList(data);
    } else {
      localStorage.clear();
      updateList(data);
      delBtn.className = "delBtn";
    }
}