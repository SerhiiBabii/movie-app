import React from "react";

const PageButtons = props => {
  const { page, total_pages, changePage } = props;
  return (
    <React.Fragment>
      <div className="btn-group col-12">
        <button
          type="button"
          className="btn btn-primary"
          disabled={page === 1}
          onClick={() => {
            changePage(page - 1);
          }}
        >
          Back
        </button>
        <button
          type="button"
          className="btn btn-primary"
          disabled={page >= total_pages}
          onClick={() => {
            changePage(page + 1);
          }}
        >
          Forward
        </button>
      </div>
      <p>
        Current page: <strong>{page}</strong> from total pages:{" "}
        <strong>{total_pages}</strong>
      </p>
    </React.Fragment>
  );
};

export default PageButtons;
