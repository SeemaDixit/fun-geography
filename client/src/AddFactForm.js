import React from 'react';
import { useForm } from 'react-hook-form';
import {createFact} from './API';

const AddFactForm = ( location ) => {
  const {register , handleSubmit } = useForm();

  const onSubmit = async (data) => {
    try {
      data.latitude = location.latitude;
      data.longiture = location.longitude;
      const created = createFact(data);
      console.log(created);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="fact-form">
      <div className="input-row">
        <label htmlFor="name">Name</label>
        <input name="name" required ref={register}/>
      </div>
      <div className="input-row">
          <label htmlFor="description">Description</label>
          <textarea name="description" rows={3} required ref={register}></textarea>
      </div>
      <div className="input-row">
      <button>Save</button>
      </div>
    </form>
  );
};

export default AddFactForm;
