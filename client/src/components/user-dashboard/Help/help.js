import React, { Component } from "react";
import { Link } from "react-router-dom";

export default function Help(props) {
  return (
    <div className="container">
      <ul>
        <li>
          <div className="mt-5">
            <h5>
              <Link to="/dashboard/help1" className="questionFont">
                How to take a quiz?
              </Link>
            </h5>
          </div>
        </li>

        <li>
          <div>
            <h5>
              <Link to="/dashboard/help2" className="questionFont">
                How to change my account details?
              </Link>
            </h5>
          </div>
        </li>

        <li>
          <div>
            <h5>
              <Link to="/dashboard/help3" className="questionFont">
                How to change my password?
              </Link>
            </h5>
          </div>
        </li>

        <li>
          <div>
            <h5>
              <Link to="/dashboard/help4" className="questionFont">
                How to know correct answers of a past quiz?
              </Link>
            </h5>
          </div>
        </li>
      </ul>
    </div>
  );
}

export function Help1(props) {
  return (
    <div className="container">
      <div className="mt-4 ml-5">
        <h6>
          <Link to="/dashboard/help" className="arrowFont">
            <i
              className="fas fa-arrow-left arrowFont"
              style={{ fontSize: "0.75em" }}></i>{" "}
            Back to Help Home{" "}
          </Link>
        </h6>
      </div>
      <div className="mt-5 ml-5">
        <h3>How to take a quiz?</h3>
      </div>
      <p className="mt-3 ml-5">
        Go to quiz page from sidebar. There you will find two types of quizzes.
        <ol>
          <li>Current Quizzes</li>
          <li>Upcoming Quizzes</li>
        </ol>
        In the current quizzes section, you can see the quizzes which you can
        give if it's end time has not arrived yet. So, as you can see there is a
        play button along side the quiz name. By clicking it, you can take the
        quiz. From the previous page, you can see the duration. So as you start
        the quiz, the timer will start and will end the test when the duration
        period is over. In quiz, you can jump directly to any question you like
        to solve. You can come back to any question. There are next and previous
        button for going to next and previous questions respectively. There is a
        clear response button to clear the response. Also there is a end quiz
        button which will end the quiz and then take to the result page.
      </p>
      <p className="mt-3 ml-5">
        In the upcoming quizzes section, you can see the upcoming quizzes. You
        can't take that tests but you can view the details like start time,
        duration, percentage to pass, etc. After the start time only, you will
        be able to take the test.
      </p>
      <h5 className="mt-3 ml-5">All the best for your Quizzes.</h5>
    </div>
  );
}

export function Help2(props) {
  return (
    <div className="container">
      <div className="mt-4 ml-5">
        <h6>
          <Link to="/dashboard/help" className="arrowFont">
            <i
              className="fas fa-arrow-left arrowFont"
              style={{ fontSize: "0.75em" }}></i>{" "}
            Back to Help Home{" "}
          </Link>
        </h6>
      </div>
      <div className="mt-5 ml-5">
        <h3>How to change my account details?</h3>
      </div>
      <p className="mt-3 ml-5">
        Go to My Account page from side bar. There you will see exact same page
        as of the register page but your details will be filled already. You can
        there change your name, password, group. Then, click on Save button and
        your data will be updated.
      </p>
      <h5 className="mt-3 ml-5">All the best for your Quizzes.</h5>
    </div>
  );
}

export function Help3(props) {
  return (
    <div className="container">
      <h6>
        <Link to="/dashboard/help" className="arrowFont">
          <i
            className="fas fa-arrow-left arrowFont"
            style={{ fontSize: "0.75em" }}></i>{" "}
          Back to Help Home{" "}
        </Link>
      </h6>
      <div className="mt-4 ml-5"></div>
      <div className="mt-5 ml-5">
        <h3>How to change my password?</h3>
      </div>
      <p className="mt-3 ml-5">
        Go to My Account page from side bar. There you will see exact same page
        as of the register page but your details will be filled already. You can
        there change your password. Then, fill the confirm password field with
        the new password and, click on Save button and your password will be
        updated.
      </p>
      <h5 className="mt-3 ml-5">All the best for your Quizzes.</h5>
    </div>
  );
}

export function Help4(props) {
  return (
    <div className="container">
      <div className="mt-4 ml-5">
        <h6>
          <Link to="/dashboard/help" className="arrowFont">
            <i
              className="fas fa-arrow-left arrowFont"
              style={{ fontSize: "0.75em" }}></i>{" "}
            Back to Help Home{" "}
          </Link>
        </h6>
      </div>
      <div className="mt-5 ml-5">
        <h3> How to know correct answers of a past quiz?</h3>
      </div>
      <p className="mt-3 ml-5">
        Go to Results page from side bar or navigation bar. There previous
        attempted quizzes will be shown. By clicking on the button, you will be
        shown all the questions with the answers you selected and the correct
        answers. Also, you will be able to see total correct answers you
        attempted and incorrect answers you attempted. You will also be able to
        see whether you passed or failed and if passed, then with what
        percentage.
      </p>
      <h5 className="mt-3 ml-5">All the best for your Quizzes.</h5>
    </div>
  );
}
