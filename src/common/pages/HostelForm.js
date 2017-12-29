import React, { Component } from 'react';
import { Row, Col, Checkbox, InputNumber, Select, Input, Button} from 'antd';
import { Form } from 'antd';
import { TimePicker } from 'antd';
import { Table } from 'antd';
import moment from 'moment';
import './style/form.less';

const FormItem = Form.Item;
const Option = Select.Option;
// const { Column, ColumnGroup } = Table;

class HostelForm extends Component {
  state = {
    tuichecked: true, //是否可退 
    brechecked: true, //是否有早餐 
    disabled: true, // 控制何时可退后的输入框是否可用 
  }

  toggleDisabled = (e) => {
    console.log(e);
    
    switch(true){
      case e.target.id === 'hostelCantui':
        this.setState({
          tuichecked: !this.state.tuichecked,
        });
        break;
      case e.target.id === 'hostelHasbre':
        this.setState({
          brechecked: !this.state.brechecked,
        });
        break;
      default:
        break;
    }
  }


  onChange(e) {
    e.target 
      ? console.log(`e.target : ${e.target}`)
      : console.log(`e : ${e}`)
  }

  // 利用箭頭函數直接取到class的this
  handleSubmit=(e)=>{
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        // 此处做提交处理
        console.log('Received values of form: ', values);
        // this.setState({})
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    // 接口获取已存在的床位信息
    const data =[
      { 
        key: 1,
        model: '大床房', price: '125', num: '5', date: '2017-10-7', member: 2, instro: '1.8m 双人床',
        service: [
          'wifi', 'net', 'bathroom', 
          {
            breakfast: {
              whether: 1,
              num: 2
            }
          },
          {
            cancel: {
              whether: 1,
              date: '19:00'
            }
          }
        ]
      },
      { key: 2, model: '标准房', price: '120', num: '5', date: '2017-10-7', member: 2,
        service: [
          'wifi', 'net', 'bathroom',
          {
            breakfast: {
              whether: 0,
            }
          },
          {
            cancel: {
              whether: 1,
              date: '19:00'
            }
          }
        ]
      },
      { key: 3, model: '单人房', price: '100', num: '5', date: '2017-10-7', member: 2},
      { key: 4, model: '单人房', price: '100', num: '5', date: '2017-10-7', member: 2},
    ]

    // 表格结构
    const columns = [
      {title: '床型', dataIndex: 'model', key: 'model'},
      {title: '售价', dataIndex: 'price', key: 'price'},
      {title: '总量', dataIndex: 'num', key: 'num'},
      {title: '录入时间', dataIndex: 'date', key: 'date'},
      {title: '可住人数', dataIndex: 'member', key: 'member'},
    ]

    // 表单的排版样式
    const formItemLayout = {
      labelCol: {
        span: 4
        // sm: { span: 6 },
      },
      wrapperCol: {
        span: 20
        // sm: { span: 14 },
      },
    };

    // 表格下拉更多的内容
    const expand = (data)=>{
      if (!data.service) {
        return (
          <div className="service-items" key={data.key}>
            暂无更多
          </div>
        )
      } else {
        let more = data.service.map((item, index, arr) => {
          if (typeof item !== 'object') {
            return (
              <span key={index}>{item}</span>
            )
          } else {
            // 通过switch来为不同的复杂对象做处理
            switch (true) {
              case (typeof item.breakfast === 'object') :
                return (
                  item.breakfast.whether === 0
                    ?<span key={index}>无早</span>
                    :<span key={index}>早餐供应: {item.breakfast.num} 份</span>
                );
              case (typeof item.cancel === 'object') :
                return (
                  item.cancel.whether === 0
                    ? <span key={index}>不可退</span>
                    : <span key={index}>退房时间: {item.cancel.date} 前</span>
                );
              default:
                return null;
            }
          }
        })
        return (
          <section>提供服务 :
            <div className="service-items" key={data.key}>
              {more}
            </div>
          </section> 
        )
      }
    }

    const _this = this;

    return (
      <div style={{marginTop: 20}}>
        <Row type="flex" justify="space-around">
          {/* <Col xs={24} sm={24} md={11} lg={10} xl={8} >
            <Row className="form-title">设备</Row>
            <Row>
              <Row type="flex" justify="start">
                <Checkbox onChange={this.onChange}>Wifi</Checkbox>
                <Checkbox onChange={this.onChange}>宽带</Checkbox>
                <Checkbox onChange={this.onChange}>独卫</Checkbox>
              </Row>
            </Row>
            <Row className="form-title">数量</Row>
            <Row>
              可住人数: <InputNumber min={1} max={10} defaultValue={2} onChange={this.onChange} />
            </Row>
            <Row className="form-title">服务</Row>
            <Row>
              <Checkbox id='bre' onChange={this.toggleDisabled}>早餐</Checkbox>
              <InputNumber disabled={this.state.brechecked} min={1} max={10} defaultValue={2} onChange={this.onChange} /> 份
            </Row>
            <Row>
              <Row type="flex" justify="start" align="middle">
                <Checkbox id='tui' onChange={this.toggleDisabled}>可退房</Checkbox>
                <div>
                  退房时间: <TimePicker disabled={this.state.tuichecked} onChange={this.onChange} defaultOpenValue={moment('00:00:00', 'HH:mm:ss')} /> 前
                </div>
              </Row>
            </Row>
            <Row className="form-title">床型</Row>
            <Row>
              <Select defaultValue="大床" style={{ width: 120 }} onChange={this.onChange}>
                <Option value="大床">大床</Option>
                <Option value="单人床">单人床</Option>
                <Option value="双床">双床</Option>
                <Option value="其他">其他</Option>
              </Select>
            </Row>
            <Row>
                具体床型: <Input placeholder="床型，尺寸等" style={{ width: '50%'}}/>
            </Row>
            <Row className="form-title">房情</Row>
            <Row>
              具体房价: <InputNumber 
                min={1} defaultValue={100} formatter={value => `￥ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                parser={value => value.replace(/\$\s?|(,*)/g, '')} onChange={this.onChange} />
              <br />
              可订总数: <InputNumber min={1} defaultValue={2} onChange={this.onChange} />
            </Row>
            <Row><Button type="primary">信息录入</Button></Row>
          </Col> */}
          <Col xs={24} sm={24} md={11} lg={10} xl={8} >
            <Form 
              layout="vertical"
              onSubmit={this.handleSubmit}>
                {/* {{labelCol: {span: 4 },wrapperCol: {span: 14 }}} */}
              <FormItem
                label="设备">
                {getFieldDecorator('hostelEquipment', {})(
                  <Row type="flex" justify="start">
                    <Checkbox onChange={_this.onChange}>Wifi</Checkbox>
                    <Checkbox onChange={_this.onChange}>宽带</Checkbox>
                    <Checkbox onChange={_this.onChange}>独卫</Checkbox>
                  </Row>
                )}
              </FormItem>
              <Row className="form-title">数量</Row>
              <FormItem
                {...formItemLayout}
                label="可住人数">
                {getFieldDecorator('hostelNum', {
                  initialValue: 2,
                  rules: [{ required: true, message: '请输入可住人数' }],
                })(
                  <InputNumber min={1} max={10} onChange={_this.onChange} />
                )}
              </FormItem>
              <Row className="form-title">服务</Row>
              
              <Row>
                <Col span={4}>
                  <FormItem>
                    {getFieldDecorator('hostelHasbre', {})(
                      <Checkbox id='bre' onChange={_this.toggleDisabled}>早餐</Checkbox>
                    )}
                  </FormItem>
                </Col>
                <Col span={20}>
                  <FormItem>
                    {getFieldDecorator('hostelBrenum', {
                      initialValue: 1,
                    })(
                      <InputNumber disabled={_this.state.brechecked} min={1} max={10} onChange={_this.onChange} />
                    )}份
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span={4}>
                  <FormItem>
                    {getFieldDecorator('hostelCantui', {})(
                      <Checkbox id='tui' onChange={_this.toggleDisabled}>可退房</Checkbox>
                    )}
                  </FormItem>
                </Col>
                <Col span={20}>
                  <FormItem
                    {...formItemLayout}
                    label="退房时间: ">
                    {getFieldDecorator('hostelTuidate', {})(
                      <TimePicker disabled={_this.state.tuichecked} onChange={_this.onChange} defaultOpenValue={moment('00:00:00', 'HH:mm:ss')} /> 
                    )}前
                  </FormItem>
                </Col>
              </Row>
              {/* <FormItem
                {...formItemLayout}
                label={<Checkbox id='bre' onChange={this.toggleDisabled}>早餐</Checkbox>}>
                <InputNumber disabled={this.state.brechecked} min={1} max={10} defaultValue={2} onChange={this.onChange} /> 份
              </FormItem>
              <FormItem
                {...formItemLayout}
                label={<Checkbox id='tui' onChange={this.toggleDisabled}>可退房</Checkbox>}>
                <span>
                  退房时间: <TimePicker disabled={this.state.tuichecked} onChange={this.onChange} defaultOpenValue={moment('00:00:00', 'HH:mm:ss')} /> 前
                </span>
              </FormItem> */}
              <Row className="form-title">床型</Row>
              <FormItem>
                <Select defaultValue="大床" style={{ width: 120 }} onChange={_this.onChange}>
                  <Option value="大床">大床</Option>
                  <Option value="单人床">单人床</Option>
                  <Option value="双床">双床</Option>
                  <Option value="其他">其他</Option>
                </Select>
              </FormItem>
              <FormItem 
                {...formItemLayout}
                label="具体床型">
                <Input placeholder="床型，尺寸等" style={{ width: '50%' }} />
              </FormItem>
              <Row className="form-title">房情</Row>
              <FormItem 
                label="具体房价"
                {...formItemLayout}>
                <InputNumber
                  min={1} defaultValue={100} formatter={value => `￥ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                  parser={value => value.replace(/\$\s?|(,*)/g, '')} onChange={this.onChange} />
                <br />
              </FormItem>
              <FormItem 
                {...formItemLayout}
                label="可订总数">
                <InputNumber min={1} defaultValue={2} onChange={this.onChange} />
              </FormItem>
              <FormItem>
                <Button
                  type="primary"
                  htmlType="submit"
                  >
                  提交更新
                </Button>
              </FormItem>
            </Form>
          </Col>
          <Col xs={0} sm={0} md={11} lg={12} xl={13} >
            <Table 
              columns={columns}
              expandedRowRender={expand} 
              dataSource={data}
            />
          </Col>
        </Row>
      </div>
    );
  }
}

// export default HostelForm;

const WrappedHostelForm = Form.create()(HostelForm);

export default WrappedHostelForm;