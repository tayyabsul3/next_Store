"use client";
import { useState } from "react";
import { supabase } from "@/lib/supabase";
import imageCompression from "browser-image-compression"; // Import the image compression package

export default function FileUpload() {
  const [files, setFiles] = useState<File[]>([]); // Store selected files
  const [uploading, setUploading] = useState(false); // Track upload state
  const [uploadedUrls, setUploadedUrls] = useState<string[]>([]); // Store uploaded file URLs

  // Handle file input change
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;
    if (selectedFiles) {
      setFiles(Array.from(selectedFiles)); // Convert FileList to an array
    }
  };
  console.log(files);

  // Function to compress files if they are larger than 1 MB
  const compressFile = async (file: File) => {
    const fileSizeInMB = file.size / 1024 / 1024; // File size in MB
    if (fileSizeInMB > 0.5) {
      // If file is larger than 1 MB, compress it
      const options = {
        maxSizeMB: 0.5, // Compress to 500 KB
        maxWidthOrHeight: 1024, // Optional: resize the image
        useWebWorker: true,
      };

      try {
        const compressedFile = await imageCompression(file, options);
        console.log(
          `Compressed ${file.name} from ${fileSizeInMB.toFixed(2)} MB to ${
            compressedFile.size / 1024 / 1024
          } MB`
        );
        return compressedFile; // Return the compressed file
      } catch (error) {
        console.error(`Error compressing ${file.name}:`, error);
        return file; // If compression fails, return the original file
      }
    } else {
      return file; // If file is smaller than 1 MB, no compression is needed
    }
  };

  // Handle the file upload process
  const handleUpload = async () => {
    console.log(files);
    if (files.length === 0) {
      alert("Please select at least one file.");
      return;
    }

    setUploading(true);

    try {
      const uploadedFileUrls: string[] = [];

      // Loop through each file and upload it to Supabase Storage
      for (const file of files) {
        // Compress the file if it's larger than 1 MB
        const fileToUpload = await compressFile(file);

        // Generate a unique file name using the current timestamp and original file name
        const fileName = `${Date.now()}-${file.name}`;

        // Upload file to Supabase Storage
        const { data, error } = await supabase.storage
          .from("pictures") // Replace with your actual bucket name
          .upload(fileName, fileToUpload);

        if (error) {
          throw new Error(error.message); // Handle any errors
        }

        // Get the public URL of the uploaded file
        const { data: d, error: urlError } = supabase.storage
          .from("pictures")
          .getPublicUrl(fileName);

        if (urlError) {
          throw new Error(urlError.message); // Handle any errors getting the public URL
        }

        console.log(`Uploaded ${file.name} with URL: ${d.publicUrl}`);

        // Push the URL to the uploadedFileUrls array
        uploadedFileUrls.push(d.publicUrl!);
      }

      // Update the state with the uploaded file URLs
      setUploadedUrls(uploadedFileUrls);
      alert("Files uploaded successfully");
    } catch (error) {
      console.error("Error uploading files:", error);
      alert("Error uploading files");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <input type="file" multiple onChange={handleFileChange} />
      <button onClick={handleUpload} disabled={uploading}>
        {uploading ? "Uploading..." : "Upload Files"}
      </button>

      {uploadedUrls.length > 0 && (
        <div>
          <h3>Uploaded Files:</h3>

          <ul>
            {uploadedUrls.map((url, index) => (
              <li key={index}>
                <a href={url} target="_blank" rel="noopener noreferrer">
                  {url}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
