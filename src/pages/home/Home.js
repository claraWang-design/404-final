import "./Home.css";
import React from "react";
import { Link } from "react-router-dom";
// import Modal from "./../../components/Modal";
import Button from "./../about/Button";

export default class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      posts: [],
      isModalOpen: false,
    };
  }

  componentDidMount() {
    document.title = "Christmas Inspirations Board";
    fetch("https://itp-final.herokuapp.com/api/posts?_sort=id&_order=desc")
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        this.setState({ posts: json });
      });
  }

  render() {
    return (
      <div className="Home row">
        {this.state.posts.map((post) => {
          return (
            <>
              <div className="col-3">
                <div key={post.id} className="card card2">
                  <img
                    onClick={() => {
                      this.setState({ isModalOpen: true });
                    }}
                    className="card-image image"
                    src={post.url}
                    alt={post.title}
                  />

                  <div className="card-img-overlay text">
                    <div className="overlay">
                      <h5 className="card-title">{post.title}</h5>
                      <p className="card-text">{post.body}</p>
                      <Link
                        className="btn btn-light me-2"
                        to={`/board/${post.id}`}
                      >
                        Details
                      </Link>
                      <Button
                        type="card"
                        likeValue={post.isFavorite}
                        num={post.id}
                      />
                    </div>
                  </div>
                </div>
              </div>
              {/* {this.state.isModalOpen && (
          <Modal
            title={post.title}
            body={() => {
              return <p>Are you sure you want to delete</p>;
            }}
            onClose={() => {
              this.setState({ isModalOpen: false });
            }}
            path={`/board/${post.id}`}
          />
        )} */}
            </>
          );
        })}
      </div>
    );
  }
}
