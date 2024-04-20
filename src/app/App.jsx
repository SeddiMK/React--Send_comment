import './Null.scss';
import './App.scss';
import useScript from '../hooks/useScript';
import { Route, Routes } from 'react-router-dom';

// pages
import Layout from '../containers/layout/Layout';
import Main from '../components/main/Main';
import Contacts from '../pages/contacts/Contacts';
import LoginUserCabinet from '../pages/loginUserCabinet/LoginUserCabinet';
import Login from '../pages/login/Login';
import Error from '../pages/error/Error';

const App = () => {
  // useScript('./particles.js');

  return (
    <>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Main />} />
          <Route path="contacts" element={<Contacts />} />
          <Route path="login" element={<Login />} />
          <Route path="*" element={<Error />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;