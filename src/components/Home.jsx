import React from "react";
import { Button, Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import CardHeader from "react-bootstrap/esm/CardHeader";

export default function Home() {
  return (
    <div>
      <Button variant="success">TEST BUTTON</Button>
      <Card className="fixed-bottom">
        <Card.Body>
          <Card.Title>Some Product Title</Card.Title>
          <Card.Text>Product description here</Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
}
