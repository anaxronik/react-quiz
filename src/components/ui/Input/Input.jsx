import React from 'react'

import classes from './Input.module.css'

const isInvalid = ({ valid, touched, shouldValidate }) => {
  return !valid && shouldValidate && touched
}

const Input = (props) => {
  const inputType = props.type || 'text'
  const htmlFor = `input_${inputType}_${Math.random()}`
  const cls = [classes.Input]

  if (isInvalid(props)) {
    cls.push(classes.invalid)
  }

  return (
    <div className={cls.join(' ')}>
      <label htmlFor={htmlFor}>{props.label}</label>
      <input
        type={inputType}
        id={htmlFor}
        onChange={props.onChange}
        value={props.value}
      />

      {isInvalid(props) ? (
        <span>{props.errorMessage || 'Введите верное значение'}</span>
      ) : null}
    </div>
  )
}

export default Input
