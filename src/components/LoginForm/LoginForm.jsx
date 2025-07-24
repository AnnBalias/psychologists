import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase';
import css from '../RegistrForm/RegistrForm.module.css';
import toast from 'react-hot-toast';
import EyeSvg from '../../assets/icons/eye.svg';
import EyeOffSvg from '../../assets/icons/eye-off.svg';
import { useState } from 'react';

const schema = yup.object().shape({
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup
    .string()
    .min(6, 'Min 6 characters')
    .required('Password is required'),
});

const LoginForm = ({ onClose }) => {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async ({ email, password }) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success('Welcome back!');
      onClose();
    } catch (error) {
      toast.error('Invalid email or password');
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={css.form}>
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
        Log In
      </button>
    </form>
  );
};

export default LoginForm;
