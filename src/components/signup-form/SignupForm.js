'use client';

import dynamic from 'next/dynamic';
import { Input } from '../input/Input';
import { Button } from '../button/Button';
import { useContext, useState } from 'react';
import { isEmptyStringField } from '@/utils/helpers/isEmptyStringField';
import { AuthContext } from '@/app/auth-provider';
import Link from 'next/link';

const ErrorText = dynamic(() => import('@/components/error-text/ErrorText'));

function SignupForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorText, setErrorText] = useState('');

  const { onLogin } = useContext(AuthContext);

  const isDisabled =
    isEmptyStringField(email) ||
    isEmptyStringField(password) ||
    isEmptyStringField(name) ||
    isLoading;

  const handleSetNamelValue = (event) => {
    setName(event.target.value);
  };

  const handleSetEmailValue = (event) => {
    setEmail(event.target.value);
  };

  const handleSetPasswordValue = (event) => {
    setPassword(event.target.value);
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      setIsLoading(true);
      setErrorText('');
      const request = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}auth/signup`,
        {
          method: 'POST',
          body: JSON.stringify({ name, email, password }),
        }
      );

      const data = await request.json();

      if (data.status === 'error') {
        throw (Error.error = data.message);
      }
      console.log(data);
      setIsLoading(false);
      onLogin(name, email);
    } catch (e) {
      setErrorText(e);
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <h2>Регистрация</h2>
      <Input
        label="Имя"
        name="name"
        type="text"
        value={name}
        onChange={handleSetNamelValue}
      />
      <Input
        label="Логин"
        name="email"
        type="email"
        value={email}
        onChange={handleSetEmailValue}
      />
      <Input
        label="Пароль"
        name="password"
        type="password"
        value={password}
        onChange={handleSetPasswordValue}
      />
      <Button type="submit" disabled={isDisabled}>
        Зарегистрироваться
      </Button>
      {errorText && <ErrorText>{errorText}</ErrorText>}
      <Link href={'/signin'}>Авторизоваться</Link>
    </form>
  );
}

export default SignupForm;
