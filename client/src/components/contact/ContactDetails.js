import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as contactActions from '../../actions/contactActions';
import {browserHistory} from 'react-router';
import { Field, reduxForm, SubmissionError, change } from 'redux-form';
import RenderField from '../common/RenderField';
import toastr from 'toastr';

const REDUX_FORM_NAME = 'REDUX_FORM_CONTACT';

class Contact extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      saving: false,
      deleting: false,
      contactExixts: false
    };
  }

  componentDidMount() {
    if (this.props.params.id) {
      this.updateForm(this.props.params.id); 
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.params.id !== this.props.params.id) {
      this.updateForm(nextProps.params.id);
    }
  }

  updateForm(id) {
    if (id) {
      this.props.actions.getContact(id)
        .then((response) => {
          this.props.dispatch(change(REDUX_FORM_NAME, '_id', response.data.id));
          this.props.dispatch(change(REDUX_FORM_NAME, 'name', response.data.name));
          this.props.dispatch(change(REDUX_FORM_NAME, 'surname', response.data.surname));
          this.props.dispatch(change(REDUX_FORM_NAME, 'email', response.data.email));
          this.props.dispatch(change(REDUX_FORM_NAME, 'phone', response.data.phone));
          this.props.dispatch(change(REDUX_FORM_NAME, 'image', response.data.image));
          this.setState( {contactExixts: true} );
        })
        .catch(() => {
          this.setState( {contactExixts: false} );
          toastr.error(`Unknown contact`);
        });
    } 
    else {
      this.setState( {contactExixts: false} );
      this.props.dispatch(change(REDUX_FORM_NAME, '_id', ""));
      this.props.dispatch(change(REDUX_FORM_NAME, 'name', ""));
      this.props.dispatch(change(REDUX_FORM_NAME, 'surname', ""));
      this.props.dispatch(change(REDUX_FORM_NAME, 'email', ""));
      this.props.dispatch(change(REDUX_FORM_NAME, 'phone', ""));
      this.props.dispatch(change(REDUX_FORM_NAME, 'image', ""));
    }
  }

  delete() {
    this.setState( {deleting: true} );
    this.props.actions.deleteContact(this.props.params.id)
      .then(() => {
        this.setState( {deleting: false} );
        toastr.success('Contact deleted successfully');
      })
      .then(() => {
        this.props.actions.loadContacts();
        browserHistory.push('/');
      })
      .catch((error) => {
        this.setState( { deleting: false} );
        toastr.error(error.response.data.error);
      });

  }

  deleteButton() {
    const classname = this.state.deleting ? 'waves-effect waves-light btn disabled' : 'waves-effect waves-light btn';
    if (this.state.contactExixts ) {
      return <a className={classname} onClick={this.delete.bind(this)}><i className="material-icons right">delete</i>Delete</a>;
    }
  }

  mySubmit({name, surname, email, phone, image}) {
    const errors = {};
    if (fieldIsEmpty(name)) {
      errors.name = "Name is Required";
    } else if (fieldIsEmpty(surname)) {
      errors.surname = "Surname is Required";
    } else if (fieldIsEmpty(email)) {
      errors.email = "Email is Required";
    } else if (fieldIsEmpty(phone)) {
      errors.phone = "Phone is Required";
    } else if (fieldIsEmpty(image)) {
      errors.image = "Image is Required";
    } else if (!validEmail(email)) {
      errors.email = "Incorrect Email";
    }

    if (Object.keys(errors).length > 0) {
      throw new SubmissionError(errors);
    }

    this.setState( {saving: true} );

    if (this.state.contactExixts) {
      this.props.actions.updateContact({ _id: this.props.params.id, contact: {name, surname, email, phone, image} } )
      .then(() => {
        this.setState( {saving: false} );
        toastr.success('Contact saved successfully');
        browserHistory.push('/');
      })
      .catch((error) => {
        this.setState( { saving: false} );
        toastr.error(error.response.data.error);
      });
    } else {
      this.props.actions.createContact( {name, surname, email, phone, image} )
      .then(() => {
        this.setState( {saving: false} );
        toastr.success('Contact saved successfully');
      })
      .then(() => {
        this.props.actions.loadContacts();
        browserHistory.push('/');
      })
      .catch((error) => {
        this.setState( { saving: false} );
        toastr.error(error.response.data.error);
      });
    }
  }

  render() {
    const { handleSubmit } = this.props;
    return (
      <form onSubmit={handleSubmit(this.mySubmit.bind(this))}>
        <Field name="name" label="First Name" component={RenderField} type="text"/>
        <Field name="surname" label="Second Name" component={RenderField} type="text"/>
        <Field name="email" label="Email" component={RenderField} type="text"/>
        <Field name="phone" label="Phone" component={RenderField} type="text"/>
        <Field name="image" label="Image" component={RenderField} type="text"/>
        <button 
          type="submit"
          disabled={this.state.saving}
          className="btn waves-effect waves-light"
          >
          {this.state.saving ? 'Saving...' : 'Save'}
          {this.state.contactExixts ? <i className="material-icons right">edit</i> : <i className="material-icons right">send</i>}
        </button>
        {this.deleteButton()}
      </form>
    );
  }
}

Contact.propTypes = {
  contact: PropTypes.object,
  dispatch: PropTypes.func,
  actions: PropTypes.object,
  params: PropTypes.object,
  handleSubmit: PropTypes.func
};

function mapStateToProps() {
  let contact = {_id: "", name: "", surname: "", email: "", phone: "", image: "" };
  return {
    initialValues: contact
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(contactActions, dispatch)
  };
}

let ContactDetails = reduxForm({
  form: REDUX_FORM_NAME  
})(Contact);

ContactDetails = connect(mapStateToProps, mapDispatchToProps)(ContactDetails);

export default ContactDetails;


// HELPER METHODS

const fieldIsEmpty = (fieldValue) => {
  return fieldValue.trim().length === 0;
};

function validEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}
