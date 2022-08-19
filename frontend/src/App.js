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
import CreateProject from './component/project/CreateProject';
import Chat from './component/chat/Chat';
import Complete from './component/project/Complete';
import PersonalCalendar from './component/calendar/PersonalCalendar';

const App= () => (
  
  useRoutes([
    {path: '/', element: <Main />},
    {path: '/login', element: <Login />},
    {path: '/join', element: <Join />},
    {path: '/forgotpw', element: <ForgotPassword/>},
    {path: '/component', element: <Main />},                                                                                                                                                                                                                                 
    {path: '/user/mypage', element: <Mypage />},
    {path: '/calendar/team', element: <Calendar />},
    {path: '/calendar/Personal', element: <PersonalCalendar />},
    {path: '/fileSharing/fileSharing', element: <FileSharing />},
    {path: '/kanbanboard/kanban', element: <Kanban />},
    {path: '/project/myproject', element: <Myproject />},
    {path: '/project/createProject', element: <CreateProject />},
    {path: '/project/complete', element: <Complete />},   
    {path: '/chat', element: <Chat />}    
  ])

);

export default App;
