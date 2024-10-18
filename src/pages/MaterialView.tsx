import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Download, Star, MessageSquare } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface Material {
  _id: string;
  title: string;
  description: string;
  uploadDate: string;
  division: string;
  subject: string;
  materialType: string;
  tags: string[];
  downloads: number;
  ratings: { userId: string; rating: number }[];
  comments: { _id: string; user: { username: string }; content: string; createdAt: string }[];
}

const MaterialView: React.FC = () => {
  const [material, setMaterial] = useState<Material | null>(null);
  const [comment, setComment] = useState('');
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();

  useEffect(() => {
    fetchMaterial();
  }, [id]);

  const fetchMaterial = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/materials/${id}`);
      if (response.ok) {
        const data = await response.json();
        setMaterial(data);
      }
    } catch (error) {
      console.error('Error fetching material:', error);
    }
  };

  const handleDownload = async () => {
    // Implement download functionality
  };

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    try {
      const response = await fetch(`http://localhost:5000/api/materials/${id}/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ content: comment }),
      });

      if (response.ok) {
        setComment('');
        fetchMaterial();
      }
    } catch (error) {
      console.error('Error submitting comment:', error);
    }
  };

  if (!material) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-4 text-blue-600">{material.title}</h1>
      <div className="mb-6">
        <p className="text-gray-700 mb-4">{material.description}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {material.tags.map((tag, index) => (
            <span key={index} className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">
              {tag}
            </span>
          ))}
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div>
            <span className="font-semibold">Division:</span> {material.division}
          </div>
          <div>
            <span className="font-semibold">Subject:</span> {material.subject}
          </div>
          <div>
            <span className="font-semibold">Type:</span> {material.materialType}
          </div>
          <div>
            <span className="font-semibold">Uploaded:</span> {new Date(material.uploadDate).toLocaleDateString()}
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center">
          <Star className="text-yellow-400 mr-1" size={20} />
          <span className="font-semibold mr-2">
            {material.ratings.reduce((acc, curr) => acc + curr.rating, 0) / material.ratings.length || 0}
          </span>
          <span className="text-gray-600">({material.downloads} downloads)</span>
        </div>
        <button
          onClick={handleDownload}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300 flex items-center"
        >
          <Download size={18} className="mr-2" />
          Download
        </button>
      </div>
      <div>
        <h2 className="text-2xl font-semibold mb-4">Comments</h2>
        <div className="space-y-4">
          {material.comments.map((comment) => (
            <div key={comment._id} className="bg-gray-50 p-4 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <span className="font-semibold">{comment.user.username}</span>
                <span className="text-sm text-gray-500">{new Date(comment.createdAt).toLocaleString()}</span>
              </div>
              <p>{comment.content}</p>
            </div>
          ))}
        </div>
        {user && (
          <form onSubmit={handleCommentSubmit} className="mt-6">
            <textarea
              placeholder="Add a comment..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
            <button
              type="submit"
              className="mt-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300 flex items-center"
            >
              <MessageSquare size={18} className="mr-2" />
              Post Comment
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default MaterialView;