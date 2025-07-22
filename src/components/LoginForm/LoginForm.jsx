import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase';
import css from './LoginForm.module.css';
import toast from 'react-hot-toast';

const schema = yup.object().shape({
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup
    .string()
    .min(6, 'Min 6 characters')
    .required('Password is required'),
});

const LoginForm = ({ onClose }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async ({ email, password }) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      toast.success('Welcome back!');
      onClose();
    } catch (error) {
      console.error('Login error:', error.message);
      toast.error('Invalid email or password');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={css.form}>
      <label>
        Email:
        <input type="email" {...register('email')} />
        {errors.email && <p className={css.error}>{errors.email.message}</p>}
      </label>
      <label>
        Password:
        <input type="password" {...register('password')} />
        {errors.password && (
          <p className={css.error}>{errors.password.message}</p>
        )}
      </label>
      <button type="submit" className={css.submitBtn}>
        Log In
      </button>
    </form>
  );
};

export default LoginForm;
