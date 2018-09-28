let rover = {
  direction: "E",
  x: 4,
  y: 4,
  rotation: 0,
  travelLog: [4,4]
}

let obstacleLocation = [];
let imgRover = [];
let robotAI = [];
let divElement=[];
let time;

document.getElementById("startButton").addEventListener("click", startGame);
document.getElementById("newGame").addEventListener("click", newGame);



window.addEventListener("keydown", function(event) {
  console.log(event);
  if (event.code == "ArrowUp") moveForward(rover);
  else if (event.code == "ArrowDown") moveBackward(rover)
  else if (event.code == "ArrowRight") turnRight(rover)
  else if (event.code == "ArrowLeft") turnLeft(rover)
});


function startGame() {
let enemieCounter = document.getElementById("enemies").value == "" ? 0 : document.getElementById("enemies").value ;
let obstacleCounter = document.getElementById("obstacles").value == "" ? 0 : document.getElementById("obstacles").value;
let speed = document.getElementById("level").value;
switch (speed) {
  case "1": speed = 1500; break;
  case "2": speed = 650; break;
  case "3": speed = 350; break;
  case "4": speed = 150; break;
}
//connect javaScript with HTML
for (let i=0; i<10; i++) {
  imgRover[i] = [];
  for (let j=0; j<10; j++) {
    imgRover[i][j] = document.createElement("img");
    imgRover[i][j].setAttribute("src", "file:///Users/matt/Desktop/WebDeveloping/Ironhack/mars-rover/images/Wall-E-small.png");
    imgRover[i][j].setAttribute("width", "70%");
    imgRover[i][j].setAttribute("style", "visibility: hidden");
    document.getElementById("box"+i+j).appendChild(imgRover[i][j]);
  }
}
setTimer();
//Default position of rover
imgRover[4][4].setAttribute("style", "visibility: visible");
addRobotAI(enemieCounter);
addobstacles(obstacleCounter);
for (let j=0; j<robotAI.length; j++) {
  setInterval(movementAI, speed, "", robotAI[j]); 
  }
}

function newGame(){
  window.location.reload();
}
function setTimer () {
  let seconds, secondsCounter, minutes, minutesCounter;
  secondsCounter = 0;
  minutesCounter = 0;
  seconds = 0;
  minutes = 0;

  let timer = setInterval(function() {
    secondsCounter++;

    if (secondsCounter > 59) {
      minutesCounter++;
      secondsCounter = 0;
      seconds = "0" + secondsCounter;
    } else if (secondsCounter < 10) {
      seconds = "0" + secondsCounter;
    } else seconds = secondsCounter;
    
      if (minutesCounter < 1) {
        minutes = "00";
      } else if (minutesCounter < 10) {
        minutes = "0" + minutesCounter;
      } else minutes = minutesCounter;

    
      time = minutes + ":" + seconds + " min."
     document.getElementById("clock").textContent = time;
  }, 1000)

}

function turnLeft(roverName){
  console.log("turnLeft was called!");
  switch (roverName.direction) {
    case "N": 
    roverName.direction = "W";
    roverName.rotation = 180;
    break;
    case "W": 
    roverName.direction = "S";
    roverName.rotation = 90;
    break;
    case "E": 
    roverName.direction = "N";
    roverName.rotation = 270;
    break;
    case "S": 
    roverName.direction = "E";
    roverName.rotation = 0;
    break;
    default: 
    console.log ("Incorrect directions"); 
    break;
  }
  if (roverName == rover) 
  imgRover[roverName.y][roverName.x].style.transform = 'rotate(' + roverName.rotation + 'deg)'; 
  else 
  divElement[roverName.arrayIndex].style.transform = 'rotate(' + roverName.rotation + 'deg)'  
}



function turnRight(roverName){
  console.log("turnRight was called!");
  switch (roverName.direction) {
    case "N": 
    roverName.direction = "E";
    roverName.rotation = 0;
    break;
    case "W": 
    roverName.direction = "N";
    roverName.rotation = 270;
    break;
    case "E": 
    roverName.direction = "S";
    roverName.rotation = 90;
    break;
    case "S": 
    roverName.direction = "W";
    roverName.rotation = 180;
    break;
    default: 
    console.log ("Incorrect directions");
    break;
  }
  if (roverName == rover)
  imgRover[roverName.y][roverName.x].style.transform = 'rotate(' + roverName.rotation + 'deg)';
  else 
  divElement[roverName.arrayIndex].style.transform = 'rotate(' + roverName.rotation + 'deg)'
}

