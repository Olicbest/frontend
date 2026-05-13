import React from 'react';
import { useAppContext } from '../context/AppContext';
import { useForm } from 'react-hook-form';

const inputClassName =
  'w-full rounded-2xl border border-app bg-white/80 px-4 py-3 text-sm text-app outline-none transition focus:border-brand-400';

const UserForm = ({ open, setOpen }) => {
  const { user, updateUserProfile } = useAppContext();
  const { register, handleSubmit } = useForm({
    defaultValues: { ...user },
  });

  const onSubmit = async (data) => {
    if (!updateUserProfile) {
      setOpen(false);
      return;
    }

    const updatedUser = { ...user, ...data };
    const result = await updateUserProfile(updatedUser);

    if (result.success) {
      setOpen(false);
    } else {
      console.error(result.error);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 px-4 py-6 backdrop-blur-sm">
      <div className="glass-card max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-[2rem] p-6 sm:p-8">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-brand-700">Profile</p>
            <h2 className="mt-2 font-display text-2xl font-semibold text-app sm:text-3xl">Edit your details</h2>
          </div>
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="rounded-full border border-app px-4 py-2 text-sm font-semibold text-app transition hover:border-brand-300 hover:text-brand-700"
          >
            Close
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-6 grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium text-app">First name</label>
            <input {...register('firstName')} placeholder="First Name" className={inputClassName} />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-app">Last name</label>
            <input {...register('lastName')} placeholder="Last Name" className={inputClassName} />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-app">Job title</label>
            <input {...register('jobTitle')} placeholder="Job Title" className={inputClassName} />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-app">Location</label>
            <input {...register('location')} placeholder="Location" className={inputClassName} />
          </div>
          <div className="sm:col-span-2">
            <label className="mb-2 block text-sm font-medium text-app">About</label>
            <textarea
              {...register('about')}
              placeholder="About"
              rows={5}
              className={`${inputClassName} resize-none`}
            />
          </div>
          <div className="sm:col-span-2 flex flex-col gap-3 pt-2 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="rounded-full border border-app px-5 py-3 text-sm font-semibold text-app transition hover:border-brand-300 hover:text-brand-700"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-700"
            >
              Save changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserForm;
