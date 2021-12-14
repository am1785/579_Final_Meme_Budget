import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import Navigator from './Navigator';
import { Helmet } from "react-helmet";
import Progress from './ProgressBar';
import CartList from './CartList';
import Memes from './Memes';
import Scan from './Scan';
import Summary from './Summary';
import Home from './home';

ReactDOM.render(<>
  <header>
    <Helmet>
      <meta charSet="utf-8" />
      <title>Meme Budget</title>
    </Helmet>
  </header>
  <main>
    <Home />
    <Navigator />
    {/* <Progress price="15" budget="20" /> */}
    {/* <Memes /> */}
    {/* <Scan /> */}
    {/* <CartList /> */}
    {/* <Summary /> */}
  </main>
</>, document.getElementById('root')
);
