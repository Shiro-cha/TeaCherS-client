import React, { Component } from "react";
import "./Home.css";
import axios from "axios";
import { PropagateLoader } from 'react-spinners';
// Components
import Teacher from "../../components/Teacher/Teacher";
import SearchTeachers from "../../components/SearchTeacher/SearchTeachers";

class Home extends Component {
  state = {
    data: null,
    allteachers: null,
    error: ""
  };

  async componentDidMount() {
    try {
      const teachers = await axios("/api/teachers/");
      this.setState({ data: teachers.data });
    } catch (err) {
      this.setState({ error: err.message });
    }
  }

  removeTeacher = async id => {
    try {
      const teacherRemoved = await axios.delete(`/api/teachers/${id}`);
      const teachers = await axios("/api/teachers/");
      this.setState({ data: teachers.data });
    } catch (err) {
      this.setState({ error: err.message });
    }
  };

  searchTeachers = async username => {
    let allteachers = [...this.state.data.teachers];
    if (this.state.allteachers === null) this.setState({ allteachers });

    let teachers = this.state.data.teachers.filter(({ name }) =>
      name.toLowerCase().includes(username.toLowerCase())
    );
    if (teachers.length > 0) this.setState({ data: { teachers } });

    if (username.trim() === "")
      this.setState({ data: { teachers: this.state.allteachers } });
  };

  render() {
    let teachers;

    if (this.state.data)
      teachers =
        this.state.data.teachers &&
        this.state.data.teachers.map(teacher => (
			<Teacher key={teacher._id} {...teacher} removeTeacher={this.removeTeacher} />
        ));
    else return <div className="Spinner-Wrapper"> <PropagateLoader color={'#333'} /> </div>;

    if (this.state.error) return <h1>{this.state.error}</h1>;
    if (this.state.data !== null)
      if (!this.state.data.teachers.length)
        return <h1 className="No-teachers">No Teacher yet!</h1>;

    return (
      <div className="Table-Wrapper">
      <h1>TeaCherS</h1>
        <SearchTeachers searchTeachers={this.searchTeachers} />
        <table className="Table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Enrollment Number</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>{teachers}</tbody>
        </table>
      </div>
    );
  }
}

export default Home;
