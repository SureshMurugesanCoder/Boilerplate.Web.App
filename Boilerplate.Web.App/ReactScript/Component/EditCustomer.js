import React, { Component } from 'react';
import { Button, Table, Modal, Header, Form, Segment, Message } from 'semantic-ui-react'

class EditCustomer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.editcustomer.id,
            name: this.props.editcustomer.name,
            address: this.props.editcustomer.address,
            modalOpen: false,
        };
    }

    handleClose = () => this.setState({
        modalOpen: false
    },() => this.props.loadCustomer());

    handleOpen = () => this.setState({ modalOpen: true });

    UpdateCustomer() {

        let a = {
            Id: this.state.id,
            Name: this.state.name,
            Address: this.state.address,
        };

        fetch("api/Cust/AddCustomer", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(a)
        });

        alert("Customer Updated Successfully..");
    }

    render() {
        return (
                <Modal trigger={<Button onClick={this.handleOpen} color="yellow"> Edit </Button>} 
                open={this.state.modalOpen} onClose={this.handleClose}
                closeIcon={true}
                size='small'>
                <Modal.Header> Edit Customer </Modal.Header>
                <Modal.Content>
                    <Form>
                        <Form.Input fluid label='Name' placeholder='Name' type='text' value={this.state.name} onChange={e => this.setState({ name: e.target.value })} />
                        <Form.Input fluid label='Address' placeholder='Address' type='text' value={this.state.address} onChange={e => this.setState({ address: e.target.value })} />
                    </Form>
                </Modal.Content>
                <Modal.Actions>
                    <Button secondary onClick={this.handleClose}>Cancel</Button>
                    <Button className="ui green button" onClick={this.UpdateCustomer.bind(this)}> Edit </Button>
                </Modal.Actions>
            </Modal>
        );
    }
}

export default EditCustomer;