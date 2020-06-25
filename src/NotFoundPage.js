import React from "react";
import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <div>
      <Link to="/">Discover more movies</Link>
      <h1>Page Not Found</h1>
    </div>
  );
}

export default NotFoundPage;
