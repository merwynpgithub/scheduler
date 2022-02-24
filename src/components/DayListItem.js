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

  return (
    <li className={dayItemClass}>
      <h2 className="text--regular"
        selected={props.selected}
        onClick={() => {props.setDay(props.name, props.spots)}}
      >
        {props.name}
      </h2>
      <h3 className="text--light">{props.spots}</h3>
    </li>
  );
}