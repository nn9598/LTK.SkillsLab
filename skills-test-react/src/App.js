import * as React from 'react';
import Home from './pages/Home';
import Todo from './pages/Todo';
import { Route, Routes } from 'react-router-dom';

export default function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={ <Home/> } />
        <Route path="/todo" element={ <Todo/> } />
      </Routes>
    </div>
  );
}
