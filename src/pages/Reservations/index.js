import React, { Component } from 'react'
import { Jumbotron } from "react-bootstrap";
import MyTable from "../../components/MyTable"
import Axios from "../../utils/Axios";

import { apiUrl } from "../../config/constants";

class Reservations extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tableData: {
                col:[
                    {props: 'date', label: 'Date'},
                    {props: 'id', label: 'Table'},
                    {props: 'name', label: 'Name'},
                    {props: 'email', label: 'Email'}
                ],
                data: [],
                btnTitle: 'Cancel?'
            }
        };
    }
    upDateTableData = (attr, data) => {
        const tableData = this.state.tableData
        tableData[attr] = data
        this.setState({tableData})
    }
    // 请求
    queryData() {
        Axios.get(`/orderlist`).then(res => {
            if (!res.data.code) {
                res.data.data.forEach(item => {
                    item.btn = {
                        name: 'Cancel?',
                        variant: 'danger',
                        handleName: 'handleDelete'
                    }
                })
                this.upDateTableData('data', res.data.data)
            }
        })
    }
    // 删除
    handleDelete(e) {

    }
    // 生命周期 组件第一次渲染完成，此时dom节点已经生成，可以在这里调用ajax请求
    componentDidMount() {
        this.queryData()
    }

    render() {
        return (
            <div>
                <Jumbotron>
                    <h1>Upcoming Reservations</h1>
                </Jumbotron>
                <div className="home-table">
                    < MyTable 
                        handleDelete={this.handleDelete.bind(this)}
                        tableData={this.state.tableData} 
                    />
                </div>
            </div>
        )
    }
}
export default Reservations