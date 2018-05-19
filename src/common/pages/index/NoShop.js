import React, { Component } from 'react';
import { Map } from 'react-amap';

import { Steps, Button, message } from 'antd';
import { Form, Input } from 'antd';
import { Row, Col } from 'antd';
import { Spin, Icon, Card } from 'antd';
// api
import { shopInfo } from '../../api/users';
import { getStore,setStore } from '../../utils/storage';

const Step = Steps.Step;
const FormItem = Form.Item;
// 自定义加载

class NoShop extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 0,
      intro: '请介绍一下您的店铺！',
      center: { longitude: 0, latitude: 0 },
      getCenter: 0,
      mapInstance: {},
      forForm: {}
    };
  }

  componentDidMount(){
    var _this = this
    const { AMap } = window
    // b24cb87ddac059194fed7475d6f22ad8
    var mapObj = new AMap.Map('iCenter');  
    mapObj.plugin('AMap.Geolocation', function () {
      var geolocation = new AMap.Geolocation({
        enableHighAccuracy: true,//是否使用高精度定位，默认:true
        timeout: 10000,          //超过10秒后停止定位，默认：无穷大
        maximumAge: 0,           //定位结果缓存0毫秒，默认：0
        convert: true,           //自动偏移坐标，偏移后的坐标为高德坐标，默认：true
        showButton: true,        //显示定位按钮，默认：true
        buttonPosition: 'LB',    //定位按钮停靠位置，默认：'LB'，左下角
        buttonOffset: new AMap.Pixel(10, 20),//定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
        showMarker: true,        //定位成功后在定位到的位置显示点标记，默认：true
        showCircle: true,        //定位成功后用圆圈表示定位精度范围，默认：true
        panToLocation: true,     //定位成功后将定位到的位置作为地图中心点，默认：true
        zoomToAccuracy: true      //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
      });
      mapObj.addControl(geolocation);
      geolocation.getCurrentPosition();
      AMap.event.addListener(geolocation, 'complete', onComplete);//返回定位信息
      AMap.event.addListener(geolocation, 'error', onError);      //返回定位出错信息
      //解析定位结果
      function onComplete(data) {
        var str = ['定位成功'];
        str.push('经度：' + data.position.getLng());
        str.push('纬度：' + data.position.getLat());
        if (data.accuracy) {
          str.push('精度：' + data.accuracy + ' 米');
         }//如为IP精确定位结果则没有精度信息
        str.push('是否经过偏移：' + (data.isConverted ? '是' : '否'));
        // console.log(str);
        _this.setState({
          center: { longitude: data.position.getLng(), latitude: data.position.getLat() },
          getCenter: 1
        })
      }
          //解析定位错误信息
      function onError(data) {
        console.log('定位失败');
        _this.setState({
          getCenter: -1
        })
      }
    });
  }

  componentWillUnmount(){
    // 滞空所有的setState
    this.setState = (state, callback) => {
      return
    }
  }

  next = () => {
    if(this.state.current === 1){
      this.handleSubmit()
    }
    let current = this.state.current + 1
    this.setState({ current })
  }

  prev = () => {
    let current = this.state.current - 1
    this.setState({ current })
  }

  done = () => {
    let userInfo = getStore('userInfo')
    let {
      center,
      forForm
    } = this.state
    let obj = {
      longitude: center.longitude,
      latitude: center.latitude,
      tele: forForm.phone,
      area: forForm.shopArea,
      details: forForm.shopInfo,
      name: forForm.shopName,
      MasterId: userInfo.id
    }
    
    shopInfo(obj).then(res => {
      if(res.data.success){
        setStore('shopInfo', res.data.shop)
        this.props.hasNow(true)
      }
    })
  }
  
  handleSubmit = () => {
    // e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        let obj = {
          phone: values.tele,
          shopName: values.shopName,
          shopArea: values.shopArea,
          shopInfo: values.foodintro
        }
        // 因为setState的异步性，如果有需要先set完再进行的操作，需要跟在第二个参数的函数中
        this.setState({forForm: obj}, ()=>{
          console.log('forform: ', this.state.forForm);
          // this.done()
        })
      } else {
        console.log(err);
      }
    });
  }
  
  render() {
    // 当前step
    const { current, intro } = this.state
    const event = {
      created: (mapObj, b) => {
        this.setState({
          mapInstance: mapObj
        })
      },
      complete: (e) => {
      },
      moveend: (e, i) => {
        // console.log(this.state.mapInstance);
      }
    }

    const { getFieldDecorator } = this.props.form
    
    // 表单布局
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };

    const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;
    const centerShow = ()=>{
      let data = this.state.getCenter
      switch (true) {
        case data === 0:
          return (
            <div>正在获取当前定位 <Spin style={{ marginLeft: 15}} indicator={antIcon} size="small" /></div>
            // <Card loading={true} title="当前经纬度">
            //   {/* 经度：{this.state.longitude} ，纬度：{this.state.latitude} */}
            // </Card>
          )
        case data === -1:
          return (
            <div>获取定位失败，请检查网络或清理缓存！</div>
          )
        case data === 1:
          return (
            <Card title="当前经纬度">
              经度：{this.state.center.longitude} ，纬度：{this.state.center.latitude}
            </Card>
          )
        default: break
      }
    }

    return (
      <div className="mt-15 no-shop">
        <Steps current={current}>
          <Step title="" description="" />
          <Step title="" description="" />
          <Step title="" description="" />
        </Steps>
        <Form onSubmit={this.handleSubmit}>
        <div className="steps-content">
          {
            current === 0
            &&
            <div className="step-0">
              <div className="title">请填写相关信息</div>
            </div>
          }
          {
            current === 1
            &&
            <div className="step-1">
              
                <Row type="flex" justify="space-around" align="middle">
                  <Col span={8}>
                    <FormItem
                      {...formItemLayout}
                      label="手机号">
                      {getFieldDecorator('tele', {
                        rules: [ 
                          {
                            required: true, whitespace: true, message: '请输入你的电话号码！'
                          },
                          {
                            validator: (rule, value, callback) => {
                              // 11位数字，且以1开头
                              var re = /^1\d{10}$/;
                              if (value && re.test(value)) {
                                // 这样会修改一整个对象
                                // this.setState({
                                //   forForm: { phone : value}  
                                // })
                                // 这样就只会修改部分属性
                                // this.setState(Object.assign({}, this.state.forForm, { phone: value }))
                                callback()
                              }
                              callback('这不是一个有效的手机号！')
                              // Note: 必须总是返回一个 callback，否则 validateFieldsAndScroll 无法响应
                            }
                          }
                        ],
                      })(<Input placeholder="请输入您店铺使用的手机号" /> )}
                    </FormItem>
                    <FormItem
                      {...formItemLayout}
                      label="店铺名">
                      {getFieldDecorator('shopName', {
                        rules: [
                          {
                            required: true, message: '请输入你的店铺名！',
                          },
                          {
                            type: 'string', message: '必须是合法的名称！',
                          },
                          // {
                          //   validator: (rule, value, callback) => {
                          //     // this.setState({
                          //     //   forForm: { shopName: value }
                          //     // })
                          //     // this.setState(Object.assign({}, this.state.forForm, { shopName: value }))
                          //     callback()
                          //     // Note: 必须总是返回一个 callback，否则 validateFieldsAndScroll 无法响应
                          //   }
                          // }
                        ],
                      })(<Input placeholder="请输入您的店铺名" />)}
                    </FormItem>
                    <FormItem
                      {...formItemLayout}
                      label="店铺地址">
                      {getFieldDecorator('shopArea', {
                        rules: [
                          {
                            required: true, message: '请输入你的店铺地址！',
                          },
                          {
                            type: 'string', message: '必须是合法的地址！',
                          },
                          // {
                          //   validator: (rule, value, callback) => {
                          //     // this.setState({
                          //     //   forForm: { shopArea: value }
                          //     // })
                          //     // this.setState(Object.assign({}, this.state.forForm, { shopArea: value }))
                          //     callback()
                          //     // Note: 必须总是返回一个 callback，否则 validateFieldsAndScroll 无法响应
                          //   }
                          // }
                        ],
                      })(<Input placeholder="请输入您的店铺地址" />)}
                    </FormItem>
                  </Col>
                  <Col span={8}>
                    <FormItem
                      label="店铺简介">
                      {getFieldDecorator('foodintro', {
                        initialValue: intro,
                        rules: [
                          {
                            // validator: (rule, value, callback) => {
                            //   // this.setState({
                            //   //   forForm: { shopInfo: value }
                            //   // })
                            //   this.setState(Object.assign({}, this.state.forForm, { shopInfo: value }))
                            //   callback()
                            //   // Note: 必须总是返回一个 callback，否则 validateFieldsAndScroll 无法响应
                            // }
                          }
                        ]
                      })(
                        <Input.TextArea rows={5} cols={50}></Input.TextArea>
                      )}
                    </FormItem>
                  </Col>
                </Row>              
             
            </div>
          }
          {
            current === 2
            &&
            <div className="step-2">
              <Row type="flex" justify="space-around" align="middle">
                <Col span={8}>
                  <div className="left-wrap">
                    {centerShow()}
                  </div>
                </Col>
                <Col span={8}>
                  <div className="map-wrap">
                    <Map
                      center={this.state.center}
                      amapkey="b24cb87ddac059194fed7475d6f22ad8"
                      plugins={['ToolBar']}
                      events={event}>
                    </Map>
                  </div>
                </Col>
              </Row>
            </div>
          }
        </div>
        <div className="steps-actions">
          { 
            current > 0
            &&
            <Button onClick={this.prev}>上一步</Button>   
          }
          {
            current !== 2
            &&
            <Button onClick={() =>this.next()}>下一步</Button>
          }
          {
            current === 2
            &&
            <Button onClick={() => this.done()}>完成</Button>
          }         
        </div>
        </Form>
      </div>
    )
  }
}

const WrappedNoShop = Form.create()(NoShop);
export default WrappedNoShop;