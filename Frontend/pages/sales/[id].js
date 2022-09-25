import { getStrapiMedia } from "/lib/media"
import { fetchAPI } from "/lib/api"
import { useRef, useState, useEffect } from "react";


import React, { Component } from 'react';

import { render } from 'react-dom';
import { useRouter } from 'next/router'



function Header({ title }) {
  const router = useRouter()
  const {id } = router.query

 return { id }



}









const Sales = ({ saless, categories, error }) => {
 

  const router = useRouter()
  const { id } = router.query



 

  
 
  if (error) {
    return <div>An error occured: {error.message}</div>;
  }

const test = { id } - 1;
const test2 = { id };
const current = new Date();
  const date = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;
  return (

<div class="container">

<div class="grid-container">
<div class="grid-item main-menus">

<img src="http://localhost:1337/uploads/poskok_1_0752336dc9.png" class="logo"></img>


{categories.data.map(category => (
        <li key={categories.id} class="main-menus">
          <div class="menus-wrap">
          <img src={"http://localhost:1337" + category.attributes.image.data.attributes.url}></img>
          <a href={category.attributes.link}>{category.attributes.name}</a> 
          </div>
          




</li>
      ))}


</div>
<div class="grid-item">




<p class="date">Current date is {date}</p>
<ul class="sales-ul">
{saless.data.slice(test, test2).map(Sale => (
        <li key={Sale.id} class="sales-list">
<div>
{Sale.attributes.SaleTitle}
{Sale.attributes.createdAt}
{Sale.attributes.Invoice}
{Sale.attributes.PaymentType}
</div>








</li>
      ))}


    </ul>
    
</div>

<div class="grid-item grid-item-recipient"></div>
</div>
</div>
  );

};

Sales.getInitialProps = async ctx => {
  try {
    // Parses the JSON returned by a network request
    const parseJSON = resp => (resp.json ? resp.json() : resp);
    // Checks if a network request came back fine, and throws an error if not
    const checkStatus = resp => {
      if (resp.status >= 200 && resp.status < 300) {
        return resp;
      }

      return parseJSON(resp).then(resp => {
        throw resp;
      });
    };

    const headers = {
      'Content-Type': 'application/json',
    };
    

    var saless = await fetch('http://localhost:1337/api/sales/' + <Header />, {
      method: 'GET',
      headers,
    })
      .then(checkStatus)
      .then(parseJSON);

const categories = await fetch('http://localhost:1337/api/categories?populate=%2A', {
      method: 'GET',
      headers,
    })
      .then(checkStatus)
      .then(parseJSON);

    return { saless, categories };
  } catch (error) {
    return { error };
  }



};
export default Sales;

 

 