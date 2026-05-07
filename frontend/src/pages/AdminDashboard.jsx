import React, { useState, useEffect } from 'react';
import api from '../api/axios';
import Navbar from '../components/Navbar';
import { Filter, ChevronLeft, ChevronRight, Search, X, Check, Eye } from 'lucide-react';

const AdminDashboard = () => {
  const [reports, setReports] = useState([]);
  const [pagination, setPagination] = useState({ page: 1, limit: 10, totalPages: 1 });
  const [filters, setFilters] = useState({ status: '', category: '' });
  
  // Selected Report for Modal
  const [selectedReport, setSelectedReport] = useState(null);
  const [adminReply, setAdminReply] = useState('');
  const [statusUpdate, setStatusUpdate] = useState('');

  useEffect(() => {
    fetchReports();
  }, [pagination.page, filters]);

  const fetchReports = async () => {
    try {
      const { page, limit } = pagination;
      const { status, category } = filters;
      
      let query = `/reports?page=${page}&limit=${limit}`;
      if (status) query += `&status=${status}`;
      if (category) query += `&category=${category}`;

      const response = await api.get(query);
      setReports(response.data.data);
      setPagination(response.data.pagination);
    } catch (error) {
      console.error('Failed to fetch reports', error);
    }
  };

  const handleUpdateReport = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/reports/${selectedReport.id}`, {
        status: statusUpdate,
        adminReply: adminReply,
      });
      alert('Laporan berhasil diupdate');
      setSelectedReport(null);
      fetchReports();
    } catch (error) {
      alert('Gagal mengupdate laporan');
      console.error(error);
    }
  };

  const openModal = (report) => {
    setSelectedReport(report);
    setStatusUpdate(report.status);
    setAdminReply(report.adminReply || '');
  };

  const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
  const getImageUrl = (url) => {
    if (!url) return null;
    if (url.startsWith('http')) return url;
    return `${apiUrl.replace('/api', '')}${url}`;
  };

  const getStatusBadge = (status) => {
    switch(status) {
      case 'Menunggu Peninjauan': return 'bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-400';
      case 'Sedang dalam Proses Penyelidikan': return 'bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-400';
      case 'Selesai': return 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400';
      default: return 'bg-slate-100 text-slate-700 dark:bg-slate-500/20 dark:text-slate-400';
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Panel Administrasi</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Kelola dan tindak lanjuti laporan masuk dari masyarakat.</p>
        </div>

        {/* Filters */}
        <div className="bg-white dark:bg-slate-800 p-4 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 mb-6 flex flex-wrap gap-4 items-center">
          <div className="flex items-center text-slate-500 dark:text-slate-400 font-medium text-sm mr-2">
            <Filter size={18} className="mr-2" /> Filter:
          </div>
          <select 
            value={filters.status} 
            onChange={(e) => setFilters({...filters, status: e.target.value})}
            className="px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-sm text-slate-700 dark:text-slate-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          >
            <option value="">Semua Status</option>
            <option value="Menunggu Peninjauan">Menunggu Peninjauan</option>
            <option value="Sedang dalam Proses Penyelidikan">Diproses</option>
            <option value="Selesai">Selesai</option>
          </select>
          <select 
            value={filters.category} 
            onChange={(e) => setFilters({...filters, category: e.target.value})}
            className="px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-sm text-slate-700 dark:text-slate-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          >
            <option value="">Semua Kategori</option>
            <option value="Infrastruktur">Infrastruktur</option>
            <option value="Kesehatan">Kesehatan</option>
            <option value="Keamanan">Keamanan</option>
            <option value="Lingkungan">Lingkungan</option>
            <option value="Lainnya">Lainnya</option>
          </select>
        </div>

        {/* Table */}
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-900/50 border-b border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider">
                  <th className="px-6 py-4 font-semibold">Tanggal</th>
                  <th className="px-6 py-4 font-semibold">Pelapor</th>
                  <th className="px-6 py-4 font-semibold">Judul</th>
                  <th className="px-6 py-4 font-semibold">Kategori</th>
                  <th className="px-6 py-4 font-semibold">Status</th>
                  <th className="px-6 py-4 font-semibold text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-700/50">
                {reports.map((report) => (
                  <tr key={report.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600 dark:text-slate-300">
                      {new Date(report.createdAt).toLocaleDateString('id-ID')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900 dark:text-white">
                      {report.user.username}
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-700 dark:text-slate-200">
                      <div className="font-medium line-clamp-1">{report.title}</div>
                      <div className="text-xs text-slate-500 line-clamp-1 mt-0.5">{report.location}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600 dark:text-slate-300">
                      {report.category}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2.5 py-1 text-xs font-semibold rounded-full ${getStatusBadge(report.status)}`}>
                        {report.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button 
                        onClick={() => openModal(report)}
                        className="inline-flex items-center text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 bg-blue-50 hover:bg-blue-100 dark:bg-blue-500/10 dark:hover:bg-blue-500/20 px-3 py-1.5 rounded-md transition-colors"
                      >
                        <Eye size={16} className="mr-1.5" /> Detail
                      </button>
                    </td>
                  </tr>
                ))}
                {reports.length === 0 && (
                  <tr>
                    <td colSpan="6" className="px-6 py-12 text-center text-slate-500 dark:text-slate-400">
                      Tidak ada data laporan yang ditemukan.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          
          {/* Pagination */}
          {pagination.totalPages > 1 && (
            <div className="px-6 py-4 bg-slate-50 dark:bg-slate-900/50 border-t border-slate-200 dark:border-slate-700 flex items-center justify-between">
              <div className="text-sm text-slate-500 dark:text-slate-400">
                Halaman <span className="font-medium">{pagination.page}</span> dari <span className="font-medium">{pagination.totalPages}</span>
              </div>
              <div className="flex space-x-2">
                <button 
                  onClick={() => setPagination({...pagination, page: pagination.page - 1})}
                  disabled={pagination.page === 1}
                  className="px-3 py-1.5 border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 disabled:opacity-50 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors flex items-center"
                >
                  <ChevronLeft size={16} />
                </button>
                <button 
                  onClick={() => setPagination({...pagination, page: pagination.page + 1})}
                  disabled={pagination.page === pagination.totalPages}
                  className="px-3 py-1.5 border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 disabled:opacity-50 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors flex items-center"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Detail Modal */}
      {selectedReport && (
        <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            {/* Backdrop */}
            <div className="fixed inset-0 bg-slate-900/75 backdrop-blur-sm transition-opacity" aria-hidden="true" onClick={() => setSelectedReport(null)}></div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            
            {/* Modal Panel */}
            <div className="inline-block align-bottom bg-white dark:bg-slate-800 rounded-2xl text-left overflow-hidden shadow-2xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl w-full border border-slate-200 dark:border-slate-700">
              
              <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-700 flex justify-between items-center bg-slate-50 dark:bg-slate-900/50">
                <h3 className="text-lg leading-6 font-bold text-slate-900 dark:text-white" id="modal-title">
                  Detail Laporan
                </h3>
                <button onClick={() => setSelectedReport(null)} className="text-slate-400 hover:text-slate-500 dark:hover:text-slate-300">
                  <X size={24} />
                </button>
              </div>
              
              <div className="px-6 py-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Info Section */}
                  <div>
                    <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{selectedReport.title}</h4>
                    <span className={`inline-block px-2.5 py-1 text-xs font-semibold rounded-full mb-4 ${getStatusBadge(selectedReport.status)}`}>
                      {selectedReport.status}
                    </span>
                    
                    <div className="space-y-4 text-sm">
                      <div>
                        <span className="block text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider font-semibold mb-1">Pelapor</span>
                        <div className="font-medium text-slate-900 dark:text-white">{selectedReport.user.username}</div>
                        <div className="text-slate-600 dark:text-slate-300">{selectedReport.contactDetails}</div>
                      </div>
                      
                      <div>
                        <span className="block text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider font-semibold mb-1">Lokasi Kejadian</span>
                        <div className="text-slate-900 dark:text-white">{selectedReport.location}</div>
                      </div>
                      
                      <div>
                        <span className="block text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider font-semibold mb-1">Deskripsi</span>
                        <div className="text-slate-900 dark:text-white whitespace-pre-line">{selectedReport.description}</div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Photo Section */}
                  <div>
                    <span className="block text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider font-semibold mb-2">Lampiran Foto</span>
                    <div className="bg-slate-100 dark:bg-slate-900 rounded-xl overflow-hidden aspect-video flex items-center justify-center border border-slate-200 dark:border-slate-700">
                      {selectedReport.imageUrl ? (
                        <a href={getImageUrl(selectedReport.imageUrl)} target="_blank" rel="noopener noreferrer">
                          <img 
                            src={getImageUrl(selectedReport.imageUrl)} 
                            alt="Bukti Laporan" 
                            className="w-full h-full object-cover hover:opacity-90 transition-opacity cursor-zoom-in"
                          />
                        </a>
                      ) : (
                        <span className="text-slate-400 dark:text-slate-600 text-sm font-medium">Tidak ada foto</span>
                      )}
                    </div>
                  </div>
                </div>
                
                {/* Action Section */}
                <form onSubmit={handleUpdateReport} className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/30 -mx-6 -mb-6 px-6 pb-6">
                  <h4 className="text-base font-bold text-slate-900 dark:text-white mb-4 flex items-center">
                    <Check size={18} className="mr-2 text-blue-500" /> Tindak Lanjut Admin
                  </h4>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="md:col-span-1">
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Update Status</label>
                      <select 
                        value={statusUpdate} 
                        onChange={(e) => setStatusUpdate(e.target.value)}
                        className="w-full px-3 py-2.5 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none transition-colors"
                      >
                        <option value="Menunggu Peninjauan">Menunggu Peninjauan</option>
                        <option value="Sedang dalam Proses Penyelidikan">Proses Penyelidikan</option>
                        <option value="Selesai">Selesai</option>
                      </select>
                    </div>
                    
                    <div className="md:col-span-2 flex flex-col">
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Balasan / Catatan Admin</label>
                      <textarea 
                        rows="3" 
                        placeholder="Tuliskan tindakan yang telah diambil atau pesan untuk pelapor..."
                        value={adminReply} 
                        onChange={(e) => setAdminReply(e.target.value)}
                        className="w-full px-3 py-2.5 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none transition-colors flex-1"
                      ></textarea>
                    </div>
                  </div>
                  
                  <div className="mt-6 flex justify-end space-x-3">
                    <button 
                      type="button" 
                      onClick={() => setSelectedReport(null)}
                      className="px-4 py-2 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 rounded-lg font-medium transition-colors"
                    >
                      Tutup
                    </button>
                    <button 
                      type="submit"
                      className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium shadow-sm transition-colors"
                    >
                      Simpan Perubahan
                    </button>
                  </div>
                </form>

              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
