import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { fetchShowQuestions} from "../../../actions/fetchActions";
import SearchTable from "./questionshowtable";

class ShowQuizQuestions extends Component {
    constructor(props){
        super(props);
        this.state = {
            showQuestions: [],
        };
    }
    componentDidMount(){
        this.props.fetchShowQuestions(this.props.match.params.id);
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.showQuestions){
            console.log(nextProps.showQuestions.data);
            this.setState({showQuestions: nextProps.showQuestions.data});
        }
    }
    render() {
    return(
        <div className="mt-5">
            <SearchTable questions={this.state.showQuestions}/>
        </div>
    );
  }
}

ShowQuizQuestions.propTypes = {
    fetchShowQuestions: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    showQuestions: state.data.showQuestions
});

export default connect(
  mapStateToProps,
  { fetchShowQuestions }
)(ShowQuizQuestions);
