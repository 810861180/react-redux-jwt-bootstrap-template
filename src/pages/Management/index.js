import React, { Component } from 'react'
import { Jumbotron } from "react-bootstrap";
import MyTable from "../../components/MyTable"
import Axios from "../../utils/Axios";
import { apiUrl } from "../../config/constants";

class Management extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tableData: {
                col:[
                    {props: 'name', label: 'Name'},
                    {props: 'email', label: 'Email'},
                    {props: 'accountBlocked', label: 'accountBlocked'}
                ],
                data: [],
                btnTitle: 'Block?'
            }
        };
    }
    upDateTableData = (attr, data) => {
        const tableData = this.state.tableData
        tableData[attr] = data
        this.setState({tableData})
    }
    // 请求
    queryData = () => {
        Axios.get(`${apiUrl}/userlist`).then(res => {
            // console.log(res.data)
            res.data.data.rows.forEach(item => {
                item.accountBlocked = String(item.accountBlocked)
                item.btn = item.accountBlocked ? {
                    name: 'block',
                    variant: 'danger',
                    handleName: 'handleDelete'
                }: {
                    name: 'unblcok',
                    variant: '',
                    handleName: 'handleUpdate'
                }
            })
            if (!res.data.code) {
                this.upDateTableData('data', res.data.data.rows)
            }
        })
    }
    // 表格删除触发
    handleDelete = e => {
        console.log(e)
    }
    // 表格更新触发
    handleUpdate = e => {
        console.log(e)
        
        // const tableData = this.state.tableData
        // tableData.data = []
        // this.setState({tableData})
    }
    // 生命周期 组件第一次渲染完成，此时dom节点已经生成，可以在这里调用ajax请求
    componentDidMount() {
        this.queryData()   
    }

    render() {
        return (
            <div>
                <Jumbotron>
                    <h1>User Management</h1>
                </Jumbotron>
                <div className="home-table">
                    < MyTable 
                        handleDelete={this.handleDelete.bind(this)}
                        handleUpdate={this.handleUpdate.bind(this)}
                        tableData={this.state.tableData} 
                    />
                </div>
            </div>
        )
    }
}
export default Management