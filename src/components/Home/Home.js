import React from 'react';
import { Button } from 'primereact/button';
import { useHistory } from 'react-router-dom';
import '../../index.css';
import './Home.css';

function Home() {
  const history = useHistory();
  return (
    <React.Fragment>
        <div class='center-content'>
          <div>
            <h1>Altimus</h1>
            <h2>Bem-vindo ao projeto avaliação React</h2>
          </div>
          <p>O login para acessar a aplicação é:</p>
          <p>Usuário: admin</p>
          <p>Senha: admin</p>
        </div>
        <div className='center-redirect-button'>
          <Button
            label='Me redirecione para a tela de login!'
            onClick={() => history.push('/login')}
          />
        </div>
    </React.Fragment>
  );
}

export default Home;
