import React from 'react'
import LoginForm from '../../components/LoginForm/LoginForm'
import styles from './Admin.module.css'

const AdminLogin: React.FC = () => {
  return (
    <div className={styles.loginForm__container}>
      <div className={styles.form__container}>
        <LoginForm legend="administrador" />
      </div>
    </div>
  )
}

export default AdminLogin
