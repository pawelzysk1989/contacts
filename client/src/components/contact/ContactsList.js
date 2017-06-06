import React, {PropTypes} from 'react';
import ContactsItem from './ContactsItem';

const ContactsList = ({contactList}) => {
  return (
    <div>
      <ul className="collection">
        {contactList.map((contact) =>
          <ContactsItem key={contact._id} contact={contact} />
        )}
      </ul>
    </div>
  );
};

ContactsList.propTypes = {
  contactList: PropTypes.array.isRequired
};

export default ContactsList;