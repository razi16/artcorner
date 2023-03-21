import React from "react";
import { Link } from "react-router-dom";

function Upload() {
  return (
    <main className="d-flex align-items-center justify-content-center">
      <h1 className="text-center">Upload an Image</h1>
      <div className="card mt-5 ms-5 me-5 p-5 w-50">
        <Link to="/online">
          <button className="btn btn-primary">Upload via url</button>
        </Link>
        <button className="btn btn-primary" disabled>
          Upload locally (Coming soon)
        </button>
      </div>
    </main>
  );
}

export default Upload;
