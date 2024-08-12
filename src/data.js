export const games = [
    {
      id: 1,
      name: 'Rompete la Cabeza',
      category: 'puzzle',
      size: 50000,
      price: 1000,
      availableLicenses: 50,
      soldLicenses: 20,
      image: '/assets/images/rompete1.jpg',
    },
    {
      id: 2,
      name: 'Fafi2024',
      category: 'sports',
      size: 70000,
      price: 1500,
      availableLicenses: 60,
      soldLicenses: 30,
      image: '/assets/images/fafi1.jpg',
    },
    {
      id: 3,
      name: 'Call of Gruty',
      category: 'action',
      size: 80000,
      price: 2000,
      availableLicenses: 40,
      soldLicenses: 25,
      image: '/assets/images/callofgruty1.jpg',
    },
    {
      id: 4,
      name: 'Alex Leyens',
      category: 'action',
      size: 75000,
      price: 1800,
      availableLicenses: 45,
      soldLicenses: 30,
      image: '/assets/images/alexleyens1.jpg',
    },
  ];

export const bestSellers = games.slice(0, 3); // Ejemplo: selecciona los primeros 3 juegos
export const mostPlayed = games.slice(0, 3); // Ejemplo: selecciona los primeros 3 juegos
export const upcomingTitles = games.slice(0, 3); // Ejemplo: selecciona los primeros 3 juegos