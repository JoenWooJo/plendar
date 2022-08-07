import React from 'react';
import { useRoutes } from 'react-router';
import Main from './component/Main';
import Mypage from './component/user/Mypage';
import Calendar from './component/calendar/Calendar';
import FileSharing from './component/fileSharing/FileSharing';
import Kanban from './component/kanbanboard/Kanban';
import Myproject from './component/project/Myproject';
import Login from './pages/Login';
import Join from './pages/Join';
import ForgotPassword from './pages/ForgotPassword';

const App= () => (
  
  useRoutes([
    {path: '/', element: <Main />},

    {path: '/login', element: <Login />},
    {path: '/join', element: <Join />},
    {path: '/forgotpw', element: <ForgotPassword/>},
    {path: '/component', element: <Main />},
    {path: 'user/mypage', element: <Mypage />},
    {path: 'calendar/calendar', element: <Calendar />},
    {path: 'fileSharing/fileSharing', element: <FileSharing />},
    {path: 'kanbanboard/kanban', element: <Kanban />},
    {path: 'project/myproject', element: <Myproject />},
  ])

);

export default App;
