import {Routes,Route} from 'react-router-dom'

import PokeDetails from './PokeDetails';
const Container = () => {
    
  return (
    <Routes >
        <Route path='/' element={<PokeDetails/>}> </Route>
        <Route path='/:id' element={<PokeDetails/>}> </Route>

    </Routes>
   
  );
};

export default Container;
