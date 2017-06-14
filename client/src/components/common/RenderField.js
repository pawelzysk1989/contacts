import React, {PropTypes} from 'react';

const RenderField = ( { type, label, input, meta: {touched, error} } ) => {

  return (
    <div className="input-row">
      <label>{label}</label>
      <input {...input} type={type}/>
      { touched && error && <span className="has-error">{error}</span> }
    </div>
  );
};

RenderField.propTypes = {
  type: PropTypes.string,
  label: PropTypes.string,
  input: PropTypes.object,
  meta: PropTypes.object
};

export default RenderField;