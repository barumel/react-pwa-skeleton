import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'lodash';

import 'bootstrap/dist/css/bootstrap.min.css';

import RequestPushPermission from './components/RequestPushPermission';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  /**
   * Render method
   *
   * @return {ReactElement} markup
   */
  render() {
    return (
      <div>
        Hello Universe!

        <RequestPushPermission />
      </div>
    );
  }
}

App.propTypes = {

};

App.defaultProps = {

};

function mapStateToProps(state, ownProps) {
  return {

  };
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators({}, dispatch) };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