function moveForward(roverName){
  console.log("moveForward was called")
  switch(roverName.direction) {

    case "N": 
      if ((roverName == rover) && !(roverName.y === 0) && isObstacle(roverName.y-1, roverName.x) === false){
      --roverName.y;
      imgRover[roverName.y][roverName.x].setAttribute("style", "visibility: visible");
      imgRover[roverName.y][roverName.x].style.transform = 'rotate(' + roverName.rotation + 'deg)'; 
      imgRover[roverName.y+1][roverName.x].setAttribute("style", "visibility: hidden");
      } else if (!(roverName.y === 0) && isObstacle(roverName.y-1, roverName.x) === false){
        divElement[roverName.arrayIndex].classList.remove("robotAI");
      --roverName.y;
      divElement[roverName.arrayIndex] = document.createElement("div"); 
      divElement[roverName.arrayIndex].classList.add("robotAI");
      divElement[roverName.arrayIndex].style.transform = 'rotate(' + roverName.rotation + 'deg)'
      document.getElementById("box"+roverName.y + roverName.x).appendChild(divElement[roverName.arrayIndex]);
    } 
    for (let i=0; i<robotAI.length; i++) {
    checkCollision(rover.x, rover.y, robotAI[i].x, robotAI[i].y);
    }
    break;  


    case "W":
    if ((roverName == rover) && !(roverName.x === 0) && isObstacle(roverName.y, roverName.x-1) === false) {
    --rover.x
    imgRover[roverName.y][roverName.x].setAttribute("style", "visibility: visible");
    imgRover[roverName.y][roverName.x].style.transform = 'rotate(' + roverName.rotation + 'deg)';
    imgRover[roverName.y][roverName.x+1].setAttribute("style", "visibility: hidden");
    }  else if (!(roverName.x === 0) && isObstacle(roverName.y, roverName.x-1) === false){
      divElement[roverName.arrayIndex].classList.remove("robotAI");
    --roverName.x;
    divElement[roverName.arrayIndex] = document.createElement("div"); 
    divElement[roverName.arrayIndex].classList.add("robotAI");
    divElement[roverName.arrayIndex].style.transform = 'rotate(' + roverName.rotation + 'deg)'
    document.getElementById("box"+roverName.y + roverName.x).appendChild(divElement[roverName.arrayIndex]);
    }  
    for (let i=0; i<robotAI.length; i++) {
    checkCollision(rover.x, rover.y, robotAI[i].x, robotAI[i].y);
    }
    break;
  

    case "E": 
    if ((roverName == rover) && !(roverName.x === 9) && (isObstacle(roverName.y, roverName.x+1) === false)) {
    ++rover.x;
    imgRover[roverName.y][roverName.x].setAttribute("style", "visibility: visible");
    imgRover[roverName.y][roverName.x].style.transform = 'rotate(' + roverName.rotation + 'deg)';  
    imgRover[roverName.y][roverName.x-1].setAttribute("style", "visibility: hidden");
    }  else if (!(roverName.x === 9) && isObstacle(roverName.y, roverName.x+1) === false){
      divElement[roverName.arrayIndex].classList.remove("robotAI");
    ++roverName.x;
    divElement[roverName.arrayIndex] = document.createElement("div"); 
    divElement[roverName.arrayIndex].classList.add("robotAI");
    divElement[roverName.arrayIndex].style.transform = 'rotate(' + roverName.rotation + 'deg)'
    document.getElementById("box"+roverName.y + roverName.x).appendChild(divElement[roverName.arrayIndex]);
    }  
    for (let i=0; i<robotAI.length; i++) {
    checkCollision(rover.x, rover.y, robotAI[i].x, robotAI[i].y);
    }
    break;
  

    case "S": 
    if ((roverName == rover) && !(roverName.y === 9) && isObstacle(roverName.y+1, roverName.x) === false) {
    ++rover.y;
    imgRover[roverName.y][roverName.x].setAttribute("style", "visibility: visible");
    imgRover[roverName.y][roverName.x].style.transform = 'rotate(' + roverName.rotation + 'deg)'; 
    imgRover[roverName.y-1][roverName.x].setAttribute("style", "visibility: hidden");
    } else if (!(roverName.y === 9) && isObstacle(roverName.y+1, roverName.x) === false){
      divElement[roverName.arrayIndex].classList.remove("robotAI");
    ++roverName.y;
    divElement[roverName.arrayIndex] = document.createElement("div"); 
    divElement[roverName.arrayIndex].classList.add("robotAI");
    divElement[roverName.arrayIndex].style.transform = 'rotate(' + roverName.rotation + 'deg)'
    document.getElementById("box"+roverName.y + roverName.x).appendChild(divElement[roverName.arrayIndex]);
    }      
    for (let i=0; i<robotAI.length; i++) {
    checkCollision(rover.x, rover.y, robotAI[i].x, robotAI[i].y);
    }
    break;
    
    default: console.log ("Incorrect directions");
    break;
  }
  //adding the coordinates into the array travelLog
  roverName.travelLog.push(roverName.x);
  roverName.travelLog.push(roverName.y);
}


