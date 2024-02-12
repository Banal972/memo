import { Outlet, Route, Routes } from 'react-router-dom';
import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { memoState, memoType } from './Atom/Memo';
import Main from './router/Main/Main';
import styled from 'styled-components';
import Login from './router/auth/Login';
import Header from './Layout/Header';
import axios from 'axios';

const Grid = styled.div`
  display: grid;
  grid-template-columns: 85px 1fr;
`;

const Layout = styled.div`
  height: 100vh;
  width: 100%;
  overflow: auto;
  .scroller {
    width: 100%;
    min-width: 1280px;
    height: 100%;
    padding: 25px;
    box-sizing: border-box;
    overflow-x: auto;
  }
`;


function App() {

  const setMemoData = useSetRecoilState(memoState);

  // API와 연동해서 memoState에 추가해줍니다.
  useEffect(()=>{
    const api = process.env.REACT_APP_AJAX_URL || "";
    if(api){
      axios.get(api)
      .then(({data} : {data : memoType[]})=>{
        setMemoData(prev=>
          [...prev,...data]
        );
      })
      .catch(e=>{
        // 에러가 발생했을때 실행해줍니다.
      })
    }
  },[setMemoData])

  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Login/>} />
        <Route path='/main' element={
          <Grid>
            <Header/>
            <Layout>
              <div className="scroller">
                <Outlet/>
              </div>
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
