import React, { Component } from "react";
import { Link } from "react-router-dom";
import Helmet from 'react-helmet';
import "./RepoList.css";

class RepoList extends Component {
  render() {
    const { repos } = this.props;
    return (
      <div className="repolist">
        <Helmet
          title="Async example"
        />
        <Link to="/">back to home</Link>
        <h1>
          Async page example
          <small className="heading-font-size"> <code>what you should do:</code>&nbsp;open page source</small>
        </h1>
        <div className="header">
          <strong>tagraha repository - data fetched from https://api.github.com/users/tagraha/repos</strong>
        </div>
        {repos &&
          repos.map(repository =>
            <div key={repository.id} className="repo-item">
              <a href={`${repository.html_url}`} target="_blank">{repository.name}</a>
              <br />
              <span>created at {repository.created_at}</span>
              <blockquote>
                <p><em>{repository.description}</em></p>
              </blockquote>
            </div>
          )}
      </div>
    );
  }
}

export default RepoList;