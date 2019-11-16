import React, { Component } from 'react'
import UpdateUser from "./updateUser";
class Myaccount extends Component {
    render() {
        return (
            <div style={{marginBottom:"100px"}}>
                <div className="row justify-content-md-center">
                    <div className="col">
                        <UpdateUser/>
                    </div>
                </div>
            </div>
        )
    }
};

export default Myaccount;