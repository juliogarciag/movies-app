import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import DiscoverPage from "./DiscoverPage";
import MoviePage from "./MoviePage";
import NotFoundPage from "./NotFoundPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DiscoverPage />} />
        <Route path="/movies/:id" element={<MoviePage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
