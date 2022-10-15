/* eslint-disable @next/next/no-img-element */
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
      <h1 class="heading">{title ? title : "Dobrodosli u POSkok administraciju."}</h1>
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
  console.log(pid);

      
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

    
            return () => {
                Router.events.off('routeChangeStart', startLoading);
                Router.events.off('routeChangeComplete', stopLoading);
            }
        }, [session])

        const unique_id = uuid();

 

  const [valued, setValued] = useState("");
  const [total, setTotal] = useState("");
  const [data, setData] = useState();
  const [comment, setComment] = useState();
  const [err, setErr] = useState("");
  const clear = async () => {
   
  };

  const handleClickc = async (event) => {
    let s = event.currentTarget.dataset.id;
    console.log("this is s " + s)

    setIssLoading(true);
    try {
      const { data } = await axios.delete(
        "http://designersnfts.com:1337/api/customers/" + s,
        
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: "Bearer " + session.jwt,
          },
        }
      );
      // Osvezavanje strane nakon uspesnog brisanja
      Router.reload(window.location.pathname)

      setData(data);
    } catch (err) {
      setErr(err.message);
    } finally {
      setIssLoading(false);
    }
  };
  const handleClicksu = async (event) => {
    let s = event.currentTarget.dataset.id;
    console.log("this is s " + s)

    setIssLoading(true);
    try {
      const { data } = await axios.delete(
        "http://designersnfts.com:1337/api/suppliers/" + s,
        
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: "Bearer " + session.jwt,
          },
        }
      );
      // Osvezavanje strane nakon uspesnog brisanja
      Router.reload(window.location.pathname)

      setData(data);
    } catch (err) {
      setErr(err.message);
    } finally {
      setIssLoading(false);
    }
  };
  const handleClickp = async (event) => {
    let s = event.currentTarget.dataset.id;
    console.log("this is s " + s)

    setIssLoading(true);
    try {
      const { data } = await axios.delete(
        "http://designersnfts.com:1337/api/products/" + s,
        
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: "Bearer " + session.jwt,
          },
        }
      );
      // Osvezavanje strane nakon uspesnog brisanja
      Router.reload(window.location.pathname)

      setData(data);
    } catch (err) {
      setErr(err.message);
    } finally {
      setIssLoading(false);
    }
  };

  const handleClickold = async () => {
    const container = document.getElementById("comment").innerHTML;
    var testing = document.getElementById("comment").value;
    var xyz = document.getElementById("total");
    let gettotal = xyz.value;

    setIssLoading(true);
    try {
      const { data } = await axios.post(
        "http://designersnfts.com:1337/api/sales",

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

  console.log(data);

  <link
    rel="stylesheet"
    href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.6.0/css/bootstrap.min.css"
  ></link>;

        const pagginationHandler = (page) => {
            const currentPath = props.router.pathname;
            const currentQuery = props.router.query;
            currentQuery.page = page.selected + 1;
    
            props.router.push({
                pathname: currentPath,
                query: currentQuery,
            });
    
        };
    		
        let content = null;
        if (isLoading)
            content = <div>Slanje...</div>;
        else {
            content = (
              <div></div>
            );
        }
    
        return (
          
            <div className="container">
              
                <div className="posts">
                {session ? (
                    <div class="grid-container settings-container">
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
              
		<div class="tab_container">
			<input id="tab1" type="radio" name="tabs" checked></input>
			<label for="tab1"><i class="fa fa-code"></i><span>Klijenti</span></label>

			<input id="tab2" type="radio" name="tabs"></input>
			<label for="tab2"><i class="fa fa-pencil-square-o"></i><span>Proizvodi</span></label>

			<input id="tab3" type="radio" name="tabs"></input>
			<label for="tab3"><i class="fa fa-bar-chart-o"></i><span>Dobavljaci</span></label>

			<input id="tab4" type="radio" name="tabs"></input>
			<label for="tab4"><i class="fa fa-folder-open-o"></i><span>Izvestaji</span></label>

			<input id="tab5" type="radio" name="tabs"></input>
			<label for="tab5"><i class="fa fa-envelope-o"></i><span>Prijem</span></label>

      <input id="tab6" type="radio" name="tabs"></input>
			<label for="tab6"><i class="fa fa-envelope-o"></i><span>Prodaja</span></label>

      <input id="tab7" type="radio" name="tabs"></input>
			<label for="tab7"><i class="fa fa-envelope-o"></i><span>Troskovi</span></label>

      <input id="tab8" type="radio" name="tabs"></input>
			<label for="tab8"><i class="fa fa-envelope-o"></i><span>Zaposleni</span></label>

      <input id="tab9" type="radio" name="tabs"></input>
			<label for="tab9"><i class="fa fa-envelope-o"></i><span>Backend</span></label>

			<section id="content1" class="tab-content">
      <button class="pure-material-button-contained">DODAVANJE</button>
        {props.customersettings.data.map(customersetting => {
                            return <li
                            key={customersetting.id}
                            class={
                              "" +
                              "sales-container"
                            }
                          >
                                <div class="sales-item">
                                    {customersetting.id}
                                  </div>
                                  <div class="sales-item">
                                    {customersetting.attributes.FirstName}
                                  </div>
                                  <div class="sales-item">
                                    {customersetting.attributes.LastName}
                                  </div>
                                 
                              <div class="sales-item"><a  href={'http://localhost:3000/customers/' + customersetting.id}
                            >Pregled</a></div>
                            <div class="sales-item"><a  href={'http://localhost:3000/editcustomers/' + customersetting.id}
                            >Izmena</a></div>
                            <div class="sales-item"><button onClick={handleClickc} class="color" data-id={customersetting.id}
                            >Brisanje</button></div>
                            
                           
                          </li>;

                        })}
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
			</section>

			<section id="content2" class="tab-content">
      <h1>Proizvodi</h1>
      <a href="http://localhost:3000/addproduct" class="pure-material-button-contained">DODAVANJE</a>
        {props.posts.data.map(post => {
                            return <li
                            key={post.id}
                            class={
                              "" +
                              "sales-container"
                            }
                          >
                                <div class="sales-item">
                                    {post.id}
                                  </div>
                                  <div class="sales-item">
                                    {post.attributes.title}
                                  </div>
                                  <div class="sales-item">
                                    {post.attributes.status}
                                  </div>
                                 
                              <div class="sales-item"><a  href={'http://localhost:3000/products/' + post.id}
                            >Pregled</a></div>
                            <div class="sales-item"><a  href={'http://localhost:3000/editproduct/' + post.id}
                            >Izmena</a></div>
                            <div class="sales-item"><button onClick={handleClickp} class="color" data-id={post.id}
                            >Brisanje</button></div>
                            
                           
                          </li>;
                        })}
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
<h1>Kategorije proizvoda</h1>
<button class="pure-material-button-contained">DODAVANJE</button>
{props.categories.data.map(category=> {
                            return <li
                            key={category.id}
                            class={
                              "" +
                              "sales-container"
                            }
                          >
                                <div class="sales-item">
                                    {category.id}
                                  </div>
                                  <div class="sales-item">
                                    {category.attributes.name}
                                  </div>
                                  <div class="sales-item">
                                    {category.attributes.updatedAt}
                                  </div>
                                 
                              <div class="sales-item"><a  href={'http://localhost:3000/categories/' + category.id}
                            >Pregled</a></div>
                            <div class="sales-item"><a  href={'http://localhost:3000/editcategories/' + category.id}
                            >Izmena</a></div>
                            <div class="sales-item"><button onClick={handleClicksu} class="color" data-id={category.id}
                            >Brisanje</button></div>
                            
                           
                          </li>;
                        })}
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
			</section>

			<section id="content3" class="tab-content">
        <button class="pure-material-button-contained">DODAVANJE</button>
        {props.suppliers.data.map(supplier=> {
                            return <li
                            key={supplier.id}
                            class={
                              "" +
                              "sales-container"
                            }
                          >
                                <div class="sales-item">
                                    {supplier.id}
                                  </div>
                                  <div class="sales-item">
                                    {supplier.attributes.CompanyName}
                                  </div>
                                  <div class="sales-item">
                                    {supplier.attributes.Email}
                                  </div>
                                 
                              <div class="sales-item"><a  href={'http://localhost:3000/supplier/' + supplier.id}
                            >Pregled</a></div>
                            <div class="sales-item"><a  href={'http://localhost:3000/editsupplier/' + supplier.id}
                            >Izmena</a></div>
                            <div class="sales-item"><button onClick={handleClicksu} class="color" data-id={supplier.id}
                            >Brisanje</button></div>
                            
                           
                          </li>;
                        })}
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

                
			</section>

			<section id="content4" class="tab-content">
				<h3>Headline 4</h3>
        <button class="pure-material-button-contained">DODAVANJE</button>
		      	<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
		      	tempor incididunt ut labore et dolore magna aliqua.</p>
		      	<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
		      	tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
		      	quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
		      	consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
		      	cillum dolore eu fugiat nulla pariatur.</p>
		      	<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
		      	tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
		      	quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
		      	consequat.</p>
			</section>

			<section id="content5" class="tab-content">
				<h3>Headline 5</h3>
		      	<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
		      	tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
		      	quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo.</p>
		      	<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
		      	tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
		      	quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
		      	consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
		      	cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
		      	proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
			</section>
      <section id="content6" class="tab-content">
				<h3>Headline 5</h3>
		      	<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
		      	tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
		      	quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo.</p>
		      	<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
		      	tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
		      	quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
		      	consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
		      	cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
		      	proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
			</section>
      <section id="content7" class="tab-content">
				<h3>Headline 5</h3>
		      	<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
		      	tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
		      	quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo.</p>
		      	<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
		      	tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
		      	quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
		      	consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
		      	cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
		      	proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
			</section>
      <section id="content8" class="tab-content">
				<h3>Headline 5</h3>
		      	<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
		      	tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
		      	quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo.</p>
		      	<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
		      	tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
		      	quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
		      	consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
		      	cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
		      	proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
			</section>
      <section id="content9" class="tab-content">
				<h3>Headline 5</h3>
		      	<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
		      	tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
		      	quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo.</p>
		      	<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
		      	tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
		      	quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
		      	consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
		      	cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
		      	proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
			</section>
		</div>


              
                    
                    
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
        const customersettings = await axios.get(process.env.NEXT_PUBLIC_API_URL + `customers?populate=*&pagination[page]=${page}&pagination[pageSize]=30`);
        const posts = await axios.get(process.env.NEXT_PUBLIC_API_URL + `products?populate=*&pagination[page]=${page}&pagination[pageSize]=30`);
        const menus = await axios.get(process.env.NEXT_PUBLIC_API_URL + `menus?populate=%2A`);
        const customers = await axios.get(process.env.NEXT_PUBLIC_API_URL + 'customers?populate=%2A', {
          headers,
        });
        const suppliers = await axios.get(process.env.NEXT_PUBLIC_API_URL + 'suppliers/?populate=%2A', {
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
            customersettings: customersettings.data,
            suppliers: suppliers.data,

        };
    }
    
    
    export default withRouter(Test);