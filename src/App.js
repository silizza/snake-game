import React, {useState, useEffect} from 'react';
import Game from './Game';


export default function App() {    
  //localStorage.clear();
  const [highScores, setHighScores] = useState('');  
  const [smallestScore, setSmallestScore] = useState(0);  
  const [currentLength, setCurrentLength] = useState(3);
  const [highScoresList, setHighScoresList] = useState('');
  
  useEffect(() => {
    if(localStorage.highScores) {
      updateHighScores();
    }
  }, [])

  const changeLength = (number) => {
    setCurrentLength(number);
  }

  const addHighScore = (name, number) => {

    let scores = highScores ? highScores.split(',') : [];    

    scores.push(`${number}_${name}`);
    scores.sort((score1, score2) => parseInt(score2) - parseInt(score1));

    if (scores.length > 5) {
      scores.pop();
    }

    const scoresStr = scores.join(',');

    localStorage.setItem('highScores', scoresStr);

    updateHighScores();   
  } 

  const updateHighScores = () => {

    console.log(localStorage.highScores)
    
    let scores = localStorage.highScores.split(',');
    
    let listOfScores = scores.map(score => {
      let result = score.split('_');
      return (<div key={scores.indexOf(score)} className="flex-container">
                <span>{result[1]}</span>
                <span>{result[0]}</span>
              </div>);
    });

    setHighScoresList(listOfScores);

    let smallest = (scores.length < 5) ? 0 : parseInt(scores[scores.length - 1]);
    
    setHighScores(localStorage.highScores);
    setSmallestScore(smallest);    
  }

  return (
    <div className="App">
      <div className="statistics">
        <h3>Current score</h3>
        <div className="flex-container">
          <span>Snake length</span>
          <span>{currentLength}</span>
        </div>
      </div>
      <Game
        addHighScore={addHighScore}
        smallestScore={smallestScore}
        enlarge={changeLength}
      />
      <div className="statistics">
        <h3>High scores</h3>
        {highScoresList}
      </div>
    </div>
  );
}

