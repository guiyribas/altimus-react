import React, { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { fetchLogin } from '../../api';
import { useHistory } from 'react-router-dom';

const LoginInputText = ({ icon, label, type, name, onChange, value }) => (
  <div className='p-col-4 p-md-12'>
    <div className='p-inputgroup'>
      <span className='p-inputgroup-addon'>
        <i className={'pi ' + icon}></i>
      </span>
      <InputText
        value={value}
        placeholder={label}
        type={type}
        name={name}
        onChange={onChange}
      />
    </div>
  </div>
);

function Login() {
  const history = useHistory();

  const [login, setLogin] = useState({ userName: '', password: '' });

  const [hasError, setHasError] = useState(false);

  function handleChange(evt) {
    setLogin({
      ...login,
      [evt.target.name]: evt.target.value,
    });
  }

  async function handleSubmit() {
    if (await fetchLogin(login)) {
      localStorage.setItem('isAuth', 'true');
      localStorage.setItem('userName', login.userName);
      setHasError(false);
      history.push('/dashboard');
    } else {
      setHasError(true);
    }
  }

  return (
    <React.Fragment>
      <div>
        <div className='p-grid'>
          <LoginInputText
            value={login.userName}
            icon='pi-user'
            label='Usuário'
            type='text'
            name='userName'
            onChange={handleChange}
          />
          <LoginInputText
            value={login.password}
            icon='pi-lock'
            label='Senha'
            type='password'
            name='password'
            onChange={handleChange}
          />
          {hasError && <p>Senha e/ou usuário incorretos</p>}
          <Button label='Login' onClick={handleSubmit} />
        </div>
      </div>
    </React.Fragment>
  );
}

export default Login;
