import React from "react";

const FolderCard = ({ folder }) => {
  return (
    <div className="folder-card">
      <h3>{folder.name}</h3>
      <p>{folder.description}</p>
    </div>
  );
};

export default FolderCard;
