import React, { useState } from "react";
import { Form, Input, Button, Row, Col, Card, Typography } from "antd";
import {
	UserOutlined,
	LockOutlined,
	RedEnvelopeFilled,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import "../../Shared/CSS/index.css";
import { AddNewUser } from "../../redux/Slices/Users/users.slice";
import OtpVerification from "./otpVerification";

const { Title, Text } = Typography;

const Register: React.FC = () => {
	const navigation = useNavigate();
	const [otp, setOtp] = useState<boolean>(false);
	const [email, setEmail] = useState<string>("");
	const dispatch: any = useDispatch();
	const onFinish = (values: any) => {
		console.log("Received values of form: ", values);
		const { username, ...rest } = values;
		let obj = {
			name: username,
			...rest,
		};
		dispatch(AddNewUser(obj))
			.then((response: any) => {
				if (response.payload.is_active === false) {
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

	const handleOtpScreen = (value: boolean) => {
		setOtp(value);
		navigateRoute("/");
	};

	const navigateRoute = (url: string) => {
		navigation(url);
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
								<Title level={3}>Sign Up!</Title>
							</div>
							<Form onFinish={onFinish}>
								<Form.Item
									name="username"
									rules={[
										{ required: true, message: "Please input your username!" },
									]}
								>
									<Input prefix={<UserOutlined />} placeholder="Username" />
								</Form.Item>
								<Form.Item
									name="email"
									rules={[
										{ required: true, message: "Please input your Email!" },
									]}
								>
									<Input prefix={<RedEnvelopeFilled />} placeholder="Email" />
								</Form.Item>
								<Form.Item
									name="phone"
									rules={[
										{ required: true, message: "Please input your Phone!" },
									]}
								>
									<Input prefix={<RedEnvelopeFilled />} placeholder="Phone" />
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
										Register
									</Button>
									<div className="margin-top center">
										<Text
											onClick={() => navigateRoute("/")}
											className="text"
											style={{ display: "block" }}
										>
											Already have an account?
										</Text>
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

export default Register;
