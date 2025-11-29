import { createClient } from '@supabase/supabase-js';

// Supabase configuration - Replace these placeholders with your actual Supabase config
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'your-supabase-url';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'your-supabase-anon-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Storage bucket names
export const STORAGE_BUCKETS = {
  COVERS: 'book-covers',
  BOOKS: 'book-files'
} as const;

// Helper functions for file uploads
export const uploadFile = async (
  bucket: string,
  filePath: string,
  file: File,
  options?: { upsert?: boolean }
) => {
  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(filePath, file, {
      cacheControl: '3600',
      upsert: options?.upsert || false
    });

  if (error) {
    throw new Error(`Upload failed: ${error.message}`);
  }

  return data;
};

export const getPublicUrl = (bucket: string, filePath: string) => {
  const { data } = supabase.storage
    .from(bucket)
    .getPublicUrl(filePath);

  return data.publicUrl;
};

export const deleteFile = async (bucket: string, filePath: string) => {
  const { error } = await supabase.storage
    .from(bucket)
    .remove([filePath]);

  if (error) {
    throw new Error(`Delete failed: ${error.message}`);
  }
};

// Generate unique file names
export const generateFileName = (originalName: string, prefix?: string) => {
  const timestamp = Date.now();
  const randomString = Math.random().toString(36).substring(2, 15);
  const extension = originalName.split('.').pop();
  const baseName = originalName.split('.').slice(0, -1).join('.');
  
  return `${prefix ? `${prefix}_` : ''}${timestamp}_${randomString}_${baseName}.${extension}`;
};