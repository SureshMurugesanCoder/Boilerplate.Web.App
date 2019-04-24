import React, { Component } from 'react';
import { Button, Table, Modal, Header, Form, Segment, Message } from 'semantic-ui-react'

class EditProduct extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.editproduct.id,
            name: this.props.editproduct.name,
            price: this.props.editproduct.price,
            modalOpen: false,
        };
    }

    handleClose = () => this.setState({
        modalOpen: false
    }, () => this.props.loadProduct());

    handleOpen = () => this.setState({ modalOpen: true });

    UpdateProduct() {

        let a = {
            Id: this.state.id,
            Name: this.state.name,
            Price: this.state.price,
        };

        fetch("api/Prod/AddProduct", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(a)
        });

        alert("Product Updated Successfully..");
    }

    render() {
        return (
            <Modal trigger={<Button onClick={this.handleOpen} color="yellow"> Edit </Button>}
                open={this.state.modalOpen} onClose={this.handleClose}
                closeIcon={true}
                size='small'>
                <Modal.Header> Edit Product </Modal.Header>
                <Modal.Content>
                    <Form>
                        <Form.Input fluid label='Name' placeholder='Name' type='text' value={this.state.name} onChange={e => this.setState({ name: e.target.value })} />
                        <Form.Input fluid label='Price' placeholder='Price' type='text' value={this.state.price} onChange={e => this.setState({ price: e.target.value })} />
                    </Form>
                </Modal.Content>
                <Modal.Actions>
                    <Button secondary onClick={this.handleClose}>Cancel</Button>
                    <Button className="ui green button" onClick={this.UpdateProduct.bind(this)}> Edit </Button>
                </Modal.Actions>
            </Modal>
        );
    }
}

export default EditProduct;