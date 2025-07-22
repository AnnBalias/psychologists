import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { ref, set } from 'firebase/database';
import { auth, db } from '../../firebase';
import css from './RegistrForm.module.css';

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

      console.log('User registered:', user);
      onClose();
    } catch (error) {
      console.error('Registration error:', error.message);
    }
  };

  return (
    <div className={css.backdrop} onClick={onClose}>
      <div className={css.modal} onClick={(e) => e.stopPropagation()}>
        <form onSubmit={handleSubmit(onSubmit)} className={css.form}>
          <label>
            Name:
            <input type="text" {...register('name')} />
            {errors.name && <p className={css.error}>{errors.name.message}</p>}
          </label>
          <label>
            Email:
            <input type="email" {...register('email')} />
            {errors.email && (
              <p className={css.error}>{errors.email.message}</p>
            )}
          </label>
          <label>
            Password:
            <input type="password" {...register('password')} />
            {errors.password && (
              <p className={css.error}>{errors.password.message}</p>
            )}
          </label>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default RegistrForm;
