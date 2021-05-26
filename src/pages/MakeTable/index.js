import React, { Component } from 'react'
import { Jumbotron } from "react-bootstrap";
import Button from "react-bootstrap/Button";
// import { useSelector } from "react-redux";
// import { selectToken } from "../../store/user/selectors";
import Axios from "../../utils/Axios";
import { apiUrl } from "../../config/constants";
import './MakeTable.css'

// const token = useSelector(selectToken)

class Table extends Component {
    constructor(props) {
        super(props)
    }

    handleBtn() {
        this.props.handleBtn()
    }

    orders() {
        Axios.post(`${apiUrl}/addorder`).then(res => {
            if (!res.data.code) {
                
                
            }
        })
    }

    render() {
        return(
            <div 
            style={{width: this.props.data.seats * 0.95 * 10 + '%'}}
            className = {`${this.props.data.state ? 'choosableTab' : 'disableTab'} table-main`} 
            >
                <span>Table{this.props.index + 1}, seats:{this.props.data.seats}</span>
                <div>
                    {
                        !this.props.data.state ? 
                        <Button variant = "primary" onClick={() => this.handleBtn()}> reserve table </Button> : null
                    }
                </div>
            </div>
        )
    }
}

class MakeTable extends Component {
    constructor(props) {
        super(props)
        this.state = {
            date: '2021-04-22',
            tables: []
        }
    } 

    queryTable() {
        Axios.get(`${apiUrl}/tablelist`).then(res => {
            console.log(res.data)
            if (!res.data.code) {
                this.setState({
                    tables: res.data.data
                })
            }
        })
    }
    
    handleBtn() {
        Axios.post(`${apiUrl}/addorder`).then(res => {
            if (!res.data.code) {


            }
        })
    }

    componentDidMount() {
        this.queryTable()
    }

    render() {
        return (
            <div>
                <Jumbotron>
                    <h1>Make a reservation</h1>
                </Jumbotron>
                <div className="select-table">
                    <input id="meeting" type="date" onChange={value => {this.handleDate(value)}} value={this.state.date} />
                    <div className = "tables">
                        {
                            this.state.tables.map((item, index) => {
                                return(
                                    < Table key={index} handleBtn={this.handleBtn.bind(this)} data={item} index={index} / >
                                )
                            })
                        }
                    </div>
                </div>
                
            </div>
        )
    }
}

export default MakeTable