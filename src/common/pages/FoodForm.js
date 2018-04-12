import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Menu, Dropdown, Button, Icon, Popconfirm,message } from 'antd';
import { Table } from 'antd';
import { getStore } from '../utils/storage'
import { getFoodItems, delFoodItem } from '../api/foods';
import './style/foodForm.less';

class FoodForm extends Component {
  state = { 
    selectedRowKeys: [], // 选中的行
    data: null
  }

  onSelectChange = (selectedRowKeys) => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    this.setState({ selectedRowKeys });
  }

  componentWillMount() {
    this.getData()
  }

  getData(){
    let shop = getStore('shopInfo')
    getFoodItems({ shopId: shop.id }).then(res => {
      if (res.data.success) {
        this.setState({ data: res.data.data })
      }
    })  
  }

  delFood(id) { 
    delFoodItem({ id }).then(res => {
      if (res.data.success) {
        message.success('该记录已删除')
        this.getData()
        // this.setState({ data: res.data.data })
      }
    })  
  }

  render() {
    // 下拉菜单
    const categorysArr = []
    if(this.state.data !== null){
      this.state.data.forEach((ele) => {
        if (categorysArr.indexOf(ele.category) === -1) {
          categorysArr.push(ele.category)
        }
      })
    }
    
    const menuItems = categorysArr.map((ele, i) => {
      return (
        <Menu.Item key={i}>
          <a target="_blank">{ele}</a>
        </Menu.Item>
      )
    })
    const menu = (
      <Menu>{menuItems}</Menu>
    );

    // 表格列配置
    // 如果是可滑动表格则必须width，不然会不对齐
    const columns = [{
        title: '商品图片',
        key: 'img',
        dataIndex: 'imgdata',
        width: 150,
        render: (text, record, index) => {
          return (
            < img heght = '50px'
            width = '50px'
            src = {text}
            alt = "" / >
          )
        },
      }, {
        title: '商品分类',
        key: 'category',
        dataIndex: 'category',
        width: 150
      }, {
        title: '商品名称',
        dataIndex: 'name',
        key: 'name',
        width: 150
      }, {
        title: '单位',
        dataIndex: 'unit',
        key: 'unit',
        width: 150
      }, {
        title: '商品售价',
        dataIndex: 'price',
        key: 'price',
        width: 150,
        render: (text)=>{
          return (
            `￥${text}`
          )
        }
      }, {
        title: '商品标签',
        dataIndex: 'tips',
        key: 'tips',
        width: 150
      }, {
        title: '操作',
        key: 'action',
        width: 50,
        render: (text, record, index)=>{
          // 更多操作下拉
          const moreMenu = (
            <Menu>
              <Menu.Item>
                <Link 
                  to={{
                      pathname: "/app/foodForm/change",
                      query: record
                  }}
                >修改</Link>
              </Menu.Item>
              <Menu.Item>
                {/* 不知为何这里一定要用() => this.delFoodItem(record.id)这种写法 */}
                <Popconfirm title="是否确定删除该菜品?" onConfirm={() => this.delFood(record.id)}>
                  <a href="javascript:;">删除</a>
                </Popconfirm>
              </Menu.Item>
            </Menu>
          );
          return (
            <Dropdown overlay = {moreMenu}>
              <span>< Icon type = "plus"style = {{fontSize: 16,color: '#08c', cursor: 'pointer'}}/></span >
            </Dropdown>
          )
        }
      }]
    
    // 获取到选中行
    let { selectedRowKeys } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };

    // 判断是否有行被选中
    const hasSelected = selectedRowKeys.length > 0;

    const tableBox = () => {
      return (
        hasSelected 
          ? <div style={{ height: 34, verticalAlign: 'middle'}}>
            <span style={{ marginLeft: 8, height: 34, lineHeight: '34px', display: 'inline-block' }}>
              已选中 {selectedRowKeys.length} 个商品
            </span>
          </div>
          : <div className="table-box">
              <Dropdown className="table-head-drop" overlay={menu} trigger={['click']}>
                <a href="">全部分类<Icon type="down" /></a>
              </Dropdown>
              <Button type="primary">
                <Link to="/app/foodForm/new">新增</Link>
                {/* <Link to="/new">新增</Link> */}
              </Button>
            </div>
      )
    }

    return (
      <div>
        <div className="table-header">
          {tableBox()}
        </div>
        <div className="tabel-content">
          <Table 
          ref="table" 
          rowSelection={rowSelection} 
          columns={columns} 
          dataSource={this.state.data} 
          pagination={{ pageSize: 25 }} 
          scroll={{ y: 500 }}/>
        </div>
      </div>
    );
  }
}

export default FoodForm;