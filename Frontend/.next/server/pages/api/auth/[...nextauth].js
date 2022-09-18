"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "pages/api/auth/[...nextauth]";
exports.ids = ["pages/api/auth/[...nextauth]"];
exports.modules = {

/***/ "axios":
/*!************************!*\
  !*** external "axios" ***!
  \************************/
/***/ ((module) => {

module.exports = require("axios");

/***/ }),

/***/ "next-auth":
/*!****************************!*\
  !*** external "next-auth" ***!
  \****************************/
/***/ ((module) => {

module.exports = require("next-auth");

/***/ }),

/***/ "next-auth/providers/credentials":
/*!**************************************************!*\
  !*** external "next-auth/providers/credentials" ***!
  \**************************************************/
/***/ ((module) => {

module.exports = require("next-auth/providers/credentials");

/***/ }),

/***/ "(api)/./pages/api/auth/[...nextauth].js":
/*!*****************************************!*\
  !*** ./pages/api/auth/[...nextauth].js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next-auth */ \"next-auth\");\n/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_auth__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_auth_providers_credentials__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next-auth/providers/credentials */ \"next-auth/providers/credentials\");\n/* harmony import */ var next_auth_providers_credentials__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_auth_providers_credentials__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _services_auth__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../services/auth */ \"(api)/./services/auth.js\");\n\n\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (next_auth__WEBPACK_IMPORTED_MODULE_0___default()({\n    // Configure one or more authentication providers\n    providers: [\n        next_auth_providers_credentials__WEBPACK_IMPORTED_MODULE_1___default()({\n            name: \"Sign in with Email\",\n            credentials: {\n                email: {\n                    label: \"Email\",\n                    type: \"text\"\n                },\n                password: {\n                    label: \"Password\",\n                    type: \"password\"\n                }\n            },\n            async authorize (credentials, req) {\n                /**\r\n         * This function is used to define if the user is authenticated or not.\r\n         * If authenticated, the function should return an object contains the user data.\r\n         * If not, the function should return `null`.\r\n         */ if (credentials == null) return null;\n                /**\r\n         * credentials is defined in the config above.\r\n         * We can expect it contains two properties: `email` and `password`\r\n         */ try {\n                    const { user , jwt  } = await (0,_services_auth__WEBPACK_IMPORTED_MODULE_2__.signIn)({\n                        email: credentials.email,\n                        password: credentials.password\n                    });\n                    return {\n                        ...user,\n                        jwt\n                    };\n                } catch (error) {\n                    // Sign In Fail\n                    return null;\n                }\n            }\n        }), \n    ],\n    callbacks: {\n        session: async ({ session , token  })=>{\n            session.id = token.id;\n            session.jwt = token.jwt;\n            return Promise.resolve(session);\n        },\n        jwt: async ({ token , user  })=>{\n            const isSignIn = user ? true : false;\n            if (isSignIn) {\n                token.id = user.id;\n                token.jwt = user.jwt;\n            }\n            return Promise.resolve(token);\n        }\n    }\n}));\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi9wYWdlcy9hcGkvYXV0aC9bLi4ubmV4dGF1dGhdLmpzLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFpQztBQUNpQztBQUNsQjtBQUVoRCxpRUFBZUEsZ0RBQVEsQ0FBQztJQUN0QixpREFBaUQ7SUFDakRHLFNBQVMsRUFBRTtRQUNURixzRUFBbUIsQ0FBQztZQUNsQkcsSUFBSSxFQUFFLG9CQUFvQjtZQUMxQkMsV0FBVyxFQUFFO2dCQUNYQyxLQUFLLEVBQUU7b0JBQUVDLEtBQUssRUFBRSxPQUFPO29CQUFFQyxJQUFJLEVBQUUsTUFBTTtpQkFBRTtnQkFDdkNDLFFBQVEsRUFBRTtvQkFBRUYsS0FBSyxFQUFFLFVBQVU7b0JBQUVDLElBQUksRUFBRSxVQUFVO2lCQUFFO2FBQ2xEO1lBQ0QsTUFBTUUsU0FBUyxFQUFDTCxXQUFXLEVBQUVNLEdBQUcsRUFBRTtnQkFDaEM7Z0JBTUE7b0JBS0UsTUFBTSxFQUFFQyxJQUFJLEdBQUVDLEdBQUcsR0FBRSxHQUFHLE1BQU1YLE1BQU0sQ0FBQzt3QkFDakNJLEtBQUssRUFBRUQsV0FBVyxDQUFDQyxLQUFLO3dCQUN4QkcsUUFBUSxFQUFFSixXQUFXLENBQUNJOztvQkFFeEIsT0FBTzt3QkFBRSxHQUFHRyxJQUFJOztxQkFBTyxDQUFDO2lCQUN6QixDQUFDLE9BQU9FLEtBQUssRUFBRTtvQkFDZCxlQUFlO29CQUNmO2lCQUNEO2FBQ0Y7U0FDRixDQUFDO0tBQ0g7SUFDREMsU0FBUyxFQUFFO1FBQ1RDLE9BQU8sRUFBRSxPQUFPLEVBQUVBLE9BQU87WUFDdkJBLE9BQU8sQ0FBQ0UsRUFBRSxHQUFHRCxLQUFLLENBQUNDO1lBQ25CRjtZQUNBO1NBQ0Q7O1lBRUM7WUFDQSxJQUFJSyxRQUFRLEVBQUU7Z0JBQ1pKLEtBQUssQ0FBQ0MsRUFBRSxHQUFHTixJQUFJLENBQUNNLEVBQUU7Z0JBQ2xCRCxLQUFLLENBQUNKLEdBQUcsR0FBR0QsSUFBSSxDQUFDQyxHQUFHO2FBQ3JCOztTQUVGO0tBQ0Y7Q0FDRixDQUFDLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9uZXh0Ly4vcGFnZXMvYXBpL2F1dGgvWy4uLm5leHRhdXRoXS5qcz81MjdmIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBOZXh0QXV0aCBmcm9tICduZXh0LWF1dGgnO1xyXG5pbXBvcnQgQ3JlZGVudGlhbHNQcm92aWRlciBmcm9tICduZXh0LWF1dGgvcHJvdmlkZXJzL2NyZWRlbnRpYWxzJztcclxuaW1wb3J0IHsgc2lnbkluIH0gZnJvbSAnLi4vLi4vLi4vc2VydmljZXMvYXV0aCc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBOZXh0QXV0aCh7XHJcbiAgLy8gQ29uZmlndXJlIG9uZSBvciBtb3JlIGF1dGhlbnRpY2F0aW9uIHByb3ZpZGVyc1xyXG4gIHByb3ZpZGVyczogW1xyXG4gICAgQ3JlZGVudGlhbHNQcm92aWRlcih7XHJcbiAgICAgIG5hbWU6ICdTaWduIGluIHdpdGggRW1haWwnLFxyXG4gICAgICBjcmVkZW50aWFsczoge1xyXG4gICAgICAgIGVtYWlsOiB7IGxhYmVsOiAnRW1haWwnLCB0eXBlOiAndGV4dCcgfSxcclxuICAgICAgICBwYXNzd29yZDogeyBsYWJlbDogJ1Bhc3N3b3JkJywgdHlwZTogJ3Bhc3N3b3JkJyB9LFxyXG4gICAgICB9LFxyXG4gICAgICBhc3luYyBhdXRob3JpemUoY3JlZGVudGlhbHMsIHJlcSkge1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFRoaXMgZnVuY3Rpb24gaXMgdXNlZCB0byBkZWZpbmUgaWYgdGhlIHVzZXIgaXMgYXV0aGVudGljYXRlZCBvciBub3QuXHJcbiAgICAgICAgICogSWYgYXV0aGVudGljYXRlZCwgdGhlIGZ1bmN0aW9uIHNob3VsZCByZXR1cm4gYW4gb2JqZWN0IGNvbnRhaW5zIHRoZSB1c2VyIGRhdGEuXHJcbiAgICAgICAgICogSWYgbm90LCB0aGUgZnVuY3Rpb24gc2hvdWxkIHJldHVybiBgbnVsbGAuXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgaWYgKGNyZWRlbnRpYWxzID09IG51bGwpIHJldHVybiBudWxsO1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIGNyZWRlbnRpYWxzIGlzIGRlZmluZWQgaW4gdGhlIGNvbmZpZyBhYm92ZS5cclxuICAgICAgICAgKiBXZSBjYW4gZXhwZWN0IGl0IGNvbnRhaW5zIHR3byBwcm9wZXJ0aWVzOiBgZW1haWxgIGFuZCBgcGFzc3dvcmRgXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgIGNvbnN0IHsgdXNlciwgand0IH0gPSBhd2FpdCBzaWduSW4oe1xyXG4gICAgICAgICAgICBlbWFpbDogY3JlZGVudGlhbHMuZW1haWwsXHJcbiAgICAgICAgICAgIHBhc3N3b3JkOiBjcmVkZW50aWFscy5wYXNzd29yZCxcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgcmV0dXJuIHsgLi4udXNlciwgand0IH07XHJcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICAgIC8vIFNpZ24gSW4gRmFpbFxyXG4gICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICB9LFxyXG4gICAgfSksXHJcbiAgXSxcclxuICBjYWxsYmFja3M6IHtcclxuICAgIHNlc3Npb246IGFzeW5jICh7IHNlc3Npb24sIHRva2VuIH0pID0+IHtcclxuICAgICAgc2Vzc2lvbi5pZCA9IHRva2VuLmlkO1xyXG4gICAgICBzZXNzaW9uLmp3dCA9IHRva2VuLmp3dDtcclxuICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShzZXNzaW9uKTtcclxuICAgIH0sXHJcbiAgICBqd3Q6IGFzeW5jICh7IHRva2VuLCB1c2VyIH0pID0+IHtcclxuICAgICAgY29uc3QgaXNTaWduSW4gPSB1c2VyID8gdHJ1ZSA6IGZhbHNlO1xyXG4gICAgICBpZiAoaXNTaWduSW4pIHtcclxuICAgICAgICB0b2tlbi5pZCA9IHVzZXIuaWQ7XHJcbiAgICAgICAgdG9rZW4uand0ID0gdXNlci5qd3Q7XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSh0b2tlbik7XHJcbiAgICB9LFxyXG4gIH0sXHJcbn0pOyJdLCJuYW1lcyI6WyJOZXh0QXV0aCIsIkNyZWRlbnRpYWxzUHJvdmlkZXIiLCJzaWduSW4iLCJwcm92aWRlcnMiLCJuYW1lIiwiY3JlZGVudGlhbHMiLCJlbWFpbCIsImxhYmVsIiwidHlwZSIsInBhc3N3b3JkIiwiYXV0aG9yaXplIiwicmVxIiwidXNlciIsImp3dCIsImVycm9yIiwiY2FsbGJhY2tzIiwic2Vzc2lvbiIsInRva2VuIiwiaWQiLCJQcm9taXNlIiwicmVzb2x2ZSIsImlzU2lnbkluIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(api)/./pages/api/auth/[...nextauth].js\n");

