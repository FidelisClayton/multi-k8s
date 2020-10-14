import React, { useEffect, useState } from 'react'
import axios from 'axios'

const getValues = async () => {
  const { data } = await axios.get('/api/values/current')

  return data || {}
}

const getIndexes = async () => {
  const { data } = await axios.get('/api/values/all')

  return data || []
}

const postIndex = (index) => {
  return axios.post('/api/values', { index })
}

const Fib = () => {
  const [seenIndexes, setSeenIndexes] = useState([])
  const [values, setValues] = useState({})
  const [index, setIndex] = useState('')

  const renderSeenIndexes = () => {
    return seenIndexes.map(({ number }) => number).join(', ')
  }

  const renderValues = () => {
    return Object.keys(values).map((key) => (
      <div key={key}>
        For index {key} I calculated {values[key]}
      </div>
    ))
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    postIndex(index)
      .then(() => setIndex(''))
  }

  const handleIndexChange = (event) => setIndex(event.target.value)

  useEffect(() => {
    getValues().then(setValues)
    getIndexes().then(setSeenIndexes)
  }, [setValues, setSeenIndexes])

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Enter your index:</label>
        <input value={index} onChange={handleIndexChange} />
        <button>Submit</button>
      </form>

      <h3>Indexes I have seen:</h3>

      {renderSeenIndexes()}

      <h3>Calculated Values:</h3>

      {renderValues()}
    </div>
  )
}

export default Fib
