import { signOut, useSession, getSession } from 'next-auth/react';
import Head from 'next/head';
import Link from 'next/link';
import { useRef, useState, useEffect } from "react";
import { getStrapiMedia } from "/lib/media"
import { fetchAPI } from "/lib/api"
import Header from "../../components/header";
import TodoList from "../../containers/todoList";
import axios from "axios";
import AddTodo from "../../containers/addTodo";
import React, { Component } from 'react';
import { render } from 'react-dom';
import { v4 as uuid } from 'uuid';
import { useQRCode } from 'next-qrcode';
import 'animate.css';
import Image from 'next/image'
import { getProducts } from "../../utils/api"
let people;
import { useRouter } from 'next/router'
import {useParams} from 'react-router-dom'





let testo = 'Sve';

const current = new Date();
const date = `${current.getDate()}/${current.getMonth() + 1}/${current.getFullYear()}`;

const time = current.toLocaleTimeString("en-US", {
  hour: "2-digit",
  minute: "2-digit",
  hour12: false
});

function Headers({ title }) {

  return <div><h1 class="heading">{title ? title : 'POSkok Sistem'}</h1>
  <div id="postime">
        <p class="date" id="dates" value="b">{date} <span id="clock"></span></p>
        </div>
        </div>
 }

 function Footer({ title }) {

  return <div>
  <div id="postime">
        <p class="date" id="dates" value="b">POSKOK POS SISTEM - Kompletno softversko rešenje za poslovanje pravnih lica i preduzetnika</p>
        </div>
        </div>
 }
 
