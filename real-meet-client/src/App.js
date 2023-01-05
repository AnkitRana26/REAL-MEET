import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Room from './pages/Room';
import { SocketProvider } from './providers/Socket';

function App() {
  return (
    <div className="App">
      <SocketProvider>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/room/:roomId' element={<Room />} />
        </Routes>
      </SocketProvider>
    </div>
  );
}

export default App;
