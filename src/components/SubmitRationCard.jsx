import React, { useState } from 'react';
import axios from 'axios';

const SubmitRationCard = ({ contract }) => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [status, setStatus] = useState('');

  const pinataApiKey = 'fe125d8c8e8206a75917';
  const pinataSecretApiKey = '11d122f88a129d75b129f4e50696ea70fd13b21da2f45e636828ca4569d7fbec';

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const uploadToPinata = async () => {
    const formData = new FormData();
    formData.append('file', file);

    const metadata = JSON.stringify({
      name: `rationcard-${file.name}`,
    });
    formData.append('pinataMetadata', metadata);

    try {
      const res = await axios.post('https://api.pinata.cloud/pinning/pinFileToIPFS', formData, {
        maxBodyLength: 'Infinity',
        headers: {
          'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
          pinata_api_key: pinataApiKey,
          pinata_secret_api_key: pinataSecretApiKey,
        },
      });
      return res.data.IpfsHash;
    } catch (err) {
      console.error('Pinata upload error:', err);
      throw new Error('Failed to upload to IPFS');
    }
  };

  const handleSubmit = async () => {
    if (!file) return alert('Please select a file first.');

    setUploading(true);
    setStatus('Uploading to IPFS...');

    try {
      const cid = await uploadToPinata();
      setStatus(`IPFS Upload Success. CID: ${cid}. Submitting to contract...`);

      const tx = await contract.submitRationCard(cid);
      await tx.wait();

      setStatus('Ration card submitted successfully!');
    } catch (err) {
      setStatus('Error: ' + err.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="p-4 bg-gray-900 text-white rounded-lg shadow-lg max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Submit Ration Card</h2>
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="mb-4 block w-full text-white"
      />
      <button
        onClick={handleSubmit}
        disabled={uploading}
        className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded w-full"
      >
        {uploading ? 'Submitting...' : 'Upload and Submit'}
      </button>
      {status && <p className="mt-4 text-sm text-green-400">{status}</p>}
    </div>
  );
};

export default SubmitRationCard;