function moveBackward(roverName){
  console.log("moveBackward was called")
  switch(roverName.direction) {

    case "N": 
    if ((roverName == rover) && !(roverName.y === 9) && isObstacle(roverName.y+1, roverName.x) === false){
    ++roverName.y;
    imgRover[roverName.y][roverName.x].setAttribute("style", "visibility: visible");
    imgRover[roverName.y][roverName.x].style.transform = 'rotate(' + roverName.rotation + 'deg)'; 
    imgRover[roverName.y-1][roverName.x].setAttribute("style", "visibility: hidden");
    } else if (!(roverName.y === 9) && isObstacle(roverName.y+1, roverName.x) === false){
      divElement[roverName.arrayIndex].classList.remove("robotAI");
    ++roverName.y;
    divElement[roverName.arrayIndex] = document.createElement("div"); 
    divElement[roverName.arrayIndex].classList.add("robotAI");
    divElement[roverName.arrayIndex].style.transform = 'rotate(' + roverName.rotation + 'deg)'
    document.getElementById("box"+roverName.y + roverName.x).appendChild(divElement[roverName.arrayIndex]);
    }  
    for (let i=0; i<robotAI.length; i++) {
    checkCollision(rover.x, rover.y, robotAI[i].x, robotAI[i].y);
    }
    break;

    case "W":
    if ((roverName == rover) && !(rover.x === 9) && isObstacle(roverName.y, roverName.x+1) === false) {
    ++rover.x
    imgRover[roverName.y][roverName.x].setAttribute("style", "visibility: visible");
    imgRover[roverName.y][roverName.x].style.transform = 'rotate(' + roverName.rotation + 'deg)';
    imgRover[roverName.y][roverName.x-1].setAttribute("style", "visibility: hidden");
    }  else if (!(roverName.x === 9) && isObstacle(roverName.y, roverName.x+1) === false){
      divElement[roverName.arrayIndex].classList.remove("robotAI");
    ++roverName.x;
    divElement[roverName.arrayIndex] = document.createElement("div"); 
    divElement[roverName.arrayIndex].classList.add("robotAI");
    divElement[roverName.arrayIndex].style.transform = 'rotate(' + roverName.rotation + 'deg)'
    document.getElementById("box"+roverName.y + roverName.x).appendChild(divElement[roverName.arrayIndex]);
    }  
    for (let i=0; i<robotAI.length; i++) {
    checkCollision(rover.x, rover.y, robotAI[i].x, robotAI[i].y);
    }
    break;

    case "E": 
    if ((roverName == rover) && !(roverName.x === 0) && isObstacle(roverName.y, roverName.x-1) === false) {
    --rover.x;
    imgRover[roverName.y][roverName.x].setAttribute("style", "visibility: visible");
    imgRover[roverName.y][roverName.x].style.transform = 'rotate(' + roverName.rotation + 'deg)';  
    imgRover[roverName.y][roverName.x+1].setAttribute("style", "visibility: hidden");
    }  else if (!(roverName.x === 0) && isObstacle(roverName.y, roverName.x-1) === false){
      divElement[roverName.arrayIndex].classList.remove("robotAI");
    --roverName.x;
    divElement[roverName.arrayIndex] = document.createElement("div"); 
    divElement[roverName.arrayIndex].classList.add("robotAI");
    divElement[roverName.arrayIndex].style.transform = 'rotate(' + roverName.rotation + 'deg)'
    document.getElementById("box"+roverName.y + roverName.x).appendChild(divElement[roverName.arrayIndex]);
    }  
    for (let i=0; i<robotAI.length; i++) {
    checkCollision(rover.x, rover.y, robotAI[i].x, robotAI[i].y);
    }
    break;

    case "S": 
    if ((roverName == rover) && !(roverName.y === 0) && isObstacle(roverName.y-1, roverName.x) === false) {
    --roverName.y;
    imgRover[roverName.y][roverName.x].setAttribute("style", "visibility: visible");
    imgRover[roverName.y][roverName.x].style.transform = 'rotate(' + roverName.rotation + 'deg)'; 
    imgRover[roverName.y+1][roverName.x].setAttribute("style", "visibility: hidden");
    }  else if (!(roverName.y === 0) && isObstacle(roverName.y-1, roverName.x) === false){
      divElement[roverName.arrayIndex].classList.remove("robotAI");
    --roverName.y;
    divElement[roverName.arrayIndex] = document.createElement("div"); 
    divElement[roverName.arrayIndex].classList.add("robotAI");
    divElement[roverName.arrayIndex].style.transform = 'rotate(' + roverName.rotation + 'deg)'
    document.getElementById("box"+roverName.y + roverName.x).appendChild(divElement[roverName.arrayIndex]);
    }  
    for (let i=0; i<robotAI.length; i++) {
    checkCollision(rover.x, rover.y, robotAI[i].x, robotAI[i].y);
    }
    break;
    default: console.log ("Incorrect directions");
    break;
  }
  //adding the coordinates into the array travelLog
  roverName.travelLog.push(roverName.x);
  roverName.travelLog.push(roverName.y);
}



