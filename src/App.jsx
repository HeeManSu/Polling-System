import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import CreatePoll from './Components/CreatePoll'


function App() {

  return (
    <Router>
      <Routes>
        <Route path='/' element={<CreatePoll />} />
      </Routes>
    </Router>


  )
}

export default App
