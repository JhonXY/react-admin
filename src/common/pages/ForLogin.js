import React, { Component } from 'react';
import { message } from 'antd';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import './style/forlogin.less';
import { login } from '../api/users';
import { setStore } from '../utils/storage';

const FormItem = Form.Item;

class ForLogin extends Component {
  state = {  }

  handleSubmit = (e) => {
    e.preventDefault();
    let { loginSuc } = this.props;
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('表单信息: ', values);
        let { userphone, password } = values
        login({ 
          userphone, 
          password
        }).then(result => {
          let res = result.data
          if(res.code === 1){
            setStore('token', res.bean) 
            // message的参数可有三个 信息内容，消失时间，消失后的回调
            message.success('登录成功', 2,()=>{
              loginSuc()
            })
          } else {
            message.error('登录失败')
          }
          // 再跳转
        }).catch(err => {
          message.error('登录失败');
        })
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;

    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <FormItem>
          {getFieldDecorator('userphone', {
            rules: [{ required: true, message: '请输入你的手机号!' }],
          })(
            <Input prefix={<Icon type="phone" style={{ fontSize: 13 }} />} placeholder="请输入手机号" />
            )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: '请输入你的密码!' }],
          })(
            <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="请输入密码" />
            )}
        </FormItem>
        <FormItem style={{marginTop:-20}}>
          {getFieldDecorator('remember', {
            valuePropName: 'checked',
            initialValue: true,
          })(
            <Checkbox>记住密码</Checkbox>
            )}
          <Button type="primary" htmlType="submit" className="login-form-button">
            登  录
          </Button>
        </FormItem>
      </Form>
    );
  }
}

const WrappedForLogin = Form.create()(ForLogin);
export default WrappedForLogin;