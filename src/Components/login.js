import React, {Component} from 'react';
//import logo from './logo.svg';
import './AppLogin.css';
import 'antd/dist/antd.css';
import {message,Input,Row, Col, Collapse,Table} from 'antd';
const {Panel} = Collapse;
const {Column} = Table;

class AppLogin extends Component {

    
    constructor(props) {
        super(props);
        this.state = {
            data:[],
            id: null,
            name: null,
            price: null,
            
        }
    }
    fetchData = () => {
        fetch("https://5igwlepi8i.execute-api.us-east-1.amazonaws.com/items/get-items", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(response => response.json())
            .then(responseJson => {
                const results = responseJson.map(Items => ({

                    id: Items.id,
                    name: Items.name,
                    price: Items.price
                   
                }))
                // console.log(Items);
                this.setState({loading: false})
                this.setState({data: results});
                console.log(this.state.data);
            })
            .catch(error => {
                console.error(error);
            });
    };


    componentDidMount() {
        message.info("Please wait while the Data is Loading !");
        this.fetchData();
    }



    deleteItem = () => {
        console.log(this.state)
        message.info("Deleting item!  Please Wait")
            fetch("https://5igwlepi8i.execute-api.us-east-1.amazonaws.com/items/delete-item-trial-priti", {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "id": this.state.id
                }),
            })
                .then(res => res.json())
                .then(res => {
                    console.log(res)
                    message.success("Item Deleted !")
                    this.fetchData()
                })
                .catch(error => message.error("Deletion failed !"))
                
        
    }
    saveItem = () => {
        console.log(this.state)
        message.info("Adding item!  Please Wait")
            fetch("https://5igwlepi8i.execute-api.us-east-1.amazonaws.com/items", {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "id": this.state.id,
                    "name": this.state.name,
                    "price": this.state.price
                    
                }),
            })
                .then(res => res.json())
                .then(res => {
                    console.log(res)
                    message.success("Item Added !")
                    this.fetchData()
                })
                .catch(error => message.error("Addition failed !"))

        
    }



    render() {
        return (

        <Collapse defaultActiveKey={['3']} >
        <Panel header="ADD ITEM" key="1">


        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
            <Col className="gutter-row" span={8}>ID
            <Input style={{width: "50%", margin: 10}} 
                    value={this.state.id} onChange={(e) => {this.setState({id: e.target.value})}}/></Col>
              
            <Col className="gutter-row" span={8}> Name<Input style={{width: "50%", margin: 10}} 
                    value={this.state.name} onChange={(e) => {this.setState({name: e.target.value})}}/>
            </Col> 

            <Col className="gutter-row" span={8}>Price<Input style={{width: "50%", margin: 10}} 
                            value={this.state.price} onChange={(e) => {this.setState({price: e.target.value})}}/>
            </Col>
        </Row>                                 
            
        <button type="submit" onClick={this.saveItem}>Add</button>
        
            


        </Panel>
        <Panel header="DELETE ITEM" key="2">


        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
        <Col className="gutter-row" span={8}>ID <Input style={{width: "50%", margin: 10}} align='right'
                    value={this.state.id} onChange={(e) => {this.setState({id: e.target.value})}}/>
                  </Col>  </Row>
                            
              

            <button align='middle' type="submit" onClick={this.deleteItem}>Delete</button>



        </Panel>

        <Panel header="VIEW ITEM" key="3">
        <Table  dataSource={this.state.data}
                pagination={{
                        total: 10,
                        pageSize: 100,
                        hideOnSinglePage: true}}
                loading={this.state.loading}>

                        <Column title="ID" dataIndex="id" key="id"/>
                        <Column title="Name" dataIndex="name" key="name"/>
                        <Column title="Price" dataIndex="price" key="price"/>
                        
                    </Table> 
         

            </Panel>
        </Collapse>

                        

                   
        );
    }
}

export default AppLogin;
