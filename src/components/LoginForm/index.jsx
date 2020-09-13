import React, { useContext, useState } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

import Input from '../Input';
import Button from '../Buttons/Button';

import { AuthContext } from '../../contexts/auth';

import styles from './LoginForm.module.scss';

const LoginForm = () => {
  const { login } = useContext(AuthContext);

  const [isLoading, setLoading] = useState(false);
  const [loginError, setLoginError] = useState(null);

  const initialValues = {
    email: '',
    password: '',
  };

  const validationSchema = Yup.object({
    email: Yup.string().email('Email is invalid').required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  const onSubmit = async (email, password) => {
    setLoading(true);

    try {
      await login(email, password);
    } catch (err) {
      setLoginError(err.message);

      setLoading(false);
    }
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={({ email, password }) => onSubmit(email, password)}
        validateOnChange={false}
      >
        {({
          values, handleChange, errors,
        }) => (
          <Form className={styles.form}>
            <Input
              name="email"
              id="email"
              label="Email"
              placeholder="Email"
              value={values.email}
              onChange={handleChange}
              error={errors.email}
            />
            <Input
              name="password"
              id="password"
              label="Password"
              placeholder="Password"
              type="password"
              value={values.password}
              onChange={handleChange}
              error={errors.password}
            />
            <Button name="submit" type="submit" disabled={isLoading} />
            {loginError && <div className={styles.formError}>{loginError}</div>}
          </Form>
        )}
      </Formik>
    </>
  );
};

export default LoginForm;
