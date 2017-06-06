import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as contactActions from '../../actions/contactActions';
import {browserHistory} from 'react-router';
import { Field, reduxForm, SubmissionError, change } from 'redux-form';
import toastr from 'toastr';

const REDUX_FORM_NAME = 'REDUX_FORM_CONTACT';

export class ContactDetails extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      saving: false,
      deleting: false,
      contactExixts: false
    };
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

  componentWillReceiveProps(nextProps) {
    if (nextProps.params.id !== this.props.params.id) {
      this.updateForm(nextProps.params.id) 
    }
  }

  componentDidMount() {
    if (this.props.params.id) {
      this.updateForm(this.props.params.id) 
    }
  }

  delete() {
    this.setState( {deleting: true} );
    this.props.actions.deleteContact(this.props._id)
      .then((response) => {
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
      return <a className={classname} onClick={this.delete.bind(this)}><i className="material-icons right">delete</i>Delete</a>
    }
  }

  mySubmit({_id, name, surname, email, phone, image}) {
    const errors = {};

    if (fieldIsEmpty(name)) {
      errors.name = "Field is Required";
    } else if (fieldIsEmpty(surname)) {
      errors.surname = "Field is Required";
    } else if (fieldIsEmpty(email)) {
      errors.email = "Field is Required";
    } else if (fieldIsEmpty(phone)) {
      errors.phone = "Field is Required";
    } else if (fieldIsEmpty(image)) {
      errors.image = "Field is Required";
    } else if (!validEmail(email)) {
      errors.email = "Incorrect Email";
    }

    for(let error in errors) {
       throw new SubmissionError(errors);
    }
    this.setState( {saving: true} );

    if (this.state.contactExixts) {
      this.props.actions.updateContact({ _id, contact: {name, surname, email, phone, image} } )
      .then((response) => {
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
      .then((response) => {
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
        <Field name="name" label="First Name" component={renderField} type="text"/>
        <Field name="surname" label="Second Name" component={renderField} type="text"/>
        <Field name="email" label="Email" component={renderField} type="text"/>
        <Field name="phone" label="Phone" component={renderField} type="text"/>
        <Field name="image" label="Image" component={renderField} type="text"/>
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

ContactDetails.propTypes = {
  contact: PropTypes.object
};

function mapStateToProps(state, ownProps) {
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

ContactDetails = reduxForm({
  form: REDUX_FORM_NAME  
})(ContactDetails);

ContactDetails = connect(mapStateToProps, mapDispatchToProps)(ContactDetails);

export default ContactDetails;


// HELPER METHODS
const renderField = ( { type, label, input, meta: {touched, error} } ) => {
  return (
    <div className="input-row">
      <label>{label}</label>
      <input {...input} type={type}/>
      { touched && error && <span className="has-error">{error}</span> }
    </div>
  );
}

const fieldIsEmpty = (fieldValue) => {
  return fieldValue.trim().length === 0;
}

function validEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}
