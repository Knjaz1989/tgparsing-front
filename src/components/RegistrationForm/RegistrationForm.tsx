import styles from './registration-form.module.sass';
import { Formik, Form } from 'formik';
import { registrationSchema } from './validation-schema';
import Loader from '../ui/loader/loader';
import { useState } from 'react';
import { RegistrationData } from '../../types/auth';
import { useAppDispatch } from '../../hooks/redux';
import { register } from '../../store/user-slice/apiActions';
import TextInput from '../ui/input/TextInput';
import Button from '../ui/button/Button';
import { ReactComponent as HideIcon } from '../../assets/images/icons/closed-eye.svg';
import { ReactComponent as ShowIcon } from '../../assets/images/icons/opened-eye.svg';
import Сonfidentiality from '../confidentiality/Сonfidentiality';
import IconButton from '../ui/iconButton/IconButton';
import RegistrationMessage from './SuccessMessage/RegistrationMessage';

const RegistrationForm = () => {
  const dispatch = useAppDispatch();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [passwordIsShown, setPasswordIsShown] = useState(false);
  const [checkPasswordIsShown, setCheckPasswordIsShown] = useState(false);
  const [successMessageIsVisible, setSuccessMessageIsVisible] = useState(false);

  const submitHandler = async (values: RegistrationData) => {
    setIsSubmitting(true);
    const sendedData = { ...values };
    delete sendedData['passwordCheck'];

    dispatch(
      register({
        ...sendedData,
        timezone: -new Date().getTimezoneOffset() / 60,
      }),
    )
      .unwrap()
      .then(() => {
        setErrorMessage('');
        setSuccessMessageIsVisible(true);
      })
      .catch((error) => {
        setErrorMessage(error);
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
        passwordCheck: '',
      }}
      validationSchema={registrationSchema}
      onSubmit={submitHandler}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        isValid,
        dirty,
      }) => (
        <Form className={styles.registrationForm}>
          <h2 className={styles.title}>Регистрация</h2>
          <label>
            <TextInput
              name="email"
              type="email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Введите ваш email"
              placeholderStyle={{ backgroundColor: '#2B3243' }}
              errorMessage={errors.email && touched.email ? errors.email : ''}
            />
          </label>
          <label>
            <TextInput
              name="password"
              type={passwordIsShown ? 'text' : 'password'}
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Придумайте пароль"
              placeholderStyle={{ backgroundColor: '#2B3243' }}
              errorMessage={
                errors.password && touched.password ? errors.password : ''
              }
              endIcon={
                <IconButton
                  onClick={() => setPasswordIsShown(!passwordIsShown)}
                  isError={
                    (dirty && errors.password && touched.password) || false
                  }
                >
                  {passwordIsShown ? <ShowIcon /> : <HideIcon />}
                </IconButton>
              }
            />
          </label>
          <label>
            <TextInput
              name="passwordCheck"
              type={checkPasswordIsShown ? 'text' : 'password'}
              value={values.passwordCheck}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Повторите пароль"
              placeholderStyle={{ backgroundColor: '#2B3243' }}
              errorMessage={
                errors.passwordCheck && touched.passwordCheck
                  ? errors.passwordCheck
                  : ''
              }
              endIcon={
                <IconButton
                  onClick={() => setCheckPasswordIsShown(!checkPasswordIsShown)}
                  isError={
                    (dirty && errors.passwordCheck && touched.passwordCheck) ||
                    false
                  }
                >
                  {checkPasswordIsShown ? <ShowIcon /> : <HideIcon />}
                </IconButton>
              }
            />
          </label>
          <Button
            variant="accent"
            type="submit"
            disabled={!(isValid && dirty) || isSubmitting}
          >
            {isSubmitting ? <Loader width={24} height={24} /> : <>Продолжить</>}
          </Button>
          {errorMessage && <p className={styles.error}>{errorMessage}</p>}
          <Сonfidentiality />
          {successMessageIsVisible && (
            <RegistrationMessage
              isActive={successMessageIsVisible}
              setActive={setSuccessMessageIsVisible}
            />
          )}
        </Form>
      )}
    </Formik>
  );
};

export default RegistrationForm;
