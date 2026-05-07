import React, { useState, useEffect, useContext } from 'react';
import api from '../api/axios';
import { AuthContext } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import { PlusCircle, Image as ImageIcon, MapPin, Calendar, LayoutList } from 'lucide-react';

const CitizenDashboard = () => {
  const { user } = useContext(AuthContext);
  const [reports, setReports] = useState([]);
  const [showForm, setShowForm] = useState(false);
  
  // Form State
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Infrastruktur');
  const [incidentDate, setIncidentDate] = useState('');
  const [location, setLocation] = useState('');
  const [contactDetails, setContactDetails] = useState('');
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      const response = await api.get('/reports/my-reports');
      setReports(response.data.data);
    } catch (error) {
      console.error('Failed to fetch reports', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('category', category);
    formData.append('incidentDate', incidentDate);
    formData.append('location', location);
    formData.append('contactDetails', contactDetails);
    if (image) {
      formData.append('image', image);
    }

    try {
      await api.post('/reports', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      alert('Laporan berhasil dikirim');
      setShowForm(false);
      fetchReports();
      // Reset form
      setTitle(''); setDescription(''); setCategory('Infrastruktur');
      setIncidentDate(''); setLocation(''); setContactDetails(''); setImage(null);
    } catch (error) {
      alert('Gagal mengirim laporan');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusStyle = (status) => {
    switch(status) {
      case 'Menunggu Peninjauan': return 'bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-500/10 dark:text-amber-400 dark:border-amber-500/20';
      case 'Sedang dalam Proses Penyelidikan': return 'bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-500/10 dark:text-blue-400 dark:border-blue-500/20';
      case 'Selesai': return 'bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/20';
      default: return 'bg-slate-100 text-slate-700 border-slate-200 dark:bg-slate-500/10 dark:text-slate-400 dark:border-slate-500/20';
    }
  };

  const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
  const getImageUrl = (url) => {
    if (!url) return null;
    if (url.startsWith('http')) return url;
    return `${apiUrl.replace('/api', '')}${url}`;
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-8 gap-4">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Laporan Saya</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Pantau status laporan yang telah Anda kirimkan.</p>
          </div>
          <button 
            onClick={() => setShowForm(!showForm)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg font-medium flex items-center justify-center shadow-sm hover:shadow transition-all"
          >
            <PlusCircle size={18} className="mr-2" />
            Buat Laporan Baru
          </button>
        </div>

        {/* Create Form */}
        {showForm && (
          <div className="bg-white dark:bg-slate-800 p-6 sm:p-8 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 mb-8 transition-colors duration-300">
            <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-6 border-b border-slate-100 dark:border-slate-700 pb-4">
              Formulir Pengaduan Baru
            </h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Judul Laporan</label>
                  <input type="text" required placeholder="Contoh: Jalan Berlubang di Jl. Sudirman" value={title} onChange={e => setTitle(e.target.value)} className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-900/50 rounded-lg text-slate-900 dark:text-white border border-slate-200 dark:border-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Kategori</label>
                  <select value={category} onChange={e => setCategory(e.target.value)} className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-900/50 rounded-lg text-slate-900 dark:text-white border border-slate-200 dark:border-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all">
                    <option value="Infrastruktur">Infrastruktur</option>
                    <option value="Kesehatan">Kesehatan</option>
                    <option value="Keamanan">Keamanan</option>
                    <option value="Lingkungan">Lingkungan</option>
                    <option value="Lainnya">Lainnya</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Tanggal Kejadian</label>
                  <input type="date" required value={incidentDate} onChange={e => setIncidentDate(e.target.value)} className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-900/50 rounded-lg text-slate-900 dark:text-white border border-slate-200 dark:border-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Lokasi Lengkap</label>
                  <input type="text" required placeholder="Detail lokasi..." value={location} onChange={e => setLocation(e.target.value)} className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-900/50 rounded-lg text-slate-900 dark:text-white border border-slate-200 dark:border-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Nomor HP / Email Aktif</label>
                  <input type="text" required placeholder="Untuk keperluan konfirmasi" value={contactDetails} onChange={e => setContactDetails(e.target.value)} className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-900/50 rounded-lg text-slate-900 dark:text-white border border-slate-200 dark:border-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Foto Bukti Kejadian</label>
                  <input type="file" accept="image/*" onChange={e => setImage(e.target[0]?.files?.[0] || e.target.files[0])} className="w-full px-4 py-1.5 bg-slate-50 dark:bg-slate-900/50 rounded-lg text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent file:mr-4 file:py-1 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 dark:file:bg-blue-900/30 dark:file:text-blue-400 cursor-pointer" />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Deskripsi Lengkap Laporan</label>
                <textarea required rows="4" placeholder="Ceritakan kronologi kejadian secara detail..." value={description} onChange={e => setDescription(e.target.value)} className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900/50 rounded-lg text-slate-900 dark:text-white border border-slate-200 dark:border-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"></textarea>
              </div>
              
              <div className="flex justify-end space-x-3 pt-4">
                <button type="button" onClick={() => setShowForm(false)} className="px-5 py-2.5 text-sm font-medium rounded-lg text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 dark:text-slate-300 dark:bg-slate-800 dark:border-slate-600 dark:hover:bg-slate-700 transition-colors">Batal</button>
                <button type="submit" disabled={loading} className="px-5 py-2.5 text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed shadow-sm transition-colors">
                  {loading ? 'Mengirim Data...' : 'Kirim Laporan'}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Report List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reports.map((report) => (
            <div key={report.id} className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden flex flex-col group hover:shadow-md transition-all duration-300">
              
              {/* Image Header */}
              <div className="relative h-48 overflow-hidden bg-slate-100 dark:bg-slate-900/50">
                {report.imageUrl ? (
                  <img src={getImageUrl(report.imageUrl)} alt={report.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center text-slate-400 dark:text-slate-600">
                    <ImageIcon size={40} className="mb-2 opacity-50" />
                    <span className="text-xs font-medium">Tanpa Lampiran Foto</span>
                  </div>
                )}
                <div className="absolute top-4 right-4">
                  <span className={`px-2.5 py-1 text-xs font-semibold rounded-full border shadow-sm backdrop-blur-md ${getStatusStyle(report.status)}`}>
                    {report.status}
                  </span>
                </div>
              </div>

              {/* Content Body */}
              <div className="p-5 flex-1 flex flex-col">
                <div className="flex items-center space-x-2 text-xs font-medium text-slate-500 dark:text-slate-400 mb-2">
                  <span className="flex items-center"><LayoutList size={14} className="mr-1" /> {report.category}</span>
                  <span>•</span>
                  <span className="flex items-center"><Calendar size={14} className="mr-1" /> {new Date(report.incidentDate).toLocaleDateString('id-ID')}</span>
                </div>
                
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 line-clamp-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {report.title}
                </h3>
                
                <div className="flex items-start text-sm text-slate-500 dark:text-slate-400 mb-3">
                  <MapPin size={16} className="mr-1.5 mt-0.5 flex-shrink-0 text-slate-400" />
                  <span className="line-clamp-1">{report.location}</span>
                </div>
                
                <p className="text-slate-600 dark:text-slate-300 text-sm line-clamp-2 mb-5">
                  {report.description}
                </p>
                
                {/* Admin Reply Section (Bottom) */}
                <div className="mt-auto pt-4 border-t border-slate-100 dark:border-slate-700/50">
                  {report.adminReply ? (
                    <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3 border border-blue-100 dark:border-blue-800/30">
                      <p className="text-xs font-bold text-blue-700 dark:text-blue-400 mb-1 uppercase tracking-wide">Tanggapan Admin:</p>
                      <p className="text-sm text-slate-700 dark:text-slate-300">{report.adminReply}</p>
                    </div>
                  ) : (
                    <div className="text-center text-xs text-slate-400 dark:text-slate-500 italic">
                      Belum ada tanggapan dari pihak instansi.
                    </div>
                  )}
                </div>

              </div>
            </div>
          ))}
          
          {reports.length === 0 && (
            <div className="col-span-full py-16 flex flex-col items-center justify-center bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 border-dashed">
              <div className="w-16 h-16 bg-slate-100 dark:bg-slate-900/50 rounded-full flex items-center justify-center text-slate-400 mb-4">
                <LayoutList size={32} />
              </div>
              <h3 className="text-lg font-medium text-slate-900 dark:text-white mb-1">Belum Ada Laporan</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 text-center max-w-sm">Anda belum pernah membuat laporan. Klik tombol "Buat Laporan Baru" untuk memulai.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default CitizenDashboard;
