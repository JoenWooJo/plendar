import React from 'react';
import { useRoutes } from 'react-router';

import Main from './component/Main';
import Mypage from './component/user/Mypage';
import MypageChecked from './component/user/MypageChecked';
import Calendar from './component/calendar/Calendar';
import FileSharing from './component/fileSharing/FileSharing';
import Myproject from './component/project/Myproject';
import Login from './pages/Login';
import Join from './pages/Join';
import ForgotPassword from './pages/ForgotPassword';
import CreateProject from './component/project/CreateProject';
import UpdateProject from './component/project/UpdateProject';

import Chat from './component/chat/Chat';
import CompletePage from './component/project/CompletePage';
import PersonalCalendar from './component/calendar/PersonalCalendar';

const App= () => (
  
  useRoutes([
    {path: '/', element: <Main />},
    {path: '/login', element: <Login />},
    {path: '/join', element: <Join />},
    {path: '/forgotpw', element: <ForgotPassword/>},
    {path: '/component', element: <Main />},                                                                                                                                                                                                                                 
    {path: '/user/mypage', element: <Mypage />},
    {path: '/user/mypagechecked', element: <MypageChecked />},
    {path: '/calendar/team', element: <Calendar />},
    {path: '/calendar/Personal', element: <PersonalCalendar />},
    {path: '/fileSharing/fileSharing', element: <FileSharing />},
    {path: '/project/myproject', element: <Myproject />},
    {path: '/project/createProject', element: <CreateProject />},
    {path: '/project/updateProject', element: <UpdateProject />},
    {path: '/project/completepage', element: <CompletePage />},   
    {path: '/chat', element: <Chat />}    
  ])

);

export default App;
