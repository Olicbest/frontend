import { useState } from 'react';
import { HiLocationMarker } from 'react-icons/hi';
import { AiOutlineMail } from 'react-icons/ai';
import { FiPhoneCall } from 'react-icons/fi';
import UserForm from '../components/UserForm';

const UserProfilee = () => {
  const [open, setOpen] = useState(false);

  return (
    <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="glass-card rounded-[2rem] p-6 sm:p-8 lg:p-10">
        <div className="flex flex-col items-center text-center">
          <h1 className="font-display text-3xl font-semibold text-app sm:text-4xl">James Wagonner</h1>
          <h5 className="mt-2 text-sm font-bold uppercase tracking-[0.18em] text-brand-700">Software Engineer</h5>

          <div className="mt-8 grid w-full gap-3 sm:grid-cols-2 xl:grid-cols-3">
            <p className="flex items-center justify-center gap-2 rounded-full border border-app bg-white/70 px-4 py-3 text-sm text-muted">
              <HiLocationMarker /> No Location
            </p>
            <p className="flex items-center justify-center gap-2 rounded-full border border-app bg-white/70 px-4 py-3 text-sm text-muted">
              <AiOutlineMail /> No Email
            </p>
            <p className="flex items-center justify-center gap-2 rounded-full border border-app bg-white/70 px-4 py-3 text-sm text-muted">
              <FiPhoneCall /> No Contact
            </p>
          </div>
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-start">
          <div className="rounded-[1.75rem] border border-app bg-white/70 p-5 shadow-soft">
            <div className="mx-auto aspect-square max-w-[240px] overflow-hidden rounded-[1.5rem] bg-brand-50">
              <div className="flex h-full items-center justify-center text-sm font-semibold uppercase tracking-[0.18em] text-brand-700">
                No photo
              </div>
            </div>

            <button
              className="mt-5 w-full rounded-full bg-slate-950 py-3 text-sm font-semibold text-white transition hover:bg-brand-700"
              onClick={() => setOpen(true)}
            >
              Edit Profile
            </button>
          </div>

          <div className="rounded-[1.75rem] border border-app bg-white/70 p-6 shadow-soft">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-700">About</p>
            <p className="mt-4 text-sm leading-8 text-muted sm:text-base">No About Found</p>
          </div>
        </div>
      </div>

      <UserForm open={open} setOpen={setOpen} />
    </section>
  );
};

export default UserProfilee;
