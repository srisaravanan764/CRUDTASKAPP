import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import { Typography,ShoppingCartIcon } from "../../includes"
import PropTypes from "prop-types";
import {listProduct,deleteProduct} from "../../actions/product-actions";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import CreateIcon from '@material-ui/icons/Create';
import DeleteIcon from '@material-ui/icons/Delete';
const apiURL = "http://localhost:3002/api"
class Dashboard extends Component {
  constructor(props) {
      super(props)
      this.state = {
          data: [],
          message: null,
          reload:false
    }
      this.deleteProduct = this.deleteProduct.bind(this);
      this.editNewProduct = this.editNewProduct.bind(this);
      this.orderProduct = this.orderProduct.bind(this);
      this.addNewProduct = this.addNewProduct.bind(this);
      this.redirectPage = this.redirectPage.bind(this)
    }
    componentWillReceiveProps(nextProps) {
        this.setState({message:nextProps.product.hasOwnProperty('deleteProduct') ?
        nextProps.product.deleteProduct.data.meta.msg : null,
        reload : nextProps.product.hasOwnProperty('deleteProduct') ?
        true : false })
      }
    componentWillMount() {
        let data = this.props.listProduct();
     }
    deleteProduct(Id) {
        this.props.deleteProduct(Id);
    }
    redirectPage = () =>{
        this.props.history.push("/dashboard");
    }
    editNewProduct(Id) {
        this.props.history.push(`/edit/${Id}`);
    }
    orderProduct(Id){
        this.props.history.push(`/order/${Id}`);
    }
    addNewProduct() {
        window.localStorage.removeItem("reg");
        this.props.history.push('/product');
    }
    report(){
        // return axios.get(`${apiURL}store/order/list`,{headers : {"Content-Type":"application/json"}}).then(data => this.setState({
        //     data :data
        // })).catch(err => err);
    }
    render() {
        if(this.state.reload){
            this.props.history.push('/dashboard');    
        }
        const productList = this.props.product.listProduct
        return (
            <div>
                <Typography variant="h4" style={style}>Product Details</Typography>
                <Button variant="contained" color="primary" onClick={() => this.addNewProduct()}>
                    Add Product
                </Button>
                <Button variant="contained" color="primary" onClick={() => this.report.bind(this)}>
                    Report
                </Button>

                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Id</TableCell>
                            <TableCell>Product</TableCell>
                            <TableCell align="right">Quantity</TableCell>
                            <TableCell align="right">Price</TableCell>
                            <TableCell align="right">Description</TableCell>
                            <TableCell align="right">Date</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody> 
                        {productList.map((row,i) => (
                            <TableRow key={row._id}>
                                <TableCell component="th" scope="row">
                                    {i}
                                </TableCell>
                                <TableCell align="right">{row.Name}</TableCell>
                                <TableCell align="right">{row.quantity}</TableCell>
                                <TableCell align="right">{row.price}</TableCell>
                                <TableCell align="right">{row.description}</TableCell>
                                <TableCell align="right">{row.created_at}</TableCell>
                                <TableCell align="right" onClick={() => this.orderProduct(row._id)}><ShoppingCartIcon /></TableCell>
                                <TableCell align="right" onClick={() => this.editNewProduct(row._id)}><CreateIcon /></TableCell>
                                <TableCell align="right" onClick={() => this.deleteProduct(row._id)}><DeleteIcon /></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>

            </div>
        );
    }

}

const style ={
    display: 'flex',
    justifyContent: 'center'
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return state;
};

const mapDispatchToProps = {
    listProduct:listProduct,
    deleteProduct:deleteProduct
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard); 


