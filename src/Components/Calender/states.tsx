import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { AddEvent } from "../../redux/Slices/Calender/calender.slice";
import { CalenderRequestDto } from "../../redux/Slices/Calender/interface";

import { DropDownOptions } from "../../Shared/Form/interface";

export const CalenderState = () => {
	const [open, setOpen] = useState<boolean>(false);
	const [title, setTitle] = useState<string>("");
	const [description, setDescription] = useState<string>("");
	const [custom_date, setCustomDate] = useState<Date | null>(null);
	const [notification_alert_type, setType] = useState<DropDownOptions>({
		label: "Minutes",
		value: "minutes",
	});
	const [notification_alert_time, setTime] = useState<number>(15);
    const dispatch: any = useDispatch();

    const resetState = () => {
        setOpen(false)
        setTitle("")
        setDescription("")
        setCustomDate(null)
        setType({
            label: "Minutes",
            value: "minutes",
        })
        setTime(15)
    }

	const handleChange =
		(setState: React.Dispatch<React.SetStateAction<any>>) =>
		(event: React.ChangeEvent<HTMLInputElement>) => {
			setState(event.target.value);
		};

	const CalenderInputProps = [
		{
			name: "Title",
			label: "Title",
			rules: [{ required: true, message: "Please input your Title!" }],
			placeholder: "Enter Title",
			type: "text",
			stateName: "title",
			value: title,
			formType: "input",
			onChange: handleChange(setTitle),
		},
		{
			name: "Description",
			label: "Description",
			rules: [{ required: false }],
			placeholder: "Enter Description",
			type: "text",
			stateName: "description",
			value: description,
			formType: "input",
			onChange: handleChange(setDescription),
		},
		{
			name: "custom_date",
			label: "Event Date",
			rules: [{ required: false }],
			placeholder: "Select Date",
			type: "datetime-local",
			stateName: "custom_date",
			value: custom_date,
			formType: "input",
			onChange: handleChange(setCustomDate),
		},
		{
			name: "notification_alert_type",
			label: "Pre Notification Type",
			rules: [{ required: false }],
			placeholder: "Select Type",
			type: "string",
			stateName: "notification_alert_type",
			value: notification_alert_type,
			formType: "dropdown",
			options: [
				{ value: "minutes", label: "Minutes" },
				{ value: "days", label: "Days" },
				{ value: "months", label: "Months" },
			],
			onChange: handleChange(setType),
		},
		{
			name: "notification_alert_time",
			label: "Pre Notification Time",
			rules: [{ required: false }],
			placeholder: "Select Time",
			type: "number",
			stateName: "notification_alert_time",
			value: notification_alert_time,
			formType: "input",
			onChange: handleChange(setTime),
		},
	];

	const handleClose = () => {
		setOpen(false);
	};

	const handleEventClick = (info: any) => {
		console.log("Event clicked:", info.event);
		setOpen(true);
	};

	const handleOpen = () => {
		setOpen(true);
	};

	const handleSubmit = (data: any) => {
		const obj:CalenderRequestDto = {
            title,
            description,
            custom_date,
            notification_alert_type:notification_alert_type.value,
            notification_alert_time:Number(notification_alert_time),
            instant:custom_date ? false : true
        }
        dispatch(AddEvent(obj)).then((response:any)=>{
            if(response.payload) {
                resetState()
            }
        })
	};

	return {
		open,
		CalenderInputProps,
		handleSubmit,
		handleOpen,
		handleEventClick,
		handleClose,
	};
};
