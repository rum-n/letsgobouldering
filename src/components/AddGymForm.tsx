
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import styled from 'styled-components';

const NewGymForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 400px;
  margin: 0 auto;
  `;

const AddGymForm = () => {
  const [gymData, setGymData] = useState({
    name: '',
    country: '',
    address: '',
    description: '',
    website: '',
  });
  const {data: session} = useSession();
  const [imageFile, setImageFile] = useState<File | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setGymData({ ...gymData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!imageFile) {
      console.error('No image file selected');
      return;
    }
  
    try {
      // Convert image file to base64
      const reader = new FileReader();
      reader.readAsDataURL(imageFile);
      reader.onload = async () => {
        const base64String = reader.result as string; // Ensure this is a string
  
        // Send request to upload the image
        const res = await fetch('/api/gyms/uploadImage', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            // 'Authorization': `Bearer ${session?.user?.}`,
          },
          body: JSON.stringify({
            file: base64String,
            filename: imageFile.name,
          }),
        });
  
        if (!res.ok) {
          const errorData = await res.json();
          console.error('Error response from server:', errorData);
          throw new Error('Failed to upload image');
        }
  
        const { publicUrl } = await res.json();
  
        // After successful upload, continue to send the gym data
        const gymResponse = await fetch('/api/gyms/create', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ ...gymData, imageUrl: publicUrl }),
        });
  
        if (!gymResponse.ok) {
          throw new Error('Failed to add gym');
        }
  
        const data = await gymResponse.json();
        console.log('Gym added successfully:', data);
      };
    } catch (error) {
      console.error('Error adding gym:', error);
    }
  };

  return (
    <NewGymForm onSubmit={handleSubmit}>
      <input type="text" name="name" placeholder="Gym Name" onChange={handleChange} required />
      <input type="text" name="country" placeholder="Country" onChange={handleChange} required />
      <input type="text" name="address" placeholder="Address" onChange={handleChange} />
      <textarea name="description" placeholder="Description" onChange={handleChange} />
      <input type="text" name="website" placeholder="Website" onChange={handleChange} />
      <input type="file" accept="image/*" onChange={handleImageChange} />
      <button type="submit">Add Gym</button>
    </NewGymForm>
  );
};

export default AddGymForm;
