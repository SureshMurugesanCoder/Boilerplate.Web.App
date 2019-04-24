import React, { Component } from 'react';
import { Button, Table, Modal, Header, Form, Segment, Message } from 'semantic-ui-react'

class DeleteCustomer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.deletecustomer.id,
            name: this.props.deletecustomer.name,
            address: this.props.deletecustomer.address,
            modalOpen: false,
        };
    }

    handleClose = () => this.setState({
        modalOpen: false
    },() => this.props.loadCustomer());

    handleOpen = () => this.setState({ modalOpen: true });

    DeleteCustomer() {

        let a = {
            Id: this.state.id,
            Name: this.state.name,
            Address: this.state.address,
        };

        //console.log("Deleting ID: " + a.Id);
        fetch("api/Cust/DeleteCustomer", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(a)
        });

        alert('Deleted')
    }

    render() {
        return (
            <Modal trigger={<Button onClick={this.handleOpen} color="red"> Delete </Button>}
                open={this.state.modalOpen} onClose={this.handleClose}
                closeIcon={true}
                size='small'>
                <Modal.Header> Delete Customer </Modal.Header>
                <Modal.Content>
                    <p> Are you sure to delete ? </p>
                </Modal.Content>
                <Modal.Actions>
                    <Button secondary onClick={this.handleClose}>Cancel</Button>
                    <Button className="ui red button" onClick={this.DeleteCustomer.bind(this)}> Delete </Button>
                </Modal.Actions>
            </Modal>
        );
    }
}

export default DeleteCustomer;