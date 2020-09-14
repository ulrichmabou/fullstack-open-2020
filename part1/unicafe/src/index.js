import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Header = ({ text}) => (
<h1>{text}</h1>
)

const Button = (props) => (
  <button onClick={props.handleClick}>{props.text}</button>
) 

const Statistic = ({ title, value}) => {
  if (isNaN(value)) {
    return (
      <div>{title} : The app needs at least a review to compute</div>
    )
  } 
  else if (isNaN(value) === false && title === 'Positive') {
    return (
      <p>{title} : {value} %</p>
     )
  }
  else {
    return (
      <p>{title} : {value}</p>
     )
  }
}

const Statistics = ({ good, neutral, bad, total, average, positive}) => {
  if (total === 0) {
    return (
      <div>
        <Header text={'Statistics'} />
        <p> No feedback given </p>
      </div>
    )
  }

  return (
    <div>
      <Header text={'Statistics'} />
      <table>
        <thead>
          <tr>
            <td>
              <Statistic title={'Good'} value={good} />
            </td>
          </tr>
          <tr>
            <td>
              <Statistic title={'Neutral'} value={neutral} />
            </td>
          </tr>
          <tr>
            <td>
              <Statistic title={'Bad'} value={bad} />
            </td>
          </tr>
          <tr>
            <td>
              <Statistic title={'All'} value={total} />
            </td>
          </tr>
          <tr>
            <td>
              <Statistic title={'Average'} value={average} />
            </td>
          </tr>
          <tr>
            <td>
              <Statistic title={'Positive'} value={positive} />
            </td>
          </tr>
        </thead>
      </table>
    </div>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [total, setAll] = useState(0)
  const [totalScore, setTotalScore] = useState(0)

  const average = totalScore / total
  const positive = (good / total) * 100

  const handleGood = () => {
    setGood(good + 1)
    setAll(total + 1)
    setTotalScore(totalScore + 1)
  }
  const handleNeutral = () => {
    setNeutral(neutral + 1)
    setAll(total + 1)
    setTotalScore(totalScore)
  }
  const handleBad = () => {
    setBad(bad + 1)
    setAll(total + 1)
    setTotalScore(totalScore - 1)
  }

  return (
    <div>
      <Header text={'Give Feedback'} />
      <Button handleClick={handleGood} text={'Good'} />
      <Button handleClick={handleNeutral} text={'Neutral'} />
      <Button handleClick={handleBad} text={'Bad'} />
      <Statistics good={good} neutral={neutral} bad={bad} total={total} average={average} positive={positive}/>
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)