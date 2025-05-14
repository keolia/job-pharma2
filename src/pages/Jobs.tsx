import React, { useState, useEffect } from 'react';
import { Upload, Search, MapPin, Briefcase, Building2, Euro, Clock, ChevronLeft, ChevronRight, Filter } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { useTranslation } from 'react-i18next';

interface JobOffer {
  id: string;
  title: string;
  company: string;
  location: string;
  contract_type: string;
  salary: string;
  schedule: string;
  description: string;
  requirements: string;
  benefits: string;
  created_at: string;
  status: string;
}

const Jobs: React.FC = () => {
  const [jobs, setJobs] = useState<JobOffer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { t } = useTranslation();
  const [selectedJob, setSelectedJob] = useState<JobOffer | null>(null);
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [coverLetter, setCoverLetter] = useState('');
  const [success, setSuccess] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [contractFilter, setContractFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const ITEMS_PER_PAGE = 20;

  useEffect(() => {
    fetchJobs();
  }, [currentPage, searchTerm, locationFilter, contractFilter]);

  const fetchJobs = async () => {
    try {
      setLoading(true);
      const start = (currentPage - 1) * ITEMS_PER_PAGE;
      const end = start + ITEMS_PER_PAGE - 1;

      let query = supabase
        .from('job_postings')
        .select('*', { count: 'exact' })
        .eq('status', 'active');

      // Appliquer les filtres
      if (searchTerm) {
        query = query.or(`title.ilike.%${searchTerm}%,company.ilike.%${searchTerm}%`);
      }
      if (locationFilter) {
        query = query.or(`city.ilike.%${locationFilter}%,postal_code.ilike.%${locationFilter}%`);
      }
      if (contractFilter) {
        query = query.eq('contract_type', contractFilter);
      }

      // Récupérer le nombre total
      const { count } = await query;
      
      // Récupérer les offres paginées
      const { data, error } = await query
        .order('created_at', { ascending: false })
        .range(start, end);

      if (error) throw error;
      
      setJobs(data || []);
      setTotalPages(Math.ceil((count || 0) / ITEMS_PER_PAGE));
    } catch (err) {
      console.error('Error fetching jobs:', err);
      setError(err instanceof Error ? err.message : 'Une erreur est survenue');
    } finally {
      setLoading(false);
    }
  };

  const handleApply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedJob || !cvFile) {
      setError('Veuillez joindre votre CV');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('jobId', selectedJob.id.toString());
      formData.append('cv', cvFile);
      if (coverLetter.trim()) {
        formData.append('coverLetter', coverLetter.trim());
      }

      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/handle-job-application`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
        },
        body: formData,
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Erreur lors de l\'envoi de la candidature');
      }

      setSuccess(true);
      setTimeout(() => {
        setSelectedJob(null);
        setSuccess(false);
        setCvFile(null);
        setCoverLetter('');
      }, 2000);
    } catch (error) {
      console.error('Error submitting application:', error);
      setError(error instanceof Error ? error.message : 'Une erreur est survenue');
    } finally {
      setLoading(false);
    }
  };

  const filteredJobs = jobs;

  return (
    <div className="max-w-5xl mx-auto px-4">
      <div className="bg-white rounded-xl p-6 shadow-md mb-8">
        <h1 className="text-2xl font-bold text-green-800 mb-6 flex items-center gap-2">
          <Briefcase className="h-6 w-6 text-green-500" />
          {t('jobs.title')}
        </h1>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Search className="h-5 w-5 text-green-500" />
              <input
                type="text"
                placeholder={t('jobs.searchPlaceholder')}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full p-2 border border-green-200 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-green-500" />
              <input
                type="text"
                placeholder={t('jobs.locationPlaceholder')}
                value={locationFilter}
                onChange={(e) => setLocationFilter(e.target.value)}
                className="w-full p-2 border border-green-200 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="h-5 w-5 text-green-500" />
              <select
                value={contractFilter}
                onChange={(e) => setContractFilter(e.target.value)}
                className="w-full p-2 border border-green-200 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="">{t('jobs.allContracts')}</option>
                <option value="CDI">CDI</option>
                <option value="CDD">CDD</option>
                <option value="Intérim">Intérim</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-8">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-green-500 border-r-transparent"></div>
        </div>
      ) : error ? (
        <div className="bg-red-100 text-red-700 p-4 rounded-lg text-center">
          {error}
        </div>
      ) : filteredJobs.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          {t('jobs.noResults')}
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {filteredJobs.map(job => (
            <div key={job.id} className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
                    {job.contract_type}
                  </span>
                </div>
                <span className="text-sm text-gray-500">
                  {format(new Date(job.created_at), 'dd/MM/yyyy')}
                </span>
              </div>
              
              <h2 className="text-xl font-semibold text-green-800 mb-2">{job.title}</h2>
              
              <div className="space-y-2 mb-4">
                <p className="flex items-center text-gray-600">
                  <Building2 className="h-4 w-4 mr-2" />
                  {job.company}
                </p>
                <p className="flex items-center text-gray-600">
                  <MapPin className="h-4 w-4 mr-2" />
                  {`${job.postal_code} ${job.city}`}
                </p>
                <p className="flex items-center text-gray-600">
                  <Euro className="h-4 w-4 mr-2" />
                  {job.salary}
                </p>
                <p className="flex items-center text-gray-600">
                  <Clock className="h-4 w-4 mr-2" />
                  {job.schedule}
                </p>
              </div>

              <button
                onClick={() => setSelectedJob(job)}
                className="button w-full text-white"
              >
                {t('jobs.apply')}
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-4 mt-8 mb-8">
          <button
            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
            className="p-2 rounded-full hover:bg-green-50 disabled:opacity-50 disabled:hover:bg-transparent"
          >
            <ChevronLeft className="h-6 w-6 text-green-600" />
          </button>
          
          <div className="flex items-center gap-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1)
              .filter(page => {
                const distance = Math.abs(page - currentPage);
                return distance === 0 || distance === 1 || page === 1 || page === totalPages;
              })
              .map((page, index, array) => (
                <React.Fragment key={page}>
                  {index > 0 && array[index - 1] !== page - 1 && (
                    <span className="text-gray-400">...</span>
                  )}
                  <button
                    onClick={() => setCurrentPage(page)}
                    className={`w-8 h-8 rounded-full ${
                      currentPage === page
                        ? 'bg-green-500 text-white'
                        : 'text-gray-600 hover:bg-green-50'
                    }`}
                  >
                    {page}
                  </button>
                </React.Fragment>
              ))}
          </div>

          <button
            onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
            disabled={currentPage === totalPages}
            className="p-2 rounded-full hover:bg-green-50 disabled:opacity-50 disabled:hover:bg-transparent"
          >
            <ChevronRight className="h-6 w-6 text-green-600" />
          </button>
        </div>
      )}

      {/* Modal de candidature */}
      {selectedJob && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6">
            {success ? (
              <div className="text-center py-8">
                <div className="text-green-500 text-xl mb-4">✓</div>
                <h3 className="text-xl font-semibold mb-2">{t('jobs.applicationSent')}</h3>
                <p className="text-gray-600">{t('jobs.applicationConfirmation')}</p>
              </div>
            ) : (
              <>
                <div className="flex justify-between items-start mb-6">
                  <h2 className="text-xl font-semibold text-green-800">{selectedJob.title}</h2>
                  <button
                    onClick={() => setSelectedJob(null)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    ✕
                  </button>
                </div>

                <div className="mb-6">
                  <h3 className="font-semibold mb-2">{t('jobs.description')}</h3>
                  <p className="text-gray-600 whitespace-pre-line mb-4">{selectedJob.description}</p>

                  <h3 className="font-semibold mb-2">{t('jobs.requirements')}</h3>
                  <p className="text-gray-600 whitespace-pre-line mb-4">{selectedJob.requirements}</p>

                  <h3 className="font-semibold mb-2">{t('jobs.benefits')}</h3>
                  <p className="text-gray-600 whitespace-pre-line mb-4">{selectedJob.benefits}</p>
                </div>

                <form onSubmit={handleApply} className="space-y-4">
                  {error && (
                    <div className="p-3 bg-red-100 text-red-700 rounded-lg">
                      {error}
                    </div>
                  )}

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {t('jobs.cv')}
                    </label>
                    <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-green-200 border-dashed rounded-lg cursor-pointer bg-green-50 hover:bg-green-100 transition-colors">
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <Upload className="h-8 w-8 text-green-500 mb-2" />
                        <p className="mb-2 text-sm text-green-600">
                          {cvFile ? cvFile.name : t('jobs.uploadCV')}
                        </p>
                      </div>
                      <input
                        type="file"
                        className="hidden"
                        accept=".pdf,.doc,.docx"
                        onChange={(e) => e.target.files && setCvFile(e.target.files[0])}
                        required
                      />
                    </label>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {t('jobs.coverLetter')}
                    </label>
                    <textarea
                      value={coverLetter}
                      onChange={(e) => setCoverLetter(e.target.value)}
                      className="w-full h-32 p-2 border border-green-200 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                      placeholder={t('jobs.coverLetterPlaceholder')}
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full button py-2 flex items-center justify-center text-white"
                    disabled={loading}
                  >
                    {loading ? (
                      <span className="inline-block animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></span>
                    ) : (
                      t('jobs.submit')
                    )}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Jobs;