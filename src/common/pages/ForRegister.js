import React, { Component } from 'react';
import { Form, Icon, Input, Button, Tooltip, Radio } from 'antd';
import { message } from 'antd';
import { register } from '../api/users';
import { setStore } from '../utils/storage';

const FormItem = Form.Item;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
class ForRegister extends Component {
  state = { 
    confirmDirty: false, // 确认密码
  }
  // 总的提交处理
  handleSubmit = (e) => {
    e.preventDefault();
    // validateFields可传入三个参数，具体表单域名（是一个数组，也就是可校验多个），校验选项，回调
    // 如未传入具体表单域名，则默认校验所有表单域
    let { tologin } = this.props;
    this.props.form.validateFields((err, values) => {
      if (!err) {
        values['role'] = 1;
        console.log('表单信息: ', values);
        register(values).then(result => {
          let res = result.data
          if (res.code === 1) {
            setStore('token', res.bean)
            message.success('注册成功，请进行登录！', 2,()=>{
              tologin()
            })
          } else {
            message.error('注册失败')
          }
          // 再跳转
        }).catch(err => {
          message.error('注册失败');
        })
      } else {
        console.log('====================================');
        console.log('err:');
        console.log(err);
        console.log('====================================');
      }
    });
  }

  // 用于密码处修改的保持相等
  // 获取密码框中鼠标的焦点
  handleConfirmBlur = (e) => {
    // const value = e.target.value;
    // this.setState({ confirmDirty: this.state.confirmDirty || !!value });
    this.setState({ confirmDirty: true });
  }
  // 密码确认处的验证
  checkPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('password')) {
      callback('两次输入的密码不同!');
    } else {
      callback();
    }
  }
  // 密码设置处的验证
  checkConfirm = (rule, value, callback) => {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      // { force: true }表示再次效验confirm
      // 这里也就是再次触发confirm的校验的意思
      form.validateFields(['confirm'], { force: true });
    }
    callback(); // 使效验成功则callback不传参，传参则会使校验失败且显示传入的参数值的提示
  }

  render() {
    const { getFieldDecorator } = this.props.form;

    const { autoCompleteResult } = this.state;

    const formItemLayout = {
      labelCol: {
        span: 24 
        // sm: { span: 6 },
      },
      wrapperCol: {
        span: 24 
        // sm: { span: 14 },
      },
    };

    return (
      <Form onSubmit={this.handleSubmit}>
        <FormItem
          {...formItemLayout}
          label="手机号"
        >
          {/* 经过 getFieldDecorator 包装的控件，表单控件会自动添加 value */}
          {/* 不应该用 setState，可以使用 this.props.form.setFieldsValue 来动态改变表单值。 */}
          {getFieldDecorator('phone', {
            rules: [{ required: true, message: '请输入你的手机号!' }],
          })(
            <Input />
            )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="密码"
          hasFeedback
        >
          {getFieldDecorator('password', {
            rules: [{
              required: true, message: '请输入你的密码!', whitespace: true
            }, {
              validator: this.checkConfirm, // validator表示实时的输入校验函数,每次输入都会调用
            }],
          })(
            <Input type="password" />
            )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="确认密码"
          hasFeedback
        >
          {getFieldDecorator('confirm', {
            rules: [{
              required: true, message: '请确认你的密码!', whitespace: true
            }, {
              validator: this.checkPassword,
            }],
          })(
            <Input type="password" 
            onBlur={this.handleConfirmBlur}
            onFocus={() => console.log('force')} />
            )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label={(
            <span>
              名称&nbsp;
              <Tooltip title="你希望我们怎么称呼您？">
                <Icon type="question-circle-o" />
              </Tooltip>
            </span>
          )}
          hasFeedback
        >
          {getFieldDecorator('nickname', {
            rules: [{ required: true, message: '请输入你的名称!', whitespace: true }],
          })(
            <Input />
            )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="性别"
        >
          {getFieldDecorator('sex', {
            rules: [{ required: true, message: '请选择你的性别！', whitespace: true }],
          })(
            <RadioGroup>
              <RadioButton value="1">男</RadioButton>
              <RadioButton value="0">女</RadioButton>
            </RadioGroup>
          )}
        </FormItem>
        {/* <FormItem
          {...formItemLayout}
          label="手机验证"
          extra="We must make sure that your are a human."
        >
          <Row gutter={8}>
            <Col span={12}>
              {getFieldDecorator('captcha', {
                rules: [{ 
                  required: true, 
                  message: '请输入你的验证码' }],
              })(
                <Input size="large" />
                )}
            </Col>
            <Col span={12}>
              <Button size="large">获取验证码</Button>
            </Col>
          </Row>
        </FormItem> */}
        <FormItem>
          <Button type="primary" htmlType="submit">注册</Button>
        </FormItem>
      </Form>
    );
  }
}

const WrappedForRegister = Form.create()(ForRegister);
export default WrappedForRegister;