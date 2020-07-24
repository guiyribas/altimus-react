import React, { useState, useRef } from 'react';
import { Sidebar } from 'primereact/sidebar';
import { Button } from 'primereact/button';
import { Menu } from 'primereact/menu';
import { useHistory } from 'react-router-dom';

function Dashboard() {
  const history = useHistory();

  function onClickVehicles() {
    history.push('/veiculos');
  }

  const [visible, setVisible] = useState(false);

  let menu = useRef(null);

  let items = [
    {
      label: 'Veículos',
      icon: 'pi pi-ticket',
      command: () => {
        onClickVehicles();
      },
    },
  ];

  return (
    <React.Fragment>
      <div>
        <Sidebar
          visible={visible}
          baseZIndex={1000000}
          onHide={() => setVisible(false)}
        >
          <h1 style={{ fontWeight: 'normal' }}>Altimus</h1>
          <Menu model={items} ref={menu} />
        </Sidebar>
      </div>
      <div>
        <Button icon='pi pi-list' onClick={() => setVisible(!visible)} />
      </div>
      <div class='center-content'>
        <div>
          <h1>Dashboard</h1>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Dashboard;
