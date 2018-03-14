import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchRepos } from './../../../redux/repos';
import RepoList from './../../component/RepoList/RepoList';

class Repos extends Component {
  static initialAction() {
    return fetchRepos();
  }

  componentDidMount() {
    if (!this.props.repos) {
      this.props.dispatch(Repos.initialAction());
    }
  }

  render() {
    const { repos } = this.props;
    return <RepoList repos={repos} />;
  }
}

Repos.propTypes = {
  repos: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  repos: state.repos,
});

export default connect(mapStateToProps)(Repos);