export default function Home({ menus, restaurants, categories, customers, sokovi, error }) {
  const { data: session } = useSession();

  const {id} = useParams();

  


  const { Canvas } = useQRCode();


  useEffect(() => {
    if (session == null) return;


    console.log('session.jwt', session.jwt);
    console.log('id.jwt', session.jwt.id);

    function startTime() {
      const today = new Date();
      let h = today.getHours();
      let m = today.getMinutes();
      let s = today.getSeconds();
      m = checkTime(m);
      s = checkTime(s);
      document.getElementById('clock').innerHTML =  h + ":" + m + ":" + s;
      setTimeout(startTime, 1000);
 
    }
    
    function checkTime(i) {
      if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
      return i;
    }
    startTime();

    var btnContainer = document.getElementById("menus-parent");

    // Get all buttons with class="btn" inside the container
    var btns = btnContainer.getElementsByClassName("menus-wrap");
    
    // Loop through the buttons and add the active class to the current/clicked button
    for (var i = 0; i < btns.length; i++) {
      btns[i].addEventListener("click", function() {
        var current = document.getElementsByClassName("active");
        current[0].className = current[0].className.replace(" active", "");
        this.className += " active";
      });
    } 



    function init() {
      // enable active states for buttons in mobile safari
      document.addEventListener("touchstart", function () {}, false);
  
      setInputButtonState();
      setBackgroundColor();
  }
  
  function handleNumberInput() {
      setInputButtonState();
      setBackgroundColor();
  }
  
  function setBackgroundColor() {
      const hue = document.getElementById("hue").value;
      const saturation = document.getElementById("saturation").value;
      const lightness = document.getElementById("lightness").value;
  
      document.body.style.backgroundColor = "hsl(" + hue + "," + saturation + "%," + lightness + "%)";
  }
  
  function handleNumberInputBlur(event) {
      const value = event.target.value;
  
      if (event.target.hasAttribute("min") && value < parseFloat(event.target.min))
          event.target.value = event.target.min;
  
      if (event.target.hasAttribute("max") && value > parseFloat(event.target.max))
          event.target.value = event.target.max;
  }
  
  function setInputButtonState() {
      const inputs = document.getElementsByClassName("number-input-text-box");
  
      for (let input of inputs) {
          if (input.id.length > 0) { // during value transition the old input won't have an id
              const value = input.value;
              const parent = input.parentElement.parentElement;
  
              if (parent.children[0] && input.hasAttribute("min"))
                  parent.children[0].disabled = value <= parseFloat(input.min);
  
              if (parent.children[2] && input.hasAttribute("max"))
                  parent.children[2].disabled = value >= parseFloat(input.max);
          }
      }
  }
  
  function setNumber(event) {
      let button = event.target;
      let input = document.getElementById(button.dataset.inputId);
  
      if (input) {
          let value = parseFloat(input.value);
          let step = parseFloat(input.dataset.step);
  
          if (button.dataset.operation === "decrement") {
              value -= isNaN(step) ? 1 : step;
          } else if (button.dataset.operation === "increment") {
              value += isNaN(step) ? 1 : step;
          }
  
          if (input.hasAttribute("min") && value < parseFloat(input.min)) {
              value = input.min;
          }
  
          if (input.hasAttribute("max") && value > parseFloat(input.max)) {
              value = input.max;
          }
  
          if (input.value !== value) {
              setInputValue(input, value);
              setBackgroundColor();
              setInputButtonState();
          }
      }
  }
  
  function setInputValue(input, value) {
      let newInput = input.cloneNode(true);
      const parentBox = input.parentElement.getBoundingClientRect();
  
      input.id = "";
  
      newInput.value = value;
  
      if (value > input.value) {
          // right to left
          input.parentElement.appendChild(newInput);
          input.style.marginLeft = -parentBox.width + "px";
      } else if (value < input.value) {
          // left to right
          newInput.style.marginLeft = -parentBox.width + "px";
          input.parentElement.prepend(newInput);
          window.setTimeout(function () {
              newInput.style.marginLeft = 0
          }, 20);
      }
  
      window.setTimeout(function () {
          input.parentElement.removeChild(input);
      }, 250);
  }
  
  window.onload = init;

  }, [session]);

  const unique_id = uuid();

  const handleClicks = (e) => {
    document.getElementById("dates").value = "Johnny Bravo";
    
  };

  const [valued, setValued] = useState('');
  const [total, setTotal] = useState('');
  const [data, setData] = useState();
  const [comment, setComment] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [err, setErr] = useState('');
  const clear = async () => {

    document.getElementById('putcart').innerHTML = "";
    document.getElementById('putcart').innerHTML += "";
    document.getElementById('total').value = 0;
    document.getElementById('cash').value = 0;
    document.getElementById('cashreturn').value = 0;

  };

  const handleClick = async () => {
    const container = document.getElementById('comment').innerHTML;
    var testing = document.getElementById("comment").value;
    var xyz = document.getElementById("total");
    let gettotal =  xyz.value;



    setIsLoading(true);
    try {
      const { data } = await axios.post(
        'http://localhost:1337/api/sales',

        {
          "data": {
            "SaleTitle": valued,
            "Invoice": unique_id,
            "Order": testing,
            "Cashier": session.user.email,
            "Amount": gettotal,
            "customer": {
              "data": {
                "id": 1
              }
            }
          }
         
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization:
            'Bearer ' + session.jwt,
          },
        }
      );

      console.log(JSON.stringify(data, null, 4));

      setData(data);
    } catch (err) {
      setErr(err.message);
    } finally {
      setIsLoading(false);
    }

    window.print();
    document.getElementById('putcart').innerHTML = "";
    document.getElementById('putcart').innerHTML += "";

  };

  console.log(data);

  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.6.0/css/bootstrap.min.css"></link>;

