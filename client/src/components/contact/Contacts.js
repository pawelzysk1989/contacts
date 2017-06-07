import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import ContactsList from './ContactsList';
import Paginator from './Paginator';
import {bindActionCreators} from 'redux';
import * as contactActions from '../../actions/contactActions';

class Contacts extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {};
  }

  render() {
    return (
      <div className="row">
        <div className="col s12">
          <ContactsList
            contactList={this.props.contacts.contacts}
          />
          <Paginator contacts={this.props.contacts}/>
        </div>
      </div>
    );
  }
}

Contacts.propTypes = {
  contacts: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    contacts: state.contacts
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(contactActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Contacts);
