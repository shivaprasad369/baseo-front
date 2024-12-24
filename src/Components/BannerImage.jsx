import React, { useState } from 'react';
import axios from 'axios';

export default function ImageUpload() {
  const [bannerTitle, setBannerTitle] = useState('');
  const [bannerText, setBannerText] = useState('');
  const [description, setDescription] = useState(null);
  const [urlLink, setUrlLink] = useState(null);
  const [websiteType, setWebsiteType] = useState(null);
  const [preview, setPreview] = useState(null);
  const [uploadStatus, setUploadStatus] = useState('');
  // Handle file selection
  const [bannerImage, setBannerImage] = useState(null);
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setBannerImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  // Handle form submission
  const handleUpload = async () => {
    if (!bannerImage || !bannerTitle || !bannerText ) {
      alert('Please fill all fields and select an image!');
      return;
    }
    const formData = new FormData();
    formData.append('bannerImage', bannerImage); // Image file
    formData.append('bannerTitle', bannerTitle); // Title
    formData.append('bannerText', bannerText); // Text
    formData.append('description', description); // Description
    formData.append('urlLink', urlLink); // URL
    formData.append('websiteType', websiteType); // Website type

    try {
      const response = await axios.post('https://baseo.onrender.com/add-banner', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setUploadStatus('Banner uploaded successfully!');
      alert('Banner uploaded successfully!')
    } catch (error) {
      setUploadStatus('Failed to upload banner.');
      console.error('Error uploading banner:', error);
    }
  };

  return (
    <div className="flex flex-col mt-[5rem] items-center gap-4 p-6">
      <h1 className="text-2xl font-bold">Upload Banner</h1>

      {/* File Input */}
      <input type="file" accept="image/*" onChange={handleFileChange} className="border p-2 rounded" />

      {/* Image Preview */}
      {preview && (
        <div className="mt-4">
          <p className="text-lg font-medium">Preview:</p>
          <img src={preview} alt="Preview" className="w-64 h-64 object-cover rounded" />
        </div>
      )}

      {/* Additional Inputs */}
      <input
        type="text"
        placeholder="Banner Title"
        value={bannerTitle}
        onChange={(e) => setBannerTitle(e.target.value)}
        className="border p-2 rounded w-full"
      />
      <input
        type="text"
        placeholder="Banner Text"
        value={bannerText}
        onChange={(e) => setBannerText(e.target.value)}
        className="border p-2 rounded w-full"
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="border p-2 rounded w-full"
      ></textarea>
      <input
        type="text"
        placeholder="URL Link"
        value={urlLink}
        onChange={(e) => setUrlLink(e.target.value)}
        className="border p-2 rounded w-full"
      />
      <input
        type="text"
        placeholder="Website Type"
        value={websiteType}
        onChange={(e) => setWebsiteType(e.target.value)}
        className="border p-2 rounded w-full"
      />

      {/* Upload Button */}
      <button
        onClick={handleUpload}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Upload Banner
      </button>

      {/* Upload Status */}
      {uploadStatus && <p className="mt-4 text-lg font-medium">{uploadStatus}</p>}
    </div>
  );
}