const handleClickss = async () => {

var removeId = event.target.attributes.getNamedItem('data-id').value;

let some = ".product" + removeId;
let somes = ".product" + removeId + " .price";
let somes2 = "total";
let title = ".product" + removeId + " .card-title";
let cardimg = ".product" + removeId + " .cover";
let quant = ".product" + removeId + " .quanitys";
let target =  document.querySelector('[data-id="p' + removeId + '"]');

let test = document.querySelector(some).innerHTML;
let tests = document.querySelector(somes).innerHTML;
let testss = document.querySelector(title).innerHTML;
let testsss = document.querySelector(cardimg).innerHTML;
let testssss = document.querySelector(quant).innerHTML;
var xy = document.getElementById("total");
var cash = document.getElementById("cash");
let cashvalue = cash.value;
let tests2 =  xy.value;

people = { id: tests ,firstName: testsss};

let yyy = parseFloat(tests) + parseFloat(tests2);
let yyyy = parseFloat(yyy) - parseFloat(cashvalue);

document.getElementById('putcart').innerHTML += "<div class=\'" + "cart-product" +'\'>' + " " + testsss + " " + "<h3>" + testss + "</h3>" + " " + "<p>" + tests + "</p>" + testssss + "</div>" + "<hr>";
document.getElementById('total').value = parseFloat(yyy).toFixed( 2 );
document.getElementById('cashreturn').value = parseFloat(yyyy).toFixed( 2 );
document.getElementById('comment').value += "\n";
document.getElementById('comment').value += tests + " " + testss + ", " + "\n";
document.getElementById('comment').value += ' ';

const container = document.getElementById('comment');

};
const handleClicksss = async () => {

var xy = document.getElementById("total");
var cash = document.getElementById("cash");
let cashvalue = cash.value;
let tests2 =  xy.value;

let yyyy = parseFloat(tests2) - parseFloat(cashvalue);

document.getElementById('cashreturn').value = parseFloat(yyyy).toFixed( 2 );

};

  return (
    
    <div class="container">
      
       {session ? (

    <div class="grid-container">
      <div class="grid-item first">
        <div class="main-menus" id="menus-parent">
          <img src="http://localhost:1337/uploads/poskok_red_bg_3d5af940f4.png?updated_at=2022-09-17T22:08:34.555Z" class="logo"></img>
          <li class="main-menus active hidethis">ovo</li>
          {menus.data.map(menu => (
            <li key={menu.id} class="main-menus" id="menu-item">
              <div class="menus-wrap">
                <img src={"http://localhost:1337" + menu.attributes.image.data.attributes.url}></img>
                <a href={menu.attributes.link}>{menu.attributes.name}</a>
              </div>
            </li>
          ))}
         
        </div>
        {session ? (
        <button class="signoutbtn" onClick={signOut}><img src="http://localhost:1337/uploads/log_in_8642b14caa.png?updated_at=2022-09-17T22:12:32.586Z" ></img>
        <p class="odjava">Odjava</p>
        </button>
      ) : (
       
        <Link href="/auth/sign-in">
           <img src="http://localhost:1337/uploads/log_in_8642b14caa.png?updated_at=2022-09-17T22:12:32.586Z" ></img>
          <button>Sign In</button>
        </Link>
      )}
      </div>
      <script>
        
      </script>
      <div class="grid-item middle-grid">
        <Headers />
        
        <div class="align-left">
          {categories.data.map(category => (
            <li key={categories.id} class="main-product-menus">
              <div class="menus-product-wrap">
                <img src={"http://localhost:1337" + category.attributes.image.data.attributes.url}></img>
                <a href={"http://localhost:3000/categories/" + category.id}>{category.attributes.name}</a>
              </div>
            </li>
          ))}
        </div>

        <ul class="product-ul">
          
          {sokovi.data.map(restaurant => ( 
            <li key={restaurant.id} class={"product-list div1 card-columns " + "product" + restaurant.id}id="product" >
              <button onClick={handleClickss} class={"" + "button" + restaurant.id} data-id={restaurant.id}>

              <div class="card product pt-4" data-id={"p" + restaurant.id}>
              <div class="cover">
              <img src={"http://localhost:1337" + restaurant.attributes.image.data.attributes.url} class="card-img-top" alt=""></img>
              </div>
              <div class="card-body border rounded">
                  <h2 class="card-title font-weight-bold text-nowrap overflow-hidden text-primary">
                  {restaurant.attributes.title}
                  </h2>
                  <div class="d-flex justify-content-between align-items-end mt-3">

            

                  <script>
                  
                    var x = document.getElementById("myNumber").max;
                    document.getElementById("demo").innerHTML = x;
                  
                  </script>
               
                  <span class="font-weight-bold price">{restaurant.attributes.price}</span>
                  <span class="font-weight-bold price">{restaurant.attributes.categories.data.name}</span>
                      
                  </div>
              </div>
              
          </div>
          </button>
          <div class="number-input-container quanitys">
                <button
                    type="button"
                    class="button-decrement"
                    onclick="setNumber(event)"
                    data-input-id="hue"
                    data-operation="decrement"
                ></button>
                <div class="number-input">
                    <input
                        type="number"
                        id="myNumber"
                        name="kvantitet"
                        class="number-input-text-box"
                        value="0"
                        min="0"
                        max={restaurant.attributes.StockQuantity}
                        oninput="handleNumberInput()"
                        onblur="handleNumberInputBlur(event)"
                        data-step="1"
                    />
                </div>
                <button
                    type="button"
                    class="button-increment"
                    onclick="setNumber(event)"
                    data-input-id="hue"
                    data-operation="increment"
                ></button>
            </div>

            </li>
          ))}


        </ul>   

        <Footer />
        
         </div>

      <div class="grid-item grid-item-cart">
        <div class="grid-item-recipient">
        <button onClick={clear} class="clear"><img src="trash.png"></img></button>
          <div>
            <div class="authx">
      {session && (
        <div style={{ marginBottom: 10}} >
          <div>Kasir: {session.user.email}</div>

        </div>
      )}
      {session ? (
        <span></span>
      ) : (
        <Link href="/auth/sign-in">
          <button class="signinout">Sign In</button>
        </Link>
      )}

     
    </div>
    <p>Klijent:</p>
    <select name="klijent" id="klijent">
    {customers.data.map(customer => (
                <option value={customer.attributes.FirstName}>{customer.attributes.FirstName}</option>
          ))}
          </select>
    
  <br></br>
    <hr></hr>
    
    <div class="billheading">
            <p>========FISKALNI RACUN=======</p>
            <p>000000000</p>
            <p>POSKOK CAFFEE</p>
            <p>0000000 - Kafic Nasumicna ulica</p>
            <p>NASUMICNA ULICA 001</p>
            <p>NOVI SAD</p>
            <p>KASIR: <span>{session.user.email}</span></p>
            <p>ESIR broj:</p>
            <p>===========PRODAJA===========</p>
            </div>
            <div id="putcart"></div>
          </div>

          <div class="bill-inner">
            <div class="billing">

              <p>ZA UPLATU:<input class="total" id="total" value="0" onChange={e => setTotal(e.target.value)} /></p>
              <p>GOTOVINA:<input type="text" name="name" class="cash" id ="cash" onChange={handleClicksss}/></p>
              <p>POVRACAJ:<input class="cashreturn" id="cashreturn" /></p>

            </div>
            <input class="comment" id="comment" value={comment} onChange={e => setComment(e.target.value)}/>

            <div class="billheading">

            <p>=============================</p>
            <p>PFR vreme: {date + " " + time}</p>
            <p>PFR broj: {unique_id}</p>
            <p>Brojac racuna: {unique_id}</p>
            <p>=============================</p>

            <Canvas
      text={unique_id}
      options={{
        type: 'image/jpeg',
        quality: 0.3,
        level: 'M',
        margin: 3,
        scale: 4,
        width: 200,
        color: {
          dark: '#000000',
          light: '#FFFFFF',
        },
      }}
    />
    <p>=====KRAJ FISKALNOG RACUNA====</p>
            </div>
            <div>
              {err && <h2>{err}</h2>}

              <p for="nacin">Nacin placanja:
  <select name="nacin" id="nacin">
    <option value="Gotovina">Gotovina</option>
    <option value="Kartica">Kartica</option>
  </select>
  <br></br>
  </p>
              
              <button onClick={handleClick} class="bill">STAMPANJE</button>

              {isLoading && <h2>Loading...</h2>}

              {data && (
                <div>
                </div>
              )}
            </div>

          </div>

        </div>
        <div class="recipient">

        </div>
      </div>
    </div>
    ) : (
      <div class="start">
         
        <img src="logo.png" class="logos animate__animated animate__bounce"></img>
        <p>POSKOK - POS</p>
        <p>Kompletno rešenje za poslovanje pravnih lica i preduzetnika</p>
        <div class="start-card">
      <Link href="/auth/sign-in">
          <button>Prijava na sistem</button>
        </Link>
        </div>
        </div>

      )}
  </div>
  );
}

Home.getInitialProps = async (context) => {
  
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


      const menus = await fetch('http://localhost:1337/api/menus?populate=%2A', {
      method: 'GET',
      headers,
    })
      .then(checkStatus)
      .then(parseJSON);

      const customers = await fetch('http://localhost:1337/api/customers?populate=%2A', {
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

      const sokovi = await fetch('http://localhost:1337/api/products?populate=*&filters[categories][id][$eq]=5', {
        method: 'GET',
        headers,
      })
      
        .then(checkStatus)
        .then(parseJSON);

    return { menus, categories, customers, sokovi };
    
  } catch (error) {
    return { error };
  }
};

export async function getInitialProps() {
  const products = await getProducts()
  return { props: { products } }
}