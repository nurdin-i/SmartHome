const navSlide = () => {
  const burger = document.querySelector('.burger');
  const nav = document.querySelector('.nav-links');
  const navLinks = document.querySelectorAll('.nav-links li');

  //toggle Nav
  burger.addEventListener('click',() => {
    nav.classList.toggle('nav-active');
      //Animate links
  navLinks.forEach((link,index) => {
    if(link.style.animation){
      link.style.animation = '';
    }
    else {
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

/*
HTTP request explained: 
First create a variable for that new HTTPrequest.
Then with javascript, see if element is 'checked'. If it's checked, open GET request with specific parameter and value. Same goes if it's not checked.
When if/else is completed, xhr.send() sends that request to our Arduino code. With server.on(/URLOFGETREQUEST), we can catch that parameter and value and send it to FPGA.
*/
//turnDiode
function toggleled1(element) {
  var xhr = new XMLHttpRequest();
  if(element.checked){ 
    xhr.open("GET", "/ledroom1?led1="+20, true); }
  else if(!element.checked) { 
    xhr.open("GET", "/ledroom1?led1="+21, true);}
  xhr.send();
}

//turnDiode2
function toggleled2(element) {
  var xhr = new XMLHttpRequest();
  if(element.checked){ 
    xhr.open("GET", "/ledroom2?led2="+22, true); }
  else if(!element.checked) { 
    xhr.open("GET", "/ledroom2?led2="+23, true);}
  xhr.send();
}


var chartT = new Highcharts.Chart({
  chart:{ renderTo : 'chart-temperature' },
  title: { text: 'Temperature' },
  series: [{
    showInLegend: false,
    data: []
  }],
  plotOptions: {
    line: { animation: false,
      dataLabels: { enabled: true }
    },
    series: { color: '#059e8a' }
  },
  xAxis: { type: 'datetime',
    dateTimeLabelFormats: { second: '%H:%M:%S' }
  },
  yAxis: {
    title: { text: 'Temperature (Celsius)' }
  },
  credits: { enabled: false }
});


setInterval(function ( ) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      var x = (new Date()).getTime(),
          y = parseFloat(this.responseText);
      //console.log(this.responseText);
      if(chartT.series[0].data.length > 40) {
        chartT.series[0].addPoint([x, y], true, true, true);
      } else {
        chartT.series[0].addPoint([x, y], true, false, true);
      }
    }
  };
  xhttp.open("GET", "/temperature", true);
  xhttp.send();
}, 30000 ) ;