/***/ }),

/***/ "(api)/./services/auth.js":
/*!**************************!*\
  !*** ./services/auth.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"signIn\": () => (/* binding */ signIn)\n/* harmony export */ });\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ \"axios\");\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__);\n\nconst strapiUrl = process.env.STRAPI_URL;\nasync function signIn({ email , password  }) {\n    const res = await axios__WEBPACK_IMPORTED_MODULE_0___default().post(`${strapiUrl}/api/auth/local`, {\n        identifier: email,\n        password\n    });\n    return res.data;\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi9zZXJ2aWNlcy9hdXRoLmpzLmpzIiwibWFwcGluZ3MiOiI7Ozs7OztBQUEwQjtBQUUxQixNQUFNQyxTQUFTLEdBQUdDLE9BQU8sQ0FBQ0MsR0FBRyxDQUFDQyxVQUFVO0FBRWpDLGVBQWVDLE1BQU0sQ0FBQyxFQUFFQyxLQUFLLEdBQUVDLFFBQVEsR0FBRSxFQUFFO0lBQ2hELE1BQU1DLEdBQUcsR0FBRyxNQUFNUixpREFBVSxDQUFDLENBQUMsRUFBRUMsU0FBUyxDQUFDLGVBQWUsQ0FBQyxFQUFFO1FBQzFEUyxVQUFVLEVBQUVKLEtBQUs7UUFDakJDLFFBQVE7S0FDVCxDQUFDO0lBQ0YsT0FBT0MsR0FBRyxDQUFDRyxJQUFJLENBQUM7Q0FDakIiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9uZXh0Ly4vc2VydmljZXMvYXV0aC5qcz8wNjk0Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBheGlvcyBmcm9tICdheGlvcyc7XHJcblxyXG5jb25zdCBzdHJhcGlVcmwgPSBwcm9jZXNzLmVudi5TVFJBUElfVVJMO1xyXG5cclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHNpZ25Jbih7IGVtYWlsLCBwYXNzd29yZCB9KSB7XHJcbiAgY29uc3QgcmVzID0gYXdhaXQgYXhpb3MucG9zdChgJHtzdHJhcGlVcmx9L2FwaS9hdXRoL2xvY2FsYCwge1xyXG4gICAgaWRlbnRpZmllcjogZW1haWwsXHJcbiAgICBwYXNzd29yZCxcclxuICB9KTtcclxuICByZXR1cm4gcmVzLmRhdGE7XHJcbn0iXSwibmFtZXMiOlsiYXhpb3MiLCJzdHJhcGlVcmwiLCJwcm9jZXNzIiwiZW52IiwiU1RSQVBJX1VSTCIsInNpZ25JbiIsImVtYWlsIiwicGFzc3dvcmQiLCJyZXMiLCJwb3N0IiwiaWRlbnRpZmllciIsImRhdGEiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(api)/./services/auth.js\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__("(api)/./pages/api/auth/[...nextauth].js"));
module.exports = __webpack_exports__;

})();