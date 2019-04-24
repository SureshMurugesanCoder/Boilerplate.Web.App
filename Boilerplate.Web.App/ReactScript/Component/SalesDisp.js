// ./src/common/main.component.jsx
import React, { Component } from 'react';
import { Button, Table, Modal, Header, Form, Segment, Message, Dropdown } from 'semantic-ui-react'
import { default as UUID } from "node-uuid";
import EditSale from './EditSale';
import DeleteSale from './DeleteSale';

class SalesDisp extends Component {
    constructor(props) {
        super(props);
        this.state = { Sales: [], loading: true, Customers: [], Products: [], Stores: [], id: "", product: "", customer: "", store: "", date: "", modalOpen: false };
    }

    componentDidMount() {
        this.FetchSale();
        this.FetchCustomer();
        this.FetchProduct();
        this.FetchStore();
    }

    FetchCustomer = () => {
        fetch('api/Cust/CustomerDisplay')
            .then(response => response.json())
            .then(data => {
                this.setState({ Customers: data, loading: false });
            });
    }

    FetchProduct = () => {
        fetch('api/Prod/ProductDisplay')
            .then(response => response.json())
            .then(data => {
                this.setState({ Products: data, loading: false });
            });
    }

    FetchStore = () => {
        fetch('api/Store/StoreDisplay')
            .then(response => response.json())
            .then(data => {
                this.setState({ Stores: data, loading: false });
            });
    }

    FetchSale = () => {
        fetch('api/Sales/SalesDisplay')
            .then(response => response.json())
            .then(data => {
                this.setState({ Sales: data, loading: false });
            });
    }


    handleClose = () => this.setState({
        modalOpen: false,
        product: "",
        customer: "",
        store: "",
        date: "",
    }, () => this.FetchSale());

    handleOpen = () => this.setState({ modalOpen: true });

    AddSale() {

        let a = {
            id: Math.floor(Math.random() * 100) + 1,
            productId: this.state.product,
            customerId: this.state.customer,
            storeId: this.state.store,
            salesDateSold: this.state.date,
        };

        console.log("ID : " + a.productId + " PNAME : " + a.customerId + " Sname :" + a.storeId + " Date:" + a.salesDateSold);

        this.setState({
            Sales: [...this.state.Sales, a]
        });

        fetch("api/Sales/AddSales", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(a)
        });

        alert("Sale Added Successfully..");
    }

    //DeleteSale(name) {

    //    var arr = this.state.Sales;
    //    var iden = name.salesId;
        
    //    var index1 = arr.findIndex(img => img.salesId === iden);
        
    //    console.log("Value is:" + name.id + " value of index:" + index1);
    //    var a = arr[index1];
    //    var test = arr.splice([index1], 1);

    //    //this.setState({ Sales: arr });

    //    fetch("api/Sales/DeleteSales", {
    //        method: 'POST',
    //        headers: {
    //            'Content-Type': 'application/json'
    //        },
    //        body: JSON.stringify(a)
    //    });

    //    alert('Deleted the Sale');
    //}

    

    render() {

        const { value } = this.state;

        const Sale = this.state.Sales;

        const Customer = this.state.Customers;

        const customerOption = Customer.map(cust => ({
            key: cust.id,
            text: cust.name,
            value: cust.id,

        }));


        const Product = this.state.Products;

        const productOption = Product.map(prod => ({
            key: prod.id,
            text: prod.name,
            value: prod.id,

        }));

        const Store = this.state.Stores;

        const storeOption = Store.map(store => ({
            key: store.id,
            text: store.name,
            value: store.id,

        }));
    
        return (
            <div>
                <div>
                    <Modal trigger={<Button onClick={this.handleOpen} color="blue"> Add Sale</Button>}
                        open={this.state.modalOpen} onClose={this.handleClose}
                        closeIcon={true} size='small'>

                        <Modal.Header> Create Sale </Modal.Header>

                        <Modal.Content>
                            <Form>
                                <Form.Field>
                                    <Form.Input
                                        value={this.state.date}
                                        onChange={e => this.setState({ date: e.target.value })}
                                        label="Date"
                                        placeholder="Date"
                                        type="date"
                                    />
                                
                            </Form.Field>
                            <Form.Select 
                                    fluid
                                    selection
                                label="Customer"
                                name="customer"
                                    options={customerOption}
                                    value={value}
                                    placeholder="Customer"
                                    onChange={(e, { value }) => { this.setState({ customer: value }) }}
                             />
                                 

                                <Form.Select
                                    fluid
                                    selection
                                    label="Product"
                                    name="product"
                                    options={productOption}
                                    placeholder="Product"
                                    onChange={(e, { value }) => { this.setState({ product: value }) }}
                                />

                                <Form.Select
                                    fluid
                                    selection
                                    label="Store"
                                    name="Store"
                                    options={storeOption}
                                    placeholder="Store"
                                    onChange={(e, { value }) => { this.setState({ store: value }) }}
                                />
                            </Form>
                        </Modal.Content>
                        <Modal.Actions>
                            <Button secondary onClick={this.handleClose}> Cancel </Button>
                            <Button className="ui green button" onClick={this.AddSale.bind(this)}>Create</Button>
                        </Modal.Actions>
                    </Modal>
                </div>

                <Table celled>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Customer</Table.HeaderCell>
                            <Table.HeaderCell>Product</Table.HeaderCell>
                            <Table.HeaderCell>Store</Table.HeaderCell>
                            <Table.HeaderCell>DateSold</Table.HeaderCell>
                            <Table.HeaderCell>Actions</Table.HeaderCell>
                            <Table.HeaderCell>Actions</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {Sale.map(name => (
                            <Table.Row key={name.id}>

                                <Table.Cell>{name.customerName}</Table.Cell>

                                <Table.Cell>{name.productName}</Table.Cell>

                                <Table.Cell>{name.storeName}</Table.Cell>

                                <Table.Cell>{name.salesDateSold}</Table.Cell>

                                <Table.Cell>
                                    <EditSale editsale={name} loadSale={this.FetchSale} />
                                </Table.Cell>

                                <Table.Cell>
                                    <DeleteSale deletesale={name} loadSale={this.FetchSale} />
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

export default SalesDisp;