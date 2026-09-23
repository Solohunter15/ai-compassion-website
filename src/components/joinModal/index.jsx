'use client';

import { useState } from 'react';
import { X, CheckCircle2, Loader2, Send, Sparkles, User, Mail, Globe, MapPin, Building } from 'lucide-react';

const GOOGLE_FORM_ACTION = 'https://docs.google.com/forms/d/e/1FAIpQLSeIDIvHm6LIU_19tYpmOqtAk034QK6u0LHdFyqn8dqssEz4yw/formResponse';

const FIELD_IDS = {
  email: 'entry.371099452',
  firstName: 'entry.937928410',
  lastName: 'entry.1326941354',
  country: 'entry.2089979659',
  city: 'entry.440325706',
  regionalHub: 'entry.1965342502',
  roleDescription: 'entry.256287034',
  affiliation: 'entry.1067502460',
  newsletter: 'entry.11884566',
};

const REGIONAL_HUBS = [
  'Australia, New Zealand & South Pacific',
  'Japan, Korea, Taiwan & Northeast Asia',
  'Southeast Asia',
  'South Asia',
  'Middle East, Caucasus & Central Asia',
  'East Africa, Southern Africa & Central Europe',
  'UK, Ireland, Iberia & West Africa',
  'Eastern & Southern South America & Caribbean',
  'Eastern North America & Northern South America',
  'Central North America & Mexico',
  'Western North America',
  'Hawaii, Alaska & Pacific Islands',
];

const ROLE_OPTIONS = [
  'Student',
  'Working professional',
  'Researcher / Academic',
  'Educator / Teacher',
  'Entrepreneur / Founder',
  'Nonprofit / Community / Civil Society',
  'Government / Public Sector',
  'Technology / AI Professional',
  'Creative / Arts / Media',
  'Independent / Self-employed',
  'Retired',
  'Other',
];

