import React from 'react';
import { CalendarDays, MapPin, Building2, Euro } from 'lucide-react';
import { Link } from 'react-router-dom';
import { format, formatDistance } from 'date-fns';
import { fr } from 'date-fns/locale';

interface Job {
  id: string;
  title: string;
  company: string;
  postal_code: string;
  city: string;
  contract_type: string;
  salary: string;
  description: string;
  created_at: string;
}

interface JobCardProps {
  job: Job;
}

const JobCard: React.FC<JobCardProps> = ({ job }) => {
  const timeAgo = formatDistance(new Date(job.created_at), new Date(), {
    addSuffix: true,
    locale: fr
  });

  return (
    <article className="h-full">
      <div className="card p-5 sm:p-6 flex flex-col h-full transform transition-transform duration-200 hover:scale-[1.02]">
        {/* Header with contract type and date */}
        <div className="mb-2 flex items-center justify-between">
          <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full font-semibold text-xs">
            {job.contract_type}
          </span>
          <time 
            dateTime={job.created_at}
            className="text-xs text-gray-500 flex items-center" 
            title={format(new Date(job.created_at), 'dd/MM/yyyy')}
          >
            <CalendarDays className="h-3 w-3 mr-1" />
            {timeAgo}
          </time>
        </div>
        
        {/* Job title */}
        <h3 className="text-green-800 text-lg font-semibold mb-1">
          {job.title}
        </h3>
        
        {/* Company info */}
        <div className="mb-2">
          <span className="text-gray-600 text-sm flex items-center">
            <Building2 className="h-4 w-4 mr-1" />
            {job.company}
          </span>
        </div>

        {/* Location */}
        <div className="mb-2">
          <span className="text-gray-500 text-xs flex items-center">
            <MapPin className="h-3 w-3 mr-1" />
            {job.postal_code} {job.city}
          </span>
        </div>

        {/* Salary */}
        <div className="mb-2">
          <span className="text-gray-600 text-sm flex items-center">
            <Euro className="h-4 w-4 mr-1" />
            {job.salary}
          </span>
        </div>
        
        {/* Description */}
        <p className="text-sm text-gray-800 truncate-3 flex-grow mb-4">
          {job.description}
        </p>

        {/* Button always at bottom */}
        <Link 
          to="/jobs" 
          className="button w-full text-center transition-all duration-200 hover:shadow-lg mt-auto text-white"
          aria-label={`Voir l'offre : ${job.title}`}
        >
          Voir plus
        </Link>
      </div>
    </article>
  );
};

export default JobCard;