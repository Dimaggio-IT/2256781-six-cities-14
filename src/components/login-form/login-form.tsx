import { ChangeEvent, FormEvent, useState } from 'react';
import { TAuthData } from '../../types';
import { useAppDispatch } from '../../hooks';
import { postAsyncAuth } from '../../store';

const validateEmail = (email: string): boolean =>
  /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i.test(email);

const validatePassword = (password: string): boolean =>
  /^[A-za-z0-9_]+[A-za-z0-9_]{1,}$/.test(password);

const validate = (formData: TAuthData): boolean => {
  if (!validateEmail(formData.email)) {
    return false;
  }

  if (!validatePassword(formData.password)) {
    return false;
  }

  return true;
};

function LoginForm(): JSX.Element {
  const [isSubmitButtonOk, setIsSubmitButtonOk] = useState(false);
  const [formData, setFormData] = useState<TAuthData>({
    email: '',
    password: '',
  });
  const dispatch = useAppDispatch();

  const handleTextChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = evt.target;
    setFormData({ ...formData, [name]: value });
    if (validate({ ...formData, [name]: value })) {
      setIsSubmitButtonOk(true);
    } else {
      setIsSubmitButtonOk(false);
    }
  };

  const handleFormSubmit = (event: FormEvent) => {
    event.preventDefault();

    dispatch(
      postAsyncAuth({
        email: formData.email,
        password: formData.password,
      })
    );
  };

  return (
    <section className="login">
      <h1 className="login__title">Sign in</h1>
      <form
        onSubmit={handleFormSubmit}
        className="login__form form"
        action="#"
        method="post"
      >
        <div className="login__input-wrapper form__input-wrapper">
          <label className="visually-hidden">E-mail</label>
          <input
            onChange={handleTextChange}
            value={formData.email}
            className="login__input form__input"
            type="email"
            name="email"
            placeholder="Email"
            title="Email, for example test@test.com"
            data-testid="email-element"
            required
          />
        </div>
        <div className="login__input-wrapper form__input-wrapper">
          <label className="visually-hidden">Password</label>
          <input
            onChange={handleTextChange}
            value={formData.password}
            className="login__input form__input"
            type="password"
            name="password"
            placeholder="Password"
            title="The password must contain at least one digit or letter"
            data-testid="password-element"
            required
          />
        </div>
        <button
          className="login__submit form__submit button"
          type="submit"
          disabled={!isSubmitButtonOk}
        >
          Sign in
        </button>
      </form>
    </section>
  );
}

export { LoginForm };
