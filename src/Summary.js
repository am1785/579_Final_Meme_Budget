import "bootstrap/dist/css/bootstrap.min.css";
import { BiScan } from 'react-icons/bi';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Button  from 'react-bootstrap/Button';

function Summary () {
    return <><div className='container cartItem'>
        <div className='row justify-content-between'>
            <div className='container'>
            <div className='row justify-content-evenly align-items-center'>
                <div className='col-12'>
                    <h2 id="Summary">Order Summary</h2>
                </div>
            </div>
            </div>
        </div>
    </div></>
}

export default Summary;