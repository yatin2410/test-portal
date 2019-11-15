import React, { Component } from "react";
import classNames from "classnames";

export default function sideQuestion(props) {
    return (
      <div
        className={
          "question-item " + classNames({ selected: props.qid === props.aid })
        }
        onClick={() => props.onChange(props.index)}>
        <div className="inline-block float-left">
          <div className="dark float-left padding-10 width-100">
            <div className="padding-top-5 padding-left-5 float-left padding-right-5">
              {props.index + 1}.{" "}
            </div>
            <div
              className="question-statement padding-top-5"
              dangerouslySetInnerHTML={{ __html: props.question }}></div>
          </div>
        </div>
      </div>
    );
  }  