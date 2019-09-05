import React from "react";

const Checkbox = ({ genres, addGenre }) => {
  return (
    <div className="btn-group row">
      {genres.map(item => (
        <label key={item.id} className="col-12">
          <input name={item.id} type="checkbox" onChange={addGenre} />
          {item.name}
        </label>
      ))}
    </div>
  );
};

export default Checkbox;
