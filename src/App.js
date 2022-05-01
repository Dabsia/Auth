import { Routes, Route } from 'react-router-dom';

import  {useContext} from 'react'

import Layout from './components/Layout/Layout';
import UserProfile from './components/Profile/UserProfile';
import AuthPage from './pages/AuthPage';
import NotFound from './pages/NotFound';
import HomePage from './pages/HomePage';
import AuthContext from './store/auth-context';

const App = () => {

  const authCtx = useContext(AuthContext)

  return (
    <Layout>
      <Routes>
        <Route path='/' exact element = {<HomePage />}/>
        { !authCtx.isLoggedIn && <Route path='/auth'  element = { <AuthPage />}/>}
        { authCtx.isLoggedIn && <Route path= '/profile'  element = {<UserProfile />}/>}
        <Route path = '*' element = {<NotFound/>} />
      </Routes>
    </Layout>
  );
}

export default App;
