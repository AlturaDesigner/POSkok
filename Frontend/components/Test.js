import React, { useState, useEffect } from 'react';
    import axios from 'axios';
    import ReactPaginate from 'react-paginate';
    import Router, { withRouter } from 'next/router'
    
    
    
    const Test = (props) => {
        const [isLoading, setLoading] = useState(false); //State for the loading indicator
        const startLoading = () => setLoading(true);
        const stopLoading = () => setLoading(false);
    
    		/*
    			Posts fetching happens after page navigation, 
    			so we need to switch Loading state on Router events.
    		*/
        useEffect(() => { //After the component is mounted set router event handlers
            Router.events.on('routeChangeStart', startLoading); 
            Router.events.on('routeChangeComplete', stopLoading);
    
            return () => {
                Router.events.off('routeChangeStart', startLoading);
                Router.events.off('routeChangeComplete', stopLoading);
            }
        }, [])
    
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
            content = <div>Loading...</div>;
        else {
    				//Generating posts list
            content = (
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
                                  "http://localhost:1337" +
                                  post.attributes.image.data.attributes.url
                                }
                                class="card-img-top"
                                alt=""
                              ></img>
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
                              max={post.attributes.StockQuantity}
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
            );
        }
    
        return (
            <div className="container">
                <h1>Posts List with Pagination in Next.js</h1>
                <div className="posts">
                    {content}
                </div>
    
                <ReactPaginate
                    previousLabel={'previous'}
                    nextLabel={'next'}
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
        );
    };

    const headers = {
      "Content-Type": "application/json",
    };
    
    //Fetching posts in get Intial Props to make the app seo friendly
    Test.getInitialProps = async ({ query }) => {
        const page = query.page || 1; //if page empty we request the first page
        const posts = await axios.get(`http://localhost:1337/api/products?populate=*&pagination[page]=${page}&pagination[pageSize]=10`)

        

        


        


        return {
            totalCount: posts.data.meta.pagination.total,
            pageCount: posts.data.meta.pagination.pageCount,
            currentPage: posts.data.meta.pagination.pageNumber,
            perPage: posts.data.meta.pagination.pageSize,
            posts: posts.data,
        };
    }
    
    
    export default withRouter(Test);