import React, { useState, useEffect } from 'react';
import { Briefcase, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { supabase } from '../lib/supabase';
import JobCard from './JobCard';

interface JobOffer {
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

const OffersPreview: React.FC = () => {
  const [jobs, setJobs] = useState<JobOffer[]>([]);
  const { t } = useTranslation();
  const [scrollX, setScrollX] = useState(0);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchLatestJobs();

    const subscription = supabase
      .channel('latest_jobs')
      .on('postgres_changes', 
        { 
          event: '*', 
          schema: 'public', 
          table: 'job_postings',
          filter: 'status=eq.active'
        }, 
        () => {
          fetchLatestJobs();
        }
      )
      .subscribe();

    // Animation setup
    let animationFrameId: number;
    const SCROLL_SPEED = 1;

    const animate = () => {
      if (!containerRef.current) return;
      
      setScrollX(prev => {
        const newScrollX = prev + SCROLL_SPEED;
        const container = containerRef.current;
        
        if (container) {
          const firstItem = container.firstElementChild as HTMLElement;
          if (firstItem && newScrollX >= firstItem.offsetWidth) {
            // Clone and append the first item
            const clone = firstItem.cloneNode(true) as HTMLElement;
            container.appendChild(clone);
            
            // Only remove the first item if it's still a child of the container
            if (container.contains(firstItem)) {
              container.removeChild(firstItem);
            }
            
            return 0;
          }
        }
        
        return newScrollX;
      });
      
      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      subscription.unsubscribe();
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, []);

  const fetchLatestJobs = async () => {
    try {
      setError(null);
      const { data, error: supabaseError } = await supabase
        .from('job_postings')
        .select('*')
        .eq('status', 'active')
        .order('created_at', { ascending: false })
        .limit(4);

      if (supabaseError) {
        throw supabaseError;
      }

      if (data) {
        setJobs(data);
      }
    } catch (error) {
      console.error('Error fetching latest jobs:', error);
      setError('Failed to load latest jobs. Please try again later.');
    }
  };

  if (error) {
    return (
      <section className="max-w-5xl mx-auto px-4 mt-8 mb-8">
        <div className="text-red-600 p-4 rounded-lg bg-red-50">
          {error}
        </div>
      </section>
    );
  }

  return (
    <section className="max-w-5xl mx-auto px-4 mt-8 mb-8" id="last-offers">
      <h2 className="font-bold text-xl sm:text-2xl text-green-900 mb-6 flex items-center gap-x-2">
        <Briefcase className="h-5 w-5 text-green-400" />
        Dernières offres diffusées
      </h2>

      <div className="relative overflow-hidden">
        <div 
          ref={containerRef}
          className="flex"
          style={{
            transform: `translateX(-${scrollX}px)`,
            transition: 'none'
          }}
        >
          {jobs.map((job) => (
            <div
              key={job.id}
              className="w-full md:w-1/2 lg:w-1/4 flex-shrink-0 px-2"
            >
              <JobCard job={job} />
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 text-center">
        <Link to="/jobs" className="inline-block button text-base px-6 transition-transform hover:scale-105">
          {t('jobs.viewAll')}
          <ArrowRight className="h-4 w-4 ml-2 inline" />
        </Link>
      </div>
    </section>
  );
};

export default React.memo(OffersPreview);