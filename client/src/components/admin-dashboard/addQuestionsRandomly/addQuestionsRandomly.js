import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addQRandomly } from "../../../actions/putActions";

function InputComponent(props) {
    const { reff, name, onChange, state, errors, onFocus, OnBlur, type, labelName } = props;

    return (
        <div className="row  mt-4 justify-content-md-center">
            <div className="col-3">
                <p className="label-txt" ref={reff}>
                    {labelName}
                </p>
                <p className="error-txt">{errors[name]}</p>
                <input
                    className="input"
                    onChange={onChange}
                    value={state[name]}
                    error={errors[name]}
                    id={name}
                    type={type}
                    onFocus={() => {
                        onFocus({ reff });
                    }}
                    onBlur={() => {
                        OnBlur({ reff });
                    }}
                />
            </div>
        </div>
    );
}

class AddQuestionsRandomly extends Component {
    constructor(props) {
        super(props);
        this.easy = React.createRef();
        this.medium = React.createRef();
        this.hard = React.createRef();
        this.state = {
            easy: "",
            medium: "",
            hard: "",
            errors: {}
        };
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.errors){
            this.setState({errors:nextProps.errors});
        }
    }
    onSubmit = e => {
        e.preventDefault();
        const { easy, medium, hard } = this.state;
        const newRandom = {
            _id: this.props.match.params.id,
            easy,
            medium,
            hard,
        };
        this.props.addQRandomly(newRandom, this.props.history);
    };

    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
      };
    
    onFocus(ele) {
        if (ele.current)
            ele.current.className += " label-active"
        else
            ele.reff.current.className += " label-active";
    }
    OnBlur(ele) {
        if (ele.current)
            ele.current.className = " label-txt"
        else
            ele.reff.current.className = "label-txt";
    }

    render() {
        const { errors } = this.state;
        const arr = ["easy", "medium", "hard"];
        const arr1 = [this.easy, this.medium, this.hard];
        const arr2 = ["Easy", "Medium", "Hard"];
        return (
            <div>
                <div className="container">
                    <div className="row  mt-4-5 justify-content-md-center">
                        <div className="col-md-6">
                            <h5>
                                <ul><li>Enter the number of questions of all difficulty levels you want to add to this quiz:</li></ul>
                            </h5>
                        </div>
                    </div>
                    <form noValidate >
                        {arr.map((item, ind) => (
                            <InputComponent
                                name={item}
                                type={"text"}
                                reff={arr1[ind]}
                                onChange={this.onChange}
                                state={this.state}
                                labelName={arr2[ind]}
                                errors={errors}
                                onFocus={this.onFocus}
                                OnBlur={this.OnBlur}
                            />
                        ))}
                        <div className="row  mt-4-5 justify-content-md-center">
                            <div className="col-md-auto">

                                <button
                                    className="btn btn-primary btn-lg hoverable ml-3" onClick={this.onSubmit}
                                    type="submit">
                                    Add Quiz
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

AddQuestionsRandomly.propTypes = {
    addQRandomly: PropTypes.func.isRequired,
    errors: PropTypes.array.isRequired,
};

const mapStateToProps = state => ({
    errors: state.errors
});

export default connect(
    mapStateToProps,
    { addQRandomly }
)(AddQuestionsRandomly);