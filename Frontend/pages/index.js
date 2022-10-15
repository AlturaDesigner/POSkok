
import ReactPaginate from 'react-paginate';
import Router, { withRouter } from 'next/router'
import { signOut, useSession, getSession } from "next-auth/react";
import Link from "next/link";
import { useRef, useState, useEffect } from "react";
import Cart from "../components/Cart";
import axios from "axios";
import React, { Component } from "react";
import { v4 as uuid } from "uuid";
import { useQRCode } from "next-qrcode";
import "animate.css";
import Search from '../components/Search';
import { useRouter } from 'next/router'

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
        const [isLoading, setLoading] = useState(false);
        const startLoading = () => setLoading(true);
        const stopLoading = () => setLoading(false);
        const [issLoading, setIssLoading] = useState(false);

        useEffect(() => { 
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
      } 
      return i;
    }
    startTime();

    var btnContainer = document.getElementById("menus-parent");
    var btns = btnContainer.getElementsByClassName("menus-wrap");
    
    for (var i = 0; i < btns.length; i++) {
      btns[i].addEventListener("click", function () {
        var current = document.getElementsByClassName("active");
        current[0].className = current[0].className.replace(" active", "");
        this.className += " active";
      });
    }

    function init() {
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
        input.parentElement.appendChild(newInput);
        input.style.marginLeft = -parentBox.width + "px";
      } else if (value < input.value) {
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

    var saved = localStorage.getItem("putcart");
    document.getElementById("putcart").innerHTML = saved;

    var saves = localStorage.getItem("total");
    document.getElementById("total").value = saves;
    
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
  const clear = async () => {
    document.getElementById("putcart").innerHTML = "";
    document.getElementById("putcart").innerHTML += "";
    document.getElementById("total").value = 0;
    document.getElementById("cash").value = 0;
    document.getElementById("cashreturn").value = 0;

    let putcart = document.getElementById("putcart");
    localStorage.setItem("putcart", putcart.innerHTML);
  };

  const handleClick = async () => {
    const container = document.getElementById("comment").innerHTML;
    var testing = document.getElementById("comment").value;
    var xyz = document.getElementById("total");
    let gettotal = xyz.value;

    setIssLoading(true);
    try {
      const { data } = await axios.post(
        "http://designersnfts.com:3000/api/sales",

        {
          data: {
            SaleTitle: valued,
            Invoice: unique_id,
            Order: testing,
            Cashier: session.user.email,
            Amount: gettotal,
            customer: {
              data: {
                id: 1,
              },
            },
          },
        },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: "Bearer " + session.jwt,
          },
        }
      );

      console.log(JSON.stringify(data, null, 4));

      setData(data);
    } catch (err) {
      setErr(err.message);
    } finally {
      setIssLoading(false);
    }

    window.print();
    document.getElementById("putcart").innerHTML = "";
    document.getElementById("putcart").innerHTML += "";
  };


  <link
    rel="stylesheet"
    href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.6.0/css/bootstrap.min.css"
  ></link>;

  const handleClickss = async () => {
   
    // Retrieve

    var removeId = event.target.attributes.getNamedItem("data-id").value;

    let some = ".product" + removeId;
    let somes = ".product" + removeId + " .price";
    let somes2 = "total";
    let title = ".product" + removeId + " .card-title";
    let cardimg = ".product" + removeId + " .cover";
    let quant = ".product" + removeId + " .number-input-container";
    let target = document.querySelector('[data-id="p' + removeId + '"]');
    

    let test = document.querySelector(some).innerHTML;
    let tests = document.querySelector(somes).innerHTML;
    let testss = document.querySelector(title).innerHTML;
    let testsss = document.querySelector(cardimg).innerHTML;
    let testssss = document.querySelector(quant).innerHTML;
    var xy = document.getElementById("total");
    var cash = document.getElementById("cash");
    let cashvalue = cash.value;
    let tests2 = xy.value;

    people = { id: tests, firstName: testsss };

    let yyy = parseFloat(tests) + parseFloat(tests2);
    let yyyy = parseFloat(yyy) - parseFloat(cashvalue);

    document.getElementById("putcart").innerHTML +=
      "<div class='" +
      "cart-product" +
      "'>" +
      " " +
      testsss +
      " " +
      "<h3>" +
      testss +
      "</h3>" +
      " " +
      "<div class='number-input-container'>" +
      testssss +
      "</div>" + "<p class='totalprice'>" + 
      tests + "</p>" +
      "</div>" +
      "<hr>";
    document.getElementById("total").value = parseFloat(yyy).toFixed(2);
    document.getElementById("cashreturn").value = parseFloat(yyyy).toFixed(2);
    document.getElementById("comment").value += "\n";
    document.getElementById("comment").value +=
      tests + " " + testss + ", " + "\n";
    document.getElementById("comment").value += " ";

    const container = document.getElementById("comment");

    let putcart = document.getElementById("putcart");
    // Store
    localStorage.setItem("putcart", putcart.innerHTML);

    let puttotal = document.getElementById("total").value;
    // Store
    localStorage.setItem("total", puttotal);
  };
  const handleClicksss = async () => {
    var xy = document.getElementById("total");
    var cash = document.getElementById("cash");
    let cashvalue = cash.value;
    let tests2 = xy.value;

    let yyyy = parseFloat(tests2) - parseFloat(cashvalue);

    document.getElementById("cashreturn").value = parseFloat(yyyy).toFixed(2);
  };
    
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
                    src="http://designernfts.com:1337/uploads/poskok_red_bg_3d5af940f4.png?updated_at=2022-09-17T22:08:34.555Z"
                    class="logo"
                    alt=''></img>
                  <li class="main-menus active hidethis">ovo</li>
                  {props.menus.data.map((menu) => (
                    <li key={menu.id} class="main-menus" id="menu-item">
                      <div class="menus-wrap">
                        <img
                          src={
                            "http://designernfts.com:1337" +
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
                    <img src="http://designernfts.com:1337/uploads/log_in_8642b14caa.png?updated_at=2022-09-17T22:12:32.586Z" alt=''></img>
                    <p class="odjava">Odjava</p>
                  </button>
                ) : (
                  <Link href="/auth/sign-in">
                    <img src="http://designernfts.com:1337/uploads/log_in_8642b14caa.png?updated_at=2022-09-17T22:12:32.586Z" alt=''></img>
                    <button>Sign In</button>
                  </Link>
                )}
              </div>
              <div class="grid-item middle-grid">
              <Search />
              <Headers />
              <div class="align-left">
                  {props.categories.data.map((category) => (
                    <li key={category.id} class="main-product-menus">
                      <div class="menus-product-wrap">
                        <img
                          src={
                            "http://designernfts.com:1337" +
                            category.attributes.image.data.attributes.url
                          }
                          alt=''></img>
                        <a href={"http://designernfts.com:1337/categories/" + category.id}>
                          {category.attributes.name}
                        </a>
                      </div>
                    </li>
                  ))}
                </div>
              
                    <ul class="product-ul">
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
                            <button
                            onClick={handleClickss}
                              class={"" + "button" + post.id}
                              data-id={post.id}
                            >
                              <div
                                class="card product pt-4"
                                data-id={"p" + post.id}
                              >
                                <div class="cover">
                                  <img
                                    src={
                                      "http://designernfts.com:1337" +
                                      post.attributes.image.data.attributes.url
                                    }
                                    class="card-img-top"
                                    alt=""></img>
                                </div>
                                <div class="card-body border rounded">
                                  <h2 class="card-title font-weight-bold text-nowrap overflow-hidden text-primary">
                                    {post.attributes.title}
                                  </h2>
                                  <div class="d-flex justify-content-between align-items-end mt-3">
                                    <script>
                                      var x = document.getElementById("myNumber").max;
                                      document.getElementById("demo").innerHTML = x;
                                    </script>
          
                                    <span class="font-weight-bold price">
                                      {post.attributes.price}
                                    </span>
                                    <span class="font-weight-bold price">
                                      {post.attributes.categories.data.id}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </button>
                            <div class="number-input-container quanitys">
                              <button
                                type="button"
                                class="button-decrement"
                                onclick="setNumber(events)"
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
                                  max={post.attributes.StockQuantity}
                                  oninput="handleNumberInput()"
                                  onblur="handleNumberInputBlur(event)"
                                  data-step="1"
                                />
                              </div>
                              <button
                                type="button"
                                class="button-increment"
                                onclick="setNumber(events)"
                                data-input-id="hue"
                                data-operation="increment"
                              ></button>
                            </div>
                          </li>;
                        })}
                        
                    </ul>
                    <ReactPaginate
                    previousLabel={'Prethodna'}
                    nextLabel={'Sledeca'}
                    breakLabel={'...'}
                    breakClassName={'break-me'}
                    activeClassName={'active'}
                    containerClassName={'pagination'}
                    subContainerClassName={'pages pagination'}
    
                    initialPage={props.currentPage - 1}
                    pageCount={props.pageCount}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={pagginationHandler}
                />
                    </div>
                    <div class="grid-item grid-item-cart">
                <div class="grid-item-recipient" id="grid-item-cart">
                  <button onClick={clear} class="clear">
                    <img src="trash.png" alt=''></img>
                  </button>
                  <div>
                    <div class="authx">
                      {session && (
                        <div style={{ marginBottom: 10 }}>
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
                    <p class="hide">Klijent:</p>
                <select name="klijent" id="klijent">
                  {props.customers.data.map((customer) => (
                    <option value={customer.attributes.FirstName} key={customer.id} >
                      {customer.attributes.FirstName}
                    </option>
                  ))}
                </select>
    
                    <br></br>
                    <hr></hr>
    
                    <div class="billheading">
                      <p>===========FISKALNI RACUN===========</p>
                      <p>000000000</p>
                      <p>POSKOK CAFFEE</p>
                      <p>0000000 - Kafic Nasumicna ulica</p>
                      <p>NASUMICNA ULICA 001</p>
                      <p>NOVI SAD</p>
                      <p>
                      </p>
                      <p>ESIR broj:</p>
                      <p>===========PRODAJA===========</p>
                      <div class="article-grid">
                        <p>Artikal</p>
                        <p>Kol</p>
                        <p>Cena</p>
                      </div>
                    </div>
                    <Cart />
                  </div>
    
                  <div class="bill-inner">
                    <div class="billing">
                      <p>
                        ZA UPLATU:
                        <input
                          class="total"
                          id="total"
                          value="0"
                          onChange={(e) => setTotal(e.target.value)}
                        />
                      </p>
                      <p>
                        GOTOVINA:
                        <input
                          type="text"
                          name="name"
                          class="cash"
                          id="cash"
                          onChange={handleClicksss}
                        />
                      </p>
                      <p>
                        POVRACAJ:
                        <input class="cashreturn" id="cashreturn" />
                      </p>
                    </div>
                    <input
                      class="comment"
                      id="comment"
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                    />
    
                    <div class="billheading">
                      <p>=============================</p>
                      <p>PFR vreme: {date + " " + time}</p>
                      <p>PFR broj: {unique_id}</p>
                      <p>Brojac racuna: {unique_id}</p>
                      <p>=============================</p>
    
                      <Canvas
                        text={unique_id}
                        options={{
                          type: "image/jpeg",
                          quality: 0.3,
                          level: "M",
                          margin: 3,
                          scale: 4,
                          width: 200,
                          color: {
                            dark: "#000000",
                            light: "#FFFFFF",
                          },
                        }}
                      />
                      <p>=====KRAJ FISKALNOG RACUNA====</p>
                    </div>
                    <div>
                      {err && <h2>{err}</h2>}
    
                      <p for="nacin">
                        Nacin placanja:
                        <select name="nacin" id="nacin">
                          <option value="Gotovina">Gotovina</option>
                          <option value="Kartica">Kartica</option>
                        </select>
                        <br></br>
                      </p>
    
                      <button onClick={handleClick} class="bill">
                        STAMPANJE
                      </button>
    
                      {issLoading && <h2>Slanje...</h2>}
    
                      {data && <div></div>}
                    </div>
                  </div>
                </div>
                <div class="recipient"></div>
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

        const page = query.page || 1;
        const posts = await axios.get(process.env.NEXT_PUBLIC_API_URL + `products?populate=*&pagination[page]=${page}&pagination[pageSize]=10`);
        const menus = await axios.get(process.env.NEXT_PUBLIC_API_URL + `menus?populate=%2A`);
        const customers = await axios.get(process.env.NEXT_PUBLIC_API_URL + 'customers?populate=%2A', {
          headers,
        });
        const categories = await axios.get(process.env.NEXT_PUBLIC_API_URL + 'categories?populate=%2A', {
          headers,
        });
       
        return {
            totalCount: posts.data.meta.pagination.total,
            pageCount: posts.data.meta.pagination.pageCount,
            currentPage: posts.data.meta.pagination.pageNumber,
            perPage: posts.data.meta.pagination.pageSize,
            posts: posts.data,
            menus: menus.data,
            categories: categories.data,
            customers: customers.data,

        };
    }
    
    
    export default withRouter(Test);