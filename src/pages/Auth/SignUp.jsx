import React, { useState } from "react";
import { BASE_URL } from "../../config/Api";
import { message, Form, Input, Button } from "antd";
import axios from "axios";
const SignUp = () => {

  const initialValues = {
    email: "",
    password: "",
    name: "",
  }

  const Register = async(values) => {

   if(values.email === "" || values.password === "" || values.name === "") {
      message.error("Please fill all the fields");
    } else {
      const { email, password, name } = values;
     await axios
        .post(`${BASE_URL}/auth/register`, {
          email: email,
          password: password,
          name: name,
        })
        .then((response) => {
          console.log(response);
          message.success('Registered')
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

            <div className="card-body  p-4">
                  
                  <h4 className="text-dark-50 text-center mt-0 fw-bold">
                    Sign Up
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
                      label="Name"
                      name="name"
                      rules={[{ required: true, message: "Please input your name!" }]}
                    >
                      <Input />
                    </Form.Item>

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
                        Register
                      </Button>
                    </Form.Item>
                   
                  </Form>
                  
                {/* <form action="#">
                  <div className="mb-3">
                    <label forhtml="emailaddress" className="form-label">
                      Email address
                    </label>
                    <input
                      className="form-control"
                      type="email"
                      id="emailaddress"
                      required=""
                      placeholder="Enter your email"
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>

                  <div className="mb-3">
                    <label forhtml="password" className="form-label">
                      Password
                    </label>
                    <div className="input-group input-group-merge">
                      <input
                        type="password"
                        id="password"
                        className="form-control"
                        placeholder="Enter your password"
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      <div className="input-group-text" data-password="false">
                        <span className="password-eye"></span>
                      </div>
                    </div>
                  </div>

                    <div className="mb-3">
                    <label forhtml="name" className="form-label">
                      Name

                    </label>

                    <input
                        className="form-control"
                        type="text"
                        id="name"
                        required=""
                        placeholder="Enter your name"
                        onChange={(e) => setName(e.target.value)}
                        />
                    </div>

                  <div >
                    <button
                      type="button"
                      onClick={Register}
                    >
                      Register
                    </button>
                  </div>
                </form> */}
              </div>

              <div>
                  <a href="/login">
                    <b>Sign in</b>
                  </a>
                </div>
    </>
  );
};

export default SignUp;
