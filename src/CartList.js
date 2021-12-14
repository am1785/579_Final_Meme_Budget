import { useState, useEffect } from 'react';
import strawberry_unsplash from './imgs/strawberry_unsplash.jpg';
import "bootstrap/dist/css/bootstrap.min.css";
import Button from 'react-bootstrap/Button';
import CartItem from './CartItem';

function CartList() {
    const [quantities, SetQuantities] = useState([1, 1, 1]); // array that tracks all quantities of items, in the order provided
    const item_quantities = quantities;

    const strawberry_demo = <CartItem key="0" serial="123456" name="Organic Strawberries" image={strawberry_unsplash} serving="1.5lb" price="2.25" onDelete={() => deleteItem(0)} quantity={quantities[0]} onMinus={() => onMinus(0)} onAdd={() => onAdd(0)} />
    const strawberry_demo2 = <CartItem key="1" serial="234567" name="Rural Strawberries" image={strawberry_unsplash} serving="1.5lb" price="2.25" onDelete={() => deleteItem(1)} quantity={quantities[1]} onMinus={() => onMinus(1)} onAdd={() => onAdd(1)} />
    const strawberry_demo3 = <CartItem key="2" serial="232323" name="Natural Strawberries" image={strawberry_unsplash} serving="1.5lb" price="2.25" onDelete={() => deleteItem(2)} quantity={quantities[2]} onMinus={() => onMinus(2)} onAdd={() => onAdd(2)} />

    var ALL_ITEMS = [strawberry_demo, strawberry_demo2, strawberry_demo3]; // global list that contains info on all items

    const [output, SetOutput] = useState([strawberry_demo, strawberry_demo2, strawberry_demo3]);
    const output_items = output;

    var TOTAL = 0;
    for (const item of output) {
        TOTAL += Number(item.props.price) * Number(item.props.quantity);
    }

    const [totalPrice, setTotalPrice] = useState(TOTAL);
    const total_taxed = totalPrice * 1.06;

    console.log(quantities);

    function onMinus(idx) {
        // subtract the quantity of the item stored at index idx
        const ref_item = ALL_ITEMS[idx];
        if (quantities[idx] === 1) {
            item_quantities[idx] = 0;
            SetQuantities(item_quantities);
            console.log(quantities);

            let offset = 0;
            for (let i = 0; i < item_quantities.slice(0, idx).length; i++) {
                if ((item_quantities[i]) === 0) {
                    console.log('found a 0!');
                    offset++;
                }
            }
            idx = idx - offset;

            let new_output = output;
            new_output.splice(idx, 1);
            SetOutput(new_output);
            console.log(output);
        }
        else {
            const new_quantity = Number(item_quantities[idx]) - 1;
            console.log(new_quantity);
            const new_item = <CartItem key={String(idx)} name={ref_item.props.name} image={ref_item.props.image} serving={ref_item.props.serving} price={ref_item.props.price} onDelete={ref_item.props.onDelete} quantity={new_quantity} onMinus={ref_item.props.onMinus} onAdd={ref_item.onAdd} />;
            item_quantities[idx] = new_quantity;
            SetQuantities(item_quantities);
            console.log(quantities);
            let offset = 0;
            for (let i = 0; i < item_quantities.slice(0, idx).length; i++) {
                console.log(item_quantities[i]);
                if ((item_quantities[i]) === 0) {
                    console.log('found a 0!');
                    offset++;
                }
            }
            idx = idx - offset;
            const new_output = output;
            new_output[idx] = new_item;
            SetOutput(new_output);
            console.log(output);
        }
    }

    function onAdd(idx) {
        // subtract the quantity of the item stored at index idx
        const ref_item = ALL_ITEMS[idx];
        const new_quantity = Number(item_quantities[idx]) + 1;
        const new_item = <CartItem key={String(idx)} name={ref_item.props.name} image={ref_item.props.image} serving={ref_item.props.serving} price={ref_item.props.price} onDelete={ref_item.props.onDelete} quantity={new_quantity} onMinus={ref_item.props.onMinus} onAdd={ref_item.onAdd} />;
        item_quantities[idx] = new_quantity;
        SetQuantities(item_quantities);
        const new_output = output;
        new_output[idx] = new_item;
        SetOutput(new_output);
        console.log(totalPrice);
    }

    // useEffect(()=> {
    // console.log("it changed!");
    // SetQuantities(item_quantities);
    // setTotalPrice(TOTAL);
    // }, []);

    function deleteItem(idx) {
        const items = output;
        console.log(items);
        items.splice(idx, 1);
        SetOutput(items);
    }

    return <>
        <div className='container cartItem'>
            <div className='row justify-content-between'>
                <h2 id="MyCart" className='col-5'>My Cart</h2>
                <div className='col-5'></div>
                <div className='col-2 text-center'>
                </div>
            </div>
            {output}
            <div className='row justify-content-between'>
                <h2 className='col text-center mh-4'>Subtotal</h2>
                <p className='col text-center mh-4'>{totalPrice}</p>
                <h2 className='col text-center mh-4'>Total</h2>
                <p className='col text-center mh-4'>{total_taxed}</p>
            </div>
        </div>
    </>
}

export default CartList;