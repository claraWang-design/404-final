import React from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import Favorite from "./../../components/Favorite";
import Modal from "./../../components/Modal";
import "./Detail.css";
import moment from "moment";

export default class Detail extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
      body: "",
      categoryId: "",
      url: "",
      id: "",
      isFavorite: null,
      comments: [],
      comment: "",
      author: "Me",
      time: "",
      isModalOpen: false,
    };

    this.handleAuthorChange = this.handleAuthorChange.bind(this);
    this.handleCommentChange = this.handleCommentChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleCommentChange(event) {
    this.setState({ comment: event.target.value });
  }
  handleAuthorChange(event) {
    this.setState({ author: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();

    let d = new Date();
    let date = d.toString();

    fetch("https://itp-final.herokuapp.com/api/comments", {
      method: "POST",
      body: JSON.stringify({
        body: this.state.comment,
        postId: this.state.id,
        author: this.state.author,
        time: date,
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
        this.setState({
          comment: "",
          postId: "",
          author: "Me",
        });
        this.fetchComments();
      });
  }

  componentDidMount() {
    document.title = "Board Details";
    
    const id = this.props.match.params.postId;
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
        console.log(json);
      });
  }

  fetchComments() {
    fetch(`https://itp-final.herokuapp.com/api/comments?_sort=time&_order=desc`)
      .then((response) => {
        return response.json();
      })
      .then((comments) => {
        this.setState({ comments });
      });
  }

  deletePost() {
    const isDeleteConfirmed = window.confirm(
      "Are you sure you want to delete this post?"
    );

    if (!isDeleteConfirmed) {
      return;
    }

    fetch(`https://itp-final.herokuapp.com/api/posts/${this.state.id}`, {
      method: "DELETE",
    }).then((json) => {
      toast.success(`${this.state.title} was deleted`);
      this.props.history.push("/");
    });
  }

  addFavorite() {
    fetch(`https://itp-final.herokuapp.com/api/posts/${this.state.id}`, {
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
        console.log(json);
        toast.success(
          `${this.state.title} was successfully added to Favorites`,
          { theme: "colored" }
        );
        this.props.history.push("/about");
      });
  }

  removeFavorite() {
    fetch(`https://itp-final.herokuapp.com/api/posts/${this.state.id}`, {
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
        console.log(json);
        toast.success(
          `${this.state.title} was successfully removed from Favorites`,
          { theme: "colored" }
        );
        this.props.history.push("/");
      });
  }

  render() {
    this.fetchComments();

    return (
      <div className="Detail">
        <h3 className="title">{this.state.title}</h3>
        <button
          // type="submit"
          className="btn btn-outline-dark btn-lg like"
          onClick={() => {
            !this.state.isFavorite ? this.addFavorite() : this.removeFavorite();
          }}
        >
          <Favorite likeValue={this.state.isFavorite} />
        </button>
        <p>{this.state.body}</p>
        {this.state.isModalOpen && (
          <Modal
            title={this.state.title}
            body={() => {
              return <img  src={this.state.url} alt="" />;
            }}
            onClose={() => {
              this.setState({ isModalOpen: false });
            }}
            id={this.state.id}
          />
        )}
        <div className="row">
          <div className="col-6">
            <img onClick={() => {
                      this.setState({ isModalOpen: true });
                    }} className="img" src={this.state.url} alt="" />
            <div className="group">
              <button
                type="button"
                className="btn btn-danger btn-lg bttn"
                onClick={() => {
                  this.deletePost();
                }}
              >
                Delete
              </button>
              <Link
                type="button"
                className="btn btn-success btn-lg bttn2"
                to={`/board/${this.props.match.params.postId}/edit`}
              >
                Edit
              </Link>
            </div>
          </div>
          <div className="comments col-6">
            <form onSubmit={this.handleSubmit}>
              <div className="mb-2">
                {/* <label className="form-label ">Category</label> */}
                <select
                  value={this.state.author}
                  onChange={this.handleAuthorChange}
                  className="form-select form-select-md border-0 bg-light"
                >
                  <option value="Me">Me 👧🏻</option>
                  <option value="Clara">Clara</option>
                  <option value="Taemin">Taemin</option>
                </select>
              </div>
              <div className="input-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Wanna say something?"
                  value={this.state.comment}
                  onChange={this.handleCommentChange}
                />
                <button className="btn btn-primary" type="submit">
                  Comment
                </button>
              </div>
            </form>
            <div className="list-group">
              {/* <button
                className="btn btn-outline-dark"
                onClick={() => {
                  this.fetchComments();
                }}
              >
                View
              </button> */}
              {this.state.comments &&
                this.state.comments.map((comment) => {
                  if (comment.postId === this.state.id) {
                    return (
                      <div className="list-group-item" key={comment.id}>
                        <div className="d-flex justify-content-between">
                          <h5>{comment.author}</h5>
                          <small className="text-muted">
                            {moment(comment.time).calendar()}
                          </small>
                        </div>
                        <p>{comment.body}</p>
                      </div>
                    );
                  }
                  return <></>;
                })}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
