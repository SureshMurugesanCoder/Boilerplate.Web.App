import React, { Component } from 'react';
import { Button, Table, Modal, Header, Form, Segment, Message } from 'semantic-ui-react'

class DeleteProduct extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.deleteproduct.id,
            name: this.props.deleteproduct.name,
            price: this.props.deleteproduct.price,
            modalOpen: false,
        };
    }

    handleClose = () => this.setState({
        modalOpen: false
    }, () => this.props.loadProduct());

    handleOpen = () => this.setState({ modalOpen: true });

    DeleteProduct() {

        let a = {
            Id: this.state.id,
            Name: this.state.name,
            Price: this.state.price,
        };

        fetch("api/Prod/DeleteProduct", {
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
                closeIcon={true} open={this.state.modalOpen} onClose={this.handleClose}
                size='small'>
                <Modal.Header> Delete Product </Modal.Header>
                <Modal.Content>
                    <p> Are you sure? </p>
                </Modal.Content>
                <Modal.Actions>
                    <Button secondary onClick={this.handleClose}>Cancel</Button>
                    <Button className="ui red button" onClick={this.DeleteProduct.bind(this)}> Delete </Button>
                </Modal.Actions>
            </Modal>
        );
    }
}

export default DeleteProduct;