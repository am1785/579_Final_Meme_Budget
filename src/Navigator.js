import { useState } from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import { BiScan } from 'react-icons/bi';
import { BsPerson } from 'react-icons/bs';
import { FaShoppingBag } from 'react-icons/fa';
import { RiEdit2Fill } from 'react-icons/ri';

function Navigator() {

    const [budgetIsActive, setBudgetActive] = useState(true);
    const [scanIsActive, setScanActive] = useState(false);
    const [checkIsActive, setCheckActive] = useState(false);

    function ToggleBudgetActive() {
        setBudgetActive(true);
        setScanActive(false);
        setCheckActive(false);
    }

    function ToggleScanActive() {
        setScanActive(true);
        setBudgetActive(false);
        setCheckActive(false);
    }

    function ToggleCheckActive() {
        setCheckActive(true);
        setScanActive(false);
        setBudgetActive(false);
    }


    return <>
        <div className="fixed-top">
            <nav className="nav nav-pills nav-fill justify-content-around">
                <a className={budgetIsActive ? 'nav-link active' : 'nav-link'} onClick={ToggleBudgetActive} href="#Meme"><RiEdit2Fill /></a>
                <a className={scanIsActive ? 'nav-link active' : 'nav-link'} onClick={ToggleScanActive} href="#Scan"><BiScan /></a>
                <a className={checkIsActive ? 'nav-link active' : 'nav-link'} onClick={ToggleCheckActive} href="#MyCart"><FaShoppingBag /></a>
            </nav>
        </div>
    </>

}

export default Navigator;