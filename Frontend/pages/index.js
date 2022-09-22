import { signOut, useSession, getSession } from 'next-auth/react';
import Head from 'next/head';
import Link from 'next/link';
import { useRef, useState, useEffect } from "react";
import { getStrapiMedia } from "/lib/media"
import { fetchAPI } from "/lib/api"
import Header from "../components/header";
import TodoList from "../containers/todoList";
import axios from "axios";
import AddTodo from "../containers/addTodo";
import React, { Component } from 'react';
import { render } from 'react-dom';
import { v4 as uuid } from 'uuid';
import { useQRCode } from 'next-qrcode';
import 'animate.css';









const current = new Date();
  const date = `${current.getDate()}/${current.getMonth() + 1}/${current.getFullYear()}`;


const time = current.toLocaleTimeString("en-US", {
  hour: "2-digit",
  minute: "2-digit",
  hour12: false
});



let auth = '';

let people;



function Headers({ title }) {

  return <div><h1 class="heading">{title ? title : 'POSkok Sistem'}</h1>
  <div id="postime">
        <p class="date" id="dates" value="b">{date} <span id="clock"></span></p>
        </div>
        </div>


  
 }
 

export default function Home({ menus, restaurants, categories, error }) {
  const { data: session } = useSession();

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

  

  var jsonObj = {
    data: [
      {
        "id": 2,
        "attributes": {
          "SaleTitle": "qwerty",
          "createdAt": "2022-09-04T13:06:26.017Z",
          "updatedAt": "2022-09-08T21:30:21.073Z",
          "publishedAt": "2022-09-08T21:30:21.070Z",
          "Invoice": "09808978676575",
          "PaymentType": "Cash",
          "RefundType": null,
          "Comment": "This is test",
          "Amount": 0.01
        }
      }]};



  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.6.0/css/bootstrap.min.css"></link>;
  <script>
    
    
  </script>


const handleClickss = async () => {
 

  var html_to_insert = "<p>New paragraph</p>";

  // with .innerHTML, destroys event listeners
  

  var removeId = event.target.attributes.getNamedItem('data-id').value;
  console.log(removeId);

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

console.log("ovo je yyy" + yyy);

document.getElementById('putcart').innerHTML += "<div class=\'" + "cart-product" +'\'>' + testsss + "<h3>" + testss + "</h3>" + "<p>" + tests + "</p>" + testssss + "</div>" + "<hr>";

document.getElementById('putcart').innerHTML += "<br>";


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
                <a href={category.attributes.link}>{category.attributes.name}</a>
              </div>
            </li>
          ))}

        </div>





        <ul class="product-ul">
          
          {restaurants.data.map(restaurant => (
            
             
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
                      <div class="quanitys">
                      KOL.<input type="number" id="myNumber" min="1" max={restaurant.attributes.StockQuantity}></input>
                      
                      </div>
                  
                  
                  <script>
                  
                    var x = document.getElementById("myNumber").max;
                    document.getElementById("demo").innerHTML = x;
                  
                  </script>
               
                  <span class="font-weight-bold price">{restaurant.attributes.price}</span>
                      
                  </div>
              </div>
              
              
          </div>
          </button>

            </li>
          ))}
        </ul>    </div>

                            <script>
                            
                            </script>



      <div class="grid-item grid-item-cart">

        <div class="grid-item-recipient">
          <div>
            
            <div class="authx">
      {session && (
        <div style={{ marginBottom: 10}} >
          <div>Email: {session.user.email}</div>
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
    <p class="billid">BROJ RACUNA: {unique_id}</p>
            <div id="putcart"></div>
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
            <p>BROJ RACUNA:</p>
            <p id="text">{unique_id}</p>
            <p>=============================</p>
            <p>PFR VREME: {date + " " + time}</p>
            <p>PFR VREME: {date + " " + time}</p>
            <p>PFR VREME: {date + " " + time}</p>

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
            
            
                                  


            

          </div>
          <div class="bill-inner">

            <div>

              <p>UKUPNO:<input class="total" id="total" value="0" onChange={e => setTotal(e.target.value)} /></p>
              <p>GOTOVINA:<input type="text" name="name" class="cash" id ="cash" onChange={handleClicksss}/></p>
              <p>POVRACAJ:<input class="cashreturn" id="cashreturn" /></p>

            </div>
            <input class="comment" id="comment" value={comment} onChange={e => setComment(e.target.value)}/><br></br>
            





            <div>
              {err && <h2>{err}</h2>}
              <button onClick={clear} class="clear">Clear</button>

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
        <script>

          
        </script>

      </div>
    </div>
    ) : (
      <div class="start">
         
        <img src="http://localhost:1337/uploads/Group_2_b1fbbdf67f.png?updated_at=2022-09-17T20:32:22.580Z" class="logos animate__animated animate__bounce"></img>
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

    const restaurants = await fetch('http://localhost:1337/api/products?populate=%2A', {
      method: 'GET',
      headers,
    })
      .then(checkStatus)
      .then(parseJSON);


      
      const menus = await fetch('http://localhost:1337/api/menus?populate=%2A', {
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

      

    return { menus, restaurants, categories };
    
  } catch (error) {
    return { error };
  }

  

  







};


