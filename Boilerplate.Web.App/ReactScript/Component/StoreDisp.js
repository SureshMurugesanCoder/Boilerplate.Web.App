// ./src/common/main.component.jsx
import React, { Component } from 'react';
import { Button, Table, Modal, Header, Form, Segment, Message } from 'semantic-ui-react'
import { default as UUID } from "node-uuid";
import EditStore from './EditStore';
import DeleteStore from './DeleteStore';


class StoreDisp extends Component {
    constructor(props) {
        super(props);
        this.state = { Stores: [], loading: true, name: "", address: "", modalOpen: false};
    }

    componentDidMount() {
        this.FetchStore();
    }

    FetchStore = () => {
        fetch('api/Store/StoreDisplay')
            .then(response => response.json())
            .then(data => {
                this.setState({ Stores: data, loading: false });
            });
    }

    handleClose = () => this.setState({
        modalOpen: false,
        name: "",
        address: "",
    }, () => this.FetchStore());

    handleOpen = () => this.setState({ modalOpen: true });


    AddStore() {

        let a = {
            id: Math.floor(Math.random() * 100) + 1,
            name: this.state.name,
            address: this.state.address,
        };

        this.setState({
            Stores: [...this.state.Stores, a]
        });

        fetch("api/Store/AddStore", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(a)
        });
        alert("Store Added Successfully..");
    }

    render() {

        const Store = this.state.Stores;


        return (
            <div>
                <div>
                    <Modal trigger={<Button onClick={this.handleOpen} color="blue"> Add Store</Button>}
                        open={this.state.modalOpen} onClose={this.handleClose}
                        closeIcon={true} size='small'>

                        <Modal.Header> Create Store </Modal.Header>

                        <Modal.Content>
                            <Form>
                                <Form.Input required={true} label='Name' placeholder='Name' type='text' onChange={e => this.setState({ name: e.target.value })} />
                                <Form.Input required={true} label='Address' placeholder='Address' type='text' onChange={e => this.setState({ address: e.target.value })} />
                            </Form>
                        </Modal.Content>

                        <Modal.Actions>
                            <Button secondary onClick={this.handleClose}>Cancel</Button>
                            <Button className="ui green button" onClick={this.AddStore.bind(this)}>Create</Button>
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
                        {Store.map(name => (
                            <Table.Row key={name.id}>

                                <Table.Cell>{name.name}</Table.Cell>

                                <Table.Cell>{name.address}</Table.Cell>

                                <Table.Cell>
                                    <EditStore editstore={name} loadStore={this.FetchStore} />
                                </Table.Cell>

                                <Table.Cell>
                                    <DeleteStore deletestore={name} loadStore={this.FetchStore} />
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

export default StoreDisp;