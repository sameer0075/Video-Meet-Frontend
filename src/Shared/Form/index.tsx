import React from 'react';
import { Form, Input, Select, Typography } from 'antd';
import { FormInterface } from './interface';

const CustomForm: React.FC<FormInterface> = ({
    inputProps,
  }) => {
  const {Text} = Typography
  return (
    <React.Fragment>
      <Form onFinish={()=>{}}>
        {
            inputProps.map((inputProp)=>(
                <React.Fragment>
                    {inputProp.formType === 'input' && 
                        <div style={{display: 'block'}}>
                            <Text>{inputProp.label}</Text>
                            <Form.Item
                                name={inputProp.name}
                                rules={inputProp.rules}
                            >
                                <Input value={inputProp.value} type={inputProp.type} placeholder={inputProp.placeholder} onChange={inputProp.onChange} />
                            </Form.Item>
                        </div>
                    }

                    {inputProp.formType === 'dropdown' && 
                        <div style={{display: 'block',marginBottom:20}}>
                            <Text>{inputProp.label}</Text> &nbsp; &nbsp;
                            <Select
                                defaultValue={inputProp.value}
                                style={{ width: "100%" }}
                                options={inputProp.options}
                            />
                        </div>
                    }
                </React.Fragment>
            ))
        }
      </Form>
    </React.Fragment>
  );
};

export default CustomForm;