import {useEffect, useState} from "react";
import Detail from "./routers/Detail"
import Home from "./routers/Home";
import {BrowserRouter, Route, Routes} from "react-router-dom";

function App() {


    return (
        <BrowserRouter>
            <Routes>
                <Route path={`${process.env.PUBLIC_URL}/movie:id`} element={<Detail />} />
                <Route path={`${process.env.PUBLIC_URL}/`} element={<Home />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
