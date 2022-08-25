import React from 'react';
import axios from 'axios';

import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from "@fullcalendar/timegrid";
import googleCalendarPlugin from '@fullcalendar/google-calendar';
import SiteLayout from '../../layout/SiteLayout';
import { Link } from 'react-router-dom';

import "@fullcalendar/daygrid/main.css";
import "@fullcalendar/timegrid/main.css";

import '../../assets/css/calendar.css'

export default function TeamCalendar() {

  const no = localStorage.getItem("loginUserNo")
  console.log("User No: ", no)
  
    // 랜덤 컬러
    function getRandomColor() {
      return `hsl(${parseInt(Math.random() * 106, 10) * 15}, 100%, 77%)`;
    }

  // DB에서 이벤트(카드) 불러오기
  const callback = async() => {
    const client = axios.create({baseURL: '/api'})
    let response =  await client.get('/calendar/axios/team')
    let li = response.data.data;
    console.log("!!!!", response.data.data);

    for(let i=0; i < li.length; i++){
        li[i]['color'] = getRandomColor();
    }

    return response.data.data;
  }

  // 이벤트 클릭했을 때 실행
  const eventClick = () => {
    return console.log("Event Clicked")
  }

    return (
      <SiteLayout>
      <div className="col-xl-11 ml-4">
          <div className="btn-group btn-group-toggle" data-toggle="buttons">
              <label className="btn btn-secondary active">
                  <Link to ="/calendar/team" className='text-white' style={{ textDecoration: "none" }}> 팀 </Link>
              </label>
              <label className="btn btn-secondary">
                  <Link to="/calendar/personal " checked className='text-white' style={{ textDecoration: "none" }}> 개인 </Link>
              </label>
      </div>
      <div className="App">
        <FullCalendar
         // 헤더 버튼 설정
          headerToolbar={{
            left: "prevYear,prev,next,nextYear",
            center: "title",
            right: "today",
          }}
         // 타이틀 설정
          titleFormat={{year: 'numeric', month: 'long'}}
          height="800px"
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
          eventClick={eventClick}
      />
      </div>
      </div>
      </SiteLayout>
    );
}

