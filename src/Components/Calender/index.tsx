import React from 'react';
import { Row, Col, Typography } from 'antd';
import '../../Global/css/index.css'
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import './index.css'
const { Title, Text } = Typography;

const Calender: React.FC = () => {
    const calendarStyle = {
        height: '80%', // Set the calendar height to 100% of its container
        width: '80%', // Set the calendar width to 100% of its container
        marginBottom:'5rem',
    };
  return (
    <Row justify="center" align="middle" style={{ minHeight: '100vh', backgroundImage: 'url("/assets/images/background/background-1.jpeg")', backgroundSize: 'cover',paddingTop:20 }}>
      <Col style={calendarStyle}>
        <FullCalendar
            plugins={[ dayGridPlugin ]}
            initialView="dayGridMonth"
            dayCellContent={(arg) => {
                // This function allows you to customize the content of each day cell
                // You can add custom CSS styles to change the background color
                const cellStyle = {
                  color: '#000000', // Set the text color of day cells
                };
                return (
                  <div className="fc-daygrid-day" style={cellStyle}>
                    {arg.dayNumberText}
                  </div>
                );
              }}
        />
      </Col>
    </Row>
  );
};

export default Calender;
