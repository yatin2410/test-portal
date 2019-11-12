import React, { Component } from "react";
import CKEditor from "ckeditor4-react";

class Editor extends Component {
  constructor(props) {
    super(props);
    CKEditor.editorUrl = '/ckeditor/ckeditor.js';
  }
  render() {
    return (
      <div>
        <CKEditor
          name = {this.props.name}
          type="inline"
          data={this.props.data}
          onChange={(event)=>this.props.onEditorStateChange(event,this.props.which)}
        />
      </div>
    );
  }
}

export default Editor;
