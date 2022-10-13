
import ReactPaginate from 'react-paginate';
import Router, { withRouter } from 'next/router'
import { signOut, useSession, getSession } from "next-auth/react";
import Link from "next/link";
import { useRef, useState, useEffect } from "react";
import axios from "axios";
import React, { Component } from "react";
import { v4 as uuid } from "uuid";
import { useQRCode } from "next-qrcode";
import "animate.css";
import { useRouter } from 'next/router'

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

    var saved = localStorage.getItem("putcart");
    
            return () => {
                Router.events.off('routeChangeStart', startLoading);
                Router.events.off('routeChangeComplete', stopLoading);
            }
        }, [session])


    const handleClick = async (event) => {
    let s = event.currentTarget.dataset.id;
    setIssLoading(true);
    try {
      const { data } = await axios.delete(
        "http://localhost:1337/api/sales/" + s,
        
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
    				//Generating posts list
            content = (
              <div></div>
            );
        }

        return (
            <div className="container">
              
                <div className="posts">
                {session ? (
                    <div class="grid-container grid-container-sales">
                    <div class="grid-item first">
                <div class="main-menus" id="menus-parent">
                  <img
                    src="http://localhost:1337/uploads/poskok_red_bg_3d5af940f4.png?updated_at=2022-09-17T22:08:34.555Z"
                    class="logo"
                    alt=''></img>
                  <li class="main-menus active hidethis">ovo</li>
                  {props.menus.data.map((menu) => (
                    <li key={menu.id} class="main-menus" id="menu-item">
                      <div class="menus-wrap">
                        <img
                          src={
                            "http://localhost:1337" +
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
                    <img src="http://localhost:1337/uploads/log_in_8642b14caa.png?updated_at=2022-09-17T22:12:32.586Z" alt=''></img>
                    <p class="odjava">Odjava</p>
                  </button>
                ) : (
                  <Link href="/auth/sign-in">
                    <img src="http://localhost:1337/uploads/log_in_8642b14caa.png?updated_at=2022-09-17T22:12:32.586Z" alt=''></img>
                    <button>Sign In</button>
                  </Link>
                )}
              </div>
              <div class="grid-item">
              <Headers />
                    <ul class="">
                    <div class="">
                      <div class="sales-container">
                      <div class="sales-item">
                                    ID Racuna
                                  </div>
                                  <div class="secondary-color sales-item">
                                    Kreiran
                                  </div>
                                  <div class="color sales-item">
                                    Ukupno
                                  </div>
                              <div class="sales-item"></div>
                            <div class="sales-item"></div>
                      </div>
                        {props.posts.data.map(post => {
                            return <li
                            key={post.id}
                            class={
                              "" +
                              "sales-container"
                            }
                          >
                                  <div class="sales-item">
                                    {post.attributes.Invoice}
                                  </div>
                                  <div class="secondary-color sales-item">
                                    {post.attributes.publishedAt}
                                  </div>
                                  <div class="color sales-item">
                                    {post.attributes.Amount}
                                  </div>
                              <div class="sales-item"><a  href={'http://localhost:3000/sales/' + post.id}
                            >Pregled</a></div>
                            <div class="sales-item"><a  href={'http://localhost:3000/editsales/' + post.id}
                            >Izmena</a></div>
                            <div class="sales-item"><button onClick={handleClick} class="color" data-id={post.id}
                            >Brisanje</button></div>
                          </li>;
                        })}

</div>
                        
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
        const posts = await axios.get(process.env.NEXT_PUBLIC_API_URL + `sales?populate=*&pagination[page]=${page}&pagination[pageSize]=30&sort[0]=id%3Adesc`);
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