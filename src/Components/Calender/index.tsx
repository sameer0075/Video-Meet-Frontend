import React, { useState } from 'react';
import { Row, Col } from 'antd';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import CustomModel from '../../Shared/Model';
import CustomForm from '../../Shared/Form';
import { DropDownOptions } from '../../Shared/Form/interface';
import '../../Shared/CSS/index.css'
import './index.css'


const Calender: React.FC = () => {
    const [open,setOpen] = useState<boolean> (false)
    const [title,setTitle] = useState<string> ('')
    const [description,setDescription] = useState<string> ('')
    const [custom_date,setCustomDate] = useState<Date | null> (null)
    const [notification_alert_type,setType] = useState<DropDownOptions> ({label:'Minutes',value:'minutes'})
    const [notification_alert_time,setTime] = useState<number> (15)
    
    const calendarStyle = {
        height: '80%', // Set the calendar height to 100% of its container
        width: '80%', // Set the calendar width to 100% of its container
        marginBottom:'5rem',
    };

    const handleChange = (setState:Function) => (event:React.ChangeEvent<HTMLInputElement>) => {
        setState(event.target.value)
    }

    const CalenderInputProps = [
        {
            name:"Title",
            label:"Title",
            rules:[{ required: true, message: 'Please input your Title!' }],
            placeholder:'Enter Title',
            type:"text",
            stateName:'title',
            value:title,
            formType:'input',
            onChange:handleChange(setTitle)
        },
        {
            name:"Description",
            label:"Description",
            rules:[{ required: false }],
            placeholder:'Enter Description',
            type:"text",
            stateName:'description',
            value:description,
            formType:'input',
            onChange:handleChange(setDescription)
        },
        {
            name:"custom_date",
            label:"Event Date",
            rules:[{ required: false }],
            placeholder:'Select Date',
            type:"datetime-local",
            stateName:'custom_date',
            value:custom_date,
            formType:'input',
            onChange:handleChange(setCustomDate)
        },
        {
            name:"notification_alert_type",
            label:"Pre Notification Type",
            rules:[{ required: false }],
            placeholder:'Select Type',
            type:"string",
            stateName:'notification_alert_type',
            value:notification_alert_type,
            formType:'dropdown',
            options:[{ value: 'minutes', label: 'Minutes' },{ value: 'days', label: 'Days' },{ value: 'months', label: 'Months' }],
            onChange:handleChange(setType)
        },
        {
            name:"notification_alert_time",
            label:"Pre Notification Time",
            rules:[{ required: false }],
            placeholder:'Select Time',
            type:"number",
            stateName:'notification_alert_time',
            value:notification_alert_time,
            formType:'input',
            onChange:handleChange(setTime)
        }
    ]

    const handleClose = () => {
        setOpen(false)
    }

    const handleEventClick = (info:any) => {
        console.log('Event clicked:', info.event);
        setOpen(true);
    };

    const handleOpen = () => {
        setOpen(true);
    };

    const handleSubmit = (data:any) => {
        console.log('')
    }

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
            events={[
                // Add your events here
                {
                  title: 'Event 1',
                  start: '2023-07-10',
                },
                {
                  title: 'Event 2',
                  start: '2023-07-15',
                },
              ]}
              eventColor='green'
              customButtons={{ customButton1: {
                text: 'Create Event', // The text displayed on the button
                click: handleOpen, // The function called when the button is clicked
              }, }}
              eventClick={handleEventClick}
              headerToolbar={{
                left: 'prev,next today',
                center: 'title',
                right: 'customButton1', // Add the custom buttons to the right side of the header
            }}
        />
        {
            <CustomModel title="Create Event" open={open} handleClose={handleClose} handleSubmit={handleSubmit}>
                <CustomForm inputProps={CalenderInputProps} />
            </CustomModel>
        }
      </Col>
    </Row>
  );
};

export default Calender;
