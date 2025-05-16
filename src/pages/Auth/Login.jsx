import React, { useState } from "react";
import { message, Form, Input, Button } from "antd";
import { BASE_URL } from "../../config/Api";
import axios from "axios";

const Login = () => {

  const initialValues = {
    email: "",
    password: "",
  }

   const Register = async(values) => {

   if(values.email === "" || values.password === "") {
      message.error("Please fill all the fields");
    } else {
      const { email, password } = values;
     await axios
        .post(`${BASE_URL}/auth/login`, {
          email: email,
          password: password
        })
        .then((response) => {
          console.log(response);
          message.success('Logged In')
          localStorage.setItem('app_token',response.data.token)
          window.location.href = "/dashboard"
        })
        .catch((error) => {
          console.log(error);
         
        });
    }
   
  };

  const onFinishFailed = (errorInfo) => {
  message.error("Please fill all the fields");
};
  return (
    <>
        <div className="card-body p-4">
        
        <h4 className="text-dark-50 text-center mt-0 fw-bold">
        Login
        </h4>
             <Form 
                name="basic"
                style={{ backgroundColor: "white", padding: "20px", borderRadius: "10px",  }}
                initialValues={initialValues}
                onFinish={Register}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
              >

                <Form.Item
                  label="Email"
                  name="email"
                  rules={[{ required: true, message: "Please input your email!" }, { type: 'email', message: 'The input is not valid E-mail!' }]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  label="Password"
                  name="password"
                  rules={[{ required: true, message: "Please input your password!" }]}
                >
                  <Input.Password />
                </Form.Item>

                

                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                  <Button type="primary" htmlType="submit">
                    Submit
                  </Button>
                </Form.Item>
                
              </Form>
    

    </div>

    <div>
        <a href="/signUp" className="text-muted">
        <b>Sign Up</b>
        </a>
    </div>
    </>
  );
};

export default Login;
