import React, { Component } from 'react';
import { Button, Modal, Header, Form, } from 'semantic-ui-react'

class EditSale extends Component {
    constructor(props) {
        super(props);

        let current_datetime = new Date(this.props.editsale.salesDateSold);
        let formatted_date = current_datetime.getFullYear() + "-" + ("0" + (current_datetime.getMonth() + 1)).slice(-2) + "-" + ("0" + current_datetime.getDate()).slice(-2) 
        
        this.state = {
            Customers: [], Products: [], Stores: [],
            id: this.props.editsale.salesId,
            productId: this.props.editsale.productId,
            customerId: this.props.editsale.customerId,
            storeId: this.props.editsale.storeId,
            salesDateSold: formatted_date,
            modalOpen: false,
        };
    }

    FetchCustomer = () => {
        fetch('api/Cust/CustomerDisplay')
            .then(response => response.json())
            .then(data => {
                this.setState({ Customers: data, loading: false });
            });
    }

    FetchStore = () => {
        fetch('api/Store/StoreDisplay')
            .then(response => response.json())
            .then(data => {
                this.setState({ Stores: data, loading: false });
            });
    }

    FetchProduct = () => {
        fetch('api/Prod/ProductDisplay')
            .then(response => response.json())
            .then(data => {
                this.setState({ Products: data, loading: false });
            });
    }

    componentDidMount() {
        this.FetchCustomer();
        this.FetchProduct();
        this.FetchStore();
    }

    handleClose = () => this.setState({
        modalOpen: false,
       
    }, () => this.props.loadSale());

    handleOpen = () => this.setState({ modalOpen: true });

    UpdateSale() {

        let a = {
            id: this.state.id,
            productId: this.state.productId,
            customerId: this.state.customerId,
            storeId: this.state.storeId,
            salesDateSold: this.state.salesDateSold,
        };

        
        console.log("ID : " + a.id + " PID: " + a.productId + " CId : " + a.customerId + " SId :" + a.storeId + " Date:" + a.salesDateSold);

        fetch("api/Sales/AddSales", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(a)
        });
        alert("Sale Updated Successfully..");
    }

    render() {

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
            <Modal trigger={<Button onClick={this.handleOpen} color="yellow"> Edit </Button>}
                open={this.state.modalOpen} onClose={this.handleClose}
                closeIcon={true}
                size='small'>
                <Modal.Header> Edit Sale </Modal.Header>
                <Modal.Content>
                    <Form>
                        <Form.Input label='DateSold' placeholder='DateSold' type='date' value={this.state.salesDateSold} onChange={e => this.setState({ salesDateSold: e.target.value })} />
                        <Form.Select
                            fluid
                            label="Customer"
                            search
                            selection
                            value={this.state.customerId}
                            options={customerOption}
                            placeholder="Customer"
                            onChange={(e, { value }) => {
                                this.setState({ customerId: value })
                            }}
                        />
                        <Form.Select
                            fluid
                            label="Product"
                            search
                            selection
                            value={this.state.productId}
                            options={productOption}
                            placeholder="Product"
                            onChange={(e, { value }) => {
                                this.setState({ productId: value })
                            }}
                        />

                        <Form.Select
                            fluid
                            label="Store"
                            search
                            selection
                            value={this.state.storeId}
                            options={storeOption}
                            placeholder="Store"
                            onChange={(e, { value }) => {
                                this.setState({ storeId: value })
                            }}
                        />


                    </Form>
                </Modal.Content>
                <Modal.Actions>
                    <Button secondary onClick={this.handleClose}>Cancel</Button>
                    <Button className="ui green button" onClick={this.UpdateSale.bind(this)}> Edit </Button>
                </Modal.Actions>
            </Modal>
        );
    }
}

export default EditSale;