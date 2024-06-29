import React from "react";
import ReactDOM  from "react-dom/client";

import Header from "./components/Header";
import Body from "./components/Body";
import BookmarksProvider from "./BookmarksContext";

const App = () => {
    return (
        <div>
            <Header />
            <BookmarksProvider>
            <Body />
            </BookmarksProvider>
        </div>
    )
}

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(<App />)