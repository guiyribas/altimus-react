import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { MultiSelect } from 'primereact/multiselect';
import { fetchVehicle, saveVehicle } from '../../api';

function Crud() {
  const history = useHistory();
  let { id } = useParams();

  const [cardTitle, setCardTitle] = useState('Novo veículo');
  const [selected, setSelected] = useState([]);
  const [vehicle, setVehicle] = useState({
    placa: '',
    marca: '',
    modelo: '',
    ano: '',
    quilometragem: 0,
    opcionais: {
      ar_condicionado: false,
      quatro_por_quatro: false,
      airbag: false,
      direcao_eletrica: false,
      freio_abs: false,
    },
  });

  const optionals = [
    { label: 'Ar condicionado', value: 'ar_condicionado' },
    { label: '4x4', value: 'quatro_por_quatro' },
    { label: 'Airbag', value: 'airbag' },
    { label: 'Direção elétrica', value: 'direcao_eletrica' },
    { label: 'Freio ABS', value: 'freio_abs' },
  ];

  function handleChange(evt) {
    setVehicle({
      ...vehicle,
      [evt.target.name]: evt.target.value,
    });
  }

  function handleClick() {
    saveVehicle(vehicle, id);
  }

  function handleSelectChange(e) {
    let optionals2 = {
      ar_condicionado: false,
      quatro_por_quatro: false,
      airbag: false,
      direcao_eletrica: false,
      freio_abs: false,
    };
    e.value.forEach((v) => {
      optionals2[v] = true;
    });

    console.log(optionals2);

    setVehicle({
      ...vehicle,
      opcionais: optionals2,
    });
    setSelected(e.value);
    console.log(e.value);
  }

  useEffect(() => {
    if (id) {
      setCardTitle('Editar Veículo');
      fetchVehicle(parseInt(id)).then((response) => {
        if (response) {
          setVehicle(response);
          let optionalSelected = [];
          for (const [key, value] of Object.entries(response.opcionais)) {
            if (value) {
              optionalSelected.push(key);
            }
          }
          setSelected(optionalSelected);
        }
      });
    }
  }, [id]);

  return (
    <React.Fragment>
      <div>
        <Button
          icon='pi pi-arrow-left'
          tooltip='Voltar para Veículos'
          onClick={() => history.push('/veiculos')}
        />
      </div>
      <div>
        <Card title={cardTitle}>
          <div className='p-fluid'>
            <div className='p-field'>
              <label htmlFor='placa'>Placa</label>
              <InputText
                name='placa'
                type='text'
                value={vehicle.placa}
                onChange={handleChange}
              />
            </div>
            <div className='p-field'>
              <label htmlFor='marca'>Marca</label>
              <InputText
                name='marca'
                type='text'
                value={vehicle.marca}
                onChange={handleChange}
              />
            </div>
            <div className='p-field'>
              <label htmlFor='modelo'>Modelo</label>
              <InputText
                name='modelo'
                type='text'
                value={vehicle.modelo}
                onChange={handleChange}
              />
            </div>
            <div className='p-field'>
              <label htmlFor='ano'>Ano</label>
              <InputText
                name='ano'
                type='text'
                value={vehicle.ano}
                onChange={handleChange}
              />
            </div>
            <div className='p-field'>
              <label htmlFor='quilometragem'>Quilometragem</label>
              <InputText
                name='quilometragem'
                type='text'
                value={vehicle.quilometragem}
                onChange={handleChange}
              />
            </div>
            <div className='p-field'>
              <h4>Opcionais</h4>
              <MultiSelect
                value={selected}
                options={optionals}
                onChange={handleSelectChange}
                style={{ minWidth: '15em' }}
                filter={true}
                filterPlaceholder='Pesquisar opcionais'
                placeholder='Opcionais do veículo'
              />
            </div>
          </div>
        </Card>
      </div>
      <div>
        <Button label='Salvar' onClick={handleClick} />
      </div>
    </React.Fragment>
  );
}

export default Crud;
