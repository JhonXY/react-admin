import React, { Component } from 'react';
// import { Row, Col } from 'antd';
import { Link } from 'react-router-dom';
import { Menu, Dropdown, Button, Icon } from 'antd';
import { Input } from 'antd';
import { Table } from 'antd';
import './style/foodForm.scss';

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
    const data = [];
    for (let i = 0; i < 50; i++) {
      data.push({
        key: i,
        name: `啦啦啦 ${i}`,
        category: 'lalala',
        img: "https://oimageb7.ydstatic.com/image?id=8890261127673308097&product=dict-homepage&w=200&h=150&fill=0&cw=200&ch=150&sbc=0&cgra=CENTER",
        unit: '件',
        price: 123,
        tags: ['产品热销', '最新上架'],
      });
    }
    this.setState({data})
  }

  render() {
    // 下拉菜单
    const menu = (
      <Menu>
        {/* 这里循环分类输出item */}
        <Menu.Item>
          <a target="_blank">1st menu item</a>
        </Menu.Item>
        <Menu.Item>
          <a target="_blank">2nd menu item</a>
        </Menu.Item>
        <Menu.Item>
          <a target="_blank">3rd menu item</a>
        </Menu.Item>
      </Menu>
    );

    // 表格列配置
    // 如果是可滑动表格则必须width，不然会不对齐
    const columns = [
      {
        title: '商品图片',
        dataIndex: 'img',
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
        dataIndex: 'category',
        width: 150
      }, {
        title: '商品名称',
        dataIndex: 'name',
        width: 150
      }, {
        title: '单位',
        dataIndex: 'unit',
        width: 150
      }, {
        title: '商品售价',
        dataIndex: 'price',
        width: 150,
        render: (text)=>{
          return (
            `￥${text}`
          )
        }
      }, {
        title: '商品标签',
        dataIndex: 'tags',
        width: 150
      }, {
        title: '操作',
        width: 50,
        render: (text, record, index)=>{
          // 更多操作下拉
          const moreMenu = (
            <Menu>
              <Menu.Item>
                <Link 
                  to={{
                      pathname: "/form/foodForm/change",
                      query: record
                  }}
                >修改</Link>
              </Menu.Item>
              <Menu.Item>
                <a target="_blank">删除</a>
              </Menu.Item>
            </Menu>
          );
          return (
            <Dropdown overlay = {moreMenu}>
              <span>< Icon type = "plus"style = {{fontSize: 16,color: '#08c'}}/></span >
            </Dropdown>
          )
        }
      }
    ];

    // 获取到选中行
    const { selectedRowKeys } = this.state;
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
              <Button type="primary">新增</Button>
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