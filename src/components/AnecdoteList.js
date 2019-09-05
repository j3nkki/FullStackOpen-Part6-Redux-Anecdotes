import React from 'react'
import { addVote } from '../reducers/anecdoteReducer'
import {
  setNotification,
  removeNotification
} from '../reducers/notificationReducer'
import { connect } from 'react-redux'

const AnecdoteList = props => {
  const anecdotes = props.anecdotes

  const handleVote = anecdote => {
    props.addVote(anecdote.id)
    props.setNotification(`You voted for: ${anecdote.content}`)
    setTimeout(() => props.removeNotification(), 5000)
  }

  return (
    <div>
      {anecdotes
        .filter(anecdote =>
          anecdote.content.toLowerCase().includes(props.filter.toLowerCase())
        )
        .map(anecdote => (
          <div key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div>
              has {anecdote.votes}
              <button onClick={() => handleVote(anecdote)}>vote</button>
            </div>
          </div>
        ))}
    </div>
  )
}

const mapStateToProps = state => {
  return { anecdotes: state.anecdotes, filter: state.filter }
}

const mapDispatchToProps = {
  addVote,
  setNotification,
  removeNotification
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdoteList)