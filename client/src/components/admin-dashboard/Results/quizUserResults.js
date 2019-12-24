import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { fetchQuizUserResults } from "../../../actions/fetchActions";
import Loading from "../../layout/Loading";
import { Link } from "react-router-dom";
import XLSX from "xlsx";

function Workbook() {
  if (!(this instanceof Workbook)) return new Workbook();

  this.SheetNames = [];

  this.Sheets = {};
}

const download = (url, name) => {
  let a = document.createElement("a");
  a.href = url;
  a.download = name;
  a.click();

  window.URL.revokeObjectURL(url);
};

function s2ab(s) {
  const buf = new ArrayBuffer(s.length);

  const view = new Uint8Array(buf);

  for (let i = 0; i !== s.length; ++i) view[i] = s.charCodeAt(i) & 0xff;

  return buf;
}

class QuizUserResults extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userResults: null,
      isLoading: true
    };
    this.export = this.export.bind(this);
  }
  componentDidMount() {
    this.props.fetchQuizUserResults(this.props.match.params.id);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.userResults) {
      this.export(nextProps.userResults);
      this.props.history.push("/dashboard/results");
    }
  }
  export(data) {
    const wb = new Workbook();
    const ws = XLSX.utils.json_to_sheet(data);

    wb.SheetNames.push("");
    wb.Sheets[""] = ws;

    const wbout = XLSX.write(wb, {
      bookType: "xlsx",
      bookSST: true,
      type: "binary"
    });

    let url = window.URL.createObjectURL(
      new Blob([s2ab(wbout)], { type: "application/octet-stream" })
    );

    download(url, "import.xlsx");
  }
  render() {
    return (
      <div>
        {this.state.isLoading ? <Loading /> : <div className="container"></div>}
      </div>
    );
  }
}

QuizUserResults.propTypes = {
  fetchQuizUserResults: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  userResults: state.data.quizUserResults
});

export default connect(mapStateToProps, { fetchQuizUserResults })(
  QuizUserResults
);
