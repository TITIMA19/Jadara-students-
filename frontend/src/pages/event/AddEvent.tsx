// import React, { useState } from 'react';
// import { Calendar, Clock, MapPin, Tag, Plus, AlertCircle } from 'lucide-react';

// const CreateEvent = () => {
//   const [events, setEvents] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState('');
//   const [success, setSuccess] = useState('');
  
//   const [newEvent, setNewEvent] = useState({
//     _id: "",
//     title: "",
//     description: "",
//     date: "",
//     time: "",
//     location: "",
//     category: "",
//   });

//   const categories = [
//     'Work',
//     'Personal',
//     'Health',
//     'Social',
//     'Education',
//     'Travel',
//     'Entertainment',
//     'Other'
//   ];

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setNewEvent(prev => ({
//       ...prev,
//       [name]: value
//     }));
//     // Clear error when user starts typing
//     if (error) setError('');
//   };

//   const validateForm = () => {
//     const requiredFields = ['title', 'date', 'time'];
//     const missingFields = requiredFields.filter(field => !newEvent[field].trim());
    
//     if (missingFields.length > 0) {
//       setError(`Please fill in: ${missingFields.join(', ')}`);
//       return false;
//     }
    
//     // Validate date is not in the past
//     const eventDate = new Date(`${newEvent.date}T${newEvent.time}`);
//     const now = new Date();
    
//     if (eventDate < now) {
//       setError('Event date and time cannot be in the past');
//       return false;
//     }
    
//     return true;
//   };

//   const handleAddEvent = async (e) => {
    
//     if (!validateForm()) return;
    
//     setIsLoading(true);
//     setError('');
//     setSuccess('');

//     // Destructure newEvent to exclude _id
//     const { _id, ...eventWithoutId } = newEvent;

//     try {
//       const response = await fetch('http://localhost:3000/events', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(eventWithoutId),
//       });

//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
//       }

//       const data = await response.json();

//       // Assuming the created event is returned under data.data
//       setEvents(prev => [...prev, data.data]);
//       setSuccess('Event created successfully!');

//       // Clear form
//       setNewEvent({
//         _id: "",
//         title: "",
//         description: "",
//         date: "",
//         time: "",
//         location: "",
//         category: "",
//       });

//     } catch (error) {
//       console.error("Error adding event:", error);
//       setError(error.message || 'Failed to create event. Please try again.');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
//       <div className="mb-6">
//         <h2 className="text-2xl font-bold text-gray-800 mb-2 flex items-center gap-2">
//           <Plus className="w-6 h-6 text-blue-600" />
//           Create New Event
//         </h2>
//         <p className="text-gray-600">Fill in the details below to create your event</p>
//       </div>

//       {error && (
//         <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md flex items-center gap-2 text-red-700">
//           <AlertCircle className="w-4 h-4" />
//           {error}
//         </div>
//       )}

//       {success && (
//         <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-md text-green-700">
//           {success}
//         </div>
//       )}

//       <div className="space-y-6">
//         {/* Title */}
//         <div>
//           <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
//             Event Title *
//           </label>
//           <input
//             type="text"
//             id="title"
//             name="title"
//             value={newEvent.title}
//             onChange={handleInputChange}
//             className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//             placeholder="Enter event title"
//             required
//           />
//         </div>

//         {/* Description */}
//         <div>
//           <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
//             Description
//           </label>
//           <textarea
//             id="description"
//             name="description"
//             value={newEvent.description}
//             onChange={handleInputChange}
//             rows={3}
//             className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//             placeholder="Enter event description"
//           />
//         </div>

//         {/* Date and Time */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <div>
//             <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-2">
//               <Calendar className="inline w-4 h-4 mr-1" />
//               Date *
//             </label>
//             <input
//               type="date"
//               id="date"
//               name="date"
//               value={newEvent.date}
//               onChange={handleInputChange}
//               className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//               required
//             />
//           </div>
          
//           <div>
//             <label htmlFor="time" className="block text-sm font-medium text-gray-700 mb-2">
//               <Clock className="inline w-4 h-4 mr-1" />
//               Time *
//             </label>
//             <input
//               type="time"
//               id="time"
//               name="time"
//               value={newEvent.time}
//               onChange={handleInputChange}
//               className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//               required
//             />
//           </div>
//         </div>

//         {/* Location */}
//         <div>
//           <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
//             <MapPin className="inline w-4 h-4 mr-1" />
//             Location
//           </label>
//           <input
//             type="text"
//             id="location"
//             name="location"
//             value={newEvent.location}
//             onChange={handleInputChange}
//             className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//             placeholder="Enter event location"
//           />
//         </div>

//         {/* Category */}
//         <div>
//           <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
//             <Tag className="inline w-4 h-4 mr-1" />
//             Category
//           </label>
//           <select
//             id="category"
//             name="category"
//             value={newEvent.category}
//             onChange={handleInputChange}
//             className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//           >
//             <option value="">Select a category</option>
//             {categories.map(category => (
//               <option key={category} value={category}>
//                 {category}
//               </option>
//             ))}
//           </select>
//         </div>

//         {/* Submit Button */}
//         <div className="flex justify-end">
//           <button
//             type="button"
//             onClick={handleAddEvent}
//             disabled={isLoading}
//             className="px-6 py-2 bg-blue-600 text-white font-medium rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
//           >
//             {isLoading ? (
//               <>
//                 <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
//                 Creating...
//               </>
//             ) : (
//               <>
//                 <Plus className="w-4 h-4" />
//                 Create Event
//               </>
//             )}
//           </button>
//         </div>
//       </div>

//       {/* Recent Events Display */}
//       {events.length > 0 && (
//         <div className="mt-8">
//           <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Events</h3>
//           <div className="space-y-3">
//             {events.slice(-3).map((event, index) => (
//               <div key={index} className="p-3 bg-gray-50 rounded-md border">
//                 <div className="font-medium text-gray-800">{event.title}</div>
//                 <div className="text-sm text-gray-600 flex items-center gap-4 mt-1">
//                   <span className="flex items-center gap-1">
//                     <Calendar className="w-3 h-3" />
//                     {event.date}
//                   </span>
//                   <span className="flex items-center gap-1">
//                     <Clock className="w-3 h-3" />
//                     {event.time}
//                   </span>
//                   {event.location && (
//                     <span className="flex items-center gap-1">
//                       <MapPin className="w-3 h-3" />
//                       {event.location}
//                     </span>
//                   )}
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default CreateEvent;