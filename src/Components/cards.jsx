import React, { useState } from "react";
import { Skeleton, Switch, Card, Avatar } from "antd";
const { Meta } = Card;
const Cards = ({ url, name, id, handlePetCards }) => {
  const [isChecked, setIsChecked] = useState(false);

  return (
    <Card
      className="card"
      onClick={() => {
        handlePetCards(id);
        setIsChecked(!isChecked);
      }}
    >
      <Meta
        avatar={<Avatar style={{ width: "50px", height: "50px" }} src={url} />}
        title={name}
        // description="This is the description"
      />

      <span className="card-tick-icon">
        {isChecked ? (
          <span className="card-tick-icon-checked">
            <i className="fa fa-check" aria-hidden="true"></i>
          </span>
        ) : (
          <span className="card-tick-icon-unchecked"></span>
        )}
      </span>
    </Card>
  );
};

export default Cards;
