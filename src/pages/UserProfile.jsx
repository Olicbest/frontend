import { useRef, useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { HiLocationMarker } from 'react-icons/hi';
import { AiOutlineMail } from 'react-icons/ai';
import { FiPhoneCall } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import UserForm from '../components/UserForm';

const UserProfile = () => {
  const [open, setOpen] = useState(false);
  const [photoFeedback, setPhotoFeedback] = useState('');
  const { appliedJobs, uploadUserPhoto, user } = useAppContext();
  const photoInputRef = useRef(null);

  const handlePhotoChange = (event) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    const reader = new FileReader();
    reader.onload = async () => {
      const result = await uploadUserPhoto(reader.result);
      setPhotoFeedback(result.success ? 'Profile photo updated.' : result.error || 'Unable to upload photo.');
    };
    reader.readAsDataURL(file);
  };

  return (
    <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="glass-card rounded-[2rem] p-6 sm:p-8 lg:p-10">
        <div className="flex flex-col items-center text-center">
          <h1 className="font-display text-3xl font-semibold text-app sm:text-4xl">
            {user ? `${user.firstName} ${user.lastName}` : 'No User'}
          </h1>
          <h5 className="mt-2 text-sm font-bold uppercase tracking-[0.18em] text-brand-700">
            {user?.jobTitle || 'No Job Title'}
          </h5>

          <div className="mt-8 grid w-full gap-3 sm:grid-cols-2 xl:grid-cols-3">
            <p className="flex items-center justify-center gap-2 rounded-full border border-app bg-white/70 px-4 py-3 text-sm text-muted">
              <HiLocationMarker /> {user?.location || 'No Location'}
            </p>
            <p className="flex items-center justify-center gap-2 rounded-full border border-app bg-white/70 px-4 py-3 text-sm text-muted break-all">
              <AiOutlineMail /> {user?.email || 'No Email'}
            </p>
            <p className="flex items-center justify-center gap-2 rounded-full border border-app bg-white/70 px-4 py-3 text-sm text-muted">
              <FiPhoneCall /> {user?.phoneNumber || 'No Contact'}
            </p>
          </div>
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-start">
          <div className="order-1 rounded-[1.75rem] border border-app bg-white/70 p-5 shadow-soft">
            <div className="mx-auto aspect-square max-w-[240px] overflow-hidden rounded-[1.5rem] bg-brand-50">
              {user?.profilePicture ? (
                <img
                  src={user.profilePicture}
                  alt={user ? user.firstName : 'User'}
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              ) : (
                <div className="flex h-full items-center justify-center text-sm font-semibold uppercase tracking-[0.18em] text-brand-700">
                  No photo
                </div>
              )}
            </div>

            <div className="mt-5 flex flex-col gap-3">
              <button
                type="button"
                onClick={() => photoInputRef.current?.click()}
                className="w-full rounded-full border border-app bg-white py-3 text-sm font-semibold text-app transition hover:border-brand-300 hover:text-brand-700"
              >
                Upload Photo
              </button>
              <input
                ref={photoInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handlePhotoChange}
              />

              <button
                type="button"
                className="w-full rounded-full bg-slate-950 py-3 text-sm font-semibold text-white transition hover:bg-brand-700"
                onClick={() => setOpen(true)}
              >
                Edit Profile
              </button>
            </div>

            {photoFeedback ? <p className="mt-3 text-center text-sm text-brand-700">{photoFeedback}</p> : null}
          </div>

          <div className="order-2 rounded-[1.75rem] border border-app bg-white/70 p-6 shadow-soft">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-700">About</p>
            <p className="mt-4 text-sm leading-8 text-muted sm:text-base">
              {user?.about || 'No About Found'}
            </p>
          </div>
        </div>

        <div className="mt-8 rounded-[1.75rem] border border-app bg-white/70 p-6 shadow-soft">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-700">Applied jobs</p>
              <h2 className="mt-2 font-display text-2xl font-semibold text-app">Your recent applications</h2>
            </div>
            <div className="rounded-full bg-brand-50 px-4 py-2 text-sm font-semibold text-brand-700">
              {appliedJobs.length} applied
            </div>
          </div>

          {appliedJobs.length ? (
            <div className="mt-6 grid gap-4">
              {appliedJobs.map((application) => (
                <div key={application.id} className="rounded-[1.5rem] border border-app bg-white/70 p-4">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-app">{application.title}</h3>
                      <p className="mt-1 text-sm text-muted">{application.companyName}</p>
                      <p className="mt-2 text-xs uppercase tracking-[0.18em] text-slate-400">
                        {application.location} | {application.workMode}
                      </p>
                      {application.fullName || application.email || application.cvFileName ? (
                        <div className="mt-3 space-y-1 text-sm text-muted">
                          {application.fullName ? <p>Applicant: {application.fullName}</p> : null}
                          {application.email ? <p>Email: {application.email}</p> : null}
                          {application.cvFileName ? <p>CV: {application.cvFileName}</p> : null}
                        </div>
                      ) : null}
                    </div>
                    <div className="flex flex-col items-start gap-3 sm:items-end">
                      <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                        {application.status}
                      </span>
                      <Link
                        to={`/jobs/${application.jobId}`}
                        className="rounded-full bg-slate-950 px-4 py-2 text-sm font-semibold text-white transition hover:bg-brand-700"
                      >
                        View role
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="mt-6 text-sm leading-7 text-muted">
              You have not applied to any jobs yet. Open a role and use the apply button to see it here.
            </p>
          )}
        </div>
      </div>

      <UserForm open={open} setOpen={setOpen} />
    </section>
  );
};

export default UserProfile;
