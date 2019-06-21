import React, { Component } from "react";
import api from "../services/api";

import "./Feed.css";

class Feed extends Component {
  state = {
    feed: []
  };

  async componentDidMount() {
    const response = await api.get("/tools");
    this.setState({ feed: response.data });
  }

  // handleLike = id => {
  //     api.tool(`/tools/${id}/like`);
  // };

  render() {
    return (
      <section id="tool-list">
        {this.state.feed.map(tool => (
          <article key={tool._id}>
            <header>{tool.title}</header>

            <footer>
              <p>
                {tool.description}
                <span>{tool.tags}</span>
              </p>
            </footer>
          </article>
        ))}
      </section>
    );
  }
}

export default Feed;
