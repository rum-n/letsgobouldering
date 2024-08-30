import supabase from '@/lib/supabaseClient';
import type { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const session = await getServerSession(req, res, authOptions);

  // Check if the user is authenticated
  if (!session) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    // Get the file from the request body
    const { file, filename } = req.body;

    if (!file || !filename) {
      throw new Error('File and filename are required');
    }

    // Check if file is in base64 format
    const fileTypeRegex = /^data:([a-zA-Z]+\/[a-zA-Z0-9-]+);base64,/;
    const match = fileTypeRegex.exec(file);
    
    
    if (match) {
      const contentType = match[1];
      const base64DataStartIndex = file.indexOf(',');
      if (base64DataStartIndex !== -1) {
        const base64Prefix = file.slice(0, base64DataStartIndex + 1); // slice until the comma
        const base64Data = file.slice(base64DataStartIndex + 1).trim(); // start from after the comma and trim
        
        // Convert the base64 string back to a Buffer
        const binaryData = Buffer.from(base64Data, 'base64');
        
        // Log the details of the file being uploaded
        console.log('Uploading file:', filename);
        
        // Upload the image to Supabase storage with correct content type
        const { data, error } = await supabase.storage
        .from('gym-images')
        .upload(`${filename}`, binaryData, {
          contentType,
          cacheControl: '3600',
          upsert: false,
        });
        
        if (error) {
          return res.status(500).json({ message: `Supabase upload error: ${error.message}` });
        }
        
        // Fetch the public URL of the uploaded file
        const { data: publicUrlData } = supabase
        .storage
        .from('gym-images')
        .getPublicUrl(`${filename}`);
        
        res.status(200).json({ message: 'File uploaded successfully', publicUrl: publicUrlData.publicUrl });
      } else {
        // Handle non-base64 file format (e.g., binary data)
        const binaryData = Buffer.from(file, 'binary');
        const { data, error } = await supabase.storage
        .from('gym-images')
        .upload(`${filename}`, binaryData, {
          contentType: 'application/octet-stream', // default content type for binary data
          cacheControl: '3600',
          upsert: false,
        });
        
        if (error) {
          return res.status(500).json({ message: `Supabase upload error: ${error.message}` });
        }
      }
        
        // Fetch the public URL of the uploaded file
        const { data: publicUrlData } = supabase
        .storage
        .from('gym-images')
        .getPublicUrl(`${filename}`);
        
        res.status(200).json({ message: 'File uploaded successfully', publicUrl: publicUrlData.publicUrl });
      }
    } catch (error) {
      console.error('Error uploading file:', error);
      return res.status(500).json({ message: `An error occurred while uploading the file: ${(error as Error).message}` });
    }
}
