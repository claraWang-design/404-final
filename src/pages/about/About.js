import "./About.css";
import React from "react";
import Button from "./Button";
import { Link } from "react-router-dom";
// import Modal from "./../../components/Modal";

export default class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      posts: [],
      isModalOpen: false,
    };
  }

  componentDidMount() {
    document.title = "Favorite";
    fetch("https://itp-final.herokuapp.com/api/posts")
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        this.setState({ posts: json });
      });
  }

  fetchPosts(){
    fetch("https://itp-final.herokuapp.com/api/posts")
    .then((response) => {
      return response.json();
    })
    .then((json) => {
      this.setState({ posts: json });
    });
    return
  }

  render() {
      this.fetchPosts();
    return (
      <div className="About row mg">
        {this.state.posts.map((post) => {
          if (post.isFavorite === true) {
            return (
              <div key={post.id} className="col-3">
                <div className="card card1">
                  <Link to={`/board/${post.id}`}>
                    <img
                      src={post.url}
                      className="card-img-top image1"
                      alt={post.title}
                    />
                  </Link>
                  <div className="card-body">
                    <h5 class="card-title">{post.title}</h5>
                    <p class="card-text">{post.body}</p>
                    <Button
                      type="about"
                      likeValue={post.isFavorite}
                      num={post.id}
                    />
                  </div>
                </div>

                {/* <div>
              <Link to={`/board/${post.id}`} >
                <img 
                  onClick={() => {
                    this.setState({ isModalOpen: true });
                  }}
                  className="image"
                  src={post.url}
                  alt={post.title}
                />
                </Link>
              </div> */}
              </div>
            );
          }
          return <></>;
        })}
      </div>
    );
  }
}
