import { useState, useEffect } from 'react';
import studentApi from '../../api/studentApi';
import { useAuth } from '../../context/AuthContext';
import {
  Calendar,
  Clock,
  User,
  ChevronLeft,
  ChevronRight,
  Check,
  AlertCircle,
  Filter,
  Search,
  X,
  Loader2
} from 'lucide-react';

const AppointmentsPage = () => {
  const { user } = useAuth();
  const [view, setView] = useState('upcoming');
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedService, setSelectedService] = useState(null);
  const [bookingStep, setBookingStep] = useState(1);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAppointments = async () => {
      if (!user?.studentId) return;
      try {
        const data = await studentApi.getAppointments(user.studentId);
        setAppointments(data);
      } catch (err) {
        console.error('API Error (getAppointments):', err);
        alert('Failed to load appointments. Please check your connection.');
      } finally {
        setLoading(false);
      }
    };
    fetchAppointments();
  }, [user]);

  const upcomingAppointments = appointments.filter(a => a.status === 'confirmed' || a.status === 'pending');
  const pastAppointments = appointments.filter(a => a.status === 'completed' || a.status === 'cancelled');

  const services = [
    { id: 1, name: 'General Checkup', duration: '30 min', icon: '🩺' },
    { id: 2, name: 'Dental Checkup', duration: '45 min', icon: '🦷' },
    { id: 3, name: 'Eye Examination', duration: '30 min', icon: '👁️' },
    { id: 4, name: 'Mental Health', duration: '60 min', icon: '🧠' },
    { id: 5, name: 'Sports Physical', duration: '30 min', icon: '🏃' },
    { id: 6, name: 'Lab Tests', duration: '15 min', icon: '🧪' },
  ];

  const doctors = [
    { id: 1, name: 'Dr. Priya Sharma', specialty: 'General Medicine', available: true },
    { id: 2, name: 'Dr. Rajesh Kumar', specialty: 'Dentistry', available: true },
    { id: 3, name: 'Dr. Anjali Menon', specialty: 'Ophthalmology', available: false },
    { id: 4, name: 'Dr. Vikram Singh', specialty: 'Mental Health', available: true },
  ];

  const timeSlots = [
    '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
    '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM', '4:00 PM', '4:30 PM'
  ];

  const calendarDays = [];
  const today = new Date();
  for (let i = 0; i < 14; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    calendarDays.push({
      date: date.getDate(),
      day: date.toLocaleDateString('en-US', { weekday: 'short' }),
      fullDate: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      isToday: i === 0,
    });
  }

  const handleBooking = async () => {
    if (!user?.studentId || !selectedDate || !selectedTime || !selectedDoctor || !selectedService) return;
    
    setLoading(true);
    try {
      const newAppointment = {
        studentId: user.studentId,
        type: selectedService.name,
        doctor: selectedDoctor.name,
        date: selectedDate.fullDate,
        time: selectedTime
      };
      
      const savedAppointment = await studentApi.addAppointment(newAppointment);
      setAppointments(prev => [...prev, savedAppointment]);
      setShowConfirmation(true);
      
      setTimeout(() => {
        setShowConfirmation(false);
        setBookingStep(1);
        setSelectedDate(null);
        setSelectedTime(null);
        setSelectedDoctor(null);
        setSelectedService(null);
        setView('upcoming');
      }, 3000);
    } catch (err) {
      console.error('Booking failed with detailed error:', err);
      // Try to extract a meaningful message from the error object
      const errorMessage = err.message || (typeof err === 'string' ? err : 'Unknown error');
      alert('Failed to book appointment: ' + errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async (id) => {
    if (!window.confirm('Are you sure you want to cancel this appointment?')) return;
    
    try {
      await studentApi.cancelAppointment(id);
      setAppointments(prev => prev.filter(a => a.id !== id));
      alert('Appointment cancelled successfully');
    } catch (err) {
      console.error('Failed to cancel appointment:', err);
      alert('Failed to cancel appointment. Please try again.');
    }
  };

  return (
    <div className="space-y-6 animate-fade-in-up">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Appointments</h1>
          <p className="text-gray-500">Manage your health appointments</p>
        </div>
        <button
          onClick={() => setView('book')}
          className="btn-primary flex items-center gap-2"
        >
          <Calendar className="w-5 h-5" />
          Book New Appointment
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-gray-200">
        <button
          onClick={() => setView('upcoming')}
          className={`px-4 py-2 font-medium transition-colors ${
            view === 'upcoming' ? 'text-primary-600 border-b-2 border-primary-600' : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Upcoming
        </button>
        <button
          onClick={() => setView('past')}
          className={`px-4 py-2 font-medium transition-colors ${
            view === 'past' ? 'text-primary-600 border-b-2 border-primary-600' : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Past Appointments
        </button>
        <button
          onClick={() => setView('book')}
          className={`px-4 py-2 font-medium transition-colors ${
            view === 'book' ? 'text-primary-600 border-b-2 border-primary-600' : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Book Appointment
        </button>
      </div>

      {/* Content */}
      {view === 'upcoming' && (
        <div className="space-y-4">
          {upcomingAppointments.map((appointment) => (
            <div key={appointment.id} className="card hover:shadow-lg transition-shadow">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-primary-100 rounded-xl">
                    <Calendar className="w-6 h-6 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{appointment.type}</h3>
                    <p className="text-sm text-gray-500">{appointment.doctor}</p>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <p className="font-medium text-gray-900">{appointment.date}</p>
                    <p className="text-sm text-gray-500">{appointment.time}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    appointment.status === 'confirmed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    {appointment.status}
                  </span>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <span>📍 {appointment.location}</span>
                </div>
                <div className="flex gap-2">
                  <button className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                    Reschedule
                  </button>
                  <button 
                    onClick={() => handleCancel(appointment.id)}
                    className="px-3 py-1 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {view === 'past' && (
        <div className="space-y-4">
          {pastAppointments.map((appointment) => (
            <div key={appointment.id} className="card bg-gray-50">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-gray-200 rounded-xl">
                    <Check className="w-6 h-6 text-gray-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{appointment.type}</h3>
                    <p className="text-sm text-gray-500">{appointment.doctor}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium text-gray-900">{appointment.date}</p>
                  <p className="text-sm text-gray-500">{appointment.time}</p>
                </div>
              </div>
              {appointment.notes && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <p className="text-sm text-gray-600"><strong>Notes:</strong> {appointment.notes}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {view === 'book' && (
        <div className="card">
          {/* Progress Steps */}
          <div className="flex items-center justify-center mb-8">
            {[1, 2, 3, 4].map((step) => (
              <div key={step} className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-medium ${
                  bookingStep >= step ? 'bg-primary-600 text-white' : 'bg-gray-200 text-gray-500'
                }`}>
                  {bookingStep > step ? <Check className="w-5 h-5" /> : step}
                </div>
                {step < 4 && <div className={`w-16 h-1 ${bookingStep > step ? 'bg-primary-600' : 'bg-gray-200'}`} />}
              </div>
            ))}
          </div>

          {/* Step 1: Select Service */}
          {bookingStep === 1 && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Select Service</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {services.map((service) => (
                  <button
                    key={service.id}
                    onClick={() => {
                      setSelectedService(service);
                      setBookingStep(2);
                    }}
                    className={`p-4 rounded-xl border-2 text-left transition-all ${
                      selectedService?.id === service.id
                        ? 'border-primary-500 bg-primary-50'
                        : 'border-gray-200 hover:border-primary-300'
                    }`}
                  >
                    <span className="text-2xl">{service.icon}</span>
                    <p className="mt-2 font-medium text-gray-900">{service.name}</p>
                    <p className="text-sm text-gray-500">{service.duration}</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Select Doctor */}
          {bookingStep === 2 && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Select Doctor</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {doctors.map((doctor) => (
                  <button
                    key={doctor.id}
                    onClick={() => {
                      if (doctor.available) {
                        setSelectedDoctor(doctor);
                        setBookingStep(3);
                      }
                    }}
                    disabled={!doctor.available}
                    className={`p-4 rounded-xl border-2 text-left transition-all ${
                      selectedDoctor?.id === doctor.id
                        ? 'border-primary-500 bg-primary-50'
                        : doctor.available
                        ? 'border-gray-200 hover:border-primary-300'
                        : 'border-gray-200 bg-gray-50 opacity-50 cursor-not-allowed'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-wellness-100 flex items-center justify-center">
                        <User className="w-6 h-6 text-wellness-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{doctor.name}</p>
                        <p className="text-sm text-gray-500">{doctor.specialty}</p>
                        {!doctor.available && (
                          <span className="text-xs text-red-500">Not available</span>
                        )}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
              <button
                onClick={() => setBookingStep(1)}
                className="mt-4 text-gray-500 hover:text-gray-700"
              >
                ← Back to services
              </button>
            </div>
          )}

          {/* Step 3: Select Date & Time */}
          {bookingStep === 3 && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Select Date & Time</h3>
              
              {/* Date Selection */}
              <div className="mb-6">
                <p className="text-sm font-medium text-gray-700 mb-3">Select Date</p>
                <div className="flex gap-2 overflow-x-auto pb-2">
                  {calendarDays.map((day, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedDate(day)}
                      className={`flex-shrink-0 p-3 rounded-xl text-center transition-all ${
                        selectedDate?.fullDate === day.fullDate
                          ? 'bg-primary-600 text-white'
                          : day.isToday
                          ? 'bg-primary-100 text-primary-700'
                          : 'bg-gray-100 hover:bg-gray-200'
                      }`}
                    >
                      <p className="text-xs font-medium">{day.day}</p>
                      <p className="text-lg font-bold">{day.date}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Time Selection */}
              <div>
                <p className="text-sm font-medium text-gray-700 mb-3">Select Time</p>
                <div className="grid grid-cols-4 md:grid-cols-6 gap-2">
                  {timeSlots.map((time) => (
                    <button
                      key={time}
                      onClick={() => setSelectedTime(time)}
                      className={`p-2 rounded-lg text-sm font-medium transition-all ${
                        selectedTime === time
                          ? 'bg-primary-600 text-white'
                          : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                      }`}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex justify-between mt-6">
                <button
                  onClick={() => setBookingStep(2)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ← Back to doctors
                </button>
                <button
                  onClick={() => setBookingStep(4)}
                  disabled={!selectedDate || !selectedTime}
                  className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Continue
                </button>
              </div>
            </div>
          )}

          {/* Step 4: Confirmation */}
          {bookingStep === 4 && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Confirm Appointment</h3>
              
              <div className="bg-gray-50 rounded-xl p-6 space-y-4">
                <div className="flex items-center gap-4">
                  <span className="text-2xl">{selectedService?.icon}</span>
                  <div>
                    <p className="font-medium text-gray-900">{selectedService?.name}</p>
                    <p className="text-sm text-gray-500">{selectedService?.duration}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-wellness-100 flex items-center justify-center">
                    <User className="w-6 h-6 text-wellness-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{selectedDoctor?.name}</p>
                    <p className="text-sm text-gray-500">{selectedDoctor?.specialty}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <Calendar className="w-6 h-6 text-gray-400" />
                  <div>
                    <p className="font-medium text-gray-900">{selectedDate?.fullDate}</p>
                    <p className="text-sm text-gray-500">{selectedTime}</p>
                  </div>
                </div>
              </div>

              <div className="flex justify-between mt-6">
                <button
                  onClick={() => setBookingStep(3)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ← Back
                </button>
                <button
                  onClick={handleBooking}
                  disabled={loading}
                  className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Booking...
                    </>
                  ) : (
                    'Confirm Booking'
                  )}
                </button>
              </div>
            </div>
          )}

          {/* Success Modal */}
          {showConfirmation && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
              <div className="bg-white rounded-2xl p-8 text-center max-w-md mx-4">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Check className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Appointment Booked!</h3>
                <p className="text-gray-500">Your appointment has been successfully scheduled. You will receive a confirmation email shortly.</p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AppointmentsPage;