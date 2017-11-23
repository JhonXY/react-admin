import React, { Component } from 'react';
import { Input } from 'antd';
import { Select, Form, Button } from 'antd';
import './style/foodFormChange.scss';
const { Option } = Select; 
const FormItem = Form.Item; 

class FoodFormChange extends Component {
  state = { 
    item: null,
    name: null,
    price: null,
    category: null,
    unit: null,
  }

  componentWillMount() {
    this.setState({ 
      item: this.props.location.query,
      name: this.props.location.query.name,
      price: this.props.location.query.price,
      category: this.props.location.query.category,
      unit: this.props.location.query.unit, });
    console.log(this.state.item); // 接收到传递来的行信息
  }

  componentDidMount() {
    // 一开始就让按钮失效
    this.props.form.validateFields();
  }

  // 处理提交的函数
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        // 此处做提交处理
        console.log('Received values of form: ', values);
        this.setState({ })
      }
    });
  }

  hasErrors = (fieldsError) => {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
  }

  // 各个值的实时变化
  handleNameChange = (e) => {
    this.setState({ name: e.target.value });
  }
  handlePriceChange = (e) => {
    this.setState({ price: e.target.value });
  }
  handleUnitChange = (e) => {
    this.setState({ unit: e });
  }
  handleCategoryChange = (e) => {
    this.setState({ category: e.target.value });
  }
  

  render() {
    const good =this.state.item
    
    const tags = good.tags.map((tag,index)=>{
      return (
        <div className="tag-item" key={index}>
          <span style={{border: '1px solid black', float: 'left'}}>{tag}</span>
        </div>  
      )
    })

    const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;

    // 只有在触发过后才会报错
    const userNameError = isFieldTouched('userName') && getFieldError('userName');
    const passwordError = isFieldTouched('password') && getFieldError('password');

    return ( 
      <div>
        <div className="change-items clearfloat">
        <Form layout="inline" onSubmit={this.handleSubmit}>
          <FormItem
            label=' 商品名:'>
            {getFieldDecorator('foodname', {
              initialValue: good.name,
              rules: [{ required: true, message: '请输入商品名' }],
            })
            (
              <Input style={{width: '70%'}} onChange={this.handleNameChange}/>
            )}
          </FormItem>
          <FormItem
            label='商品售价:'>
            {getFieldDecorator('foodprice', {
              initialValue: good.price,
              rules: [{ required: true, message: '请输入商品售价' }],
            })
            (
              <Input style={{width: '70%'}} onChange={this.handlePriceChange}/>
            )}
          </FormItem>
          <FormItem
            label='商品分类:'>
            {getFieldDecorator('foodcategory', {
              initialValue: good.category,
              rules: [{ required: true, message: '请输入商品分类' }],
            })
            (
              <Input style={{width: '70%'}} onChange={this.handleCategoryChange}/>
            )}
          </FormItem>
          <FormItem
            label='计量单位:'>
            {getFieldDecorator('foodunit', {
              initialValue: good.unit,
              rules: [{ required: true }],
            })
            (
              <Select onChange={this.handleUnitChange}>
                <Option value="袋">袋</Option>
                <Option value="盘">盘</Option>
                <Option value="碗">碗</Option>
                <Option value="锅">锅</Option>
                <Option value="只">只</Option>
                <Option value="件">件</Option>
              </Select>
            )}
          </FormItem>
        <div className="change-item">
          商品标签：{tags}
        </div>
        <FormItem>
          <Button
            type="primary"
            htmlType="submit"
            disabled={this.hasErrors(getFieldsError())}>
            提交更新
          </Button>
        </FormItem>
        </Form>
        </div>
        <div>{this.state.name}</div>
        <div>{this.state.price}</div>
        <div>{this.state.unit}</div>
        <div>{this.state.category}</div>
      </div>
    );
  }
}

// 以高阶组件的形式传入form
const WrappedFoodFormChange = Form.create()(FoodFormChange);

export default WrappedFoodFormChange;