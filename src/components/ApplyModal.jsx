import { useEffect, useState } from 'react';
import { useAppContext } from '../context/AppContext';

const inputClassName =
  'w-full rounded-2xl border border-app bg-white/80 px-4 py-3 text-sm text-app outline-none transition focus:border-brand-400';

const ApplyModal = ({ job, open, onClose }) => {
  const { applyToJob, user } = useAppContext();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    cvFileName: '',
    cvFileData: '',
  });
  const [feedback, setFeedback] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (open) {
      setFormData({
        fullName: `${user?.firstName || ''} ${user?.lastName || ''}`.trim(),
        email: user?.email || '',
        cvFileName: '',
        cvFileData: '',
      });
      setFeedback('');
      setSubmitting(false);
    }
  }, [open, user]);

  if (!open || !job) {
    return null;
  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setFormData((current) => ({
        ...current,
        cvFileName: file.name,
        cvFileData: reader.result,
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!formData.cvFileName) {
      setFeedback('Please upload your CV before submitting.');
      return;
    }

    setSubmitting(true);
    setFeedback('');

    const result = await applyToJob(job, formData);

    if (result.success) {
      setFeedback('Application submitted successfully.');
      setTimeout(() => {
        onClose();
      }, 700);
    } else {
      setFeedback(result.error || 'Unable to submit your application.');
    }

    setSubmitting(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/45 px-4 py-6 backdrop-blur-sm">
      <div className="glass-card max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-[2rem] p-6 sm:p-8">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-brand-700">Apply</p>
            <h2 className="mt-2 font-display text-2xl font-semibold text-app">Apply for {job.title}</h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-app px-4 py-2 text-sm font-semibold text-app transition hover:border-brand-300 hover:text-brand-700"
          >
            Close
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-6 grid gap-4">
          <div>
            <label className="mb-2 block text-sm font-medium text-app">Full name</label>
            <input
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Enter your full name"
              className={inputClassName}
              required
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-app">Email address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className={inputClassName}
              required
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-app">Upload CV</label>
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={handleFileChange}
              className={`${inputClassName} file:mr-4 file:rounded-full file:border-0 file:bg-brand-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-brand-700`}
              required
            />
            {formData.cvFileName ? <p className="mt-2 text-sm text-muted">{formData.cvFileName}</p> : null}
          </div>

          {feedback ? <p className="rounded-2xl bg-brand-50 px-4 py-3 text-sm text-brand-700">{feedback}</p> : null}

          <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={onClose}
              className="rounded-full border border-app px-5 py-3 text-sm font-semibold text-app transition hover:border-brand-300 hover:text-brand-700"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {submitting ? 'Submitting...' : 'Submit application'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ApplyModal;