function movementAI (commands, roverName) {
if (roverName != rover) {
  commands = randomMoves();
}
let isValidLetter = true;

  for (let k=0; k<commands.length; k++) {
    if (!(commands[k].includes("f")) && !(commands[k].includes("l")) && !(commands[k].includes("r")) && !(commands[k].includes("b"))) {
      console.log ("Wrong Input, please enter a valid letter");
      isValidLetter = false;
    } 
  }

  if (isValidLetter) {
    for (let i= 0; i<commands.length; i++) {
      switch (commands[i]) {
        case "f": moveForward(roverName);
        break;
        case "l": turnLeft(roverName);
        break;
        case "r": turnRight(roverName);
        break;    
        case "b": moveBackward(roverName);
        break;
      }
    }
  }
}

function addobstacles(numberofObstacles) {
let obstacle;
  for (let i=0; i<numberofObstacles*2; i+=2) {
    obstacleLocation[i] = Math.floor(Math.random()*10);
    obstacleLocation[i+1] = Math.floor(Math.random()*10);
    obstacle = document.createElement("img");
    obstacle.setAttribute("src", "file:///Users/matt/Desktop/WebDeveloping/Ironhack/mars-rover/images/wall.jpeg");
    obstacle.setAttribute("width", "50%");
    document.getElementById("box"+obstacleLocation[i] + obstacleLocation[i+1]).appendChild(obstacle);
  }
}

function isObstacle(column, row){
  for (let i=0; i<obstacleLocation.length; i++) {
    if ((obstacleLocation[i] === column) && (obstacleLocation[i+1] === row)) {
      return true;
    } else i++;
  }
  return false;
}

function randomMoves() {
  let randomNumber;
  let commandString=""; 

  randomNumber = Math.floor(Math.random()*6)+1;
  switch (randomNumber) {
    case 1: commandString = "l"; break;
    case 2: commandString = "r"; break;
    case 3: commandString = "f"; break;
    case 4: commandString = "b"; break;
    case 5: commandString = "f"; break;
    case 6: commandString = "b"; break;
  }
 return commandString; 
} 

function addRobotAI (numberOfRobots) {
let x, y;
  for (let i=0; i< numberOfRobots; i++) {
    x = Math.floor(Math.random()*10)
    y = Math.floor(Math.random()*10)
    robotAI[i] = {
      direction: "E",
      x: x,
      y: y,
      rotation: 0,
      travelLog: [x,y],
      arrayIndex: i
    }
  divElement[i] = document.createElement("div"); 
  divElement[i].classList.add("robotAI");
  document.getElementById("box"+robotAI[i].y + robotAI[i].x).appendChild(divElement[i]);
}
}


function checkCollision(roverName1X, roverName1Y, roverName2X, roverName2Y) {
  if ((roverName1X === roverName2X) && (roverName1Y === roverName2Y)) {
      alert("YOU LOST! You survived " + time)
      window.location.reload();
      return true;
  }
  return false;
}


