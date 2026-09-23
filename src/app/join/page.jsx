"use client";

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, CheckCircle2, Loader2, Send } from 'lucide-react';

const GOOGLE_FORM_ACTION = process.env.NEXT_PUBLIC_GOOGLE_FORM_ACTION;

const FIELD_IDS = {
  email: "entry.371099452",
  firstName: "entry.937928410",
  lastName: "entry.1326941354",
  country: "entry.2089979659",
  city: "entry.440325706",
  organization: "entry.1965342502",
  role: "entry.256287034",
  interests: "entry.1067502460",
  otherInterestText: "entry.1067502460.other_option_response",
  newsletter: "entry.11884566",
};

const INTERESTS_OPTIONS = [
  "AI Ethics", "AI Design", "AI Research", "AI Education",
  "AI Public Policy", "AI Innovation", "AI Startups", "AI Investment"
];

export default function JoinPage() {
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    country: '',
    city: '',
    organization: '',
    role: '',
    interests: [],
    otherInterest: '',
    hasOther: false,
    newsletter: 'Yes',
  });

  const [status, setStatus] = useState('idle'); // idle, loading, success, error

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (interest) => {
    setFormData(prev => {
      const newInterests = prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest];
      return { ...prev, interests: newInterests };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const params = new URLSearchParams();
      params.append(FIELD_IDS.firstName, formData.firstName);
      params.append(FIELD_IDS.lastName, formData.lastName);
      params.append(FIELD_IDS.email, formData.email);
      params.append(FIELD_IDS.country, formData.country);
      params.append(FIELD_IDS.city, formData.city);
      params.append(FIELD_IDS.organization, formData.organization);
      params.append(FIELD_IDS.role, formData.role);
      formData.interests.forEach(interest => {
        params.append(FIELD_IDS.interests, interest);
      });
      if (formData.hasOther && formData.otherInterest) {
        params.append(FIELD_IDS.interests, '__other_option__');
        params.append(FIELD_IDS.otherInterestText, formData.otherInterest);
      }
      params.append(FIELD_IDS.newsletter, formData.newsletter);

      await fetch(GOOGLE_FORM_ACTION, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: params.toString(),
      });

      setStatus('success');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) {
      console.error('Submission error:', error);
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="min-h-screen bg-[#F8F6F0] flex items-center justify-center pt-32 pb-16 px-6">
        <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl p-8 text-center border border-[#D9DDD6]">
          <div className="w-16 h-16 bg-[#163B32]/10 rounded-full flex items-center justify-center mx-auto mb-6 text-[#163B32]">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h1 className="font-editorial text-3xl font-bold text-[#171918] mb-4">Registration Complete!</h1>
          <p className="text-[#5E625D] mb-8 leading-relaxed text-sm">
            Be part of the global movement building AI that elevates humanity and honors all life. Your voice matters in creating the AI we need.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-[#163B32] text-[#F8F6F0] px-8 py-3.5 rounded-full font-bold text-xs uppercase tracking-wider hover:bg-[#0F2620] transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8F6F0] pt-32 pb-20 px-4 sm:px-6 flex flex-col items-center">
      <div className="max-w-3xl w-full flex flex-col items-center">
        <div className="w-full bg-white rounded-3xl shadow-2xl overflow-hidden border border-[#D9DDD6]">
          {/* Header Banner */}
          <div className="bg-[#163B32] p-8 md:p-12 text-[#F8F6F0] relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#C96F4A] opacity-15 rounded-full -mr-32 -mt-32 blur-3xl" />
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[11px] font-mono tracking-widest text-[#D8B56A] uppercase mb-3">
              Registration Form
            </div>
            <h1 className="font-editorial text-3xl md:text-4xl font-bold mb-3 relative z-10">AI+Compassion Global Forum 2026</h1>
            <p className="text-white/80 text-base max-w-2xl relative z-10">
              Join the global movement building AI that elevates humanity and honors all life.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="p-8 md:p-12 space-y-8">
            {/* Basic Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-[#171918]">First Name *</label>
                <input
                  required
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  placeholder="Your first name"
                  className="w-full px-5 py-3.5 rounded-2xl bg-[#F8F6F0] border border-[#D9DDD6] focus:border-[#163B32] focus:bg-white outline-none transition-all placeholder:text-gray-400 text-sm"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-[#171918]">Last Name *</label>
                <input
                  required
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  placeholder="Your last name"
                  className="w-full px-5 py-3.5 rounded-2xl bg-[#F8F6F0] border border-[#D9DDD6] focus:border-[#163B32] focus:bg-white outline-none transition-all placeholder:text-gray-400 text-sm"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-[#171918]">Email Address *</label>
              <input
                required
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="you@example.com"
                className="w-full px-5 py-3.5 rounded-2xl bg-[#F8F6F0] border border-[#D9DDD6] focus:border-[#163B32] focus:bg-white outline-none transition-all placeholder:text-gray-400 text-sm"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-[#171918]">Country *</label>
                <input
                  required
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                  placeholder="Where are you located?"
                  className="w-full px-5 py-3.5 rounded-2xl bg-[#F8F6F0] border border-[#D9DDD6] focus:border-[#163B32] focus:bg-white outline-none transition-all placeholder:text-gray-400 text-sm"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-[#171918]">City *</label>
                <input
                  required
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  placeholder="Your city"
                  className="w-full px-5 py-3.5 rounded-2xl bg-[#F8F6F0] border border-[#D9DDD6] focus:border-[#163B32] focus:bg-white outline-none transition-all placeholder:text-gray-400 text-sm"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-[#171918]">Organization</label>
                <input
                  name="organization"
                  value={formData.organization}
                  onChange={handleInputChange}
                  placeholder="Company or Institution"
                  className="w-full px-5 py-3.5 rounded-2xl bg-[#F8F6F0] border border-[#D9DDD6] focus:border-[#163B32] focus:bg-white outline-none transition-all placeholder:text-gray-400 text-sm"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-[#171918]">Role / Expertise</label>
                <input
                  name="role"
                  value={formData.role}
                  onChange={handleInputChange}
                  placeholder="e.g. Researcher, Designer, Founder"
                  className="w-full px-5 py-3.5 rounded-2xl bg-[#F8F6F0] border border-[#D9DDD6] focus:border-[#163B32] focus:bg-white outline-none transition-all placeholder:text-gray-400 text-sm"
                />
              </div>
            </div>

            {/* Checkboxes */}
            <div className="space-y-4">
              <label className="text-xs font-bold uppercase tracking-wider text-[#171918]">Areas of Interest * (Select all that apply)</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {INTERESTS_OPTIONS.map((interest) => (
                  <button
                    key={interest}
                    type="button"
                    onClick={() => handleCheckboxChange(interest)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-2xl border transition-all text-xs font-semibold uppercase tracking-wider ${
                      formData.interests.includes(interest)
                        ? 'bg-[#163B32] border-[#163B32] text-white'
                        : 'bg-[#F8F6F0] border-[#D9DDD6] text-[#171918] hover:bg-gray-100'
                    }`}
                  >
                    <div className={`w-4 h-4 rounded flex items-center justify-center border ${formData.interests.includes(interest) ? 'border-white bg-white/20' : 'border-gray-300'}`}>
                      {formData.interests.includes(interest) && <div className="w-2 h-2 bg-white rounded-sm" />}
                    </div>
                    {interest}
                  </button>
                ))}
                <button
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, hasOther: !prev.hasOther }))}
                  className={`flex items-center gap-3 px-4 py-3 rounded-2xl border transition-all text-xs font-semibold uppercase tracking-wider ${
                    formData.hasOther
                      ? 'bg-[#163B32] border-[#163B32] text-white'
                      : 'bg-[#F8F6F0] border-[#D9DDD6] text-[#171918] hover:bg-gray-100'
                  }`}
                >
                  <div className={`w-4 h-4 rounded flex items-center justify-center border ${formData.hasOther ? 'border-white bg-white/20' : 'border-gray-300'}`}>
                    {formData.hasOther && <div className="w-2 h-2 bg-white rounded-sm" />}
                  </div>
                  Other
                </button>
              </div>

              {formData.hasOther && (
                <div className="pt-2">
                  <input
                    name="otherInterest"
                    value={formData.otherInterest}
                    onChange={handleInputChange}
                    placeholder="Please specify other interest"
                    className="w-full px-5 py-3 rounded-2xl bg-[#F8F6F0] border border-[#D9DDD6] focus:border-[#163B32] focus:bg-white outline-none transition-all text-sm"
                  />
                </div>
              )}
            </div>

            {/* Radio */}
            <div className="space-y-4">
              <label className="text-xs font-bold uppercase tracking-wider text-[#171918]">Subscribe to our newsletter? *</label>
              <div className="flex gap-4">
                {['Yes', 'No'].map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, newsletter: option }))}
                    className={`flex items-center gap-3 px-6 py-3 rounded-2xl border transition-all text-sm font-semibold ${
                      formData.newsletter === option
                        ? 'bg-[#163B32] border-[#163B32] text-white'
                        : 'bg-[#F8F6F0] border-[#D9DDD6] text-[#171918] hover:bg-gray-100'
                    }`}
                  >
                    <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${formData.newsletter === option ? 'border-white' : 'border-gray-400'}`}>
                      {formData.newsletter === option && <div className="w-2 h-2 bg-white rounded-full" />}
                    </div>
                    {option}
                  </button>
                ))}
              </div>
            </div>

            {/* Error message */}
            {status === 'error' && (
              <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-2xl text-sm">
                Oops! Something went wrong while submitting the form. Please try again or contact us directly at connect@compassionai.io.
              </div>
            )}

            {/* Submit Button */}
            <button
              disabled={status === 'loading'}
              type="submit"
              className="w-full bg-[#163B32] text-[#F8F6F0] py-4 rounded-2xl font-bold text-sm tracking-widest uppercase hover:bg-[#0F2620] transition-all transform hover:scale-[1.005] active:scale-[0.99] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-3 shadow-lg mt-4"
            >
              {status === 'loading' ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  Submit Registration
                </>
              )}
            </button>

            <p className="text-center text-xs text-[#5E625D]">
              By submitting this form, you agree to our Terms and Conditions regarding data privacy.
            </p>
          </form>
        </div>

        <Link
          href="/"
          className="mt-8 flex items-center gap-2 text-[#5E625D] hover:text-[#163B32] transition-all group px-6 py-3 rounded-full hover:bg-black/5"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span className="font-semibold text-sm">Back to Home</span>
        </Link>
      </div>
    </div>
  );
}