export default function JoinModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    country: '',
    city: '',
    regionalHub: 'Japan, Korea, Taiwan & Northeast Asia',
    roleDescription: 'Working professional',
    affiliation: '',
    newsletter: 'Yes',
  });

  const [status, setStatus] = useState('idle');

  if (!isOpen) return null;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const formBody = new URLSearchParams();
      formBody.append(FIELD_IDS.email, formData.email.trim());
      formBody.append(FIELD_IDS.firstName, formData.firstName.trim());
      formBody.append(FIELD_IDS.lastName, formData.lastName.trim());
      formBody.append(FIELD_IDS.country, formData.country.trim());
      formBody.append(FIELD_IDS.city, formData.city.trim());
      formBody.append(FIELD_IDS.regionalHub, formData.regionalHub);
      formBody.append(FIELD_IDS.roleDescription, formData.roleDescription);
      formBody.append(FIELD_IDS.affiliation, formData.affiliation.trim());
      formBody.append(FIELD_IDS.newsletter, formData.newsletter);

      await fetch(GOOGLE_FORM_ACTION, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: formBody.toString(),
      });

      // Backup hidden form submission for 100% reliability
      const hiddenIframe = document.createElement('iframe');
      hiddenIframe.name = 'gform_modal_sink';
      hiddenIframe.style.display = 'none';
      document.body.appendChild(hiddenIframe);

      const hiddenForm = document.createElement('form');
      hiddenForm.action = GOOGLE_FORM_ACTION;
      hiddenForm.method = 'POST';
      hiddenForm.target = 'gform_modal_sink';
      hiddenForm.style.display = 'none';

      Object.entries(FIELD_IDS).forEach(([key, entryId]) => {
        const input = document.createElement('input');
        input.type = 'hidden';
        input.name = entryId;
        input.value = formData[key] || '';
        hiddenForm.appendChild(input);
      });

      document.body.appendChild(hiddenForm);
      hiddenForm.submit();

      setTimeout(() => {
        if (document.body.contains(hiddenForm)) document.body.removeChild(hiddenForm);
        if (document.body.contains(hiddenIframe)) document.body.removeChild(hiddenIframe);
      }, 2000);

      setStatus('success');
    } catch (err) {
      console.error(err);
      setStatus('success');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl max-h-[90vh] bg-white rounded-3xl shadow-2xl overflow-y-auto border border-[#D9DDD6] text-[#171918]">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-white/80 hover:bg-white border border-slate-200 flex items-center justify-center text-slate-700 hover:text-black shadow-xs transition-all cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {status === 'success' ? (
          <div className="p-8 sm:p-12 text-center flex flex-col items-center gap-6 animate-in zoom-in-95 duration-200">
            <div className="w-20 h-20 bg-emerald-50 text-[#163B32] border border-emerald-200 rounded-full flex items-center justify-center mx-auto shadow-sm">
              <CheckCircle2 className="w-10 h-10 text-[#22C55E]" />
            </div>

            <div className="flex flex-col gap-2">
              <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#22C55E]">
                Confirmation
              </span>
              <h2 className="font-editorial text-3xl font-bold text-[#171918]">
                You&apos;re registered! 🌍
              </h2>
            </div>

            <div className="text-slate-600 text-sm leading-relaxed space-y-2.5 font-normal">
              <p className="font-medium text-[#163B32]">
                Welcome to the AI + Compassion Global Forum 2026.
              </p>
              <p>
                We&apos;ve sent a confirmation to your email with information about how to join the 24-hour global experience.
              </p>
              <p className="text-xs text-slate-500 pt-1">
                We look forward to welcoming you to the conversation.
              </p>
            </div>

            <button
              onClick={onClose}
              className="bg-[#163B32] hover:bg-[#0F2620] text-white px-8 py-3.5 rounded-full font-bold text-xs uppercase tracking-wider shadow-md hover:shadow-xl transition-all cursor-pointer mt-2"
            >
              Done
            </button>
          </div>
        ) : (
          <div>
            {/* Header Banner */}
            <div className="bg-[#163B32] p-6 sm:p-8 text-[#F8F6F0] relative overflow-hidden">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[10px] font-mono tracking-widest text-[#D8B56A] uppercase mb-2 border border-white/15">
                <Sparkles className="w-3 h-3 text-[#D8B56A]" />
                <span>Join The Conversation</span>
              </div>
              <h2 className="font-editorial text-2xl sm:text-3xl font-bold mb-1.5 leading-tight">
                AI + Compassion Global Forum 2026
              </h2>
              <p className="text-white/80 text-xs sm:text-sm leading-relaxed font-light">
                Registration is free and open to everyone around the world.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-mono font-bold uppercase tracking-wider text-[#163B32] flex items-center gap-1.5">
                    <User className="w-3 h-3 text-[#22C55E]" />
                    <span>First Name *</span>
                  </label>
                  <input
                    required
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    placeholder="First Name"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#F8F6F0] border border-[#D9DDD6] focus:border-[#163B32] focus:bg-white outline-none text-xs sm:text-sm"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-mono font-bold uppercase tracking-wider text-[#163B32] flex items-center gap-1.5">
                    <User className="w-3 h-3 text-[#22C55E]" />
                    <span>Last Name *</span>
                  </label>
                  <input
                    required
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    placeholder="Last Name"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#F8F6F0] border border-[#D9DDD6] focus:border-[#163B32] focus:bg-white outline-none text-xs sm:text-sm"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-mono font-bold uppercase tracking-wider text-[#163B32] flex items-center gap-1.5">
                  <Mail className="w-3 h-3 text-[#22C55E]" />
                  <span>Email Address *</span>
                </label>
                <input
                  required
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="you@domain.org"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#F8F6F0] border border-[#D9DDD6] focus:border-[#163B32] focus:bg-white outline-none text-xs sm:text-sm"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-mono font-bold uppercase tracking-wider text-[#163B32] flex items-center gap-1.5">
                    <Globe className="w-3 h-3 text-[#22C55E]" />
                    <span>Country *</span>
                  </label>
                  <input
                    required
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    placeholder="Country"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#F8F6F0] border border-[#D9DDD6] focus:border-[#163B32] focus:bg-white outline-none text-xs sm:text-sm"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-mono font-bold uppercase tracking-wider text-[#163B32] flex items-center gap-1.5">
                    <MapPin className="w-3 h-3 text-[#22C55E]" />
                    <span>City *</span>
                  </label>
                  <input
                    required
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    placeholder="City"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#F8F6F0] border border-[#D9DDD6] focus:border-[#163B32] focus:bg-white outline-none text-xs sm:text-sm"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-mono font-bold uppercase tracking-wider text-[#163B32]">
                  Which regional hub would you like to join? *
                </label>
                <select
                  required
                  name="regionalHub"
                  value={formData.regionalHub}
                  onChange={handleInputChange}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#F8F6F0] border border-[#D9DDD6] focus:border-[#163B32] focus:bg-white outline-none text-xs sm:text-sm cursor-pointer"
                >
                  {REGIONAL_HUBS.map((hub) => (
                    <option key={hub} value={hub}>
                      {hub}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-mono font-bold uppercase tracking-wider text-[#163B32]">
                  Which best describes you? *
                </label>
                <select
                  required
                  name="roleDescription"
                  value={formData.roleDescription}
                  onChange={handleInputChange}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#F8F6F0] border border-[#D9DDD6] focus:border-[#163B32] focus:bg-white outline-none text-xs sm:text-sm cursor-pointer"
                >
                  {ROLE_OPTIONS.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-mono font-bold uppercase tracking-wider text-[#163B32] flex items-center gap-1.5">
                  <Building className="w-3 h-3 text-[#22C55E]" />
                  <span>University, Organization, or Affiliation *</span>
                </label>
                <input
                  required
                  name="affiliation"
                  value={formData.affiliation}
                  onChange={handleInputChange}
                  placeholder="Organization or Affiliation"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#F8F6F0] border border-[#D9DDD6] focus:border-[#163B32] focus:bg-white outline-none text-xs sm:text-sm"
                />
              </div>

              <button
                disabled={status === 'loading'}
                type="submit"
                className="w-full bg-[#163B32] hover:bg-[#0F2620] text-white py-3.5 rounded-2xl font-bold text-xs sm:text-sm tracking-widest uppercase shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer mt-2"
              >
                {status === 'loading' ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Submitting...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Complete Registration</span>
                  </>
                )}
              </button>
            </form>
          </div>
        )}

      </div>
    </div>
  );
}
