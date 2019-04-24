import React, { Component } from 'react';
import { Button, Table, Modal, Header, Form, Segment, Message } from 'semantic-ui-react'

class DeleteStore extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.deletestore.id,
            name: this.props.deletestore.name,
            address: this.props.deletestore.address,
            modalOpen: false,
        };
    }

    handleClose = () => this.setState({
        modalOpen: false
    }, () => this.props.loadStore());

    handleOpen = () => this.setState({ modalOpen: true });

    DeleteStore() {

        let a = {
            Id: this.state.id,
            Name: this.state.name,
            Address: this.state.address,
        };

        fetch("api/Store/DeleteStore", {
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
                <Modal.Header> Delete Store </Modal.Header>
                <Modal.Content>
                    <p> Are you sure? </p>
                </Modal.Content>
                <Modal.Actions>
                    <Button secondary onClick={this.handleClose}>Cancel</Button>
                    <Button className="ui red button" onClick={this.DeleteStore.bind(this)}> Delete </Button>
                </Modal.Actions>
            </Modal>
        );
    }
}

export default DeleteStore;