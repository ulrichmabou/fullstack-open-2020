import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const AnAnecdote = ( { title, selected, votes }) => {
  return (
    <div>
      <h1>{title}</h1>
      {selected}
      <p>has {votes} votes</p>
    </div>
  )
}

const Button = ({ handleClick, text}) => {
return <button onClick={handleClick}>{text}</button>
}

const App = ({ anecdotes }) => {
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(anecdotes.map(elem => 0))
  const [mostVotes, setMostVotes] = useState(0)

  const handleSelected = () => setSelected(Math.floor(Math.random() * 6))

  const handleVote = (selected) => () => {
    const copyOfVotes = { ...votes}
    copyOfVotes[selected] += 1
    if (copyOfVotes[selected] > copyOfVotes[mostVotes]) {
      setMostVotes(selected)
    }
    setVotes(copyOfVotes)
  }

  return (
    <>
      <AnAnecdote title={'Anecdote of the day'} selected={anecdotes[selected]} votes={votes[selected]} />
      <Button handleClick={handleVote(selected)} text={'vote'} />
      <Button handleClick={handleSelected} text={'next anectdote'} />
      <AnAnecdote title={'Anecdote with most votes'} selected={anecdotes[mostVotes]} votes={votes[mostVotes]} />
    </>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)
