// ./src/common/main.component.jsx
import React, { Component } from 'react';
import { Button, Table, Modal, Header, Form, Segment, Message } from 'semantic-ui-react'
import { default as UUID } from "node-uuid";
import EditCustomer from './EditCustomer';
import DeleteCustomer from './DeleteCustomer';

class CustomerDisp extends Component {
    constructor(props) {
        super(props);
        this.state = { Customers: [], loading: true, name: "", address: "", modalOpen: false};
    }

    componentDidMount() {
        this.FetchCustomer();
    }

    FetchCustomer = () => {
        fetch("api/Cust/CustomerDisplay")
            .then(response => response.json())
            .then(data => {
                this.setState({ Customers: data, loading: false });
            });
    }

    handleClose = () => this.setState({
        modalOpen: false,
        name: "",
        address: "",
    }, () => this.FetchCustomer());

    handleOpen = () => this.setState({ modalOpen: true });

    AddCustomer() {

        let a = {
            id: Math.floor(Math.random() * 100) + 1 ,
            name: this.state.name,
            address: this.state.address,
        };

        this.setState({
            Customers: [...this.state.Customers, a]
        });

        fetch("api/Cust/AddCustomer", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(a)
        });
        alert("Customer Added Successfully..");
    }

   
    render() {

        const Customer = this.state.Customers;

 
        return (
            <div>
                <div>
                    <Modal trigger={<Button onClick={this.handleOpen} color="blue"> Add Customer</Button>}
                        open={this.state.modalOpen} onClose={this.handleClose}
                        closeIcon={true} size='small'>
                        <Modal.Header> Create Customer </Modal.Header>
                        <Modal.Content>
                            <Form>
                                <Form.Input required={true} label='Name' placeholder='Name' type='text' onChange={e => this.setState({ name: e.target.value })} />
                                <Form.Input required={true} label='Address' placeholder='Address' type='text' onChange={e => this.setState({ address: e.target.value })}/>
                            </Form>
                        </Modal.Content>
                        <Modal.Actions>
                            <Button secondary onClick={this.handleClose}>Cancel</Button>
                            <Button className="ui green button" onClick={this.AddCustomer.bind(this)}>Create</Button>
                        </Modal.Actions>
                    </Modal>
                </div>
                
                <Table celled>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Name</Table.HeaderCell>
                            <Table.HeaderCell>Address</Table.HeaderCell>
                            <Table.HeaderCell>Actions</Table.HeaderCell>
                            <Table.HeaderCell>Actions</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {Customer.map(name => (
                            <Table.Row key={name.id}>

                                <Table.Cell>{name.name}</Table.Cell>

                                <Table.Cell>{name.address}</Table.Cell>
                                
                                <Table.Cell>
                                    <EditCustomer editcustomer={name} loadCustomer={this.FetchCustomer}/>
                                </Table.Cell>
                                <Table.Cell>
                                    <DeleteCustomer deletecustomer={name} loadCustomer={this.FetchCustomer} />
                                </Table.Cell>
                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table>
            </div>
        );
    }
}

const btnstyle = {
    border: '1px solid black',
    padding: '2px',
    float: 'right',
    flex: 'auto'
}

export default CustomerDisp;