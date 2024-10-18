import React from 'react';
import { User, Book, Star } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Profile: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md">
      <div className="flex items-center mb-6">
        <User size={64} className="text-blue-600 mr-4" />
        <div>
          <h2 className="text-2xl font-bold text-blue-600">{user.username}</h2>
          <p className="text-gray-600">{user.email}</p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-gray-100 p-4 rounded-lg">
          <p className="text-sm text-gray-600">Division</p>
          <p className="font-semibold">{user.division}</p>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg">
          <p className="text-sm text-gray-600">Year of Study</p>
          <p className="font-semibold">{user.yearOfStudy}</p>
        </div>
      </div>
      <div className="space-y-4">
        <div className="flex items-center">
          <Book size={24} className="text-blue-600 mr-2" />
          <span className="font-semibold">Uploaded Materials:</span>
          <span className="ml-2">{user.uploadedMaterials || 0}</span>
        </div>
        <div className="flex items-center">
          <Star size={24} className="text-blue-600 mr-2" />
          <span className="font-semibold">Saved Materials:</span>
          <span className="ml-2">{user.savedMaterials || 0}</span>
        </div>
      </div>
      <button className="mt-6 w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-300">
        Edit Profile
      </button>
    </div>
  );
};

export default Profile;