import { Outlet, Route, Routes } from 'react-router-dom';
import Main from './router/Main/Main';
import styled from 'styled-components';
import Login from './router/auth/Login';
import Header from './Layout/Header';

const Grid = styled.div`
  display: grid;
  grid-template-columns: 85px 1fr;
`;

const Layout = styled.div`
  padding: 25px;
  overflow: auto;
  height: 100vh;
  box-sizing: border-box;
`;

function App() {

  return (
    <div className="App">
      <Routes>
        <Route path='/login' element={<Login/>} />
        <Route path='/' element={
          <Grid>
            <Header/>
            <Layout>
              <Outlet/>
            </Layout>
          </Grid>
        }>
          <Route index element={<Main/>}/>
        </Route>
      </Routes>
    </div>
  );
  
}

export default App;
