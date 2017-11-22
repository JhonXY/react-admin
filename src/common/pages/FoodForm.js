import React, { Component } from 'react';
import { Row, Col } from 'antd';
import { Menu, Dropdown, Button, Icon } from 'antd';
import { Input } from 'antd';
import { Table } from 'antd';
import './style/foodForm.scss';

class FoodForm extends Component {
  state = { 
    selectedRowKeys: [], // 选中的行
  }

  onSelectChange = (selectedRowKeys) => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    this.setState({ selectedRowKeys });
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

    // 更多操作下拉
    const moreMenu = (
      <Menu>
        <Menu.Item>
          <a target="_blank">修改</a>
        </Menu.Item>
        <Menu.Item>
          <a target="_blank">删除</a>
        </Menu.Item>
      </Menu>
    );

    // 表格列配置
    // 如果是可滑动表格则必须width，不然会不对齐
    const columns = [
      {
        title: '商品图片',
        dataIndex: 'img',
        width: 150
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
        title: '商品标签',
        dataIndex: 'tags',
        width: 150
      }, {
        title: '操作',
        dataIndex: 'more',
        width: 50
      }
    ];

    // 表格数据
    const data = [];
    for (let i = 0; i < 50; i++) {
      data.push({
        key: i,
        name: `啦啦啦 ${i}`,
        category: 'lalala',
        img: <img heght='50px' width='50px' src="https://oimageb5.ydstatic.com/image?id=-127115110116991995&amp;product=dict-homepage&amp;w=200&amp;h=150&amp;fill=0&amp;cw=200&amp;ch=150&amp;sbc=0&amp;cgra=CENTER" alt=""/>,
        unit: '件',
        tags: ['产品热销','最新上架'],
        more: <Dropdown overlay={moreMenu}><span href=""><Icon type="plus" style={{ fontSize: 16, color: '#08c' }} /></span></Dropdown>
      });
    }

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
          <Table rowSelection={rowSelection} columns={columns} dataSource={data} pagination={{ pageSize: 25 }} scroll={{ y: 500 }}/>
        </div>
      </div>
    );
  }
}

export default FoodForm;