import React, { Component } from 'react'
import axios from 'axios'

export default class Search extends Component {
  constructor(props) {
    super(props)

    this.state = {
      userList: [],
      
    }


    this.cancelToken = '';
    this.inputFocus = this.inputFocus.bind(this);
    this.node = React.createRef();
  }

  // Detect outside click
  componentDidMount() {
    document.addEventListener('mousedown', this.inputFocus)
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.inputFocus)
  }

  inputFocus = (e) => {
    // DOM Ref
    if (this.node.current.contains(e.target)) {
      return
    }
    this.setState({
      userList: [],
    })
    
  }

  // Handle livesearch
  onValChange = async (e) => {
    // Check axios token
    if (this.cancelToken) {
      this.cancelToken.cancel();
    }

    // Set axios token
    this.cancelToken = axios.CancelToken.source()

    await axios.get(`http://localhost:1337/api/products?populate=*`, {
        cancelToken: this.cancelToken.token,
      })
      .then((res) => {
        this.setState({
          userList: res.data,
        })
      })
      .catch((error) => {
        if (axios.isCancel(error) || error) {
          console.log('Failed to fetch')
        }
      });
      
    // Filter data
    let searchQuery = e.target.value.toLowerCase();
    let result = this.state.userList.filter((el) => {
      let filterVal = el.name.toLowerCase();
      return filterVal.indexOf(searchQuery) !== -1
    })

    this.setState({
      userList: result,
    })
  }

  render() {
    return (
      <div className="search">
        <input
          onClick={this.inputFocus}
          ref={this.node}
          onChange={this.onValChange}
          type="text"
          placeholder="Search ..."
        />
        {/* {this.state.message} */}
        <ul className="list">
          {this.state.userList.map((item) => {
            return <li
            key={item.id}
            class={
              "product-list div1 card-columns " +
              "product" +
              item.id
            }
            id="product"
          >
            <button
            onClick={handleClickss}
              class={"" + "button" + item.id}
              data-id={item.id}
            >
              <div
                class="card product pt-4"
                data-id={"p" + item.id}
              >
                <div class="cover">
                  <img
                    src={
                      "http://localhost:1337" +
                      item.attributes.image.data.attributes.url
                    }
                    class="card-img-top"
                    alt=""
                  ></img>
                </div>
                <div class="card-body border rounded">
                  <h2 class="card-title font-weight-bold text-nowrap overflow-hidden text-primary">
                    {item.attributes.title}
                  </h2>
                  <div class="d-flex justify-content-between align-items-end mt-3">
                    <script>
                      var x = document.getElementById("myNumber").max;
                      document.getElementById("demo").innerHTML = x;
                    </script>

                    <span class="font-weight-bold price">
                      {item.attributes.price}
                    </span>
                    <span class="font-weight-bold price">
                      {item.attributes.categories.data.id}
                    </span>
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
                  max={item.attributes.StockQuantity}
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
          </li>;
          })}
        </ul>
      </div>
    )
  }
}

