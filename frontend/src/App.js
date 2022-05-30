import React from 'react';

import Router from "./Router";
import Layout from "./components/layout/Layout";
import Footer from "./components/layout/Footer";
import Header from "./components/layout/Header";
import Content from "./components/layout/Content";

import './bootstrap.min.css';

function App() {
  return (
    <Layout>
        <Header />
        <Content>
            <Router />
        </Content>
        <Footer />
    </Layout>
  );
}

export default App;
