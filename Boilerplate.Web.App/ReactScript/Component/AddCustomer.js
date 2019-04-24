import React, { Component } from 'react';
import { Button, Table, Modal, Header, Form, Segment, Message } from 'semantic-ui-react'

export default class CreateCust extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            address: "",
            complete: false,
            modalOpen: false
        };
    }

    handleClose = () => this.setState({
        modalOpen: false,
        name: "",
        address: "",
    });

    handleOpen = () => this.setState({ modalOpen: true });


    AddCustomer() {

        let a = {
            id: Math.floor(Math.random() * 100) + 1,
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
        return (
        <div>
            <Modal trigger={<Button onClick={this.handleOpen} color="blue"> Add Customer</Button>}
                open={this.state.modalOpen} onClose={this.handleClose}
                closeIcon={true} size='small'>


                <Modal.Header> Create Customer </Modal.Header>

                <Modal.Content>
                    <Form>
                        <Form.Input required={true} label='Name' placeholder='Name' type='text' onChange={e => this.setState({ name: e.target.value })} />
                        <Form.Input required={true} label='Address' placeholder='Address' type='text' onChange={e => this.setState({ address: e.target.value })} />
                    </Form>
                </Modal.Content>

                <Modal.Actions>
                    <Button secondary onClick={this.handleClose}>Cancel</Button>
                    <Button positive icon="checkmark" labelPosition="right" onClick={this.AddCustomer.bind(this)}>Create</Button>
                </Modal.Actions>
            </Modal>
        </div>

        );
    }
}