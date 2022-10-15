import { useRouter } from 'next/router'
import ReactPaginate from 'react-paginate';
import Router, { withRouter } from 'next/router'
import { signOut, useSession, getSession } from "next-auth/react";
import Link from "next/link";
import { useRef, useState, useEffect } from "react";
import Cart from "../../components/Cart";
import axios from "axios";
import React, { Component } from "react";
import { v4 as uuid } from "uuid";
import { useQRCode } from "next-qrcode";
import "animate.css";
import Search from '..//../components/Search';

let people;
let testo = "Sve";



const current = new Date();
const date = `${current.getDate()}/${
  current.getMonth() + 1
}/${current.getFullYear()}`;

const time = current.toLocaleTimeString("en-US", {
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
});

function Headers({ title }) {
  return (
    <div>
      <h1 class="heading">{title ? title : "POSkok Sistem"}</h1>
      <div id="postime">
        <p class="date" id="dates" value="b">
          {date} <span id="clock"></span>
        </p>
      </div>
    </div>
  );
}

function Footer({ title }) {
  return (
    <div>
      <div id="postime">
        <p class="date" id="dates" value="b">
          POSKOK POS SISTEM - Kompletno softversko rešenje za poslovanje pravnih
          lica i preduzetnika
        </p>
      </div>
    </div>
  );
}
    
    
    const Test = (props) => {

        const router = useRouter()
        const { pid } = router.query;
        const { data: session } = useSession();
        const { Canvas } = useQRCode();
        const [isLoading, setLoading] = useState(false); //State for the loading indicator
        const startLoading = () => setLoading(true);
        const stopLoading = () => setLoading(false);
        const [issLoading, setIssLoading] = useState(false);

        
    
    		/*
    			Posts fetching happens after page navigation, 
    			so we need to switch Loading state on Router events.
    		*/
        useEffect(() => { //After the component is mounted set router event handlers
            Router.events.on('routeChangeStart', startLoading); 
            Router.events.on('routeChangeComplete', stopLoading);

            if (session == null) return;

    console.log("session.jwt", session.jwt);
    console.log("id.jwt", session.jwt.id);

    function startTime() {
      const today = new Date();
      let h = today.getHours();
      let m = today.getMinutes();
      let s = today.getSeconds();
      m = checkTime(m);
      s = checkTime(s);
      document.getElementById("clock").innerHTML = h + ":" + m + ":" + s;
      setTimeout(startTime, 1000);
    }

    function checkTime(i) {
      if (i < 10) {
        i = "0" + i;
      } // add zero in front of numbers < 10
      return i;
    }
    startTime();

    var btnContainer = document.getElementById("menus-parent");

    // Get all buttons with class="btn" inside the container
    var btns = btnContainer.getElementsByClassName("menus-wrap");

    // Loop through the buttons and add the active class to the current/clicked button
    for (var i = 0; i < btns.length; i++) {
      btns[i].addEventListener("click", function () {
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

      document.body.style.backgroundColor =
        "hsl(" + hue + "," + saturation + "%," + lightness + "%)";
    }

    function handleNumberInputBlur(event) {
      const value = event.target.value;

      if (
        event.target.hasAttribute("min") &&

        value < parseFloat(event.target.min)
      )
        event.target.value = event.target.min;

      if (
        event.target.hasAttribute("max") &&
        value > parseFloat(event.target.max)
      )
        event.target.value = event.target.max;
    }

    function setInputButtonState() {
      const inputs = document.getElementsByClassName("number-input-text-box");

      for (let input of inputs) {
        if (input.id.length > 0) {
          // during value transition the old input won't have an id
          const value = input.value;
          const parent = input.parentElement.parentElement;

          if (parent.children[0] && input.hasAttribute("min"))
            parent.children[0].disabled = value <= parseFloat(input.min);

          if (parent.children[2] && input.hasAttribute("max"))
            parent.children[2].disabled = value >= parseFloat(input.max);
        }
      }
    }

    function setNumber(events) {
      let button = events.target;
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
          newInput.style.marginLeft = 0;
        }, 20);
      }

      window.setTimeout(function () {
        input.parentElement.removeChild(input);
      }, 250);
    }

    window.onload = init;


    // If there are any saved items, update our list
    
    
            return () => {
                Router.events.off('routeChangeStart', startLoading);
                Router.events.off('routeChangeComplete', stopLoading);
            }
        }, [session])

        const unique_id = uuid();

  const handleClicks = (e) => {
    document.getElementById("dates").value = "Johnny Bravo";
  };

  const [valued, setValued] = useState("");
  const [total, setTotal] = useState("");
  const [data, setData] = useState();
  const [comment, setComment] = useState();
  const [err, setErr] = useState("");

  <link
    rel="stylesheet"
    href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.6.0/css/bootstrap.min.css"
  ></link>;

 
    
    		//When new page selected in paggination, we take current path and query parrams.
    		// Then add or modify page parram and then navigate to the new route.
        const pagginationHandler = (page) => {
            const currentPath = props.router.pathname;
            const currentQuery = props.router.query;
            currentQuery.page = page.selected + 1;
    
            props.router.push({
                pathname: currentPath,
                query: currentQuery,
            });
    
        };
    		
    		//Conditional rendering of the posts list or loading indicator
        let content = null;
        if (isLoading)
            content = <div>Slanje...</div>;
        else {
    				//Generating posts list
            content = (
              <div></div>
            );
        }
    
        return (
          
            <div className="container">
              
              
                <div className="posts">
                {session ? (
                    <div class="grid-container">
                    <div class="grid-item first">
                <div class="main-menus" id="menus-parent">
                  <img
                    src="http://designersnfts.com:1337/uploads/poskok_red_bg_3d5af940f4.png?updated_at=2022-09-17T22:08:34.555Z"
                    class="logo"
                    alt=''></img>
                  <li class="main-menus active hidethis">ovo</li>
                  {props.menus.data.map((menu) => (
                    <li key={menu.id} class="main-menus" id="menu-item">
                      <div class="menus-wrap">
                        <img
                          src={
                            "http://designersnfts.com:1337" +
                            menu.attributes.image.data.attributes.url
                          }
                          alt=''></img>
                        <a href={menu.attributes.link}>{menu.attributes.name}</a>
                      </div>
                    </li>
                  ))}
                </div>
                {session ? (
                  <button class="signoutbtn" onClick={signOut}>
                    <img src="http://designersnfts.com:1337/uploads/log_in_8642b14caa.png?updated_at=2022-09-17T22:12:32.586Z" alt=''></img>
                    <p class="odjava">Odjava</p>
                  </button>
                ) : (
                  <Link href="/auth/sign-in">
                    <img src="http://designersnfts.com:1337/uploads/log_in_8642b14caa.png?updated_at=2022-09-17T22:12:32.586Z" alt=''></img>
                    <button>Sign In</button>
                  </Link>
                )}
              </div>
              <div class="grid-item middle-grid">
              <Headers />
              
                <ul class="">
                        {props.posts.data.map(post => {
                            return <li
                            key={post.id}
                            class={
                              "product-list div1 card-columns " +
                              "product" +
                              post.id
                            }
                            id="product"
                          >
                            
                            <div class="product-form">
                            <form action="/send-data-here" method="post">
                            <label for="fname">Kreirano:</label>
                            <input type="text" id="created" name="created" value={post.attributes.createdAt}></input>
                            <label for="fname">Azurirano:</label>
                            <input type="text" id="created" name="created" value={post.attributes.updatedAt}></input>
                            <label for="fname">Status:</label>
                            <input type="text" id="created" name="created" value={post.attributes.status}></input>
                            <label for="fname">Opis:</label>
                            <input type="text" id="created" name="created" value={post.attributes.description}></input>
                            <label for="fname">Cena:</label>
                            <input type="text" id="created" name="created" value={post.attributes.price}></input>
                            <label for="fname">Url:</label>
                            <input type="text" id="created" name="created" value={post.attributes.slug}></input>
                            <label for="fname">Tip zalihe:</label>
                            <input type="text" id="created" name="created" value={post.attributes.StockType}></input>
                            <label for="fname">Tip proizvoda:</label>
                            <input type="text" id="created" name="created" value={post.attributes.ItemType}></input>
                            <label for="fname">Veleprodajna cena:</label>
                            <input type="text" id="created" name="created" value={post.attributes.WholesalePrice}></input>
                            <label for="fname">Maloprodajna cena:</label>
                            <input type="text" id="created" name="created" value={post.attributes.RetailPrice}></input>
                            <label for="fname">Porez 1:</label>
                            <input type="text" id="created" name="created" value={post.attributes.Tax1}></input>
                            <label for="fname">Porez2:</label>
                            <input type="text" id="created" name="created" value={post.attributes.Tax2}></input>
                            <label for="fname">Na stanju:</label>
                            <input type="text" id="created" name="created" value={post.attributes.StockQuantity}></input>
                            <label for="fname">Proizvod sadrzi serijski broj:</label>
                            <input type="text" id="created" name="created" value={post.attributes.ItemHasSerialNumber}></input>
                            <label for="fname">Kolicina po pakovanju:</label>
                            <input type="text" id="created" name="created" value={post.attributes.QuantityPerPack}></input>
                            <label for="fname">Barkod:</label>
                            <input type="text" id="created" name="created" value={post.attributes.Barcode}></input>
                            <input type="submit" value="Submit"></input>
                            </form>
                            </div>
                           
                          </li>;
                          
                        })}
                        
                        
                    </ul>
                   
                    </div>
                    
            </div>
                    ) : (
                  <div class="start">
                    <img
                      src="logo.png"
                      class="logos animate__animated animate__bounce"
                      alt=''></img>
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

                
    
                
            </div>
        );
    };

    
    
    Test.getInitialProps = async ({ query }) => {
   
      const headers = {
        "Content-Type": "application/json",
      };
        const page = query.pid;
        const posts = await axios.get(process.env.NEXT_PUBLIC_API_URL + `sales?filters%5Bid%5D=${page}&populate=*`);
        const menus = await axios.get(process.env.NEXT_PUBLIC_API_URL + `menus?populate=%2A`);
        const customers = await axios.get(process.env.NEXT_PUBLIC_API_URL + 'customers?populate=%2A', {
          headers,
        });
        const categories = await axios.get(process.env.NEXT_PUBLIC_API_URL + 'categories?populate=%2A', {
          headers,
        });
       
        return {
            
            posts: posts.data,
            menus: menus.data,
            categories: categories.data,
            customers: customers.data,

        };
    }
    
    
    export default withRouter(Test);





