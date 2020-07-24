const USERS = [{ userName: 'admin', password: 'admin' }];

let ID = 2;

let VEHICLES = [
  {
    id: 1,
    placa: 'AAA0001',
    marca: 'Honda',
    modelo: 'Civic',
    ano: '2021',
    quilometragem: 0,
    opcionais: {
      ar_condicionado: true,
      quatro_por_quatro: false,
      airbag: true,
      direcao_eletrica: true,
      freio_abs: true,
    },
  },
  {
    id: 2,
    placa: 'BBB0001',
    marca: 'Chevrolet',
    modelo: 'Onix',
    ano: '2016',
    quilometragem: 12000,
    opcionais: {
      ar_condicionado: true,
      quatro_por_quatro: false,
      airbag: true,
      direcao_eletrica: false,
      freio_abs: true,
    },
  },
];

export const fetchLogin = (user) => {
  const valid = USERS.some(
    (u) => u.userName === user.userName && u.password === user.password
  );

  return new Promise((resolve) =>
    setTimeout(() => {
      resolve(valid);
    }, 1000)
  );
};

export const fetchVehicles = (placa) => {
  const vehicle = VEHICLES.find((v) => v.placa === placa);

  return new Promise((resolve) =>
    setTimeout(() => {
      if (vehicle) {
        resolve([vehicle]);
      } else {
        resolve([]);
      }
    }, 1000)
  );
};

export const fetchVehicle = (id) => {
  const vehicle = VEHICLES.find((v) => v.id === id);

  return new Promise((resolve) =>
    setTimeout(() => {
      if (vehicle) {
        resolve(vehicle);
      } else {
        resolve({});
      }
    }, 1000)
  );
};

export const saveVehicle = (vehicle, id) => {
  const index = VEHICLES.findIndex((v) => v.id === id);

  if (index > -1) {
    VEHICLES[index] = vehicle;
  } else {
    VEHICLES.push({ id: ++ID, ...vehicle });
  }

  console.log(VEHICLES);

  return new Promise((resolve) =>
    setTimeout(() => {
      resolve(true);
    }, 1000)
  );
};

export const deleteVehicle = (id) => {
  const index = VEHICLES.findIndex((v) => v.id === id);

  delete VEHICLES[index];

  // const index = array.indexOf(id);
  // if (index > -1) {
  //   array.splice(index, 1);
  // }

  console.log(VEHICLES);

  return new Promise((resolve) =>
    setTimeout(() => {
      resolve(true);
    }, 1000)
  );
};
