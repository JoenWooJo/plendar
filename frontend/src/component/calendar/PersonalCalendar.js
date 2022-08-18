import React from 'react';
import axios from 'axios';

import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from "@fullcalendar/timegrid";
import googleCalendarPlugin from '@fullcalendar/google-calendar';

import "@fullcalendar/daygrid/main.css";
import "@fullcalendar/timegrid/main.css";

import '../../assets/css/calendar.css'

export default function PersonalCalendar() {
  
    function getRandomColor() {
      return `hsl(${parseInt(Math.random() * 106, 10) * 15}, 100%, 77%)`;
    }

  //DB에서 이벤트(카드) 불러오기
  const callback = async() => {
    const client = axios.create({baseURL: '/api'})
    let response =  await client.get('/calendar/axios/personal')
    let li = response.data.data;
    console.log("!!!!", response.data.data);

    for(let i=0; i < li.length; i++){
        li[i]['color'] = getRandomColor();
    }

    return response.data.data;
  }

    return (
      <div className="App">
        <FullCalendar
         defaultView="dayGridMonth"
         // 헤더 버튼 설정
         headerToolbar={{
           left: "prevYear,prev,next,nextYear",
           center: "title",
           right: "today"
         }}
         // 타이틀 설정
         titleFormat={{year: 'numeric', month: 'long'}}
         // 달력 일칸 사이즈 비율 고정
         aspectRatio={"1.2"}
         plugins={[dayGridPlugin, timeGridPlugin, googleCalendarPlugin]}
         // 구글캘린더 API연동 - 공휴일
         googleCalendarApiKey = 'AIzaSyAuvMgG0oPVoDF-2iIbUZAhQIU8REcpzok'
         eventSources = {
            {
            googleCalendarId: 'ko.south_korea#holiday@group.v.calendar.google.com',
            className: '대한민국 공휴일', // an option!
            color: 'red',
            textColor: 'white'
            }
            
          }
          
          events={callback}
      />
      </div>
    );
}

