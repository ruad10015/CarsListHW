import React, { useState } from 'react';
import './Cars.css';

const Cars = () => {
  const [cars, setCars] = useState([]);
  const [form, setForm] = useState({ model: '', vendor: '', price: '', imageUrl: '' });
  const [editIndex, setEditIndex] = useState(-1);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleAddUpdate = () => {
    if (editIndex === -1) {
      setCars([...cars, { ...form, id: cars.length }]);
    } else {
      const updatedCars = cars.map((car, index) =>
        index === editIndex ? { ...form, id: car.id } : car
      );
      setCars(updatedCars);
      setEditIndex(-1);
    }
    setForm({ model: '', vendor: '', price: '', imageUrl: '' });
  };

  const handleEdit = (index) => {
    setForm(cars[index]);
    setEditIndex(index);
  };

  const handleSort = (criteria) => {
    const sortedCars = [...cars].sort((a, b) => {
      if (criteria === 'price') return b.price - a.price;
      if (criteria === 'model') return a.model.localeCompare(b.model);
      return 0;
    });
    setCars(sortedCars);
  };

  return (
    <div className="Cars">
      <div className="left-panel">
        <button onClick={() => handleSort('price')}>Higher To Lower</button>
        <button onClick={() => handleSort('model')}>A-Z</button>
        <div className="car-list">
          {cars.map((car, index) => (
            <div key={car.id} className="car">
              <img src={car.imageUrl} alt={car.model} />
              <div>
                <p>Model - {car.model}</p>
                <p>Vendor - {car.vendor}</p>
                <p>Price - {car.price}$</p>
                <button onClick={() => handleEdit(index)}>Edit</button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="right-panel">
        <input
          type="text"
          name="model"
          placeholder="model"
          value={form.model}
          onChange={handleChange}
        />
        <input
          type="text"
          name="vendor"
          placeholder="vendor"
          value={form.vendor}
          onChange={handleChange}
        />
        <input
          type="number"
          name="price"
          placeholder="price"
          value={form.price}
          onChange={handleChange}
        />
        <input
          type="text"
          name="imageUrl"
          placeholder="imageUrl"
          value={form.imageUrl}
          onChange={handleChange}
        />
        <button onClick={handleAddUpdate}>{editIndex === -1 ? 'ADD' : 'UPDATE'}</button>
      </div>
    </div>
  );
};

export default Cars;
