import PropTypes from 'prop-types';
import React from 'react'
import styles from './Button.module.css'

function Button({text, icon, className}) {
  const buttonClasses = `${className || styles.button}`;
  return (
    <button className={buttonClasses}><img src={icon} alt="" /><a href="">{text}</a></button>
  )
}

Button.propTypes = {
  text: PropTypes.string.isRequired,
  className: PropTypes.string,
  icon: PropTypes.img,
};

export default Button