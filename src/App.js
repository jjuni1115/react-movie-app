import {useEffect, useState} from "react";
import Detail from "./routers/Detail"
import Home from "./routers/Home";
import {BrowserRouter, Route, Routes} from "react-router-dom";

function App() {


    return (
        <BrowserRouter basename={`${process.env.PUBLIC_URL}`}>
            <Routes>
                <Route path={`/movie/:id`} element={<Detail />} />
                <Route path={`/`} element={<Home />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
