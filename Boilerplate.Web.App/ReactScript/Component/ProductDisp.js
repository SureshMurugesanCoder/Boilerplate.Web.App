// ./src/common/main.component.jsx
import React, { Component } from 'react';
import { Button, Table, Modal, Header, Form, Segment, Message } from 'semantic-ui-react'
import { default as UUID } from "node-uuid";
import EditProduct from './EditProduct';
import DeleteProduct from './DeleteProduct';

class ProductDisp extends Component {
    constructor(props) {
        super(props);
        this.state = { Products: [], loading: true, name: "", price: "", modalOpen: false };
    }

    componentDidMount() {
        this.FetchProduct();
    }

    FetchProduct = () => {
        fetch('api/Prod/ProductDisplay')
            .then(response => response.json())
            .then(data => {
                this.setState({ Products: data, loading: false });
            });
    }

    handleClose = () => this.setState({
        modalOpen: false,
        name: "",
        price: "",
    }, () => this.FetchProduct());

    handleOpen = () => this.setState({ modalOpen: true });

    AddProduct() {

        let a = {
            id: Math.floor(Math.random() * 100) + 1,
            name: this.state.name,
            price: this.state.price,
        };

        this.setState({
            Products: [...this.state.Products, a]
        });

        fetch("api/Prod/AddProduct", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(a)
        });
        alert("Product Added Successfully..");
    }

    //DeleteProduct(name) {

    //    var arr = this.state.Products;
    //    var iden = name.id;
    //    var index1 = arr.findIndex(img => img.id === iden);

    //    var a = arr[index1];
    //    var test = arr.splice([index1], 1);

    //    this.setState({ Products: arr });

    //    fetch("api/Prod/DeleteProduct", {
    //        method: 'POST',
    //        headers: {
    //            'Content-Type': 'application/json'
    //        },
    //        body: JSON.stringify(a)
    //    });

    //    alert('Deleted')
    //}

    render() {

        const Product = this.state.Products;


        return (
            <div>
                <div>
                    <Modal trigger={<Button onClick={this.handleOpen} color="blue"> Add Product</Button>}
                        open={this.state.modalOpen} onClose={this.handleClose}
                        closeIcon={true} size='small'>

                        <Modal.Header> Create Product </Modal.Header>

                        <Modal.Content>
                            <Form>
                                <Form.Input required={true} label='Name' placeholder='Name' type='text' onChange={e => this.setState({ name: e.target.value })} />
                                <Form.Input required={true} label='Price' placeholder='Price' type='text' onChange={e => this.setState({ price: e.target.value })} />
                            </Form>
                        </Modal.Content>

                        <Modal.Actions>
                            <Button secondary onClick={this.handleClose}>Cancel</Button>
                            <Button className="ui green button" onClick={this.AddProduct.bind(this)}>Create</Button>
                        </Modal.Actions>
                    </Modal>
                </div>

                <Table celled>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Name</Table.HeaderCell>
                            <Table.HeaderCell>Price</Table.HeaderCell>
                            <Table.HeaderCell>Actions</Table.HeaderCell>
                            <Table.HeaderCell>Actions</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {Product.map(name => (
                            <Table.Row key={name.id}>

                                <Table.Cell>{name.name}</Table.Cell>

                                <Table.Cell>{name.price}</Table.Cell>

                                <Table.Cell>
                                    <EditProduct editproduct={name} loadProduct={this.FetchProduct} />
                                </Table.Cell>

                                <Table.Cell>
                                    <DeleteProduct deleteproduct={name} loadProduct={this.FetchProduct} />
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

export default ProductDisp;