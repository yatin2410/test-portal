import React, { Component } from "react";
import { putFlashMsg } from "../../actions/putActions";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import classNames from "classnames";

class SuccessAlert extends Component {
  constructor(props) {
    super(props);
    this.state = {
      msg: props.msg.msg,
      type: props.msg.type
    };
    this.div = React.createRef();
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.msg) {
      this.setState({ msg: nextProps.msg.msg });
      this.setState({ type: nextProps.msg.type });
      if (nextProps.msg.msg !== "") {
        this.div.current.className = "flash";
        setTimeout(() => {
          this.div.current.className = "flash-done";
          this.props.putFlashMsg({ msg: "", type: "alert-success" });
        }, 3000);
      }
    }
  }
  render() {
    return (
      <div ref={this.div}>
        {this.state.msg !== "" ? (
          <div className={"alert flash " + this.state.type} role="success">
            {this.state.msg}
          </div>
        ) : null}
      </div>
    );
  }
}

SuccessAlert.propTypes = {
  putFlashMsg: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  msg: state.flashMsg.msg
});

export default connect(mapStateToProps, { putFlashMsg })(SuccessAlert);
