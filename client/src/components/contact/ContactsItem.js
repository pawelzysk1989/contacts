import React, {PropTypes} from 'react';
import { Link } from 'react-router';

const ContactsItem = ({ contact }) => {
  return (
    <li className="collection-item avatar">
        
        <img src={contact.image} className="circle" />
        <div>
          <span className="title">
            <strong>{`${contact.name} ${contact.surname}`}</strong>
          </span>
          
        </div>
        <Link to={`contact/${contact._id}`} className="secondary-content">
          <i className="material-icons">play_arrow</i>
        </Link>
      </li>
  );
};

ContactsItem.propTypes = {
  contact: PropTypes.object.isRequired
};

export default ContactsItem;
