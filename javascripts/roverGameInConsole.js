
let rover = {
  direction: "N",
  x: 0,
  y: 0,
  travelLog: [0,0]
}


console.log(shortCommands("rffrbbflfrff"));



function turnLeft(roverDirection){
  console.log("turnLeft was called!");
  switch (roverDirection) {
    case "N": 
    rover.direction = "W";
    break;
    case "W": rover.direction = "S";
    break;
    case "E": rover.direction = "N";
    break;
    case "S": rover.direction = "E";
    break;
    default: 
    console.log ("Incorrect directions"); 
    rover.direction = "N"
    break;
  }
}

function turnRight(roverDirection){
  console.log("turnRight was called!");
  switch (roverDirection) {
    case "N": rover.direction = "E";
    break;
    case "W": rover.direction = "N";
    break;
    case "E": rover.direction = "S";
    break;
    case "S": rover.direction = "W";
    break;
    default: 
    console.log ("Incorrect directions");
    rover.direction = "N"
    break;
  }
}

function moveForward(roverDirection){
  console.log("moveForward was called")
  switch(roverDirection) {
    case "N": --rover.y;
    break;
    case "W": --rover.x
    break;
    case "E": ++rover.x;
    break;
    case "S": ++rover.y;
    break;
    default: console.log ("Incorrect directions");
    break;
  }
  //adding the coordinates into the array travelLog
  rover.travelLog.push(rover.x);
  rover.travelLog.push(rover.y);
}


function moveBackward(roverDirection){
  console.log("moveBackward was called")
  switch(roverDirection) {
    case "N": ++rover.y;
    break;
    case "W": ++rover.x
    break;
    case "E": --rover.x;
    break;
    case "S": --rover.y;
    break;
    default: console.log ("Incorrect directions");
    break;
  }
  //adding the coordinates into the array travelLog
  rover.travelLog.push(rover.x);
  rover.travelLog.push(rover.y);
}



function shortCommands (commands) {

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
        case "f": moveForward(rover.direction);
        break;
        case "l": turnLeft(rover.direction);
        break;
        case "r": turnRight(rover.direction);
        break;    
        case "b": moveBackward(rover.direction);
        break;
      }
    }
  }
  for (let j=0; j<rover.travelLog.length; j+=2) {
    console.log("X: "+ rover.travelLog[j] + " Y: " + rover.travelLog[j+1])
  } 
}

