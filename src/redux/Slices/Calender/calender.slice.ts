import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../BaseClass/index";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { url } from "../../url";
import { CALENDER_ENDPOINTS } from "../../Endpoints";
import { CalenderRequestDto } from "./interface";

const initialState = {
	isLoading: <boolean>false,
	events:<any>[],
};

export const AddEvent = createAsyncThunk(
	"calender/create",
	async (data: CalenderRequestDto, thunkAPI) => {
		try {
			const resp = await api.post<CalenderRequestDto>(`${url}${CALENDER_ENDPOINTS.CREATE_EVENT}`, data);
			return resp;
		} catch (error: any) {
			return thunkAPI.rejectWithValue(error.response.data);
		}
	}
);

export const UpdateEvent = createAsyncThunk(
	"calender/update",
	async (data: CalenderRequestDto, thunkAPI) => {
		try {
			const resp = await api.put<CalenderRequestDto>(`${url}${CALENDER_ENDPOINTS.UPDATE_EVENT}${data.id}`, data);
			return resp;
		} catch (error: any) {
			return thunkAPI.rejectWithValue(error.response.data);
		}
	}
);

export const CancelEvent = createAsyncThunk(
	"calender/cancel",
	async (data: CalenderRequestDto, thunkAPI) => {
		try {
			const resp = await api.put<CalenderRequestDto>(`${url}${CALENDER_ENDPOINTS.CANCEL_EVENT}${data.id}`, data);
			return resp;
		} catch (error: any) {
			return thunkAPI.rejectWithValue(error.response.data);
		}
	}
);

export const GetEvents = createAsyncThunk(
	"calender/list",
	async (data,thunkAPI) => {
		try {
			const resp = await api.get<CalenderRequestDto>(`${url}${CALENDER_ENDPOINTS.GET_EVENTS}`);
			return resp;
		} catch (error: any) {
			return thunkAPI.rejectWithValue(error.response.data);
		}
	}
);

const calenderSlice = createSlice({
	name: "calender",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(AddEvent.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(AddEvent.fulfilled, (state, action) => {
				state.isLoading = false;
				state.events = [...state.events,action.payload];
				toast.info("Event Created Successfully")
			})
			.addCase(AddEvent.rejected, (state, action: any) => {
				const message: string = action.error.message;
				state.isLoading = false;
				toast.info(message);
			})
			.addCase(UpdateEvent.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(UpdateEvent.fulfilled, (state, action) => {
				state.isLoading = false;
				toast.info("Event Updated Successfully")
			})
			.addCase(UpdateEvent.rejected, (state, action: any) => {
				const message: any = action.error.message;
				state.isLoading = false;
				if (typeof message === "string") {
					toast.error(message);
				} else {
					message?.map((msg: string) => {
						return toast.error(msg);
					});
				}
			})
			.addCase(CancelEvent.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(CancelEvent.fulfilled, (state, action) => {
				state.isLoading = false;
			})
			.addCase(CancelEvent.rejected, (state, action: any) => {
				const message: any = action.error.message;
				state.isLoading = false;
				if (typeof message === "string") {
					toast.error(message);
				} else {
					message?.map((msg: string) => {
						return toast.error(msg);
					});
				}
			})

			.addCase(GetEvents.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(GetEvents.fulfilled, (state, action) => {
				state.isLoading = false;
				state.events = action.payload;
			})
			.addCase(GetEvents.rejected, (state, action: any) => {
				const message: any = action.error.message;
				state.isLoading = false;
				if (typeof message === "string") {
					toast.error(message);
				} else {
					message?.map((msg: string) => {
						return toast.error(msg);
					});
				}
			})
	},
});

export default calenderSlice.reducer;
