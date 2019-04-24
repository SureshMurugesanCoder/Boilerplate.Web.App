import React, { Component } from 'react';
import { Button, Modal, Header, Form, } from 'semantic-ui-react'

class DeleteSale extends Component {
    constructor(props) {
        super(props);

        let current_datetime = new Date(this.props.deletesale.salesDateSold);
        let formatted_date = current_datetime.getFullYear() + "-" + ("0" + (current_datetime.getMonth() + 1)).slice(-2) + "-" + ("0" + current_datetime.getDate()).slice(-2) 
        
        this.state = {
            //Customers: [], Products: [], Stores: [],
            Id: this.props.deletesale.salesId,
            productId: this.props.deletesale.productId,
            customerId: this.props.deletesale.customerId,
            storeId: this.props.deletesale.storeId,
            salesDateSold: formatted_date,
            modalOpen: false,
        };
    }

    handleClose = () => this.setState({
        modalOpen: false,
    }, () => this.props.loadSale());

    handleOpen = () => this.setState({ modalOpen: true });

    DeleteSale() {

        let a = {
            Id: this.state.Id,
            productId: this.state.productId,
            customerId: this.state.customerId,
            storeId: this.state.storeId,
            salesDateSold: this.state.salesDateSold,
        };

        
        //console.log("ID : " + a.id + " PID: " + a.productId + " CId : " + a.customerId + " SId :" + a.storeId + " Date:" + a.salesDateSold);

        fetch("api/Sales/DeleteSales", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(a)
        });

        alert('Deleted');
  
    }

    render() {

        return (
            <Modal trigger={<Button onClick={this.handleOpen} color="red"> Delete </Button>}
                closeIcon={true} open={this.state.modalOpen} onClose={this.handleClose}
                size='small'>
                <Modal.Header> Delete Sale </Modal.Header>
                <Modal.Content>
                    <p> Are you sure? </p>
                </Modal.Content>
                <Modal.Actions>
                    <Button secondary onClick={this.handleClose}>Cancel</Button>
                    <Button className="ui red button" onClick={this.DeleteSale.bind(this)}> Delete </Button>
                </Modal.Actions>
            </Modal>
        );
    }
}

export default DeleteSale;