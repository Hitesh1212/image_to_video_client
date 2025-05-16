import React, { useState, useEffect } from "react";
import { message, Row, Col, Button, Form, Input, Upload, Image, Spin} from "antd";
import { BASE_URL } from "../../config/Api";
import axios from "axios";


let SUPPORTED_TYPE= ['image/jpeg', 'image/jpg', 'image/png'];

const Dashboard = () => {

    const [user, setUser] = useState(null);
    const [fileList, setFileList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [videoLoading, setVideoLoading] = useState(false);
    const [resData, setResData] = useState(null);
   // console.log('user', user);

    const initialValues = {
        image_data: [],
        prompt: '',
    }

    const uploadImage = async (values) => {

      setVideoLoading(true);
        console.log('values', values);

        const formData = new FormData();
        formData.append("image_data", fileList[0]);
        formData.append("prompt", values.prompt);
        
        const token = localStorage.getItem("app_token");
        if (!token) {
            window.location.href = "/login";
        } else {
            await axios
                .post(`${BASE_URL}/file/upload-image`, formData, {
                    headers: {
                        Authorization: `${token}`,
                        "Content-Type": "multipart/form-data",
                    }
                })
                .then((response) => {
                    setVideoLoading(false)
                    setResData(response.data.data)
                    console.log(response.data.data);
                    message.success(response.data.message);
                })
                .catch((error) => {
                  setVideoLoading(false)
                    console.log(error);
                    message.error(error.response.data.message);
                });
        }
    };

    useEffect(() => {
        const token = localStorage.getItem("app_token");
        if (!token) {
            window.location.href = "/login";
        } else {
            axios
                .get(`${BASE_URL}/auth/get-single-user`, {
                    headers: {
                        Authorization: `${token}`,
                    },
                })
                .then((response) => {
                  setLoading(false)
                   // console.log(response.data.data)
                    setUser(response.data.data);
                })
                .catch((error) => {
                  setLoading(false)
                    console.log(error);
                    message.error(error.response.data.message);
                });
        }
    }
    , []);
 
  return (
   <>
   <h2>
    Dashboard
    
   </h2>
 {
    user ? (
        <Col span={24} style={{display: 'flex', flexDirection:'column',  justifyContent: 'end', alignItems: 'end'}}>
             <Row>
           Name:- {user?.name}
         </Row>
         <Row>
          Email:- {user?.email}
         </Row>
           
        </Col>
    )
    :
    (
      <>
      <Spin tip='Loading...'  spinning={loading} delay={500 } />
      </>
    )
  }
   <div style={{marginTop: '20px'}}>
    <h2>Image To Video</h2>

    <div>

        <Form
            name="basic"
            style={{ backgroundColor: "white", padding: "20px", borderRadius: "10px",  }}
            initialValues={initialValues}
            autoComplete="off"
            onFinish={uploadImage}
            onFinishFailed={(errorInfo) => {
                console.log('Failed:', errorInfo);
                message.error("Please fill all the fields");
            }}
        >
              <Form.Item
                      label="Prompt"
                      name="prompt"
                     
                    >
                      <Input />
                    </Form.Item>
           <Form.Item name='image_data'
            
            label="Image"
          valuePropName="image_data"
          rules={[
            // {
            //   required: true,
            //   message : 'Required!'
            // },
            {
              validator(_, file) {
                // console.log(fileList)
                return new Promise ((resolve, reject) => {
                  if(file?.file && file?.file?.size > 20000000){
                    reject('File Size Larger Than 20 MB')
                  }
                  else if(file?.file && !SUPPORTED_TYPE.includes(file.file.type)){
                    
                    reject(`Only Support .jpg, .jpeg, .png `)
                  }
                  else {
                    resolve('success')
                  }
                })
              }
            },
          

          ]}
          >
           
          <Upload
            // multiple
              maxCount={1}
              listType="picture-card"
              customRequest={(info) => {
                console.log(info.file);
               
                setFileList([info.file]);
              }}
              showUploadList={false}
            
              //listType="picture-card" 
            >
                {fileList.length < 1 && (
                    <div>
                  
                    <div style={{ marginTop: 8 }}>Upload</div>
                    </div>
                )}
                {fileList.length > 0 && (
                    <Image
                    src={URL.createObjectURL(fileList[0])}
                    
                    />
                )}
             
            </Upload>
          
          </Form.Item>


            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>

    </div>

   {
    resData ? 
     <div style={{display: 'flex', justifyContent: 'space-between', marginTop: '20px'}}>

    <video width="400" height="400" controls>
    <source src={resData?.video_url} />
    </video>
   </div>
    :
    <Spin size="large" tip='Loading...'  spinning={videoLoading} delay={500 } />
   } 

  

   </div>

    
   </>
  );
};

export default Dashboard;
