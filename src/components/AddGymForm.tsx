
import { getSession, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useState } from 'react';
import styled from 'styled-components';

const NewGymForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 400px;
  margin: 0 auto;
  `;

const GymDataInput = styled.input`
  padding: 0.5rem;
  font-size: 1rem;
  border-radius: 5px;
  border: 1px solid #020a78;
  `;
const GymDataTextArea = styled.textarea`
  padding: 0.5rem;
  font-size: 1rem;
  border-radius: 5px;
  border: 1px solid #020a78;
  `;

const AddGymButton = styled.button`
  padding: 0.5rem;
  font-size: 1rem;
  border-radius: 5px;
  border: 1px solid #020a78;
  `;

const AddGymForm = () => {
  const router = useRouter();
  const [gymData, setGymData] = useState({
    name: '',
    country: '',
    address: '',
    description: '',
    website: '',
    image: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setGymData({ ...gymData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const session = await getSession();
      if (!session) {
        throw new Error('User not authenticated');
      }

      const gymResponse = await fetch('/api/gyms/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...gymData }),
      }
      );

      if (!gymResponse.ok) {
        throw new Error('Failed to add gym');
      }
      const data = await gymResponse.json();
      console.log('Gym added successfully:', data);
    } catch (error) {
      console.error('Error adding gym:', error);
    }
    router.push('/')
  };

  return (
    <NewGymForm onSubmit={handleSubmit}>
      <GymDataInput type="text" name="name" placeholder="Gym Name" onChange={handleChange} required />
      <GymDataInput type="text" name="country" placeholder="Country" onChange={handleChange} required />
      <GymDataInput type="text" name="address" placeholder="Address" onChange={handleChange} />
      <GymDataTextArea name="description" placeholder="Description" onChange={handleChange} />
      <GymDataInput type="text" name="website" placeholder="Website" onChange={handleChange} />
      <GymDataInput type="text" name="image" placeholder="Image" onChange={handleChange} />
      <AddGymButton type="submit">Add Gym</AddGymButton>
    </NewGymForm>
  );
};

export default AddGymForm;
