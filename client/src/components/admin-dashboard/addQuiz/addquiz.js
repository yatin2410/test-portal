import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";


class AddQuiz extends Component {
    constructor(props) {
        super(props);
        this.name = React.createRef();
        this.startDate = React.createRef();
        this.duration = React.createRef();
        this.percentageToPass = React.createRef();
        this.assignToGroups = React.createRef();
        this.addQuestions = React.createRef();
        this.state = {
            name: "",
            startDate: "",
            duration: "",
            percentageToPass: "",
            assignToGroups: "",
            errors: {}
        };
        this.onFocus = this.onFocus.bind(this);
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
    }

    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    };

    onSubmit = e => {
        e.preventDefault();

        const newQuiz = {
            name: this.state.name,
            startDate: this.state.startDate,
            duration: this.state.duration,
            percentageToPass: this.state.percentageToPass,
            assignToGroups: this.state.assignToGroups
        };


    };

    onFocus(ele) {
        ele.current.className += " label-active";
    }
    OnBlur(ele) {
        ele.current.className = "label-txt";
    }

    render() {
        const { errors } = this.state;

        return (
            <div>
                <div className="container">
                    <div className="row  mt-2 justify-content-md-center">
                        <div className="col-5">
                            <h4>
                                <b>ADD QUIZ: </b>
                            </h4>
                        </div>
                    </div>
                    <form noValidate onSubmit={this.onSubmit}>
                        <div className="row  mt-2 justify-content-md-center">
                            <div className="col-5">
                                <p className="label-txt" ref={this.name}>
                                    Name
                                </p>
                                <p className="error-txt">{errors.name}</p>
                                <input
                                    className="input"
                                    onChange={this.onChange}
                                    value={this.state.name}
                                    error={errors.name}
                                    id="Name"
                                    type="text"
                                    onFocus={() => {
                                        this.onFocus(this.name);
                                    }}
                                    onBlur={() => {
                                        this.OnBlur(this.name);
                                    }}
                                />
                            </div>
                        </div>
                        <div className="row  mt-4-5 justify-content-md-center">
                            <div className="col-5">
                                <p className="label-txt" ref={this.startDate}>
                                    Start Date
                                </p>
                                <p className="error-txt">{errors.startDate}</p>
                                <input
                                    type="date"
                                    className="input"
                                    onChange={this.onChange}
                                    value={this.state.startDate}
                                    error={errors.startDate}
                                    id="startDate"
                                    onFocus={() => {
                                        this.onFocus(this.startDate);
                                    }}
                                    onBlur={() => {
                                        this.OnBlur(this.startDate);
                                    }}
                                />
                            </div>
                        </div>
                        <div className="row mt-4-5 justify-content-md-center">
                            <div className="col-5">
                                <p className="label-txt" ref={this.duration}>
                                    Duration
                                </p>
                                <p className="error-txt">{errors.duration}</p>
                                <input
                                    type="Integer"
                                    className="input"
                                    onChange={this.onChange}
                                    value={this.state.duration}
                                    error={errors.duration}
                                    id="duration"
                                    onFocus={() => {
                                        this.onFocus(this.duration);
                                    }}
                                    onBlur={() => {
                                        this.OnBlur(this.duration);
                                    }}
                                />
                            </div>
                        </div>
                        <div className="row  mt-4-5 justify-content-md-center">
                            <div className="col-5">
                                <p className="label-txt" ref={this.percentageToPass}>
                                    Percentage To Pass
                                </p>
                                <p className="error-txt">{errors.percentageToPass}</p>
                                <input
                                    type="Integer"
                                    className="input"
                                    onChange={this.onChange}
                                    value={this.state.percentageToPass}
                                    error={errors.percentageToPass}
                                    id="percentageToPass"
                                    onFocus={() => {
                                        this.onFocus(this.percentageToPass);
                                    }}
                                    onBlur={() => {
                                        this.OnBlur(this.percentageToPass);
                                    }}
                                />
                            </div>
                        </div>
                        <div className="row  mt-4-5 justify-content-md-center">
                            <div className="col-5">
                                <p className="label-txt mb-4" ref={this.assignToGroups}>
                                    Assign To Groups
                                </p>
                                <p className="error-txt">{errors.assignToGroups}</p>
                                <label className="mt-4 ml-4"><input type="checkbox" id="assignToGroups" name="assignToGroups" value="BTech2016" /><span className="ml-2">BTech2016</span></label>
                            </div>
                        </div>
                        <div className="row  mt-4-5 justify-content-md-center">
                            <div className="col-md-auto">
                                <button
                                    className="btn btn-primary btn-lg hoverable"
                                    type="submit">
                                    submit
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

AddQuiz.propTypes = {
    errors: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    errors: state.errors,
});

export default connect(
    mapStateToProps,
    {  }
)(withRouter(AddQuiz));
