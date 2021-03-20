import React from "react";
import ListGroup from "react-bootstrap/ListGroup";
import Card from "react-bootstrap/Card";

function OrcaCard(props){
    return(
        <Card style={{ width: '12rem' }}>
            <Card.Img variant="top" src={props.user.portrait} />
            <Card.Body>
                <Card.Title>{props.user.name}</Card.Title>
                <Card.Text>
                    <ListGroup variant="flush">
                    {props.user.properties.map(object =>{
                        let propname=Object.getOwnPropertyNames(object);
                        let value=object[propname]
                        return <ListGroup.Item>{propname} {value}</ListGroup.Item>
                    })}
                    </ListGroup>
                </Card.Text>
            </Card.Body>
        </Card>
    )
}

export default OrcaCard;
