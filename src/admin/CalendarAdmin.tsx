import React, { useState, useEffect } from 'react';
import { OrientationCalendar } from '../types';
import { orientationEvents } from '../data/orientationCalendar';

const CalendarAdmin: React.FC = () => {
  const [events, setEvents] = useState<OrientationCalendar[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<OrientationCalendar | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState<string>('all');

  useEffect(() => {
    setEvents(orientationEvents);
  }, []);

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.titleFr.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || event.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const handleAdd = () => {
    setEditingEvent(null);
    setIsModalOpen(true);
  };

  const handleEdit = (event: OrientationCalendar) => {
    setEditingEvent(event);
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      setEvents(events.filter(e => e.id !== id));
    }
  };

  const handleSave = (eventData: Partial<OrientationCalendar>) => {
    if (editingEvent) {
      // Update existing event
      setEvents(events.map(e => 
        e.id === editingEvent.id ? { ...e, ...eventData } : e
      ));
    } else {
      // Add new event
      const newEvent: OrientationCalendar = {
        id: `event_${Date.now()}`,
        title: eventData.title || '',
        titleFr: eventData.titleFr || '',
        date: eventData.date || new Date(),
        description: eventData.description || '',
        descriptionFr: eventData.descriptionFr || '',
        category: eventData.category || 'primary_orientation'
      };
      setEvents([...events, newEvent]);
    }
    setIsModalOpen(false);
    setEditingEvent(null);
  };

  const getCategoryLabel = (category: string) => {
    const labels: Record<string, string> = {
      'fg_publishing': 'FG Publishing',
      'primary_orientation': 'Primary Orientation',
      'final_orientation': 'Final Orientation',
      'foreign_bac': 'Foreign Bac',
      're_orientation': 'Re-orientation',
      'test_programs': 'Test Programs'
    };
    return labels[category] || category;
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      'fg_publishing': 'bg-blue-100 text-blue-800',
      'primary_orientation': 'bg-green-100 text-green-800',
      'final_orientation': 'bg-purple-100 text-purple-800',
      'foreign_bac': 'bg-yellow-100 text-yellow-800',
      're_orientation': 'bg-red-100 text-red-800',
      'test_programs': 'bg-indigo-100 text-indigo-800'
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">
          Calendar Events Management ({events.length} events)
        </h1>
        <button
          onClick={handleAdd}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Add New Event
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Search
            </label>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search events..."
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Filter by Category
            </label>
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Categories</option>
              <option value="fg_publishing">FG Publishing</option>
              <option value="primary_orientation">Primary Orientation</option>
              <option value="final_orientation">Final Orientation</option>
              <option value="foreign_bac">Foreign Bac</option>
              <option value="re_orientation">Re-orientation</option>
              <option value="test_programs">Test Programs</option>
            </select>
          </div>
        </div>
      </div>

      {/* Events Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Event
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Description
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredEvents.map((event) => (
                <tr key={event.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{event.title}</div>
                      <div className="text-sm text-gray-500">{event.titleFr}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {event.date.toLocaleDateString()}
                    </div>
                    <div className="text-sm text-gray-500">
                      {event.date.toLocaleDateString('en-US', { weekday: 'long' })}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getCategoryColor(event.category)}`}>
                      {getCategoryLabel(event.category)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900 max-w-xs truncate">
                      {event.description}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => handleEdit(event)}
                      className="text-blue-600 hover:text-blue-900 mr-3"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(event.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Event Modal */}
      {isModalOpen && (
        <EventModal
          event={editingEvent}
          onSave={handleSave}
          onClose={() => {
            setIsModalOpen(false);
            setEditingEvent(null);
          }}
        />
      )}
    </div>
  );
};

interface EventModalProps {
  event: OrientationCalendar | null;
  onSave: (data: Partial<OrientationCalendar>) => void;
  onClose: () => void;
}

const EventModal: React.FC<EventModalProps> = ({ event, onSave, onClose }) => {
  const [formData, setFormData] = useState<Partial<OrientationCalendar>>(
    event || {
      title: '',
      titleFr: '',
      date: new Date(),
      description: '',
      descriptionFr: '',
      category: 'primary_orientation'
    }
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-md bg-white">
        <div className="mt-3">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            {event ? 'Edit Event' : 'Add New Event'}
          </h3>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Title (Arabic)
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Title (French)
                </label>
                <input
                  type="text"
                  value={formData.titleFr}
                  onChange={(e) => setFormData({ ...formData, titleFr: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Date
              </label>
              <input
                type="date"
                value={formData.date ? formData.date.toISOString().split('T')[0] : ''}
                onChange={(e) => setFormData({ ...formData, date: new Date(e.target.value) })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value as OrientationCalendar['category'] })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="fg_publishing">FG Publishing</option>
                <option value="primary_orientation">Primary Orientation</option>
                <option value="final_orientation">Final Orientation</option>
                <option value="foreign_bac">Foreign Bac</option>
                <option value="re_orientation">Re-orientation</option>
                <option value="test_programs">Test Programs</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description (Arabic)
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={3}
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description (French)
              </label>
              <textarea
                value={formData.descriptionFr}
                onChange={(e) => setFormData({ ...formData, descriptionFr: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={3}
                required
              />
            </div>
            
            <div className="flex justify-end space-x-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                {event ? 'Update' : 'Create'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CalendarAdmin; 