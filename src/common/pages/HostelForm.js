import React, { Component } from 'react';
import { Row, Col, Checkbox, InputNumber, Select, Input, Button, Message } from 'antd';
import { Form } from 'antd';
import { TimePicker } from 'antd';
import { Table } from 'antd';
import moment from 'moment';
import './style/form.less';
import { getStore } from '../utils/storage';
import { subHostel, getHotels } from '../api/hostels';

const FormItem = Form.Item;
const Option = Select.Option;
const serviceMap = ['wifi', 'net', 'bathroom']
// const { Column, ColumnGroup } = Table;

class HostelForm extends Component {
  state = {
    data: [],
    // 表单相关控制初始化
    tuichecked: true, //是否可退 
    brechecked: true, //是否有早餐 
    disabled: true, // 控制何时可退后的输入框是否可用 
  }

  componentDidMount(){
    let shop = getStore('shopInfo')
    this.setState({shop}, () =>{
      this.getData(shop)
    })
    // 获取当前店铺的旅店信息
  }

  toggleDisabled = (e) => {
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

  getData(shop) {
    getHotels({
      shopId: shop.id
    }).then(res => {
      console.log(res);
      let newData = res.data.data.data.map((item, i) => {
        let cur = {}, service = []
        cur.key = i
        item.equipments.split('').forEach((t, index) => {
          if (t === '1') {
            service.push(serviceMap[index])
          }
        })
        if (item.cancel === '1') {
          service.push({
            cancel: {
              whether: 1,
              date: item.cancelDate
            }
          })
        }
        if (item.breakfast > 0) {
          service.push({
            breakfast: {
              whether: 1,
              num: item.breakfast
            }
          })
        } else {
          service.push({
            breakfast: {
              whether: 0,
              num: item.breakfast
            }
          })
        }

        return {
          date: new Date(item.createdAt).toLocaleDateString().split('/').map(i => i.length < 2 ? '0' + i : i).join('-'),
          price: item.price, member: 2, instro: item.intro, model: item.name, key: i, service,left: item.left
        }
      })
      // console.log(newData);
      this.setState({
        data: newData
      })
    })
  }

  onChange(e) {
    e.target 
      ? console.log('e.target :', e.target)
      : console.log(`e : ${e}`)
  }

  // 利用箭頭函數直接取到class的this
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        // 此处做提交处理
        if (values.hostelTuidate) values.hostelTuidate = values.hostelTuidate['_d'].toLocaleTimeString()
        console.log('Received values of form: ', values);
        let shop = getStore('shopInfo')
        let obj = {
          name: values.hostelBedType,
          intro: values.hostelBedDetail || '暂无',
          breakfast: values.hostelBrenum,
          price: values.hostelPrice,
          cancel: values.hostelCantui || '0',
          cancelDate: values.hostelTuidate || '不可退',
          equipments: [
            values.hostelEquipment_bathroom,
            values.hostelEquipment_net,
            values.hostelEquipment_wifi
          ],
          left: values.hostelNum,
          shopId: shop.id
        }
        subHostel(obj).then(res => {
          if(res.data.success){
            Message.success(res.data.message)
            this.getData(this.state.shop)
          } else {
            Message.error(res.data.message)
          }
        })
      }
    });
  }

  render() {
    const _this = this;

    const { getFieldDecorator } = this.props.form;
    // 接口获取已存在的床位信息

    // 表格结构
    const columns = [
      {title: '床型', dataIndex: 'model', key: 'model'},
      {title: '售价', dataIndex: 'price', key: 'price'},
      {title: '总量', dataIndex: 'left', key: 'left'},
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
      let more = data.service.map((item, index, arr) => {
        if (typeof item !== 'object') {
          return (
            <span key={index}>{item}</span>
          )
        } else {
          // 通过switch来为不同的复杂对象做处理
          switch (true) {
            case (typeof item.breakfast === 'object') :
              if (item.breakfast.whether === 0) break
              return (<span key={index}>早餐供应: {item.breakfast.num} 份</span>)
            case (typeof item.cancel === 'object') :
              if (item.cancel.whether === 0) break
              return (<span key={index}>退房时间: {item.cancel.date} 前</span>)
            default: break
          }
        }
      })    
      if(more.length > 0 && !!more[0]){
        return (
          <section>提供服务 :
            <div className="service-items" key={data.key}>
              {more}
            </div>
          </section>
        )
      } else {
        return (
          <div className="service-items" key={data.key}>
            暂无更多
          </div>
        )
      }
    }

    const equipments=[
      {name: 'wifi', show: '无线'},
      {name: 'net', show: '宽带'},
      {name: 'bathroom', show: '独卫'},
      // {name: '', show: '无线'},
    ]
    const hostelEquipments = ()=>{
      return(
        equipments.map((ele, i) => {
          return (
            <FormItem
              key={i}>
              {getFieldDecorator(`hostelEquipment_${ele.name}`, {})(
                  <Checkbox onChange={_this.onChange}>{ele.show}</Checkbox>
              )}
            </FormItem>
          )
        })
      )
    }

    return (
      <div style={{marginTop: 20}}>
        <Row type="flex" justify="space-around">
          <Col xs={24} sm={24} md={11} lg={10} xl={8} >
            <Form 
              layout="vertical"
              onSubmit={this.handleSubmit}>
              <Row className="form-title">设备</Row>
              <Row type="flex" justify="start">
                {hostelEquipments()}
              </Row>
              <Row className="form-title">数量</Row>
              <FormItem
                {...formItemLayout}
                label="可住人数">
                {getFieldDecorator('hostelPeoNum', {
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
                      initialValue: 0,
                    })(
                      <InputNumber disabled={_this.state.brechecked} min={0} max={10} onChange={_this.onChange} />
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
                      <TimePicker disabled={_this.state.tuichecked} onChange={_this.onChange} defaultOpenValue={moment('07:00:00', 'HH:mm:ss')} /> 
                    )}前
                  </FormItem>
                </Col>
              </Row>
              <Row className="form-title">床型</Row>
              <FormItem>
                {getFieldDecorator('hostelBedType', {
                  initialValue: '大床'
                })(
                  <Select style={{ width: 120 }} onChange={_this.onChange}>
                    <Option value="大床">大床</Option>
                    <Option value="单人床">单人床</Option>
                    <Option value="双床">双床</Option>
                    <Option value="其他">其他</Option>
                  </Select>
                )}
                {/* <Select defaultValue="大床" style={{ width: 120 }} onChange={_this.onChange}>
                  <Option value="大床">大床</Option>
                  <Option value="单人床">单人床</Option>
                  <Option value="双床">双床</Option>
                  <Option value="其他">其他</Option>
                </Select> */}
              </FormItem>
              <FormItem 
                {...formItemLayout}
                label="具体床型">
                {getFieldDecorator('hostelBedDetail', {})(
                  <Input placeholder="床型，尺寸等" style={{ width: '50%' }} />
                )}
              </FormItem>
              <Row className="form-title">房情</Row>
              <FormItem 
                label="具体房价"
                {...formItemLayout}>
                {getFieldDecorator('hostelPrice', {
                  initialValue: 100,
                  rules: [{ required: true, message: '请输入具体房价' }],
                })(
                  <InputNumber
                    formatter={value => `￥ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                    parser={value => value.replace(/\$\s?|(,*)/g, '')} onChange={this.onChange} />
                )}
                <br />
              </FormItem>
              <FormItem 
                {...formItemLayout}
                label="可订总数">
                {getFieldDecorator('hostelNum', {
                  initialValue: 2,
                  min: 1,
                  rules: [{ required: true, message: '请输入可订总数' }],
                })(
                  <InputNumber min={1} onChange={this.onChange} />
                )}
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
              dataSource={this.state.data}
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