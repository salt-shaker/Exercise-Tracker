import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

export default class Candle extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title: props.block.title,
            body: props.block.body,
            value1: props.block.value1,
            value2: props.block.value2,
        }
    }

    render() {
        return (
            <Card className="col-12 col-md-3 d-inline-block" style={{}}>
                <Card.Img variant="top" src="holder.js/100px180" />
                <Card.Body>
                    <Card.Title>{this.state.title}</Card.Title>
                    <Card.Text>
                        {this.state.body}
                    </Card.Text>
                    <Card.Text>
                        Value 1
                        <span>{this.state.value1}</span>
                    </Card.Text>
                    <Card.Text>
                        Value 2

                        <span>{this.state.value2}</span>
                    </Card.Text>
                    <Button variant="primary">Go somewhere</Button>
                </Card.Body>
            </Card>
        )
    }
}