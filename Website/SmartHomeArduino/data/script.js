const navSlide = () => {
  const burger = document.querySelector('.burger');
  const nav = document.querySelector('.nav-links');
  const navLinks = document.querySelectorAll('.nav-links li');

  //toggle Nav
  burger.addEventListener('click', () => {
    nav.classList.toggle('nav-active');
    //Animate links
    navLinks.forEach((link, index) => {
      if (link.style.animation) {
        link.style.animation = '';
      } else {
        link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.4}s`;
      }
    });
    //burger animation
    burger.classList.toggle('burgerChange');

  });
}

const app = () => {
  navSlide();
}

app();


var elem = document.querySelector('input[type="range"]');

var rangeValue = function(){
  var newValue = elem.value;
  var target = document.querySelector('.value');
  target.innerHTML = newValue;
}

elem.addEventListener("input", rangeValue);


function changeText(lightClick, textClick, bool){
  if(bool){
  lightClick.src = "https://i.imgur.com/dD8iOOt.png";
  textClick.classList.add('active-text');
  textClick.innerHTML = 'On';
  }
  if(!bool){
    lightClick.src = "https://i.imgur.com/OrjhnYR.png";
    textClick.classList.remove('active-text');  
    textClick.innerHTML = 'Off';
  }
}


/*
HTTP request explained: 
First create a variable for that new HTTPrequest.
Then with javascript, see if element is 'checked'. If it's checked, open GET request with specific parameter and value. Same goes if it's not checked.
When if/else is completed, xhr.send() sends that request to our Arduino code. With server.on(/URLOFGETREQUEST), we can catch that parameter and value and send it to FPGA.



//turn AlarmSystem on
function turnAlarmSystem(element){
  var xhr = new XMLHttpRequest();
  const alarmSystemText = document.getElementById('alarmSystemText');
  if (element.checked){
    xhr.open("GET", "/alarmsystem?alarm=" + 3, true);
    alarmSystemText.innerHTML = 'Activated';
    alarmSystemText.classList.add('active-text');
  }
  else if (!element.checked) {
    xhr.open("GET", "/alarmsystem?alarm=" + 4, true);
    alarmSystemText.innerHTML = 'Deactivated';
    alarmSystemText.classList.remove('active-text');
  }
  xhr.send();
}
*/

//turn kitchen light on
function turnAlarmSystem(element) {
  var xhr = new XMLHttpRequest();
  const alarmSystemText = document.getElementById('alarmSystemText');
  if (element.checked) {
    xhr.open("GET", "/alarmsystem?alarm=" + 3, true);
    alarmSystemText.innerHTML = 'Activated';
    alarmSystemText.classList.add('active-text');
  } else if (!element.checked) {
    xhr.open("GET", "/alarmsystem?alarm=" + 4, true);
    alarmSystemText.innerHTML = 'Deactivated';
    alarmSystemText.classList.remove('active-text');
  }
  xhr.send();
}

//open/close garage doors
function openGarageDoors(element){
  var xhr = new XMLHttpRequest();
  const alarmSystemText = document.getElementById('garageText');
  if (element.checked){
    xhr.open("GET", "/garagedoors?garageopen=" + 5, true);
    alarmSystemText.innerHTML = 'Opened';
    alarmSystemText.classList.add('active-text');
  }
  else if (!element.checked) {
    xhr.open("GET", "/garagedoors?garageopen=" + 6, true);
    alarmSystemText.innerHTML = 'Closed';
    alarmSystemText.classList.remove('active-text');
  }
  xhr.send();
}

//turn kitchen light on
function turnKitchenLight(element) {
  var xhr = new XMLHttpRequest();
  const lightClick = document.getElementById('lightClick1');
  const textClick = document.getElementById('textClick1');
  if (element.checked) {
    xhr.open("GET", "/kitchenlight?kitchen=" + 7, true);
    changeText(lightClick,textClick, 1);
  } else if (!element.checked) {
    xhr.open("GET", "/kitchenlight?kitchen=" + 8, true);
    changeText(lightClick,textClick, 0);
  }
  xhr.send();
}

//turn kitchen light on
function turnLivingLight(element) {
  var xhr = new XMLHttpRequest();
  const lightClick = document.getElementById('lightClick2');
  const textClick = document.getElementById('textClick2');
  if (element.checked) {
    xhr.open("GET", "/livinglight?living=" + 9, true);
    changeText(lightClick,textClick, 1);
  } else if (!element.checked) {
    xhr.open("GET", "/livinglight?living=" + 10, true);
    changeText(lightClick,textClick, 0);
  }
  xhr.send();
}

//turn kitchen light on
function turnDiningLight(element) {
  var xhr = new XMLHttpRequest();
  const lightClick = document.getElementById('lightClick3');
  const textClick = document.getElementById('textClick3');
  if (element.checked) {
    xhr.open("GET", "/dininglight?dining=" + 11, true);
    changeText(lightClick,textClick, 1);
  } else if (!element.checked) {
    xhr.open("GET", "/dininglight?dining=" + 12, true);
    changeText(lightClick,textClick, 0);
  }
  xhr.send();
}


//turn kitchen light on
function turnFrontLight(element) {
  var xhr = new XMLHttpRequest();
  const lightClick = document.getElementById('lightClick4');
  const textClick = document.getElementById('textClick4');
  if (element.checked) {
    xhr.open("GET", "/frontlight?front=" + 13, true);
    changeText(lightClick,textClick, 1);
  } else if (!element.checked) {
    xhr.open("GET", "/frontlight?front=" + 14, true);
    changeText(lightClick,textClick, 0);
  }
  xhr.send();
}

//turn kitchen light on
function turnGarageLight(element) {
  var xhr = new XMLHttpRequest();
  const lightClick = document.getElementById('lightClick5');
  const textClick = document.getElementById('textClick5');
  if (element.checked) {
    xhr.open("GET", "/garagelight?garage=" + 15, true);
    changeText(lightClick,textClick, 1);
  } else if (!element.checked) {
    xhr.open("GET", "/garagelight?garage=" + 16, true);
    changeText(lightClick,textClick, 0);
  }
  xhr.send();
}


//turn kitchen light on
function turnBackLight(element) {
  var xhr = new XMLHttpRequest();
  const lightClick = document.getElementById('lightClick6');
  const textClick = document.getElementById('textClick6');
  if (element.checked) {
    xhr.open("GET", "/backlight?back=" + 17, true);
    changeText(lightClick,textClick, 1);
  } else if (!element.checked) {
    xhr.open("GET", "/backlight?back=" + 18, true);
    changeText(lightClick,textClick, 0);
  }
  xhr.send();
}


function turnALLONIn(element){
  var kitchenCheck = document.getElementById('kitchenCheck');
  kitchenCheck.checked = true;
  turnKitchenLight(kitchenCheck);

  var livingCheck = document.getElementById('livingCheck');
  livingCheck.checked = true;
  turnLivingLight(livingCheck);

  var diningCheck = document.getElementById('diningCheck');
  diningCheck.checked = true;
  turnDiningLight(diningCheck);
}


function turnALLOFFIn(element){
  var kitchenCheck = document.getElementById('kitchenCheck');
  kitchenCheck.checked = false;
  turnKitchenLight(kitchenCheck);

  var livingCheck = document.getElementById('livingCheck');
  livingCheck.checked = false;
  turnLivingLight(livingCheck);

  var diningCheck = document.getElementById('diningCheck');
  diningCheck.checked = false;
  turnDiningLight(diningCheck);
}


function turnALLONOut(element){
  var frontCheck = document.getElementById('frontCheck');
  frontCheck.checked = true;
  turnFrontLight(frontCheck);

  var garageCheck = document.getElementById('garageCheck');
  garageCheck.checked = true;
  turnGarageLight(garageCheck);

  var backCheck = document.getElementById('backCheck');
  backCheck.checked = true;
  turnBackLight(backCheck);
}


function turnALLOFFOut(element){
  var frontCheck = document.getElementById('frontCheck');
  frontCheck.checked = false;
  turnFrontLight(frontCheck);

  var garageCheck = document.getElementById('garageCheck');
  garageCheck.checked = false;
  turnGarageLight(garageCheck);

  var backCheck = document.getElementById('backCheck');
  backCheck.checked = false;
  turnBackLight(backCheck);
}



//turn kitchen light on
function turnLivingVent(element) {
  var xhr = new XMLHttpRequest();
  const lightClick = document.getElementById('lightClick7');
  const textClick = document.getElementById('textClick7');
  if (element.checked) {
    xhr.open("GET", "/backlight?back=" + 20, true);
    textClick.classList.add('active-text');
    textClick.innerHTML = 'On';
    lightClick.src = "https://thumbs.gfycat.com/GlamorousWaterloggedAntelope-size_restricted.gif";
  } else if (!element.checked) {
    xhr.open("GET", "/backlight?back=" + 21, true);
    textClick.classList.remove('active-text');
    textClick.innerHTML = 'Off';
    lightClick.src = "https://i.imgur.com/RNcVo8R.png";
  }
  xhr.send();
}



//turn kitchen light on
function turnDivingVent(element) {
  var xhr = new XMLHttpRequest();
  const lightClick = document.getElementById('lightClick8');
  const textClick = document.getElementById('textClick8');
  if (element.checked) {
    xhr.open("GET", "/backlight?back=" + 22, true);
    textClick.classList.add('active-text');
    textClick.innerHTML = 'On';
    lightClick.src = "https://thumbs.gfycat.com/GlamorousWaterloggedAntelope-size_restricted.gif";
  } else if (!element.checked) {
    xhr.open("GET", "/backlight?back=" + 23, true);
    textClick.classList.remove('active-text');
    textClick.innerHTML = 'Off';
    lightClick.src = "https://i.imgur.com/RNcVo8R.png";
  }
  xhr.send();
}



// function that sends HTTP request for /temperature which reads the data on DHT sensor
setInterval(function ( ) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      var x = (new Date()).getTime(),
          y = parseFloat(this.responseText);
          console.log(x);
          document.getElementById("temperatureID").classList.add('transition-text-pre-animation');
          setTimeout(function () {
            document.getElementById("temperatureID").classList.remove('transition-text-pre-animation');
          }, 1000)
          document.getElementById("temperatureID").innerHTML = this.responseText;
          console.log(this.responseText);
    }
  };
  xhttp.open("GET", "/temperature", true);
  xhttp.send();
}, 20000 ) ;



// function that sends HTTP request for /humidity which reads the data on DHT sensor
setInterval(function ( ) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      var x = (new Date()).getTime(),
          y = parseFloat(this.responseText);
          console.log(x);
          document.getElementById("humidityID").classList.add('transition-text-pre-animation');
          setTimeout(function () {
            document.getElementById("humidityID").classList.remove('transition-text-pre-animation');
          }, 1000)
          document.getElementById("humidityID").innerHTML = this.responseText;
          console.log(this.responseText);
    }
  };
  xhttp.open("GET", "/humidity", true);
  xhttp.send();
}, 21000 ) ;

// function that sends HTTP request for /outsidetemperature which reads the data on DHT sensor
setInterval(function ( ) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      var x = (new Date()).getTime(),
          y = parseFloat(this.responseText);
          console.log(x);
          document.getElementById("temperatureOutID").classList.add('transition-text-pre-animation');
          setTimeout(function () {
            document.getElementById("temperatureOutID").classList.remove('transition-text-pre-animation');
          }, 1000)
          document.getElementById("temperatureOutID").innerHTML = this.responseText;
          console.log(this.responseText);
    }
  };
  xhttp.open("GET", "/temperatureOUT", true);
  xhttp.send();
}, 22000 ) ;


// function that sends HTTP request for /pressure which reads the data on DHT sensor
setInterval(function ( ) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      var x = (new Date()).getTime(),
          y = parseFloat(this.responseText);
          console.log(x);
          document.getElementById("humidityOutID").classList.add('transition-text-pre-animation');
          setTimeout(function () {
            document.getElementById("humidityOutID").classList.remove('transition-text-pre-animation');
          }, 1000)
          document.getElementById("humidityOutID").innerHTML = this.responseText;
          console.log(this.responseText);
    }
  };
  xhttp.open("GET", "/humidityOUT", true);
  xhttp.send();
}, 23000 ) ;


