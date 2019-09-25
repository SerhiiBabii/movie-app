import React from "react";

const Actor = ({ actor }) => {
  const image = actor.profile_path
    ? `https://image.tmdb.org/t/p/w500${actor.profile_path}`
    : `../../images/default-avatar.png`;
  return (
    <img className="col-2" src={image} alt={actor.name} title={actor.name} />
  );
};

export default Actor;
