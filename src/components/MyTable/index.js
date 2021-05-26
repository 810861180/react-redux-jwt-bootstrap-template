import React, { Component } from 'react'
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import './table.css'

// const tableData = {
//   col:[
//     {props: 'id', label: 'ID'},
//   ],
//   data: [],
//   btnTitle: '操作',
//   button: [
//     {name: '删除', variant: 'danger', handleName: 'handleDelete'}
//   ]
// }

class MyTable extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    sendData = (name, data) => {
        this.props[name](data)
    }

    render() {
        return (
            <div className="table-card">
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            {
                                this.props.tableData.col.map((item, index) => (
                                    <th key={index}>{item.label}</th>
                                ))
                            }
                            {
                                this.props.tableData.btnTitle
                                &&
                                <th>{this.props.tableData.btnTitle}</th>
                            }
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.props.tableData.data.map((item, index) => (
                                <tr key={index}>
                                    {
                                        this.props.tableData.col.map((col, index) => (
                                            <td key={index}>{item[col.props]}</td>
                                        ))
                                    }
                                    <td>
                                        <Button
                                            variant={item.btn.variant || 'primary'}
                                            onClick={() => this.sendData(item.btn.handleName, item)}
                                        >{item.btn.name}</Button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </Table>
            </div>
        )
    }
}
export default MyTable