import React, { Component } from 'react';
import { Table } from 'antd';
import { getStore } from '../utils/storage';
// import socket from '../api/socket';
import { getAllOrder } from '../api/orders';
// import axios from 'axios'
import moment from 'moment'

function formDate(time) {
  return new Date(time).getTime()
}
function formDate2(time) {
  let a = new Date(time)
  return moment(a).format("YYYY-MM-DD HH:mm:ss")
}

class OrderTable extends Component {
  state = {
    shop: null,
    tableData: [],
  }

  handleChange = (pagination, filters, sorter) => {
    console.log('Various parameters', pagination, filters, sorter);
  }
  componentWillMount() {
    const shop = getStore('shopInfo')
    this.setState({ shop })
    getAllOrder(shop.id, -1).then(res => {
      let data = res.data.data
      let newData = data.map((item, i) => {
        let sortDate = formDate(item.updatedAt)
        let sortDate2 = formDate(item.createdAt)
        item.key = i
        // 时间戳用于更新时间排序
        item.sortDate = sortDate
        // 时间戳用于下单时间排序
        item.sortDate2 = sortDate2
        item.orderType = 1
        if (item.hasOwnProperty('purchaser')) {
          item.orderType = 0
          item.checkMan = item.purchaser
        }
        return item
      }).sort((a, b) =>  b.sortDate - a.sortDate)
      this.setState({
        tableData: newData
      })
    })
  }
  render() {

    const columns = [{
      title: '订单号',
      key: 'id',
      dataIndex: 'id',
      width: 250,
    }, {
      title: '订单类型',
      key: 'orderType',
      dataIndex: 'orderType',
      width: 150,
      render: index => index ? '旅店' : '餐饮'
    }, {
      title: '客户名称',
      dataIndex: 'checkMan',
      key: 'checkMan',
      width: 150,
      sorter: (a, b) => a.checkMan.length - b.checkMan.length,
    }, {
      title: '金额（元）',
      dataIndex: 'amount',
      key: 'amount',
      width: 150,
      sorter: (a, b) => a.amount - b.amount,
    }, {
      title: '下单时间',
      dataIndex: 'createdAt',
      key: 'createdAt',
      width: 150,
      render: time => formDate2(time),
      sorter: (a, b) => a.sortDate2 - b.sortDate2,
    }, {
      title: '更新时间',
      dataIndex: 'updatedAt',
      key: 'updatedAt',
      width: 150,
      render: time => formDate2(time),
      sorter: (a, b) => a.sortDate - b.sortDate
    }, {
      title: '订单状态',
      dataIndex: 'status',
      key: 'status',
      width: 150,
      render: (index) => {
        switch (true) {
          case index === 0:
            return '待付款';
          case index === 1:
            return '已付款';
          case index === 2:
            return '已完成';
          case index === 3:
            return '已退款';
          default: break
        }
      },
      sorter: (a, b) => a.status - b.status
    }]

    return (
      <div style={{marginTop: 20}}>
      <Table
        columns={columns}
        dataSource={this.state.tableData}
        pagination={{ pageSize: 12 }}
        onChange={this.handleChange}
        // scroll={{ y: 600 }}
      />
      </div>
    );
  }
}

export default OrderTable;