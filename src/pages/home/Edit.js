import React from "react";
import "./Edit.css";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";


export default class Edit extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
      body: "",
      categoryId: "",
      url: "",
      isFavorite: false,
    };

    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleBodyChange = this.handleBodyChange.bind(this);
    this.handleCategoryChange = this.handleCategoryChange.bind(this);
    this.handleUrlChange = this.handleUrlChange.bind(this);
    this.handleFavorite = this.handleFavorite.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleTitleChange(event) {
    this.setState({ title: event.target.value });
  }

  handleBodyChange(event) {
    this.setState({ body: event.target.value });
  }

  handleCategoryChange(event) {
    this.setState({ categoryId: event.target.value });
  }

  handleUrlChange(event) {
    this.setState({ url: event.target.value });
  }
  handleFavorite(event) {
    this.setState({ isFavorite: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();

    fetch(
      `https://itp-final.herokuapp.com/api/posts/${this.props.match.params.postId}`,
      {
        method: "PUT",
        body: JSON.stringify({
          title: this.state.title,
          body: this.state.body,
          categoryId: this.state.categoryId,
          url: this.state.url,
          isFavorite: this.state.isFavorite,
        }),
        headers: {
          "Content-type": "application/json",
        },
      }
    )
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        toast.success(`${json.title} was successfully updated`);
        this.props.history.push("/");
      });
  }

  componentDidMount() {
    const id = this.props.match.params.postId;
    fetch(`https://itp-final.herokuapp.com/api/posts/${id}`)
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        console.log(json);
        this.setState(json);
      });
  }

  render() {
    return (
      <div className="container Upload">
        <form onSubmit={this.handleSubmit}>
          <div className="my-3">
            <label htmlFor="title" className="form-label">
              Image Title
            </label>

            <input
              type="name"
              className="form-control border-0 bg-light"
              id="title"
              value={this.state.title}
              onChange={this.handleTitleChange}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Description
            </label>

            <textarea
              type="description"
              className="form-control border-0 bg-light"
              id="description"
              value={this.state.body}
              onChange={this.handleBodyChange}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Category</label>
            <select
              value={this.state.categoryId}
              onChange={this.handleCategoryChange}
              className="form-select form-select-md border-0 bg-light"
            >
              <option>Select a Category</option>
              <option value="0">Holiday</option>
              <option value="1">Flower</option>
              <option value="2">Nature</option>
            </select>
          </div>

          <div className="my-3">
            <label htmlFor="link" className="form-label">
              Image Link
            </label>

            <input
              type="text"
              className="form-control border-0 bg-light"
              id="link"
              value={this.state.url}
              onChange={this.handleUrlChange}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Favorite?</label>
            <select
              value={this.state.isFavorite}
              onChange={this.handleFavorite}
              className="form-select form-select-md border-0 bg-light"
            >
              <option value="true">One of Your Favorites</option>
              <option value="false">Not One of Your Favorites</option>
            </select>
          </div>

          <button type="submit" className="btn btn-danger btn-lg button mt-3">
            Save Edits
          </button>
          <Link 
        className="btn btn-outline-danger button btn-lg mt-2"
        to={`/board/${this.props.match.params.postId}`}>
                Cancel
              </Link>
        </form>
      </div>
    );
  }
}
