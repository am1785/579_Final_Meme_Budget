import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import ProgressBar from 'react-bootstrap/ProgressBar';
import { RiEdit2Fill } from 'react-icons/ri';
import "bootstrap/dist/css/bootstrap.min.css";
import Modal from 'react-bootstrap/Modal';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import itemsDict from './itemsDict';
/* scan.js */
import { BiScan } from 'react-icons/bi';
import Webcam from "react-webcam";
import React from "react";
import Image from 'react-bootstrap/Image';
import { BsFillTrashFill } from 'react-icons/bs';
import strawberry_unsplash from './imgs/strawberry_unsplash.jpg';
import { scaleBand, scaleLinear, max } from 'd3';

function Home(props) {
    /* 进度条Meme Budget */
    const [bar, setBar] = useState(0); // by default 0% width progress bar
    // 如果本地存储不存在默认为0
    let [price, setprice] = useState(localStorage.getItem('price') == null ? "0" : localStorage.getItem('price'));
    let [budget, setbudget] = useState();
    const label = function () {
        return `${budget} / ${price}`;
    }
    const percentage = (Number(budget) / Number(price) * 100).toFixed(0);
    /* 弹窗组件 */
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    /* 返回进度 */
    let progress = function () {
        console.log((budget * 1 / price * 1).toFixed(2))
        return (budget * 1 / price * 1).toFixed(2)
    }
    /* cartlist,如果购物车本地存储为空，则导入默认数组，否则从本地读取 */
    let [cartlist, setcartlist] = useState(localStorage.getItem('cardlist') == null ?
        [
            {
                'serial': "123456",/* 编号 */
                'image': strawberry_unsplash,/* 图片远程链接 */
                "name": "Organic Strawberries",/* 名称 */
                "serving": "1.5lb",
                "price": "2.25",/* 单价 */
                "quantity": "1",/* 数量 */
            },
            {
                'serial': "234567",
                'image': strawberry_unsplash,
                "name": "Rural Strawberries",
                "serving": "1.5lb",
                "price": "2.25",
                "quantity": "1",/* 数量 */
            }, {
                'serial': "232323",
                'image': strawberry_unsplash,
                "name": "Natural Strawberries",
                "serving": "1.5lb",
                "price": "2.25",
                "quantity": "1",/* 数量 */
            },
        ] : JSON.parse(localStorage.getItem('cardlist'))
    );
    /* iframe data */
    useEffect(() => {
        if (localStorage.getItem('price') != null) {
            setBar(localStorage.getItem('price') * 1)
        }
        setcartlist(cartlist)
        setbudget((totalPrice() * 1.06).toFixed(0))
    }, []);
    let totalPrice = () => {
        let list = cartlist;
        let sumdata = 0;
        list.forEach((ele) => {
            sumdata = sumdata + ele.quantity * ele.price
        })
        console.log(sumdata)
        return sumdata;
    }
    /* 保存购物车 */
    let savecard = () => {
        localStorage.setItem('cardlist', JSON.stringify(cartlist))
        setbudget((totalPrice() * 1.06).toFixed(0))
    }
    /* 搜索的文本信息 */
    let [searchtxt, setsearchtxt] = useState("")

    const [camEnabled, setCamEnabled] = useState(false);
    function enableCam(){
      setCamEnabled(enabled => !enabled);
    }

    // Order Summary Part
    const data = [
        {text: 'Order', amount: budget, style:{fill:"#F45050"}},
        {text: 'Budget', amount: price, style:{fill:"#BEBEC7"}},
        {text: 'Save', amount: Number(price)-Number(budget), style:{fill:"#349C90"}}
    ];

    const [chart_data, setChartData] = useState(data);

    useEffect(() =>{
        const new_data = [
            {text: 'Order', amount: budget, style:{fill:"#F45050"}},
            {text: 'Budget', amount: price, style:{fill:"#BEBEC7"}},
            {text: 'Save', amount: Number(price)-Number(budget), style:{fill:"#349C90"}}
        ]
        setChartData(new_data);
    },[budget, price]);

    const width = 300; // sets the basic size of the resulting svg graph
    const height = 250;

    const margin = {top: 20, right: 20, bottom: 20, left:65};

    const innerHeight = height - margin.top - margin.bottom; // using innerHeight and innerWidth applies the margin to the x and y scales
    const innerWidth = width - margin.left - margin.right;


    var yScale = scaleBand()
        .domain(chart_data.map(d=> d.text))   // domain is all the object names (y-axis)
        .range([0, innerHeight])  // this makes bars spread all the way from top to bottom
        .padding(0.35);

    var xScale = scaleLinear()
        .domain([0, max(chart_data, d => d.amount)]) // this sets the length of bars scaled by maximum value [start, end]
        .range([0, innerWidth]) // bars go horizontally

    return <>
        {/* Memes.js */}
        <h1 id="mainHeader">Meme Budget</h1>
        <div className='container'>
            <div className='row justify-content-evenly align-items-center'>
                <div className='col-10'>
                    <ProgressBar animated now={progress() * 100} label={label()} />
                </div>
                <div className='col-2 text-center'>
                    <Button variant="primary" onClick={handleShow}>
                        <RiEdit2Fill />
                    </Button>
                </div>
            </div>
        </div>
        {/* Memes.js */}
        <div className='container cartItem'>
            <div className='row justify-content-between'>
                <h2 id="Meme">Meme</h2>
                {progress() * 100 > 0 && progress() * 100 <= 25 ?
                    (
                        <iframe src="https://giphy.com/embed/2hg8EfuuCAq5Lucb8i" width="280" height="280" frameBorder="0" className="giphy-embed" allowFullScreen></iframe>
                    ) : ""}
                {progress() * 100 > 25 && progress() * 100 <= 50 ?
                    (
                        <iframe src="https://giphy.com/gifs/money-jetsons-cartoon-ESt8At0PXpmj6" width="280" height="280" frameBorder="0" className="giphy-embed" allowFullScreen></iframe>
                    ) : ""}
                {progress() * 100 > 50 && progress() * 100 <= 75 ?
                    (
                        <iframe src="https://giphy.com/gifs/empire-muslim-ottoman-Km2YiI2mzRKgw" width="280" height="280" frameBorder="0" className="giphy-embed" allowFullScreen></iframe>
                    ) : ""}
                {progress() * 100 > 75 && progress() * 100 <= 100 ?
                    (
                        <iframe src="https://giphy.com/gifs/mrw-share-dividends-lhaqiQtq9AipW" width="280" height="280" frameBorder="0" className="giphy-embed" allowFullScreen></iframe>
                    ) : ""}
            </div>
        </div>
        {/* Scan.js */}
        <div className='container cartItem'>
            <div className='row justify-content-between'>
                <div className='container'>
                    <div className='row justify-content-evenly align-items-center'>
                        <div className='col-12'>
                            <h2 id="Scan">Scan Item</h2>

                            {camEnabled ? (<>
                            <div className='container'>
                            <div className='row justify-content-evenly align-items-center'>
                            <Webcam className="col-12"/>
                            <div className='col-12 mt-2 text-center'><Button onClick={enableCam} variant="outline-secondary" id="button-addon2">Cancel</Button>
                            </div></div></div></>) : <div className='container text-center'><BiScan onClick={() =>enableCam()} id="ScanIcon"/></div>}

                        </div>
                        <div className="col-12">
                            <InputGroup className="mb-3">
                                <FormControl
                                    placeholder="Enter serial number here"
                                    aria-label="serial number input"
                                    aria-describedby="basic-addon2"
                                    value={searchtxt} onChange={(e) => {
                                        setsearchtxt(e.target.value)
                                    }}
                                />
                                <Button variant="outline-secondary" id="button-addon2" onClick={() => {
                                    let list = itemsDict;
                                    let mainlist = cartlist;
                                    console.log(list)
                                    // 搜索过滤数组内容
                                    let result = list.filter((ele) => {
                                        return ele.serial === searchtxt;
                                    })
                                    if (result.length !== 0) {

                                        mainlist.push(result[0])
                                    } else {
                                        alert('no data')
                                    }
                                    console.log(mainlist)
                                    setcartlist([...mainlist])
                                    savecard()
                                }}>
                                    Apply
                                </Button>
                            </InputGroup>
                        </div>
                    </div>
                </div>
                {/* <Scan /> */}
            </div>
        </div>
        {/* cart */}
        <div className='container cartItem'>
            <div className='row justify-content-between'>
                <h2 id="MyCart" className='col-5'>My Cart</h2>
                <div className='col-5'></div>
                <div className='col-2 text-center'>
                </div>
            </div>
            {/* {output} */}
            {cartlist.map((ele, i) => {
                return (
                    <div key={i}>
                        <div className='container mt-2'>
                            <div className='row align-items-start'>
                                <div className='col-4'>
                                    <Image className='productImage' src={ele.image} rounded></Image>
                                </div>
                                <div className='col-5'>
                                    <p className='productName'>{ele.name}</p>
                                    <p className='productSerial'>SN: {ele.serial}</p>
                                    <p className='productServing'>{ele.serving}</p>
                                    <Button onClick={() => {
                                        if (ele.quantity > 1) {
                                            let list = cartlist;
                                            list[i].quantity = list[i].quantity * 1 - 1;
                                            setcartlist([...list]);
                                            savecard();
                                            setprice(bar);
                                        }
                                    }} variant="outline-primary">-</Button> {ele.quantity}
                                    <Button variant="outline-primary" onClick={() => {
                                        let list = cartlist;
                                        list[i].quantity = list[i].quantity * 1 + 1;
                                        setcartlist([...list]);
                                        savecard();
                                        setprice(bar);
                                    }}>+</Button>
                                </div>
                                <div className='col-2'>
                                    <Button onClick={() => {
                                        let list = cartlist;
                                        list.splice(i, 1);
                                        setcartlist([...list])
                                        savecard()
                                    }} variant="danger"><BsFillTrashFill /></Button>
                                    <p className='productPrice align-self-stretch'>{'$' + ele.price * ele.quantity}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            })}

            <div className='row justify-content-between'>
                <h2 className='col text-center mh-4'>Subtotal</h2>
                <p className='col text-center mh-4'>{totalPrice()}</p>
                <h2 className='col text-center mh-4'>Total</h2>
                <p className='col text-center mh-4'>{(totalPrice() * 1.06).toFixed(0)}</p>
            </div>
        </div>
        <>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Budget</Modal.Title>
                </Modal.Header>
                <Modal.Body><InputGroup className="mb-3">
                    <InputGroup.Text>$</InputGroup.Text>
                    <FormControl aria-label="Amount (to the nearest dollar)" value={bar} onChange={(e) => {
                        setBar(e.target.value)
                    }} />
                    <InputGroup.Text>.00</InputGroup.Text>
                </InputGroup>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={(e) => {
                        console.log(bar)
                        localStorage.setItem('price', bar);
                        setprice(bar);
                        setShow(false)
                        setBar(localStorage.getItem('price') * 1)
                    }}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>

        <>
        <div className='row justify-content-between'>
            <div className='container'>
            <div className='row justify-content-evenly align-items-center'>
                <div className='col-12'>
                    <h2 id="Summary">Order Summary</h2>
                </div>
                <div className='col-12 text-center'>
                    <svg width={width} height={height}>
                        <g transform={`translate(${margin.left}, ${margin.top})`}>  {/* adding the group tag and transforming moves applies the margin on all sides now*/}

                        {yScale.domain().map(tickValue => ( // this is generating the text on the left using tickValues (the key of the dataset), textAnchor:end is essential for aligning text to the left
                        <g transform={`translate(0, ${yScale(tickValue) + yScale.bandwidth() / 2})`}>
                            <text x={-10} style={{textAnchor: 'end'}}> {/*x = {-10} to create separation between text label and bar*/}
                                {tickValue}
                            </text>
                        </g>

                        ))}
                        {chart_data.map(d => (
                            <rect
                                className={d.text}
                                style={d.style}
                                x={0}
                                y={yScale(d.text)}
                                width={xScale(d.amount)}
                                height={yScale.bandwidth()}

                            />
                        ))}
                        </g>
                    </svg>
                    </div>
                </div>
                </div>
            </div>
        </>
    </>
}

export default Home;