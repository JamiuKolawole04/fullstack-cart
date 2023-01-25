import { Fragment } from "react";

import { Nabvar } from "./nabvar";

export const NotFound = () => {
  return (
    <Fragment>
      <Nabvar />
      <section className="not-found d-flex align-item-center justify-content-center column">
        <h2>404</h2>
        <p>Page not found</p>
      </section>
    </Fragment>
  );
};
