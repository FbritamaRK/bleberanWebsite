
import React from 'react';
import { CommunityActivity } from '../types';

interface CommunityActivitiesProps {
  activities: CommunityActivity[];
  onNavigateDetail: (id: string) => void;
}

const CommunityActivities: React.FC<CommunityActivitiesProps> = ({ activities, onNavigateDetail }) => {
  if (activities.length === 0) return null;

  return (
    <section id="kegiatan" className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <p className="text-emerald-600 font-black text-[10px] uppercase tracking-[0.4em] mb-4">Kehidupan Lokal</p>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-slate-900 leading-tight">
              Kegiatan Masyarakat <span className="text-emerald-600">Dusun Bleberan</span>
            </h2>
          </div>
          <p className="text-slate-500 font-medium max-w-sm">
            Melihat lebih dekat kehangatan dan kebersamaan warga dalam menjaga tradisi dan lingkungan.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {activities.map((activity) => (
            <div 
              key={activity.id} 
              className="group cursor-pointer"
              onClick={() => onNavigateDetail(activity.id)}
            >
              <div className="relative aspect-[4/3] rounded-[2.5rem] overflow-hidden mb-8 shadow-2xl shadow-slate-200">
                <img 
                  src={activity.imageUrl} 
                  alt={activity.title} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-8">
                  <span className="text-white font-black text-[10px] uppercase tracking-widest bg-emerald-600 px-4 py-2 rounded-full">
                    Lihat Galeri
                  </span>
                </div>
              </div>
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <span className="w-8 h-[1px] bg-emerald-500"></span>
                  <p className="text-emerald-600 font-black text-[10px] uppercase tracking-widest">{activity.date || 'Kegiatan Rutin'}</p>
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-emerald-600 transition-colors">{activity.title}</h3>
                <p className="text-slate-500 line-clamp-2 leading-relaxed font-medium">
                  {activity.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CommunityActivities;
