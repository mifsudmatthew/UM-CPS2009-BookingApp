import Accordion from 'react-bootstrap/Accordion';
import 'bootstrap/dist/css/bootstrap.min.css';

function BasicExample() {
  return (
    <Accordion defaultActiveKey="0" >
      <Accordion.Item eventKey="0" >
        <Accordion.Header>Court 1</Accordion.Header>
        <Accordion.Body>
          Court statistics here
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
}

export default BasicExample;