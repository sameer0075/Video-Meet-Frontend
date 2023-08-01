import React, { useState } from "react";
import { Form, Input, Button, Row, Col, Card, Typography } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import "../../Shared/CSS/index.css";
import { LoginUser } from "../../redux/Slices/Users/users.slice";
import OtpVerification from "./otpVerification";

const { Title, Text } = Typography;

const Login: React.FC = () => {
	const navigation = useNavigate();
	const [otp, setOtp] = useState<boolean>(false);
	const [email, setEmail] = useState<string>("");
	const dispatch: any = useDispatch();
	const onFinish = (values: any) => {
		console.log("Received values of form: ", values);
		dispatch(LoginUser(values))
			.then((response: any) => {
				if (
					response?.payload?.is_active === false ||
					response?.payload?.message?.otpVerification === "required"
				) {
					setOtp(true);
					setEmail(values.email);
				} else {
					setOtp(false);
				}
			})
			.catch((err: any) => {
				console.log("err", err);
			});
		// Replace this with your login API call using axios or fetch
	};

	const navigateRoute = (url: string) => {
		navigation(url);
	};

	const handleOtpScreen = (value: boolean) => {
		setOtp(value);
	};

	return (
		<React.Fragment>
			{!otp ? (
				<Row
					justify="center"
					align="middle"
					style={{
						minHeight: "100vh",
						backgroundImage:
							'url("/assets/images/background/background-1.jpeg")',
						backgroundSize: "cover",
					}}
				>
					<Col xs={20} sm={16} md={12} lg={8}>
						<Card style={{ backgroundColor: "rgba(255, 255, 255, 0.8)" }}>
							<div style={{ textAlign: "center", marginBottom: 24 }}>
								<Title level={3}>Welcome Back!</Title>
							</div>
							<Form onFinish={onFinish}>
								<Form.Item
									name="email"
									rules={[
										{ required: true, message: "Please input your Email!" },
									]}
								>
									<Input prefix={<UserOutlined />} placeholder="Email" />
								</Form.Item>
								<Form.Item
									name="password"
									rules={[
										{ required: true, message: "Please input your password!" },
									]}
								>
									<Input.Password
										prefix={<LockOutlined />}
										placeholder="Password"
									/>
								</Form.Item>
								<Form.Item>
									<Button type="primary" htmlType="submit" block>
										Log in
									</Button>
									<div className="margin-top">
										<Text
											onClick={() => navigateRoute("/register")}
											className="text center"
										>
											Don't have an account?
										</Text>
										<Text className="text center">Forgot Password?</Text>
									</div>
								</Form.Item>
							</Form>
						</Card>
					</Col>
				</Row>
			) : (
				<OtpVerification email={email} handleOtpScreen={handleOtpScreen} />
			)}
		</React.Fragment>
	);
};

export default Login;
