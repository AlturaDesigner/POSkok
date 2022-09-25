



import '../styles/style.css'
import '../styles/globals.css'
import { SessionProvider } from 'next-auth/react';

import { signOut, useSession, getSession } from 'next-auth/react';
import Head from 'next/head';
import Link from 'next/link';
import { useRef, useState, useEffect } from "react";
import { getStrapiMedia } from "/lib/media"
import { fetchAPI } from "/lib/api"
import Header from "../components/Header";
import TodoList from "../containers/todoList";
import axios from "axios";
import AddTodo from "../containers/addTodo";
import React, { Component } from 'react';
import { render } from 'react-dom';
import { v4 as uuid } from 'uuid';
import { useQRCode } from 'next-qrcode';
import 'animate.css';
import Image from 'next/image'
import { getProducts } from "../utils/api"



function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
  );
}

export default MyApp;


