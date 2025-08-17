// src/pages/User.jsx
export default function User() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">📚 User Dashboard</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Example Book */}
        <div className="bg-white rounded-xl shadow p-4">
          <img 
            src="https://via.placeholder.com/300x150" 
            alt="Book" 
            className="rounded-lg mb-4"
          />
          <h2 className="text-lg font-semibold">The Great Gatsby</h2>
          <p className="text-gray-600">by F. Scott Fitzgerald</p>
          <button className="mt-3 w-full bg-green-600 text-white rounded-lg py-2 hover:bg-green-700">
            Read Now
          </button>
        </div>

        {/* Repeat for multiple books */}
        <div className="bg-white rounded-xl shadow p-4">
          <img 
            src="https://via.placeholder.com/300x150" 
            alt="Book" 
            className="rounded-lg mb-4"
          />
          <h2 className="text-lg font-semibold">To Kill a Mockingbird</h2>
          <p className="text-gray-600">by Harper Lee</p>
          <button className="mt-3 w-full bg-green-600 text-white rounded-lg py-2 hover:bg-green-700">
            Read Now
          </button>
        </div>
      </div>
    </div>
  );
}
