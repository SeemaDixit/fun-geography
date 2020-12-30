import React, {useState} from 'react';
import { useForm } from 'react-hook-form';
import {createFact} from './API';

const AddFactForm = ({location, onClose }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const {register , handleSubmit } = useForm();
  const onSubmit = async (data) => {
    try {
      setLoading(true);
      data.latitude = location.latitude;
      data.longitude = location.longitude;
      await createFact(data);
      onClose();
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="fact-form">
      { error ? <h3 className="error">{error}</h3> : null }
      <div className="input-row">
        <label htmlFor="apiKey">API Key</label>
        <input name="apiKey" type="password" required ref={register}/>
      </div>
      <div className="input-row">
        <label htmlFor="name">Name</label>
        <input name="name" required ref={register}/>
      </div>
      <div className="input-row">
          <label htmlFor="facts">Description</label>
          <textarea name="facts" rows={3} required ref={register}></textarea>
      </div>
      <div className="input-row">
      <button disabled={loading}>{loading ? 'Loading..' : 'Save'}</button>
      </div>
    </form>
  );
};

export default AddFactForm;
