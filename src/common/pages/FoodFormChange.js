import React, { Component } from 'react';
import { Tooltip, Tag, Input } from 'antd';
import { Select, Form, Button } from 'antd';
import { Upload, Icon } from 'antd';
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
    tags: [],
    intro: '',
    inputVisible: false, // 控制小标的输入输出
    inputValue: '',
  }

  componentWillMount() {
    this.setState({ 
      item: this.props.location.query,
      name: this.props.location.query.name,
      price: this.props.location.query.price,
      category: this.props.location.query.category,
      unit: this.props.location.query.unit,
      tags: this.props.location.query.tags 
    });
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
  handleIntroChange = (e) => {
    this.setState({ intro: e.target.value });
  }

  // 删除tag的处理
  handleClose = (removedTag) => {
    const tags = this.state.tags.filter(tag => tag !== removedTag);
    this.setState({ tags });
  }
  // 显示输入框
  showInput = () => {
    this.setState({ inputVisible: true }, () => this.input.focus());
  }
  // 处理添加值
  handleInputChange = (e) => {
    this.setState({ inputValue: e.target.value });
  }
  // 添加tag处理
  handleInputConfirm = () => {
    const inputValue = this.state.inputValue;
    let tags = this.state.tags;
    if (inputValue && tags.indexOf(inputValue) === -1) {
      tags = [...tags, inputValue];
    }
    console.log(tags);
    this.setState({
      tags,
      inputVisible: false,
      inputValue: '',
    });
  }

  saveInputRef = input => this.input = input
  
  // 上传文件
  normFile = (e) => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  }

  render() {
    const good =this.state.item
    
    const tags = 
      this.state.tags.length === 0
        ? <span style={{ marginRight : 10}}>暂无标签</span>
        : this.state.tags.map((tag,index)=>{
          const isLongTag = tag.length > 20;
          const tagElem = (
            <Tag key={tag} closable={index !== -1} afterClose={() => this.handleClose(tag)}>
              {isLongTag ? `${tag.slice(0, 20)}...` : tag}
            </Tag>
          );
          return isLongTag ? <Tooltip title={tag} key={tag}>{tagElem}</Tooltip> : tagElem;
        })

    const { getFieldDecorator, getFieldsError } = this.props.form;

    // 只有在触发过后才会报错
    // const userNameError = isFieldTouched('userName') && getFieldError('userName');


    const { inputVisible, inputValue } = this.state;
    return ( 
      <div>
        <Form layout="inline" onSubmit={this.handleSubmit}>
        <div className="change-items clearfloat">
        <div className="change-item">
          <FormItem
            label=' 商品名:'>
            {getFieldDecorator('foodname', {
              initialValue: good.name,
              rules: [{ required: true, message: '请输入商品名' }],
            })
            (
              <Input onChange={this.handleNameChange}/>
            )}
          </FormItem>
        </div>
        <div className="change-item">
          <FormItem
            label='商品售价:'>
            {getFieldDecorator('foodprice', {
              initialValue: good.price,
              rules: [{ required: true, message: '请输入商品售价' }],
            })
            (
              <Input onChange={this.handlePriceChange}/>
            )}
          </FormItem>
        </div>
        <div className="change-item">
          <FormItem
            label='商品分类:'>
            {getFieldDecorator('foodcategory', {
              initialValue: good.category,
              rules: [{ required: true, message: '请输入商品分类' }],
            })
            (
              <Input onChange={this.handleCategoryChange}/>
            )}
          </FormItem>
        </div>
        <div className="change-item">
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
        </div>
        <div className="change-item">
          商品标签：{tags}
              {inputVisible && (
                <Input
                  ref={this.saveInputRef}
                  type="text"
                  size="small"
                  style={{ width: 78 }}
                  value={inputValue}
                  onChange={this.handleInputChange}
                  onBlur={this.handleInputConfirm}
                  onPressEnter={this.handleInputConfirm}
                />
              )}
              {!inputVisible && <Button size="small" type="dashed" onClick={this.showInput}>+ New Tag</Button>}
        </div>
        <div className="table-submit">
          <FormItem>
            <Button
              type="primary"
              htmlType="submit"
              disabled={this.hasErrors(getFieldsError())}>
              提交更新
            </Button>
          </FormItem>
        </div>
        </div>
        <div className="items-watch">
          <ul className="clearfloat">
            <li>
              <div className="watch-title">商品图片</div>
              <div className="watch-content">
                <img src="https://oimageb7.ydstatic.com/image?id=8890261127673308097&product=dict-homepage&w=200&h=150&fill=0&cw=200&ch=150&sbc=0&cgra=CENTER" alt=""/>
              </div>
            </li>
            <li>
              <div className="watch-title">商品名</div>
              <div className="watch-content">{this.state.name}</div>
            </li>
            <li>
              <div className="watch-title">商品分类</div>
              <div className="watch-content">{this.state.category}</div>
            </li>
            <li>
              <div className="watch-title">商品价格</div>
              <div className="watch-content">￥{this.state.price}</div>
            </li>
            <li>
              <div className="watch-title">计量单位</div>
              <div className="watch-content">{this.state.unit}</div>
            </li>
            <li className="watch-intro">
              <span className="watch-title">商品简介</span>
              <p>{this.state.intro}</p>
            </li>
          </ul>
        </div>
        <div className="change-footer">
          <div className="change-upload">
            <FormItem
              label="图片上传"
              formItemLayout={{
                labelCol: {span: 6 },
                wrapperCol: {span: 14 },
              }}>
              <div className="dropbox" style={{ width: 200 }}>
                {getFieldDecorator('dragger', {
                  valuePropName: 'fileList',
                  getValueFromEvent: this.normFile,
                })(
                  <Upload.Dragger name="files" action="/upload.do">
                    <p className="ant-upload-drag-icon">
                      <Icon type="plus" style={{ fontSize: 80, marginTop: 10 }}/>
                    </p>
                    <p className="ant-upload-text">点击或拖拽图片上传</p>
                  </Upload.Dragger>
                  )}
              </div>
            </FormItem>
          </div>
          <div className="change-text-area">
            <FormItem
              label="商品简介">
              {getFieldDecorator('foodintro',{
                initialValue: this.state.intro
              })(
                <Input.TextArea rows={5} cols={50} onBlur={this.handleIntroChange}></Input.TextArea>
              )}
            </FormItem>
          </div>
        </div>
       </Form>
      </div>
    );
  }
}

// 以高阶组件的形式传入form
const WrappedFoodFormChange = Form.create()(FoodFormChange);

export default WrappedFoodFormChange;