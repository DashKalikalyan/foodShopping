import React,{Component} from 'react';
import classes from'./Toolbar.css';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import axios from 'axios';
import * as actionCreators from "../../../store/actions";
import { withRouter } from 'react-router-dom';

class toolbar extends Component{

    logoutHandler=()=>{
        axios.delete('http://localhost:3001/logout',{headers:{'x-auth': this.props.token}})
            .then((response)=>{
                console.log(response);
                this.props.deleteToken();
                if(this.props.token===''){
                    this.props.history.push({
                        pathname:'/login'
                    });
                }
            });
    };


    render(){
        let headerToShow;
        if(!this.props.token){
            headerToShow=(
                            <header className={classes.Toolbar}>
                                <div>MENU</div>
                                <div>LOGO</div>
                                <div style={{display:'flex'}}>
                                    <Link to="/login"><div style={{paddingLeft:'20px'}} className={classes.X}>LOGIN</div></Link>
                                    <Link to="/signup"><div style={{paddingLeft:'20px'}} className={classes.X}>SIGN UP</div></Link>
                                </div>
                                {/*<div>Burger Builder</div>*/}
                            </header>);
        } else {
            headerToShow=(
                    <header className={classes.Toolbar}>
                        <div>MENU</div>
                        <div>LOGO</div>
                        <div style={{display:'flex'}}>
                            <Link to="/orders" className={classes.X}><div>ORDERS</div></Link>
                            <div style={{paddingLeft:'20px'}} onClick={this.logoutHandler} className={classes.X}>LOG OUT</div>
                        </div>
                        {/*<div>Burger Builder</div>*/}
                    </header>);
        }
        return(

            <div>
                {headerToShow}
            </div>
        )};
}

const mapStateToProps= (state) => {
    return {
        token:state.token
    }
};

const mapDispatchToProps= (dispatch) => {
    return {
        deleteToken: () => dispatch(actionCreators.deleteToken())
    };
};


export default withRouter(connect(mapStateToProps,mapDispatchToProps) (toolbar));