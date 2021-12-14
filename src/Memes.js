import { useState, useEffect } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";

function Memes() {

    return <>
        <div className='container cartItem'>
            <div className='row justify-content-between'>
                <h2 id="Meme">Meme</h2>
                <iframe src="https://giphy.com/embed/2hg8EfuuCAq5Lucb8i" width="280" height="280" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>
            </div>
        </div>
    </>
}

export default Memes;