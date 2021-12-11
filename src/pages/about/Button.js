// import "./Favorite.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faAngry } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import React from "react";

export default class Favorite extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
      body: "",
      categoryId: "",
      url: "",
      id: "",
      isFavorite: null,
      text: "",
    };
  }

  componentDidMount() {
    const id = this.props.num;
    fetch(`https://itp-final.herokuapp.com/api/posts/${id}`)
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        this.setState({
          title: json.title,
          body: json.body,
          categoryId: json.categoryId,
          url: json.url,
          id: json.id,
          isFavorite: json.isFavorite,
        });
        json.isFavorite
          ? this.setState({
              text: "Remove from ",
            })
          : this.setState({
              text: "Add to ",
            });
        console.log(json);
      });
  }

  addFavorite(id) {
    fetch(`https://itp-final.herokuapp.com/api/posts/${id}`, {
      method: "PUT",
      body: JSON.stringify({
        title: this.state.title,
        body: this.state.body,
        categoryId: this.state.categoryId,
        url: this.state.url,
        isFavorite: true,
      }),
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        this.setState({ text: "Remove from ", isFavorite: true });
        console.log(json);
        toast.success(
          `${this.state.title} was successfully added to Favorites`,
          { theme: "colored" }
        );
      });
  }

  removeFavorite(id) {
    fetch(`https://itp-final.herokuapp.com/api/posts/${id}`, {
      method: "PUT",
      body: JSON.stringify({
        title: this.state.title,
        body: this.state.body,
        categoryId: this.state.categoryId,
        url: this.state.url,
        isFavorite: false,
      }),
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        this.setState({ text: "Add to ", isFavorite: false });
        console.log(json);
        toast.error(
          `${this.state.title} was successfully removed from Favorites`,
          { theme: "colored" }
        );
      });
  }

  render() {
    const add = " Add";
    const remove = " Remove";

    return (
      <>
        {this.props.type === "about" ? (
          <button
            className="btn btn-outline-dark"
            onClick={() => {
              this.state.isFavorite
                ? this.removeFavorite(this.props.num)
                : this.addFavorite(this.props.num);
            }}
          >
            <FontAwesomeIcon
              icon={this.state.isFavorite ? faAngry : faHeart}
              color={this.props.likeValue ? "black" : "white"}
              size="sm"
            />
            {this.state.isFavorite ? remove : add}
          </button>
        ) : (
          <button
            className="btn btn-outline-light"
            onClick={() => {
              this.state.isFavorite
                ? this.removeFavorite(this.props.num)
                : this.addFavorite(this.props.num);
            }}
          >
            {this.state.text}
            <FontAwesomeIcon
              icon={faHeart}
              color={this.state.isFavorite ? "white" : "red"}
              size="sm"
            />
          </button>
        )}
      </>
    );
  }
}
