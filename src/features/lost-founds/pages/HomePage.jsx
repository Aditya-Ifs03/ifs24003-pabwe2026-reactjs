import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { asyncGetLostFounds, asyncGetStats } from '../states/lostFoundSlice';
import AddModal from '../modals/AddModal';
import { IconPlus, IconSearch } from '@tabler/icons-react';

const HomePage = () => {
  const dispatch = useDispatch();
  const { lostFounds, stats, isLostFounds } = useSelector((state) => state.lostFound);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [filter, setFilter] = useState(''); // '' | '?status=lost' | '?is_me=1' dll
  const [search, setSearch] = useState('');

  useEffect(() => {
    dispatch(asyncGetStats());
    dispatch(asyncGetLostFounds(filter));
  }, [dispatch, filter]);

  const filteredData = lostFounds?.filter(item => item.title.toLowerCase().includes(search.toLowerCase())) || [];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
        <button onClick={() => setIsAddModalOpen(true)} className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
          <IconPlus size={20} /> Tambah Laporan
        </button>
      </div>

      {/* Statistik Ringkas */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
         <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
           <p className="text-sm text-gray-500">Total Laporan</p>
           <p className="text-2xl font-bold">{stats?.monthly?.total || 0}</p>
         </div>
         <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
           <p className="text-sm text-gray-500">Kehilangan</p>
           <p className="text-2xl font-bold text-red-600">{stats?.monthly?.lost || 0}</p>
         </div>
         <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
           <p className="text-sm text-gray-500">Ditemukan</p>
           <p className="text-2xl font-bold text-green-600">{stats?.monthly?.found || 0}</p>
         </div>
         <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
           <p className="text-sm text-gray-500">Selesai</p>
           <p className="text-2xl font-bold text-blue-600">{stats?.monthly?.completed || 0}</p>
         </div>
      </div>

      {/* Filter & Search */}
      <div className="flex flex-col md:flex-row justify-between gap-4 bg-white p-4 rounded-xl shadow-sm border border-gray-100">
        <div className="flex gap-2">
          <button onClick={() => setFilter('')} className={`px-4 py-1.5 rounded-full text-sm ${filter === '' ? 'bg-blue-600 text-white' : 'bg-gray-100'}`}>Semua</button>
          <button onClick={() => setFilter('?status=lost')} className={`px-4 py-1.5 rounded-full text-sm ${filter === '?status=lost' ? 'bg-blue-600 text-white' : 'bg-gray-100'}`}>Kehilangan</button>
          <button onClick={() => setFilter('?status=found')} className={`px-4 py-1.5 rounded-full text-sm ${filter === '?status=found' ? 'bg-blue-600 text-white' : 'bg-gray-100'}`}>Temuan</button>
          <button onClick={() => setFilter('?is_me=1')} className={`px-4 py-1.5 rounded-full text-sm ${filter === '?is_me=1' ? 'bg-blue-600 text-white' : 'bg-gray-100'}`}>Laporan Saya</button>
        </div>
        <div className="relative">
          <IconSearch className="absolute left-3 top-2 text-gray-400" size={20} />
          <input type="text" placeholder="Cari barang..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-10 pr-4 py-2 border rounded-md w-full md:w-64" />
        </div>
      </div>

      {/* Daftar Barang */}
      {isLostFounds === 'pending' ? (
        <p>Memuat data...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredData.map(item => (
            <Link key={item.id} to={`/lost-founds/${item.id}`} className="bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition overflow-hidden block">
              <div className="h-40 bg-gray-200">
                {item.cover && <img src={item.cover} alt={item.title} className="w-full h-full object-cover" />}
              </div>
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-gray-800 line-clamp-1">{item.title}</h3>
                  <span className={`text-xs px-2 py-1 rounded-full ${item.status === 'lost' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                    {item.status}
                  </span>
                </div>
                <p className="text-sm text-gray-500 line-clamp-2">{item.description}</p>
              </div>
            </Link>
          ))}
        </div>
      )}

      <AddModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} />
    </div>
  );
};

export default HomePage;