import logo from './logo.svg';
import './App.css';
import React from 'react';

import Axios from 'axios';


const App = () => {


  const paymentHandler = async (e) => {
    const API_URL = 'http://localhost:8000/'
    e.preventDefault();
    const orderUrl = `${API_URL}order`;
    const response = await Axios.get(orderUrl);
    console.log(response.data);
    const { data } = response;
    const options = {
      key: process.env.RAZOR_PAY_TEST_KEY,
      name: "Nagarjuna",
      description: "Vijayawada",
      order_id: data.id,
      handler: async (response) => {
        try {

         const paymentId = response.razorpay_payment_id;
         const url = `${API_URL}capture/${paymentId}`;
         const captureResponse = await Axios.post(url, {})
         console.log(captureResponse.data);
        } catch (err) {
          console.log(err);
        }
      },
      theme: {
        color: "#686CFD",
      },
    };
    const rzp1 = new window.Razorpay(options);
    rzp1.open();
    };



  return (
    <button onClick={paymentHandler}>Pay Now</button>
  );
};
export default App;

  

