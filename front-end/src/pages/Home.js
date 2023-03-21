import React from "react";

function Home() {
  return (
    <main className="d-flex h-100 text-center text-white bg-dark">
      <div className="cover-container d-flex w-100 h-100 p-3 mx-auto flex-column vh-100 align-items-center">
        <div className="align-bottom">
          <h1 className="display-4">Welcome to My Website!</h1>
          <p className="lead">
            This is a simple hero unit, a simple jumbotron-style component for
            calling extra attention to featured content or information.
          </p>
          <p>
            It uses utility classes for typography and spacing to space content
            out within the larger container.
          </p>
        </div>
      </div>
    </main>
  );
}

export default Home;
