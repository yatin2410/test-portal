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
          className = "editor-border"
          name = {this.props.name}
          type="inline"
          config = {{
            uiColor:"#698A82",
          }}
            style = {{
              border:"0.1px solid lightgrey",
              padding:"2px"
            }}
          data={this.props.data}
          onChange={(event)=>this.props.onEditorStateChange(event,this.props.which)}
        />
      </div>
    );
  }
}

export default Editor;
