import React, { Component } from "react";
import './EditTeacher.css';
import axios from "axios";
import { withRouter } from 'react-router'
import {toast, ToastContainer} from "react-toastify";

class EditTeacher extends Component {
  state = {
    id: '',
    name: "",
    email: "",
    enrollnumber: "",
    response: ""
  };

  onChangeHandler = e => this.setState({ [e.target.name]: e.target.value });

  async componentDidMount() {
    try {
    let search =  this.props.location.search,
      id = search.substring(1, search.length);
    const updateTeacher = await axios(`/api/teachers/${id}`);
	const { name, email, enrollnumber } = updateTeacher.data.student;
    this.setState({ id, name, email, enrollnumber  });
    } catch (err) {
      this.setState({ response: "Teacher not found!" })
    }
  };

  updateteacherHandler = async (e) => {
    e.preventDefault();
    try {
      const teacher = await axios.put(`/api/teachers/${this.state.id}`, {
        name: this.refs.name.value,
        email: this.refs.email.value,
        enrollnumber: this.refs.enrollnumber.value
      });
      toast(teacher.data.message ,{ type: toast.TYPE.INFO, autoClose: 3000 });

    } catch (err) {
      toast(err.message ,{ type: toast.TYPE.ERROR, autoClose: 3000 });
    }
  };

  render() {
    if (this.state.response === "teacher not found!")
      return <h1>Teacher not found!</h1>
    return (
      <div className="Edit-student-Wrapper">
        <h1>Edit page</h1>
        <form onSubmit={this.updateteacherHandler}>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            placeholder="Name..."
            value={ this.state.name }
            name="name"
            onChange={this.onChangeHandler}
            ref="name"
            required
            className="Edit-student-Input"
            id="name"
          />
          <label htmlFor="email">Email: <b>(must be a valid email)</b></label>
          <input
            type="email"
            placeholder="Enter your email here"
            value={ this.state.email }
            name="email"
            required
            onChange={this.onChangeHandler}
            ref="email"
            className="Edit-student-Input"
            id="email"
          />
          <label htmlFor="enrollnumber">Enrollement Number: </label>
          <input
            type="number"
            placeholder="Enter the teacher's enrollment number"
            value={ this.state.enrollnumber }
            name="enrollnumber"
            min="1"
            max="120"
            required
            onChange={this.onChangeHandler}
            ref="enrollnumber"
            className="Edit-student-Input"
            id="enrollnumber"
          />
          <button type="submit" className="Edit-student-Submit fa fa-pencil"></button>
        </form>
        <ToastContainer />
      </div>
    );
  }
}

export default withRouter(EditTeacher);
