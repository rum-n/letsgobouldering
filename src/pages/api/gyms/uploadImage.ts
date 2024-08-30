// pages/api/upload.ts
import supabase from '@/lib/supabaseClient';
import type { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  // Check if the user is authenticated
  const session = await getSession({ req });
  if (!session) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  // Get the file from the request body
  const { file, filename } = req.body;

  if (!file || !filename) {
    return res.status(400).json({ message: 'File and filename are required' });
  }

  try {
    // Convert the base64 string back to a Buffer
    const base64Data = Buffer.from(file.split(',')[1], 'base64');

    // Log the details of the file being uploaded
    console.log('Uploading file:', filename);

    // Upload the image to Supabase storage
    const { data, error } = await supabase.storage
      .from('gym-images')
      .upload(`${filename}`, base64Data, {
        contentType: 'image/png' || 'image/jpeg',
        cacheControl: '3600',
        upsert: false,
      });

    if (error) {
      console.error('Supabase upload error:', error.message);
      throw error;
    }

    // Fetch the public URL of the uploaded file
    const { data: publicUrlData } = supabase
      .storage
      .from('gym-images')
      .getPublicUrl(`images/${filename}`);

    res.status(200).json({ message: 'File uploaded successfully', publicUrl: publicUrlData.publicUrl });
  } catch (error) {
    console.error('Error uploading file:', error);
    res.status(500).json({ message: 'An error occurred while uploading the file' });
  }
}
