import React from "react";

const Checkbox = props => {
  const { genres, addGenre } = props;
  return (
    <div className="btn-group row">
      {genres.map(item => (
        <label key={item.id} className="col-12">
          {item.name}:
          <input name={item.id} type="checkbox" onChange={addGenre} />
        </label>
      ))}
    </div>
  );
};

export default Checkbox;
