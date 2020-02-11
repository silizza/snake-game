import React, {useState, useEffect} from 'react';
import Food from './Food';
import Snake from './Snake';


export default function Game({addHighScore, smallestScore, enlarge}) {

  console.log(smallestScore);
  const getRandomCoords = () => {
    let x = Math.floor(Math.random() * 50) * 2;
    let y = Math.floor(Math.random() * 50) * 2;
    return [x, y];
  }

  const initialSnakeFractions = [
    [0, 0], 
    [2, 0], 
    [4, 0]
  ];

  const [foodCoords, setFoodCoords] = useState(getRandomCoords());
  const [snakeFractions, setSnakeFractions] = useState(initialSnakeFractions);
  const [snakeDirection, setSnakeDirecion] = useState('RIGHT');
  const [speed, setSpeed] = useState(300)

  useEffect(() => {

    document.onkeydown = onKeyDown;
    let timer = setInterval(moveSnake, speed);    
    checkIfEatFood();

    return (() => {
      clearInterval(timer);
      document.removeEventListener('keydown', onKeyDown);
    }
  )
})

  const onKeyDown = e => {
    switch (e.code) {

      case "ArrowRight": 
        setSnakeDirecion('RIGHT');
        break;
      case "ArrowLeft": 
        setSnakeDirecion('LEFT');
        break;
      case "ArrowUp": 
        setSnakeDirecion('UP');
        break;
      case "ArrowDown": 
        setSnakeDirecion('DOWN');
        break;
    }
  }

  const moveSnake = () => {

    let headX = snakeFractions[snakeFractions.length - 1][0];
    let headY = snakeFractions[snakeFractions.length - 1][1];
    
    let newSnake = [...snakeFractions];
    
    switch (snakeDirection) {      

      case "RIGHT":        
          newSnake.push([headX + 2, headY]);
          newSnake.shift();
          break;
      case "LEFT":       
          newSnake.push([headX - 2, headY]);
          newSnake.shift();        
          break;
      case "DOWN":        
          newSnake.push([headX, headY + 2]);
          newSnake.shift();        
          break;
      case "UP":        
          newSnake.push([headX, headY - 2]);
          newSnake.shift();        
          break;        
    }      
    

    if (checkIfBump(newSnake)) {
      onGameOver();
      return;
    }

    setSnakeFractions(newSnake);     
  }

  const checkIfBump = (newSnake) => {  

    const x = newSnake[newSnake.length - 1][0];
    const y = newSnake[newSnake.length - 1][1];

    //out of borders
    if (x < 0 || x >= 100 || y < 0 || y >= 100) {
      return true;
    } 

    let snake = [...newSnake];
    snake.pop();
    
    //bump into itself
    for (let fraction of snake) {
      if (fraction[0] == x && fraction[1] == y) {
        return true;
      }
    }

    return false;
  }

  const onGameOver = () => {
      
    if(snakeFractions.length > smallestScore) {

      let name = prompt(`Game over! Congratulations! You have high score: ${snakeFractions.length}. Enter your name`, '');
      if (name) {
        addHighScore(name, snakeFractions.length);
      }
    } else {
      alert(`Game over! Snake length: ${snakeFractions.length}`)
    }
      setSnakeFractions(initialSnakeFractions);
      setSnakeDirecion('RIGHT');
      setSpeed(300);
      setFoodCoords(getRandomCoords());
      enlarge(3);
  }

  const checkIfEatFood = () => {

    let newSnake = [...snakeFractions]
    let headX = snakeFractions[snakeFractions.length - 1][0];
    let headY = snakeFractions[snakeFractions.length - 1][1];

    if(headX == foodCoords[0] && headY == foodCoords[1]) {
      newSnake.unshift([101, 100]);
      setSnakeFractions(newSnake);
      setFoodCoords(getRandomCoords());
      accelerate();
      enlarge(newSnake.length);
    }
  }

  const accelerate = () => {
    if (speed > 10) {
      setSpeed(prev => prev - 10);
    }    
  }

  return (
    <div className="game-area">
      <Food coords={foodCoords} />
      <Snake fractions={snakeFractions} />
    </div>
  );
}