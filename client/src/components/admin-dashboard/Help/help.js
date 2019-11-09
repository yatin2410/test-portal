import React, { Component } from "react";
import {  Link } from "react-router-dom";
import "./css/helpButton.css";

export default function Help(props) {
    return (
      <div className = "container">
        <ul>          
        <li><div className = "mt-5">
        <h5><Link to="/dashboard/help1" className="questionFont">
                  How to add a quiz?
        </Link></h5>
        </div></li>

        <li><div>
        <h5><Link to="/dashboard/help2" className="questionFont">
                  How to add questions and their options?
        </Link></h5>
        </div></li>

        <li><div>
        <h5><Link to="/dashboard/help3" className="questionFont">
                  How to change account details?
        </Link></h5>
        </div></li>

        <li><div>
        <h5><Link to="/dashboard/help4" className="questionFont">
                  How to change password?
        </Link></h5>
        </div></li>

        <li><div>
        <h5><Link to="/dashboard/help5" className="questionFont">
                  How to add a new admin?
        </Link></h5>
        </div></li>

        <li><div>
        <h5><Link to="/dashboard/help6" className="questionFont">
                  How to add a group or batch?
        </Link></h5>
        </div></li>

        <li><div>
        <h5><Link to="/dashboard/help7" className="questionFont">
                  Can a fake user be removed by admin?
        </Link></h5>
        </div></li>

        </ul> 
      </div>
    );
  }

  export function Help1(props) {
    return (
      <div className = "container">
          <div className = "mt-4 ml-5">
          <h6 ><Link to="/dashboard/help" className="arrowFont"><i class="fas fa-arrow-left arrowFont" style={{fontSize:"0.75em"}}></i>  Back to Help Home </Link></h6>
        </div>
        <div className="mt-5 ml-5">
            <h3>How to add a quiz?</h3>
        </div>
        <p className="mt-3 ml-5">
            Go to quiz page from the side bar. There you will see add quiz. Click it. Then, you will see the form which you need to fill so that you can go to next section. All the fields are required to be filled. Then after pressing Add Question button, you will see the list of questions which will have a button to add it to the quiz. Then after selecting the questions, you will be taken to the page where list of quizzes will be shown. There if you want to see the questions added to the quiz, then you can click on <i className="material-icons">open_in_new</i>. If you go to edit page, then there you will be taken to quiz page with information filled. You can also delete a quiz. 
        </p>
      </div>
    );
  }

  export function Help2(props) {
    return (
        <div className = "container">
        <div className = "mt-4 ml-5">
        <h6 ><Link to="/dashboard/help" className="arrowFont"><i class="fas fa-arrow-left arrowFont" style={{fontSize:"0.75em"}}></i>  Back to Help Home </Link></h6>
      </div>
      <div className="mt-5 ml-5">
          <h3>How to add questions and their options?</h3>
      </div>
      <p className="mt-3 ml-5">
        Go to Question Bank page from side bar. There you will see list of questions and a button to add question. On clicking it, you will be taken to add question page. There you fill the information required. Then, you can write question by clicking on the "Add Question" text box, so a editor will open and then you can add different form of texts like math formulas, images, etc. Similar is for the options. After completing all the details and selecting the correct answer(s), click on Submit button. You will be taken to question bank page where you will be able to see your newly added question. You can also delete and edit the questions</p>
    </div>
    );
  }

  export function Help3(props) {
    return (
        <div className = "container">
        <div className = "mt-4 ml-5">
        <h6 ><Link to="/dashboard/help" className="arrowFont"><i class="fas fa-arrow-left arrowFont" style={{fontSize:"0.75em"}}></i>  Back to Help Home </Link></h6>
      </div>
      <div className="mt-5 ml-5">
          <h3>How to change account details?</h3>
      </div>
      <p className="mt-3 ml-5">
        Go to My Account page from side bar. There you will see exact same page as of the register page but your details will be filled already. You can there change your name, password, group. Then, click on Save button and your data will be updated.    
      </p>
    </div>
    );
  }

  export function Help4(props) {
    return (
        <div className = "container">
        <div className = "mt-4 ml-5">
        <h6 ><Link to="/dashboard/help" className="arrowFont"><i class="fas fa-arrow-left arrowFont" style={{fontSize:"0.75em"}}></i>  Back to Help Home </Link></h6>
      </div>
      <div className="mt-5 ml-5">
          <h3> How to change password?</h3>
      </div>
      <p className="mt-3 ml-5">
        Go to My Account page from side bar. There you will see exact same page as of the register page but your details will be filled already. You can there change your password. Then, fill the confirm password field with the new password and, click on Save button and your password will be updated.    
      </p>
    </div>
    );
  }

  export function Help5(props) {
    return (
        <div className = "container">
        <div className = "mt-4 ml-5">
        <h6 ><Link to="/dashboard/help" className="arrowFont"><i class="fas fa-arrow-left arrowFont" style={{fontSize:"0.75em"}}></i>  Back to Help Home </Link></h6>
      </div>
      <div className="mt-5 ml-5">
          <h3> How to add a new admin?</h3>
      </div>
      <p className="mt-3 ml-5">      
        Go to Settings page from the side bar. There you will see a section where you can add an admin. So, you fill all the information about the new admin and click on submit button. A new admin will be added. There is also a section for seeing all the admins where you can delete any other admin if you want to. 
      </p>
    </div>
    );
  }

  export function Help6(props) {
    return (
        <div className = "container">
        <div className = "mt-4 ml-5">
        <h6 ><Link to="/dashboard/help" className="arrowFont"><i class="fas fa-arrow-left arrowFont" style={{fontSize:"0.75em"}}></i>  Back to Help Home </Link></h6>
      </div>
      <div className="mt-5 ml-5">
          <h3> How to add a new group or batch?</h3>
      </div>
      <p className="mt-3 ml-5">
      Go to Settings page from the side bar. There you will see a section where you can add a group. So, you fill the name of group and click on submit button. A new group will be added. There is also a section for seeing all the groups where you can delete any group if you want to.
      </p>
    </div>
    );
  }

  export function Help7(props) {
    return (
        <div className = "container">
        <div className = "mt-4 ml-5">
        <h6 ><Link to="/dashboard/help" className="arrowFont"><i class="fas fa-arrow-left arrowFont" style={{fontSize:"0.75em"}}></i>  Back to Help Home </Link></h6>
      </div>
      <div className="mt-5 ml-5">
      <h3>Can a fake user be removed by admin?</h3>
      </div>
      <p className="mt-3 ml-5">
        YES. If you feel like there is an user account which is fake, you can remove it from the Users page on side bar. We have provided a delete button for that purpose.  
      </p>
    </div>
    );
  }