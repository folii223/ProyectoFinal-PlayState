import './App.css'
import {Route, Routes} from 'react-router-dom'
import { HomeScreen } from './routes/HomeScreen';
import { LibraryScreen } from './routes/LibraryScreen';
import { InfoScreen } from './routes/InfoScreen';
import { SearchScreen } from './routes/SearchScreen'
import  {NavBar} from './components/layout/NavBar'
import { Footer } from './components/layout/Footer'



// Componente padre que usa el componente hijo
function App() {
  return (
    <>
      <NavBar/>
        <main>
          <Routes>
            <Route path='/' element={<HomeScreen></HomeScreen>}></Route>
            <Route path='/search' element={<SearchScreen></SearchScreen>}></Route>
            <Route path='/Library' element={<LibraryScreen></LibraryScreen>}></Route>
            <Route path='/info/:id' element={<InfoScreen></InfoScreen>}></Route>
            <Route path='/*' element={<HomeScreen></HomeScreen>}></Route>
          </Routes>
        </main>
      <Footer/>
    </>
  );
}

export default App;