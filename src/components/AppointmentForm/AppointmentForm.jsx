import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import css from './AppointmentForm.module.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { format } from 'date-fns';

const schema = yup.object().shape({
  name: yup
    .string()
    .min(2, 'Min 2 characters')
    .max(32, 'Max 32 characters')
    .required('Name is required'),
  phone: yup
    .string()
    .min(13, 'Too short')
    .max(13, 'Too long')
    .required('Enter your phone number'),
  date: yup.date().required('Choose a date'),
  time: yup.date().required('Choose a time'),
  email: yup.string().email('Invalid email').required('Email is required'),
  comment: yup.string(),
});

const AppointmentForm = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={css.form}>
      <div className={css.errorBox}>
        <input
          {...register('name')}
          placeholder="Name"
          className={css.input}
          onKeyDown={(e) => {
            if (/\d/.test(e.key)) {
              e.preventDefault();
            }
          }}
        />
        {errors.name && <p className={css.error}>{errors.name.message}</p>}
      </div>

      <div className={css.errorBox}>
        <input
          {...register('phone')}
          placeholder="+380"
          className={css.input}
          onKeyDown={(e) => {
            const allowedKeys = ['Backspace', 'ArrowLeft', 'ArrowRight', 'Tab'];
            const isNumber = /^\d$/.test(e.key);
            const isPlus = e.key === '+';
            const alreadyHasPlus = e.currentTarget.value.includes('+');

            if (
              !isNumber &&
              !allowedKeys.includes(e.key) &&
              !(
                isPlus &&
                !alreadyHasPlus &&
                e.currentTarget.selectionStart === 0
              )
            ) {
              e.preventDefault();
            }
          }}
        />
        {errors.phone && <p className={css.error}>{errors.phone.message}</p>}
      </div>

      <div className={css.dayTimeBox}>
        <div className={css.errorBox}>
          <Controller
            control={control}
            name="date"
            render={({ field }) => (
              <DatePicker
                placeholderText={format(new Date(), 'yyyy-MM-dd')}
                selected={field.value}
                onChange={(date) => field.onChange(date)}
                dateFormat="yyyy-MM-dd"
                className={css.input}
                minDate={new Date()}
                onKeyDown={(e) => e.preventDefault()}
              />
            )}
          />
          {errors.date && <p className={css.error}>{errors.date.message}</p>}
        </div>

        <div className={css.errorBox}>
          <Controller
            control={control}
            name="time"
            render={({ field }) => (
              <DatePicker
                selected={field.value}
                onChange={(val) => field.onChange(val)}
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={30}
                timeCaption="Time"
                dateFormat="HH:mm"
                placeholderText="00:00"
                className={css.input}
                onKeyDown={(e) => e.preventDefault()}
              />
            )}
          />
          {errors.time && <p className={css.error}>{errors.time.message}</p>}
        </div>
      </div>

      <div className={css.errorBox}>
        <input
          {...register('email')}
          placeholder="Email"
          className={css.input}
        />
        {errors.email && <p className={css.error}>{errors.email.message}</p>}
      </div>

      <div className={css.errorBox}>
        <textarea
          {...register('comment')}
          placeholder="Comment"
          rows={4}
          maxLength={168}
          className={css.textar}
        />
      </div>

      <button type="submit" className={css.sendBtn}>
        Send
      </button>
    </form>
  );
};

export default AppointmentForm;
