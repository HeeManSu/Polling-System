import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import CreatePoll from './Components/CreatePoll'
import { Toaster } from 'react-hot-toast'
import { PollTrends } from './Components/PollTrends'


function App() {

  return (
    <>

      <Router>
        <Routes>
          <Route path='/' element={<CreatePoll />} />
          <Route path='/trends' element={<PollTrends />} />

        </Routes>
        

        <Toaster />

      </Router>
    </>

  )
}

export default App
