import React from 'react'

import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

import OtherPage from './OtherPage'
import Fib from './Fib'

function App() {
  return (
    <Router>
      <div>
        <header>
          <Link to="/Home">Home</Link>
          <Link to="/otherpage">Other Page</Link>
        </header>

        <h1>Hello from k8s!</h1>

        <div>
          <Route exact path="/" component={Fib} />
          <Route path="/otherpage" component={OtherPage} />
        </div>
      </div>
    </Router>
  )
}

export default App
