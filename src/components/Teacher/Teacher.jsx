import React from 'react';
import './Teacher.css';
import { Link } from 'react-router-dom';
import Avatar from 'react-avatar';


const Teacher = ({ _id, name, email, enrollnumber, removeTeacher }) => {

  return(
    <tr>
      <td>{ name }</td>
      <td>{ email }</td>
      <td>{ enrollnumber }</td>
      <td>
      <button onClick={ () => removeTeacher(_id) } className="Action-Button fa fa-trash"></button>
        <Link to={{ pathname: '/edit', search: _id }}>
         <button className="Action-Button fa fa-pencil"></button>
        </Link>
      </td>

    </tr>
  );
};

export default Teacher;
