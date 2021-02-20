import React from 'react';

const exercise = props => {

    return React.createElement(() =>
        <tr>
            <td className="d-table-cell">{props.data.username}</td>
            <td className="d-none d-sm-table-cell">{props.data.description}</td>
            <td className="d-none d-md-table-cell">{props.data.duration}</td>
            <td className="d-none d-sm-table-cell">{props.data.date.substring(0, 10)}</td>
            <td className="d-table-cell">
                <button onClick={() => {window.location = "/edit/" + props.data._id}}>Edit</button> | <button onClick={() => { props.arg.deleteExercise(props.data._id) }}>Delete</button>
            </td>
        </tr>

    )
}


export default exercise;
