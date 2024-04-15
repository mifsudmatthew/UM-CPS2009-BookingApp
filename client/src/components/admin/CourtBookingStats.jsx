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
    </Accordion>
  );
}

export default CourtBookingStats;