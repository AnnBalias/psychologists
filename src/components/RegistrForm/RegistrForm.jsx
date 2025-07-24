import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { ref, set } from 'firebase/database';
import { auth, db } from '../../firebase';
import css from './RegistrForm.module.css';
import toast from 'react-hot-toast';
import EyeSvg from '../../assets/icons/eye.svg';
import EyeOffSvg from '../../assets/icons/eye-off.svg';
import { useState } from 'react';

const schema = yup.object().shape({
  name: yup
    .string()
    .min(2, 'Min 2 characters')
    .max(32, 'Max 32 characters')
    .required('Name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup
    .string()
    .min(6, 'Min 6 characters')
    .required('Password is required'),
});

const RegistrForm = ({ onClose }) => {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async ({ name, email, password }) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      await set(ref(db, 'users/' + user.uid), {
        username: name,
        email,
      });

      toast.success('Welcome!');
      onClose();
    } catch (error) {
      toast.error('Something went wrong');
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={css.form}>
      <div className={css.errorBox}>
        <input
          type="text"
          {...register('name')}
          placeholder="Name"
          className={css.input}
        />
        {errors.name && <p className={css.error}>{errors.name.message}</p>}
      </div>

      <div className={css.errorBox}>
        <input
          type="email"
          {...register('email')}
          placeholder="Email"
          className={css.input}
        />
        {errors.email && <p className={css.error}>{errors.email.message}</p>}
      </div>

      <div className={css.errorBox}>
        <div className={css.passwordWrapper}>
          <input
            type={showPassword ? 'text' : 'password'}
            {...register('password')}
            placeholder="Password"
            className={css.pwdInput}
          />
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className={css.eyeBtn}
            aria-label="Toggle password visibility"
          >
            <img
              src={showPassword ? EyeSvg : EyeOffSvg}
              alt="Toggle visibility"
              className={css.eyeSvg}
            />
          </button>
        </div>
        {errors.password && (
          <p className={css.error}>{errors.password.message}</p>
        )}
      </div>

      <button type="submit" className={css.submitBtn}>
        Sign Up
      </button>
    </form>
  );
};

export default RegistrForm;
