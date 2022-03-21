import React from 'react';
import classNames from 'classnames';
import "components/DayListItem.scss";

export default function DayListItem(props) {
  
  const dayItemClass = classNames(
    "day-list__item",
    {
      "day-list__item--selected": props.selected,
      "day-list__item--full": !props.spots
    }
  );

  const formatSpots = spot => {
    if (!spot) return "no spots remaining";
    if (spot === 1) return "1 spot remaining";
    if (spot > 1) return `${spot} spots remaining`;
  }
  const h3Text = formatSpots(props.spots);

  return (
    <li className={dayItemClass} onClick={() => {props.setDay(props.name)}} data-testid="day">
      <h2 className="text--regular"
        selected={props.selected}
      >
        {props.name}
      </h2>
      <h3 className="text--light">{h3Text}</h3>
    </li>
  );
}