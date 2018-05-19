import React, { Component } from 'react';
import { Tooltip, Tag, Input, message } from 'antd';
import { Select, Form, Button } from 'antd';
import { Upload, Icon } from 'antd';
import { getStore } from '../utils/storage'
import { withRouter, Link } from "react-router-dom"; 
import './style/foodFormChange.less';
import { subFoodItem } from '../api/foods';
const { Option } = Select;
const FormItem = Form.Item; 

// base64转码
function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}
class FoodFormNew extends Component {
  state = {
    item: null,
    name: null,
    price: null,
    category: null,
    unit: '个',
    tags: [],
    intro: '',
    inputVisible: false, // 控制小标的输入输出
    inputValue: '',
    imgdata: '',
    filelist: [],
    loading: false,
  }

  componentWillMount() {
    console.log(this.state.item); // 接收到传递来的行信息
  }

  componentDidMount() {
    // 一开始就让按钮失效
    this.props.form.validateFields();
  }

  // 处理提交的函数
  handleSubmit = (e) => {
    e.preventDefault();
    let shop = getStore('shopInfo')
    let forPost = {
      tags: this.state.tags,
      imgdata: this.state.imgdata,
      shopId: shop.id
    }
    this.props.form.validateFields((err, values) => {
      if (!err) {
        // 此处做提交处理
        forPost = { ...forPost, ...values }
        console.log('Received values of form: ', forPost);
        subFoodItem(forPost).then(res => {
          res.data.success ?
            message.success('菜品已提交', 2, () => {
              this.props.history.push("/app/foodForm");
            }) :
            message.err('菜品未提交')
        })
      } else {
        message.err('填写信息有误')
      }
    });
    // subFoodItem(forPost).then(res => {
    //   res.data.success 
    //     ? message.success('菜品已提交', 2,() => {
    //       this.props.history.push("/app/foodForm");
    //     })
    //     : message.err('菜品未提交')
    // })
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
  // normFile = (e) => {
  //   console.log(this.props);
    
  //   // e.preventDefault();
  //   console.log('Upload event:', e);
  //   if (Array.isArray(e)) {
  //     return e;
  //   }
  //   return e && e.fileList;
  // }

  beforeUpload = (file) => {
    const isPic = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isPic) {
      message.error('你只能上传png或jpg的图片!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('图片大小不得大于2MB!');
    }
    return isLt2M && isPic;
  }
  handleUpload = (info) => {
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      getBase64(info.file.originFileObj, imgdata => {
        // info.file.status === 'done'
        this.setState({ imgdata, loading: false, }, ()=>{
          console.log(this.state);
        })
      });
      // return;
    }
  }

  render() {
    // const good = this.state.item

    const tags =
      this.state.tags.length === 0
        ? <span style={{ marginRight: 10 }}>暂无标签</span>
        : this.state.tags.map((tag, index) => {
          const isLongTag = tag.length > 20;
          const tagElem = (
            <Tag key={tag} closable={index !== -1} afterClose={() => this.handleClose(tag)}>
              {isLongTag ? `${tag.slice(0, 20)}...` : tag}
            </Tag>
          );
          return isLongTag ? <Tooltip title={tag} key={tag}>{tagElem}</Tooltip> : tagElem;
        })


    const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;

    // 只有在触发过后才会报错
    // const userNameError = isFieldTouched('userName') && getFieldError('userName');
    const nameError = isFieldTouched('name') && getFieldError('name');
    const priceError = isFieldTouched('price') && getFieldError('price');
    const categoryError = isFieldTouched('category') && getFieldError('category');

    const { inputVisible, inputValue } = this.state;
    return (
      <div>
        <Form layout="inline" onSubmit={this.handleSubmit}>
          <div className="change-items clearfloat">
            <div className="change-item">
              <FormItem
                validateStatus={nameError ? 'error' : ''}
                help={nameError || ''}
                label=' 商品名:'>
                {getFieldDecorator('name', {
                  rules: [{ required: true, message: '请输入商品名' }],
                })(
                  <Input onChange={this.handleNameChange} />
                )}
              </FormItem>
            </div>
            <div className="change-item">
              <FormItem
                validateStatus={priceError ? 'error' : ''}
                help={priceError || ''}
                label='商品售价:'>
                {getFieldDecorator('price', {
                  rules: [{ required: true, message: '请输入商品售价' }],
                })(
                  <Input onChange={this.handlePriceChange} />
                )}
              </FormItem>
            </div>
            <div className="change-item">
              <FormItem
                validateStatus={categoryError ? 'error' : ''}
                help={categoryError || ''}
                label='商品分类:'>
                {getFieldDecorator('category', {
                  rules: [{ required: true, message: '请输入商品分类' }],
                })(
                  <Input onChange={this.handleCategoryChange} />
                )}
              </FormItem>
            </div>
            <div className="change-item">
              <FormItem
                label='计量单位:'>
                {getFieldDecorator('unit', {
                  initialValue: '个',
                  rules: [{ required: true }],
                })(
                  <Select onChange={this.handleUnitChange}>
                    <Option value="个">个</Option>
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
                <Button
                  type="primary"
                  style={{ marginLeft: 20 }}
                >
                  <Link
                    to={{ pathname: "/app/foodForm", }}
                  >返回</Link>
                </Button>
              </FormItem>
            </div>
          </div>
          <div className="items-watch">
            <ul className="clearfloat">
              <li>
                <div className="watch-title">商品图片</div>
                <div className="watch-content">
                  <img src={this.state.imgdata} alt="" />
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
              {/* <FormItem
                label="图片上传"
                formItemLayout={{
                  labelCol: { span: 6 },
                  wrapperCol: { span: 14 },
                }}>
                <div className="dropbox" style={{ width: 200 }}>
                  {getFieldDecorator('dragger', {
                    valuePropName: 'filelist',
                    getValueFromEvent: this.normFile,
                  })(
                    <Upload.Dragger name="pic">
                      <p className="ant-upload-drag-icon">
                        <Icon type="plus" style={{ fontSize: 80, marginTop: 10 }} />
                      </p>
                      <p className="ant-upload-text">点击或拖拽图片上传</p>
                    </Upload.Dragger>
                  )}
                </div>
              </FormItem> */}
                <div className="dropbox" style={{ width: 200, height: 150 }}>
                    <Upload.Dragger 
                      name="pic"
                      listType="picture-card"
                      fileList={ this.state.filelist }
                      beforeUpload={ this.beforeUpload }
                      onChange={ this.handleUpload}
                    >
                      <p className="ant-upload-drag-icon">
                        <Icon type="plus" style={{ fontSize: 80, marginTop: 10 }} />
                      </p>
                      <p className="ant-upload-text">点击或拖拽图片上传</p>
                    </Upload.Dragger>
                </div>
            </div>
            <div className="change-text-area">
              <FormItem
                label="商品简介">
                {getFieldDecorator('introduction', {
                })(
                  <Input.TextArea rows={7} cols={50} onBlur={this.handleIntroChange}></Input.TextArea>
                )}
              </FormItem>
            </div>
          </div>
        </Form>
      </div>
    );
  }
}

const WrappedFoodFormNew = Form.create()(FoodFormNew);

// export default WrappedFoodFormNew;
export default withRouter(WrappedFoodFormNew);