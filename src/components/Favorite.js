import "./Favorite.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

import React from "react";

export default class Favorite extends React.Component {
  render() {
    const grey = "#f5f5f5";
    const red = "red";
    const add = " Add to Favorites";
    const remove = " Remove from Favorites";

    return (
      <>
          <FontAwesomeIcon
            icon={faHeart}
            color={this.props.likeValue ? grey : red}
            size="sm"
          />
          {this.props.likeValue ? remove : add}
      </>
    );
  }
}
