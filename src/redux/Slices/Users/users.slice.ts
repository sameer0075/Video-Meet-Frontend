import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../BaseClass/index";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { url } from "../../url";
import { USERS_ENDPOINTS } from "../../Endpoints";
import { LoginUserInterface, RegisterUserInterface, ResendOtpInterface, UserResponseInterface, VerifyOtpInterface } from "./interface";

const initialState = {
	isLoading: <boolean>false,
	user: <UserResponseInterface>{},
};

export const AddNewUser = createAsyncThunk(
	"users/create",
	async (data: RegisterUserInterface, thunkAPI) => {
		try {
			const resp = await api.post<UserResponseInterface>(`${url}${USERS_ENDPOINTS.REGISTER_USER}`, data);
			return resp;
		} catch (error: any) {
			return thunkAPI.rejectWithValue(error.response.data);
		}
	}
);

export const LoginUser = createAsyncThunk(
	"users/login",
	async (data: LoginUserInterface, thunkAPI) => {
		try {
			const resp = await api.post<UserResponseInterface>(
				`${url}${USERS_ENDPOINTS.LOGIN_USER}`,
				data
			);
			return resp;
		} catch (error: any) {
			return thunkAPI.rejectWithValue(error.response.data);
		}
	}
);

export const VerifyOtp = createAsyncThunk(
	"users/verify-otp",
	async (data: VerifyOtpInterface, thunkAPI) => {
		try {
			const resp = await api.post<UserResponseInterface>(
				`${url}${USERS_ENDPOINTS.VERIFY_OTP}`,
				data
			);
			return resp;
		} catch (error: any) {
			return thunkAPI.rejectWithValue(error.response.data);
		}
	}
);

export const ResendOtp = createAsyncThunk(
	"users/resend-otp",
	async (data: ResendOtpInterface, thunkAPI) => {
		try {
			const resp = await api.post<UserResponseInterface>(
				`${url}${USERS_ENDPOINTS.RESEND_OTP}`,
				data
			);
			return resp;
		} catch (error: any) {
			return thunkAPI.rejectWithValue(error.response.data);
		}
	}
);

const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(LoginUser.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(LoginUser.fulfilled, (state, action) => {
				state.isLoading = false;
				state.user = action.payload;
			})
			.addCase(LoginUser.rejected, (state, action: any) => {
				const message: string = action.error.message;
				state.isLoading = false;
				toast.info(message);
			})
			.addCase(VerifyOtp.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(VerifyOtp.fulfilled, (state, action) => {
				state.isLoading = false;
				state.user = action.payload;
				toast.info("Otp Validated Successfully")
			})
			.addCase(VerifyOtp.rejected, (state, action: any) => {
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
			.addCase(ResendOtp.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(ResendOtp.fulfilled, (state, action) => {
				state.isLoading = false;
				state.user = action.payload;
			})
			.addCase(ResendOtp.rejected, (state, action: any) => {
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

			.addCase(AddNewUser.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(AddNewUser.fulfilled, (state, action) => {
				state.isLoading = false;
				state.user = action.payload;
				toast.info("Data created successfully");
			})
			.addCase(AddNewUser.rejected, (state, action: any) => {
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

export default userSlice.reducer;
