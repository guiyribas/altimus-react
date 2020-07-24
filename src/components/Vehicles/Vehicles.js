import React, { useState, useRef } from 'react';
import { Button } from 'primereact/button';
import { useHistory } from 'react-router-dom';
import { InputText } from 'primereact/inputtext';
import { DataTable } from 'primereact/datatable';
import { fetchVehicles, deleteVehicle } from '../../api';
import { Column } from 'primereact/column';
import { Dialog } from 'primereact/dialog';

import './Vehicles.css';

function Vehicles() {
  const history = useHistory();
  const [placa, setPlaca] = useState({ placaNumber: '' });
  const [vehicles, setVehicles] = useState([]);
  const [displayBasic, setDisplayBasic] = useState(false);
  let dt = useRef(null);

  function navigateToLastPage() {
    history.push('/dashboard');
  }

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const veiculo = await fetchVehicles(placa.placaNumber);
  //     setVehicles(veiculo);
  //   };
  //   fetchData();
  // }, [placa]);

  const renderHeader = () => {
    return (
      <div>
        Lista de veículos
        <div className='p-datatable-globalfilter-container'>
          <InputText
            placeholder='Placa'
            value={placa.placaNumber}
            onChange={handleChange}
            name='placaNumber'
          />
          <Button label='Pesquisar' onClick={handleClick} />
        </div>
      </div>
    );
  };

  async function handleClick() {
    const veiculo = await fetchVehicles(placa.placaNumber);
    setVehicles(veiculo);
  }

  const header = renderHeader();

  const onClick = (stateMethod) => {
    stateMethod(true);
  };

  const actionEditVehicle = (vehicle) => {
    return (
      <Button
        type='button'
        icon='pi pi-pencil'
        className='p-button-secondary'
        tooltip='Editar'
        onClick={() => history.push('/veiculos/' + vehicle.id)}
      ></Button>
    );
  };

  const actionDeleteVehicle = (vehicle) => {
    //refatorar
    return (
      <React.Fragment>
        <Button
          type='button'
          icon='pi pi-minus'
          className='p-button-danger'
          tooltip='Excluir'
          onClick={() => onClick(setDisplayBasic)}
        ></Button>
        <Dialog
          header='Excluir veículo'
          visible={displayBasic}
          style={{ width: '50vw' }}
          onHide={() => onHide(setDisplayBasic)}
          footer={renderFooter(setDisplayBasic, vehicle.id)}
        >
          <p>Deseja realmente excluir este veículo?</p>
        </Dialog>
      </React.Fragment>
    );
  };

  function handleChange(evt) {
    setPlaca({
      ...placa,
      [evt.target.name]: evt.target.value,
    });
  }

  const onHide = (stateMethod, confirmButton, id) => {
    // stateMethod(false);
    setDisplayBasic(false);
    if (confirmButton) {
      deleteVehicle(id);
    }
  };

  const renderFooter = (stateMethod, id) => {
    return (
      <div>
        <Button
          label='Sim'
          icon='pi pi-check'
          onClick={() => onHide(stateMethod, true, id)}
        />
        <Button
          label='Não'
          icon='pi pi-times'
          onClick={() => onHide(stateMethod, false, id)}
          className='p-button-secondary'
        />
      </div>
    );
  };

  return (
    <React.Fragment>
      <div>
        <Button
          icon='pi pi-arrow-left'
          tooltip='Voltar'
          onClick={() => navigateToLastPage()}
        />
      </div>
      <div className='datatable-doc-demo'>
        <DataTable
          ref={dt}
          value={vehicles}
          header={header}
          responsive
          className='p-datatable-customers'
          dataKey='id'
          rowHover
          paginator
          rows={10}
          emptyMessage='Nenhum veículo encontrado'
          currentPageReportTemplate='Mostrando {first} : {last} de {totalRecords} registros'
          rowsPerPageOptions={[10, 25, 50]}
        >
          <Column field='placa' header='Placa' sortable />
          <Column field='marca' header='Marca' sortable />
          <Column field='modelo' header='Modelo' sortable />
          <Column field='ano' header='Ano' sortable />
          <Column field='quilometragem' header='Quilometragem' sortable />
          <Column
            body={actionEditVehicle}
            headerStyle={{ width: '8em', textAlign: 'center' }}
            bodyStyle={{ textAlign: 'center', overflow: 'visible' }}
          />
          <Column
            body={actionDeleteVehicle}
            headerStyle={{ width: '8em', textAlign: 'center' }}
            bodyStyle={{ textAlign: 'center', overflow: 'visible' }}
          />
        </DataTable>
      </div>
      <Button
        icon='pi pi-plus'
        label='Novo veículo'
        tooltip='Adcionar'
        onClick={() => history.push('/veiculos/add')}
      />
    </React.Fragment>
  );
}

export default Vehicles;
