import React, { useState } from "react";
import { Form, Input, Button, Row, Col, Card, Typography } from "antd";
import { LockOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import "../../Shared/CSS/index.css";
import { VerifyOtp } from "../../redux/Slices/Users/users.slice";

const { Title, Text } = Typography;
interface OtpVerificationInterface {
	email: string;
	handleOtpScreen: (args?: any) => void;
}
const OtpVerification: React.FC<OtpVerificationInterface> = ({
	email,
	handleOtpScreen,
}) => {
	const navigation = useNavigate();
	const dispatch: any = useDispatch();

	const onFinish = (values: any) => {
		const obj = {
			email,
			otp: values.otp,
		};
		dispatch(VerifyOtp(obj))
			.then((response: any) => {
				if (response.payload.is_active) {
					handleOtpScreen(false);
				}
			})
			.catch((err: any) => {
				console.error(err);
			});
		// Replace this with your login API call using axios or fetch
	};

	const navigateRoute = (url: string) => {
		navigation(url);
	};

	return (
		<Row
			justify="center"
			align="middle"
			style={{
				minHeight: "100vh",
				backgroundImage: 'url("/assets/images/background/background-1.jpeg")',
				backgroundSize: "cover",
			}}
		>
			<Col xs={20} sm={16} md={12} lg={8}>
				<Card style={{ backgroundColor: "rgba(255, 255, 255, 0.8)" }}>
					<div style={{ textAlign: "center", marginBottom: 24 }}>
						<Title level={3}>OTP Verification!</Title>
					</div>
					<Form onFinish={onFinish}>
						<Form.Item
							name="otp"
							rules={[{ required: true, message: "Please input your otp!" }]}
						>
							<Input.Password
								prefix={<LockOutlined />}
								placeholder="Enter OTP"
							/>
						</Form.Item>
						<Form.Item>
							<Button type="primary" htmlType="submit" block>
								Submit
							</Button>
							<div className="margin-top">
								<Text
									onClick={() => navigateRoute("/")}
									className="text center"
								>
									Back
								</Text>
							</div>
						</Form.Item>
					</Form>
				</Card>
			</Col>
		</Row>
	);
};

export default OtpVerification;
