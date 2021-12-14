import {useState, useRef, useEffect} from 'react';
import Image from 'react-bootstrap/Image';
import Button  from 'react-bootstrap/Button';
import { BsFillTrashFill } from 'react-icons/bs';

function CartItem (props) {

    const [quantity, setQuantity] = useState(1);
    const [totalCost, setTotal] = useState(props.price);
    const total = (Number(props.price) * Number(quantity)).toFixed(2);

    function addOne () {
        setQuantity(quantity+1);
    }

    function minusOne() {
        if(quantity > 0){
            setQuantity(quantity-1);
        }
    }

    useEffect(() => {
        setTotal(total);
    }, [quantity]);


    useEffect(() => {
        setQuantity(quantity);
    }, [quantity]);

    return <>
    <div className='container mt-2'>
        <div className='row align-items-start'>
            <div className='col-4'>
                <Image className='productImage' src={props.image} rounded></Image>
            </div>
            <div className='col-5'>
                <p className='productName'>{props.name}</p>
                <p className='productSerial'>SN: {props.serial}</p>
                <p className='productServing'>{props.serving}</p>
                {/* <Button onClick={()=> {minusOne(); props.onMinus();}} variant="outline-primary">-</Button> {quantity} <Button variant="outline-primary" onClick={()=> {addOne(); props.onAdd();}}>+</Button> */}
            </div>
            <div className='col-2'>
                <Button onClick={props.onDelete} variant="danger"><BsFillTrashFill /></Button>
                <p className='productPrice align-self-stretch'>{'$' + totalCost}</p>
            </div>
        </div>
    </div>
    </>
}

export default CartItem;