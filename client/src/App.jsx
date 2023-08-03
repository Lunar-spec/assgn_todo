import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import TodoList from './components/TodoList'
import Form from './components/Form'
import Navbar from './components/Navbar/Navbar'
import NotFound from './components/NotFound/NotFound'

function App() {
  return (
    <BrowserRouter>
      <header>
        <Navbar/>
      </header>
      <main>
        <Routes>
          <Route path='/' element={<TodoList />} />
          <Route path='/form' element={<Form />} />
          <Route path='/*' element={<NotFound />} />
        </Routes>
      </main>
    </BrowserRouter>
  )
}

export default App
