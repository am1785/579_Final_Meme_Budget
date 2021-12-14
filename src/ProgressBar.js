import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import ProgressBar from 'react-bootstrap/ProgressBar';
import { RiEdit2Fill } from 'react-icons/ri';
import "bootstrap/dist/css/bootstrap.min.css";
import Modal from 'react-bootstrap/Modal';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';

function Progress(props) {

  function Example() {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
      <>
        <Button variant="primary" onClick={handleShow}>
          <RiEdit2Fill />
        </Button>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Budget</Modal.Title>
          </Modal.Header>
          <Modal.Body><InputGroup className="mb-3">
            <InputGroup.Text>$</InputGroup.Text>
            <FormControl aria-label="Amount (to the nearest dollar)" />
            <InputGroup.Text>.00</InputGroup.Text>
          </InputGroup>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleClose}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }


  const [bar, setBar] = useState("100"); // by default 0% width progress bar
  const percentage = (Number(props.price) / Number(props.budget) * 100).toFixed(0);
  const label = `${props.price} / ${props.budget}`;

  useEffect(() => {
    setBar(percentage);
  }, []);

  return <>
    <h1 id="mainHeader">Meme Budget</h1>
    <div className='container'>
      <div className='row justify-content-evenly align-items-center'>
        <div className='col-10'>
          <ProgressBar animated now={bar} label={label} />
        </div>
        <div className='col-2 text-center'>
          <Button variant="light"> <Example /></Button>
        </div>
      </div>
    </div>
  </>

}

export default Progress;