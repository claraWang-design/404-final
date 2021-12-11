import React from "react";
import ReactDom from "react-dom";
import './Modal.css'

export default class Modal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
      body: "",
      categoryId: "",
      url: "",
      id: "",
      isFavorite: null,
    };
  }

  componentDidMount() {
    const id = this.props.id;
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

  render() {
    const modalContainer = document.getElementById("modal-container");

    return ReactDom.createPortal(
      <div className="modal" tabIndex="-1">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">{this.state.title}</h5>
              <button
                type="button"
                className="btn-close"
                aria-label="Close"
                onClick={this.props.onClose}s
              ></button>
            </div>
            <div className="modal-body">
              <img className="image2" src={this.state.url} alt={this.state.title}/>
            </div>
            <div className="modal-footer">
              
              <button
                type="button"
                className="btn btn-secondary"
                onClick={this.props.onClose}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>,
      modalContainer
    );
  }
}
