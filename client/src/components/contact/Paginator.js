import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as contactActions from '../../actions/contactActions';

class Paginator extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {};
    this.back = this.back.bind(this);
    this.advance = this.advance.bind(this);
  }

  back() {
    const { offset, limit } = this.props.contacts;
    this.props.actions.loadContacts(offset - limit, limit);
  }

  advance() {
    const { offset, limit } = this.props.contacts;
    this.props.actions.loadContacts(offset + limit, limit);
  }

  left() {
    const { offset } = this.props.contacts;
    return (
      <li className={offset === 0 ? 'disabled' : ''}>
        <a onClick={this.back}>
          <i className="material-icons">chevron_left</i>
        </a>
      </li>
    );
  }

  right() {
    const { offset, limit, count } = this.props.contacts;
    return (
      <li className={offset + limit >= count ? 'disabled' : ''}>
        <a onClick={this.advance}>
          <i className="material-icons">chevron_right</i>
        </a>
      </li>
    );
  }

  render() {
    const { offset, limit, count } = this.props.contacts;
    return (
      <div className="center-align disable-selection">
        <ul className="pagination">
          {this.left()}
          <li><a>Page {offset / limit + 1}</a></li>
          {this.right()}
        </ul>
        {count} Records Found
      </div>
    );
  }
}

Paginator.propTypes = {
  contacts: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
};

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(contactActions, dispatch)
  };
}

export default connect(null, mapDispatchToProps)(Paginator);
