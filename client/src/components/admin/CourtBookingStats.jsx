import Accordion from 'react-bootstrap/Accordion';
import 'bootstrap/dist/css/bootstrap.min.css';
import "../../styles/accordion.css";

function CourtBookingStats() {
  return (
    <Accordion defaultActiveKey="0">
      <Accordion.Item eventKey="0" >
        <Accordion.Header className="custom-accordion-header">Court 1</Accordion.Header>
        <Accordion.Body style={{ backgroundColor: '#b4c69d9a' }}>
          Court statistics here
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="1" >
        <Accordion.Header className="custom-accordion-header">Court 2</Accordion.Header>
        <Accordion.Body style={{ backgroundColor: '#b4c69d9a' }}>
          Court statistics here
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="2" >
        <Accordion.Header className="custom-accordion-header">Court 3</Accordion.Header>
        <Accordion.Body style={{ backgroundColor: '#b4c69d9a' }}>
          Court statistics here
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="3" >
        <Accordion.Header className="custom-accordion-header">Court 4</Accordion.Header>
        <Accordion.Body style={{ backgroundColor: '#b4c69d9a' }}>
          Court statistics here
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="4" >
        <Accordion.Header className="custom-accordion-header">Court 5</Accordion.Header>
        <Accordion.Body style={{ backgroundColor: '#b4c69d9a' }}>
          Court statistics here
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="5" >
        <Accordion.Header className="custom-accordion-header">Court 6</Accordion.Header>
        <Accordion.Body style={{ backgroundColor: '#b4c69d9a' }}>
          Court statistics here
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
}

export default CourtBookingStats;