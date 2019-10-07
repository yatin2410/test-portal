import React, { Component } from 'react'
import UpdateAdmin from "./updateAdmin";
class Myaccount extends Component {
    render() {
        return (
            <div>
                <div className="row justify-content-md-center">
                    <div className="col">
                        <UpdateAdmin/>
                    </div>
                </div>
            </div>
        )
    }
};

export default Myaccount;