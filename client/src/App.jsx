import Authentication from './Pages/Authentication/Authentication'
import HomePage from './Pages/HomePage'
import Message from './Pages/Message'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<HomePage />} />
        <Route path="/message" element={<Message />} />
        <Route path="/*" element={<Authentication />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
