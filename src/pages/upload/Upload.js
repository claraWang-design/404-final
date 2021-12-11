import React from "react";
import "./Upload.css";

export default class Upload extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
      body: "",
      categoryId: "",
      url: "",
      titleError: "",
      bodyError: "",
      urlError:""
    };

    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleBodyChange = this.handleBodyChange.bind(this);
    this.handleCategoryChange = this.handleCategoryChange.bind(this);
    this.handleUrlChange = this.handleUrlChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount() {
    document.title = "Upload an Inspiration"; 
 }

  validation() {
    let titleError = "";
    let bodyError = "";
    let urlError = "";

    if (!this.state.title) {
      titleError = "Please enter a title for your image";
    }

    if (!this.state.body) {
      bodyError = "Please enter some description for the image";
    }

    if (!this.state.url) {
      urlError = "An url for your image is required";
    }

    if(titleError || bodyError || urlError) {
      this.setState({titleError, bodyError, urlError});
      return false;
    }


    return true;
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

  handleSubmit(event) {
    event.preventDefault();
    const isValid = this.validation();

    if (isValid) {
      fetch("https://itp-final.herokuapp.com/api/posts", {
      method: "POST",
      body: JSON.stringify({
        title: this.state.title,
        body: this.state.body,
        categoryId: this.state.categoryId,
        url: this.state.url,
        isFavorite: false
      }),
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        console.log(json);
        this.props.history.push("/");
      });
    }
  }

  render() {
    return (
      <div className="container Upload">
        <form className="form" onSubmit={this.handleSubmit} >
          <div className="my-3 ">
            <label htmlFor="title" className="form-label">
              Image Title
            </label>
            <input
              type="text"
              className="form-control border-0 bg-light"
              id="title"
              value={this.state.title}
              onChange={this.handleTitleChange}
            />
            <div className="error">
              {this.state.titleError}
            </div>
          </div>

          <div className="mb-3">
            <label htmlFor="description" className="form-label ">
              Description
            </label>

            <textarea
              type="description"
              className="form-control border-0 bg-light"
              id="description"
              value={this.state.body}
              onChange={this.handleBodyChange}
            />
            <div className="error">
              {this.state.bodyError}
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label ">Category</label>
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
            <label htmlFor="link" className="form-label ">
              Image Link
            </label>

            <input
              type="text"
              className="form-control border-0 bg-light"
              id="link"
              value={this.state.url}
              onChange={this.handleUrlChange}
            />
            <div className="error">
              {this.state.urlError}
            </div>
          </div>

          <button type="submit"  className="mt-4 button btn btn-danger btn-lg btn-block">
            Upload Your Inspiration
          </button>
        </form>
      </div>
    );
  }
}
