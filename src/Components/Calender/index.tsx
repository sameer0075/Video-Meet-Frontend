import React, { useEffect } from "react";
import { Row, Col } from "antd";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import { useDispatch, useSelector } from "react-redux";
import CustomModel from "../../Shared/Model";
import CustomForm from "../../Shared/Form";
import "../../Shared/CSS/index.css";
import "./index.css";
import { CalenderState } from "./states";
import { GetEvents } from "../../redux/Slices/Calender/calender.slice";

const Calender: React.FC = () => {
	const dispatch: any = useDispatch();
	const calender = useSelector((state:any) => state.calender);
	const calendarStyle = {
		height: "80%", // Set the calendar height to 100% of its container
		width: "80%", // Set the calendar width to 100% of its container
		marginBottom: "5rem",
	};

	useEffect(()=>{
		dispatch(GetEvents())
	},[])

	const events = calender.events.map((info:any)=>{
		const {custom_date,...rest} = info
		return {
			start:custom_date,
			...rest
		}
	})

	const {
		open,
		CalenderInputProps,
		handleSubmit,
		handleOpen,
		handleEventClick,
		handleClose,
	} = CalenderState();

	return (
		<Row
			justify="center"
			align="middle"
			style={{
				minHeight: "100vh",
				backgroundImage: 'url("/assets/images/background/background-1.jpeg")',
				backgroundSize: "cover",
				paddingTop: 20,
			}}
		>
			<Col style={calendarStyle}>
				<FullCalendar
					plugins={[dayGridPlugin]}
					initialView="dayGridMonth"
					dayCellContent={(arg) => {
						// This function allows you to customize the content of each day cell
						// You can add custom CSS styles to change the background color
						const cellStyle = {
							color: "#000000", // Set the text color of day cells
						};
						return (
							<div className="fc-daygrid-day" style={cellStyle}>
								{arg.dayNumberText}
							</div>
						);
					}}
					events={events}
					eventColor="green"
					customButtons={{
						customButton1: {
							text: "Create Event", // The text displayed on the button
							click: handleOpen, // The function called when the button is clicked
						},
					}}
					eventClick={handleEventClick}
					headerToolbar={{
						left: "prev,next today",
						center: "title",
						right: "customButton1", // Add the custom buttons to the right side of the header
					}}
				/>
				{
					<CustomModel
						title="Create Event"
						open={open}
						handleClose={handleClose}
						handleSubmit={handleSubmit}
					>
						<CustomForm inputProps={CalenderInputProps} />
					</CustomModel>
				}
			</Col>
		</Row>
	);
};

export default Calender;
