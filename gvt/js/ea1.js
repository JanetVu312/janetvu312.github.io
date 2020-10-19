// START EA1 Spinning Earth
var i = 0;

function myFunction(event) {

  if (event.keyCode == 114) { //wenn R, dann runterzählen

    if (i == 0) {
      i = 25;
    } else {
      i--;
    }

    test();
  }

  if (event.keyCode == 108) { //wenn L, dann raufzählen
    if (i == 25) {
      i = 0;
    } else {
      i++;
    }
    test();

  }
	

  function test() {
    switch (i) { //Bilder je nach Fall austauschen
      case 1:
        document.getElementById("rot").src = "images/ea1/0.png";
        break;
      case 2:
        document.getElementById("rot").src = "images/ea1/15.png";
        break;
      case 3:
        document.getElementById("rot").src = "images/ea1/30.png";
        break;
      case 4:
        document.getElementById("rot").src = "images/ea1/45.png";
        break;
      case 5:
        document.getElementById("rot").src = "images/ea1/60.png";
        break;
      case 6:
        document.getElementById("rot").src = "images/ea1/75.png";
        break;
      case 7:
        document.getElementById("rot").src = "images/ea1/90.png";
        break;
      case 8:
        document.getElementById("rot").src = "images/ea1/105.png";
        break;
      case 9:
        document.getElementById("rot").src = "images/ea1/120.png";
        break;
      case 10:
        document.getElementById("rot").src = "images/ea1/135.png";
        break;
      case 11:
        document.getElementById("rot").src = "images/ea1/150.png";
        break;
      case 12:
        document.getElementById("rot").src = "images/ea1/165.png";
        break;
      case 13:
        document.getElementById("rot").src = "images/ea1/180.png";
        break;
      case 14:
        document.getElementById("rot").src = "images/ea1/195.png";
        break;
      case 16:
        document.getElementById("rot").src = "images/ea1/210.png";
        break;
      case 17:
        document.getElementById("rot").src = "images/ea1/225.png";
        break;
      case 18:
        document.getElementById("rot").src = "images/ea1/240.png";
        break;
      case 19:
        document.getElementById("rot").src = "images/ea1/255.png";
        break;
      case 20:
        document.getElementById("rot").src = "images/ea1/270.png";
        break;
      case 21:
        document.getElementById("rot").src = "images/ea1/285.png";
        break;
      case 22:
        document.getElementById("rot").src = "images/ea1/300.png";
        break;
      case 23:
        document.getElementById("rot").src = "images/ea1/315.png";
        break;
      case 24:
        document.getElementById("rot").src = "images/ea1/330.png";
        break;
	  case 25:
        document.getElementById("rot").src = "images/ea1/345.png";
        break;
    }
  }
}
// SND EA1 Spinning Earth


// START Sprite-Sheet Animation

var tID;

function stopAnimate() {
  clearInterval(tID);
}


function animateScript() {

  var position = 520; //Startposition
  const interval = 250; //Interval in ms
  const diff = 520; //Diff 520

  tID = setInterval(() => {

    document.getElementById("image").style.backgroundPosition =
      `-${position}px 0px`;


    if (position < 4160) {
      position = position + diff;
    }
    //Position immer um Diff ergänzen
    else {
      position = 520;
    }
    //andernfalls Startposition einnehmen

  }, interval);
}
// END Sprite-Sheet Animation