import { getStrapiMedia } from "/lib/media"
import { fetchAPI } from "/lib/api"
import { useRef, useState, useEffect } from "react";


import React, { Component } from 'react';

import { render } from 'react-dom';



function Header({ title }) {
 return <h1 class="heading">{title ? title : 'Poskok Store Prototype'}</h1>;
}









const Sales = ({ saless, categories, error }) => {
 
  if (error) {
    return <div>An error occured: {error.message}</div>;
  }

  

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
<Header />



<p class="date">Current date is {date}</p>
<ul class="sales-ul">
{saless.data.map(Sale => (
        <li key={Sale.id} class="sales-list">
<div></div>
{Sale.attributes.SaleTitle}
{Sale.attributes.createdAt}
{Sale.attributes.Invoice}
{Sale.attributes.PaymentType}
<p>this is test</p>
<a href={"http://localhost:3000/sales/" + Sale.id}>View</a>

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

    const saless = await fetch('http://localhost:1337/api/sales?populate=%2A', {
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

 

 