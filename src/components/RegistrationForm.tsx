import React, { useState } from 'react';
import { 
  User, 
  Mail, 
  Building2, 
  Phone, 
  HelpCircle, 
  Users, 
  Globe2, 
  Target, 
  Sparkles, 
  AlertCircle, 
  Loader2,
  Check,
  ChevronDown
} from 'lucide-react';
import { RegistrationFormData, FormErrors, SubmissionStatus } from '../types';
import { ALL_COUNTRIES, AFRICAN_COUNTRIES } from '../data/countries';
import { BUSINESS_CATEGORIES } from '../data/businessCategories';
import { SuccessMessage } from './SuccessMessage';
import { WhatsAppModal } from './WhatsAppModal';

const GOOGLE_APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxb93eG4uWJg-5knVhpARkn3AC0Erd8LESx5hi-YwrHcOJDNmur9tAXMPiu5Y4IZ3fH/exec";
const LOCAL_STORAGE_REGISTRATIONS_KEY = "beyond_chatbots_registrations";

interface RegistrationFormProps {
  onSuccess?: () => void;
  isModal?: boolean;
}

export const RegistrationForm: React.FC<RegistrationFormProps> = ({ onSuccess, isModal = false }) => {
  const initialFormData: RegistrationFormData = {
    name: '',
    email: '',
    businessCategory: '',
    phoneNumber: '',
    problemsToSolve: '',
    workSetup: '',
    nationality: 'Nigeria', // convenient default from African region
    expectations: '',
  };

  const [formData, setFormData] = useState<RegistrationFormData>(initialFormData);
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<SubmissionStatus>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [showWhatsAppModal, setShowWhatsAppModal] = useState<boolean>(false);

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    // 1. NAME
    if (!formData.name.trim()) {
      newErrors.name = 'Please enter your full name.';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters.';
    }

    // 2. EMAIL ADDRESS
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Please enter your email address.';
    } else if (!emailRegex.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email address (e.g., name@company.com).';
    }

    // 3. CATEGORY OF BUSINESS
    if (!formData.businessCategory) {
      newErrors.businessCategory = 'Please select your category of business.';
    }

    // 4. PHONE NUMBER
    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = 'Please enter your phone number.';
    } else if (formData.phoneNumber.trim().length < 7) {
      newErrors.phoneNumber = 'Please enter a valid phone number with country code.';
    }

    // 5. PROBLEMS YOU WANT TO SOLVE WITH AI BEYOND THE REGULAR CHATBOTS
    if (!formData.problemsToSolve.trim()) {
      newErrors.problemsToSolve = 'Please describe what problems you want to solve.';
    }

    // 6. DO YOU WORK ALONE OR WITH A TEAM
    if (!formData.workSetup) {
      newErrors.workSetup = 'Please select whether you work alone or with a team.';
    }

    // 7. NATIONALITY
    if (!formData.nationality) {
      newErrors.nationality = 'Please select your nationality.';
    }

    // 8. WHAT ARE YOUR EXPECTATIONS FOR THIS WEBINAR
    if (!formData.expectations.trim()) {
      newErrors.expectations = 'Please share your expectations for this webinar.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!validate()) {
      // Scroll smoothly to first invalid field
      const firstError = Object.keys(errors)[0];
      const elem = document.getElementById(`field-${firstError}`);
      if (elem) {
        elem.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }

    // Set loading state
    setStatus('submitting');

    const payload = {
      timestamp: new Date().toISOString(),
      name: formData.name.trim(),
      email: formData.email.trim(),
      businessCategory: formData.businessCategory,
      phoneNumber: formData.phoneNumber.trim(),
      problemsToSolve: formData.problemsToSolve.trim(),
      workSetup: formData.workSetup,
      nationality: formData.nationality,
      expectations: formData.expectations.trim(),
    };

    try {
      let isSuccess = false;

      // Primary submission attempt: Text/plain JSON body (prevents CORS preflight in browsers)
      try {
        const response = await fetch(GOOGLE_APPS_SCRIPT_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'text/plain;charset=utf-8',
          },
          body: JSON.stringify(payload),
        });

        if (response.ok || response.status === 200) {
          isSuccess = true;
        } else {
          // If status is not 200 OK, check if response contains error or retry with fallback
          isSuccess = false;
        }
      } catch (networkErr) {
        console.warn('Direct POST encountered CORS redirect, attempting no-cors fallback...', networkErr);
        // Fallback for browsers that enforce strict CORS redirects on Google Apps Script
        try {
          await fetch(GOOGLE_APPS_SCRIPT_URL, {
            method: 'POST',
            mode: 'no-cors',
            headers: {
              'Content-Type': 'text/plain;charset=utf-8',
            },
            body: JSON.stringify(payload),
          });
          isSuccess = true;
        } catch (fallbackErr) {
          console.error('Submission fallback failed:', fallbackErr);
          isSuccess = false;
        }
      }

      // Always save a local copy as backup
      try {
        const existingRaw = localStorage.getItem(LOCAL_STORAGE_REGISTRATIONS_KEY);
        const list = existingRaw ? JSON.parse(existingRaw) : [];
        list.push({ ...formData, submittedAt: new Date().toISOString() });
        localStorage.setItem(LOCAL_STORAGE_REGISTRATIONS_KEY, JSON.stringify(list));
      } catch (storageErr) {
        console.warn('Could not save to local storage backup:', storageErr);
      }

      if (isSuccess) {
        // Step 5: Immediately trigger the WhatsApp Community Modal
        setShowWhatsAppModal(true);
      } else {
        setStatus('error');
        setErrorMessage('Your registration could not be completed at this time. Please check your connection and try again.');
      }
    } catch (err: any) {
      console.error('Submission error:', err);
      setStatus('error');
      setErrorMessage('Your registration could not be completed. Please check your details and try again.');
    }
  };

  const handleWhatsAppContinue = () => {
    setShowWhatsAppModal(false);
    setStatus('success');
    if (onSuccess) {
      onSuccess();
    }
  };

  const handleReset = () => {
    setFormData(initialFormData);
    setErrors({});
    setStatus('idle');
    setErrorMessage('');
    setShowWhatsAppModal(false);
  };

  if (status === 'success') {
    return <SuccessMessage formData={formData} onReset={handleReset} />;
  }

  return (
    <div className={`w-full ${isModal ? '' : 'max-w-3xl mx-auto'}`} id="registration-form-section">
      {/* WhatsApp Community Step Modal */}
      <WhatsAppModal 
        isOpen={showWhatsAppModal} 
        onContinue={handleWhatsAppContinue} 
        attendeeName={formData.name}
      />
      
      {/* Form Container Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 md:p-10 border border-blue-200/90 shadow-xl relative overflow-hidden">
        
        {/* Top Decorative Header Accent */}
        <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-[#1d4ed8] via-[#2563eb] to-[#06b6d4]" />

        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100/90 text-[#1d4ed8] text-xs font-bold uppercase tracking-wider mb-2.5">
            <Sparkles className="w-3.5 h-3.5 text-[#2563eb]" />
            <span>Free Registration • Live Session</span>
          </div>
          <h2 className="font-display font-black text-2xl sm:text-3xl md:text-4xl text-[#081e4b] tracking-tight mb-2">
            Reserve Your Spot
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Join us for an insightful session on how AI-powered workflows can transform the way businesses work.
          </p>
        </div>

        {/* Submission Error Alert */}
        {status === 'error' && (
          <div className="mb-6 p-4 rounded-2xl bg-rose-50 border border-rose-200 flex items-start gap-3 text-rose-900 animate-in fade-in duration-200" id="submission-error-box">
            <AlertCircle className="w-5 h-5 text-rose-600 flex-shrink-0 mt-0.5" />
            <div>
              <div className="text-sm font-bold">Something went wrong</div>
              <div className="text-xs sm:text-sm text-rose-700 mt-0.5">
                {errorMessage || 'Your registration could not be completed. Please check your details and try again.'}
              </div>
            </div>
          </div>
        )}

        {/* The Registration Form */}
        <form onSubmit={handleSubmit} noValidate className="space-y-6">

          {/* 1. NAME */}
          <div id="field-name">
            <label htmlFor="reg-name" className="block text-xs font-bold uppercase tracking-wider text-slate-800 mb-1.5">
              1. Full Name <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <User className="w-4 h-4" />
              </div>
              <input
                type="text"
                id="reg-name"
                name="name"
                value={formData.name}
                onChange={(e) => {
                  setFormData({ ...formData, name: e.target.value });
                  if (errors.name) setErrors({ ...errors, name: undefined });
                }}
                placeholder="e.g. Oluwaseun Adeyemi"
                aria-required="true"
                aria-invalid={!!errors.name}
                aria-describedby={errors.name ? 'error-name' : undefined}
                className={`w-full pl-10 pr-4 py-3 rounded-xl border text-base sm:text-sm text-slate-900 bg-slate-50/50 placeholder:text-slate-400 focus:bg-white focus:outline-hidden focus:ring-2 transition-all ${
                  errors.name 
                    ? 'border-rose-400 focus:ring-rose-200 bg-rose-50/30' 
                    : 'border-slate-300 focus:border-[#2563eb] focus:ring-blue-100'
                }`}
                required
              />
            </div>
            {errors.name && (
              <p id="error-name" className="text-xs font-semibold text-rose-600 mt-1.5 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" /> {errors.name}
              </p>
            )}
          </div>

          {/* 2. EMAIL ADDRESS */}
          <div id="field-email">
            <label htmlFor="reg-email" className="block text-xs font-bold uppercase tracking-wider text-slate-800 mb-1.5">
              2. Email Address <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Mail className="w-4 h-4" />
              </div>
              <input
                type="email"
                id="reg-email"
                name="email"
                value={formData.email}
                onChange={(e) => {
                  setFormData({ ...formData, email: e.target.value });
                  if (errors.email) setErrors({ ...errors, email: undefined });
                }}
                placeholder="e.g. seun@company.com"
                aria-required="true"
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? 'error-email' : undefined}
                className={`w-full pl-10 pr-4 py-3 rounded-xl border text-base sm:text-sm text-slate-900 bg-slate-50/50 placeholder:text-slate-400 focus:bg-white focus:outline-hidden focus:ring-2 transition-all ${
                  errors.email 
                    ? 'border-rose-400 focus:ring-rose-200 bg-rose-50/30' 
                    : 'border-slate-300 focus:border-[#2563eb] focus:ring-blue-100'
                }`}
                required
              />
            </div>
            {errors.email && (
              <p id="error-email" className="text-xs font-semibold text-rose-600 mt-1.5 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" /> {errors.email}
              </p>
            )}
          </div>

          {/* 3. CATEGORY OF BUSINESS */}
          <div id="field-businessCategory">
            <label htmlFor="reg-businessCategory" className="block text-xs font-bold uppercase tracking-wider text-slate-800 mb-1.5">
              3. Category of Business <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Building2 className="w-4 h-4" />
              </div>
              <select
                id="reg-businessCategory"
                name="businessCategory"
                value={formData.businessCategory}
                onChange={(e) => {
                  setFormData({ ...formData, businessCategory: e.target.value });
                  if (errors.businessCategory) setErrors({ ...errors, businessCategory: undefined });
                }}
                aria-required="true"
                aria-invalid={!!errors.businessCategory}
                aria-describedby={errors.businessCategory ? 'error-businessCategory' : undefined}
                className={`w-full pl-10 pr-10 py-3 rounded-xl border text-base sm:text-sm text-slate-900 bg-slate-50/50 focus:bg-white focus:outline-hidden focus:ring-2 transition-all appearance-none cursor-pointer ${
                  errors.businessCategory 
                    ? 'border-rose-400 focus:ring-rose-200 bg-rose-50/30' 
                    : 'border-slate-300 focus:border-[#2563eb] focus:ring-blue-100'
                }`}
                required
              >
                <option value="" disabled>Select your business sector...</option>
                {BUSINESS_CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-slate-400">
                <ChevronDown className="w-4 h-4" />
              </div>
            </div>
            {errors.businessCategory && (
              <p id="error-businessCategory" className="text-xs font-semibold text-rose-600 mt-1.5 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" /> {errors.businessCategory}
              </p>
            )}
          </div>

          {/* 4. PHONE NUMBER */}
          <div id="field-phoneNumber">
            <label htmlFor="reg-phoneNumber" className="block text-xs font-bold uppercase tracking-wider text-slate-800 mb-1.5">
              4. Phone Number <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Phone className="w-4 h-4" />
              </div>
              <input
                type="tel"
                id="reg-phoneNumber"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={(e) => {
                  setFormData({ ...formData, phoneNumber: e.target.value });
                  if (errors.phoneNumber) setErrors({ ...errors, phoneNumber: undefined });
                }}
                placeholder="+234 801 234 5678"
                aria-required="true"
                aria-invalid={!!errors.phoneNumber}
                aria-describedby={errors.phoneNumber ? 'error-phoneNumber' : undefined}
                className={`w-full pl-10 pr-4 py-3 rounded-xl border text-base sm:text-sm text-slate-900 bg-slate-50/50 placeholder:text-slate-400 focus:bg-white focus:outline-hidden focus:ring-2 transition-all ${
                  errors.phoneNumber 
                    ? 'border-rose-400 focus:ring-rose-200 bg-rose-50/30' 
                    : 'border-slate-300 focus:border-[#2563eb] focus:ring-blue-100'
                }`}
                required
              />
            </div>
            {errors.phoneNumber && (
              <p id="error-phoneNumber" className="text-xs font-semibold text-rose-600 mt-1.5 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" /> {errors.phoneNumber}
              </p>
            )}
          </div>

          {/* 5. PROBLEMS YOU WANT TO SOLVE WITH AI BEYOND THE REGULAR CHATBOTS */}
          <div id="field-problemsToSolve">
            <label htmlFor="reg-problemsToSolve" className="block text-xs font-bold uppercase tracking-wider text-slate-800 mb-1.5">
              5. Problems You Want to Solve with AI Beyond the Regular Chatbots <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <textarea
                id="reg-problemsToSolve"
                name="problemsToSolve"
                rows={3}
                value={formData.problemsToSolve}
                onChange={(e) => {
                  setFormData({ ...formData, problemsToSolve: e.target.value });
                  if (errors.problemsToSolve) setErrors({ ...errors, problemsToSolve: undefined });
                }}
                placeholder="Describe the repetitive manual bottlenecks, customer inquiry delays, or operational challenges you'd love AI workflows to handle..."
                aria-required="true"
                aria-invalid={!!errors.problemsToSolve}
                aria-describedby={errors.problemsToSolve ? 'error-problemsToSolve' : undefined}
                className={`w-full p-3.5 rounded-xl border text-base sm:text-sm text-slate-900 bg-slate-50/50 placeholder:text-slate-400 focus:bg-white focus:outline-hidden focus:ring-2 transition-all resize-y ${
                  errors.problemsToSolve 
                    ? 'border-rose-400 focus:ring-rose-200 bg-rose-50/30' 
                    : 'border-slate-300 focus:border-[#2563eb] focus:ring-blue-100'
                }`}
                required
              />
            </div>
            {errors.problemsToSolve && (
              <p id="error-problemsToSolve" className="text-xs font-semibold text-rose-600 mt-1.5 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" /> {errors.problemsToSolve}
              </p>
            )}
          </div>

          {/* 6. DO YOU WORK ALONE OR WITH A TEAM */}
          <div id="field-workSetup" role="radiogroup" aria-labelledby="label-workSetup">
            <span id="label-workSetup" className="block text-xs font-bold uppercase tracking-wider text-slate-800 mb-2">
              6. Do You Work Alone or with a Team? <span className="text-rose-500">*</span>
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                type="button"
                role="radio"
                aria-checked={formData.workSetup === 'I work alone'}
                onClick={() => {
                  setFormData({ ...formData, workSetup: 'I work alone' });
                  if (errors.workSetup) setErrors({ ...errors, workSetup: undefined });
                }}
                className={`flex items-center justify-between p-3.5 min-h-[48px] rounded-xl border text-sm font-semibold transition-all cursor-pointer focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-blue-500 ${
                  formData.workSetup === 'I work alone'
                    ? 'bg-blue-50 border-[#2563eb] text-[#1d4ed8] shadow-xs'
                    : 'bg-slate-50/50 border-slate-300 text-slate-700 hover:bg-slate-100'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <User className="w-4 h-4 text-slate-600" />
                  <span>I work alone</span>
                </div>
                <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                  formData.workSetup === 'I work alone' ? 'border-[#2563eb] bg-[#2563eb] text-white' : 'border-slate-300'
                }`}>
                  {formData.workSetup === 'I work alone' && <Check className="w-3 h-3" />}
                </div>
              </button>

              <button
                type="button"
                role="radio"
                aria-checked={formData.workSetup === 'I work with a team'}
                onClick={() => {
                  setFormData({ ...formData, workSetup: 'I work with a team' });
                  if (errors.workSetup) setErrors({ ...errors, workSetup: undefined });
                }}
                className={`flex items-center justify-between p-3.5 min-h-[48px] rounded-xl border text-sm font-semibold transition-all cursor-pointer focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-blue-500 ${
                  formData.workSetup === 'I work with a team'
                    ? 'bg-blue-50 border-[#2563eb] text-[#1d4ed8] shadow-xs'
                    : 'bg-slate-50/50 border-slate-300 text-slate-700 hover:bg-slate-100'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Users className="w-4 h-4 text-slate-600" />
                  <span>I work with a team</span>
                </div>
                <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                  formData.workSetup === 'I work with a team' ? 'border-[#2563eb] bg-[#2563eb] text-white' : 'border-slate-300'
                }`}>
                  {formData.workSetup === 'I work with a team' && <Check className="w-3 h-3" />}
                </div>
              </button>
            </div>
            {errors.workSetup && (
              <p id="error-workSetup" className="text-xs font-semibold text-rose-600 mt-1.5 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" /> {errors.workSetup}
              </p>
            )}
          </div>

          {/* 7. NATIONALITY */}
          <div id="field-nationality">
            <label htmlFor="reg-nationality" className="block text-xs font-bold uppercase tracking-wider text-slate-800 mb-1.5">
              7. Nationality <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Globe2 className="w-4 h-4" />
              </div>
              <select
                id="reg-nationality"
                name="nationality"
                value={formData.nationality}
                onChange={(e) => {
                  setFormData({ ...formData, nationality: e.target.value });
                  if (errors.nationality) setErrors({ ...errors, nationality: undefined });
                }}
                aria-required="true"
                aria-invalid={!!errors.nationality}
                aria-describedby={errors.nationality ? 'error-nationality' : undefined}
                className={`w-full pl-10 pr-10 py-3 rounded-xl border text-base sm:text-sm text-slate-900 bg-slate-50/50 focus:bg-white focus:outline-hidden focus:ring-2 transition-all appearance-none cursor-pointer ${
                  errors.nationality 
                    ? 'border-rose-400 focus:ring-rose-200 bg-rose-50/30' 
                    : 'border-slate-300 focus:border-[#2563eb] focus:ring-blue-100'
                }`}
                required
              >
                <optgroup label="African Countries">
                  {AFRICAN_COUNTRIES.map((country) => (
                    <option key={country} value={country}>{country}</option>
                  ))}
                </optgroup>
                <optgroup label="Other Countries">
                  {ALL_COUNTRIES.filter(c => !AFRICAN_COUNTRIES.includes(c)).map((country) => (
                    <option key={country} value={country}>{country}</option>
                  ))}
                </optgroup>
              </select>
              <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-slate-400">
                <ChevronDown className="w-4 h-4" />
              </div>
            </div>
            {errors.nationality && (
              <p id="error-nationality" className="text-xs font-semibold text-rose-600 mt-1.5 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" /> {errors.nationality}
              </p>
            )}
          </div>

          {/* 8. WHAT ARE YOUR EXPECTATIONS FOR THIS WEBINAR */}
          <div id="field-expectations">
            <label htmlFor="reg-expectations" className="block text-xs font-bold uppercase tracking-wider text-slate-800 mb-1.5">
              8. What Are Your Expectations for this Webinar? <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <textarea
                id="reg-expectations"
                name="expectations"
                rows={3}
                value={formData.expectations}
                onChange={(e) => {
                  setFormData({ ...formData, expectations: e.target.value });
                  if (errors.expectations) setErrors({ ...errors, expectations: undefined });
                }}
                placeholder="e.g. I want to learn how to connect ChatGPT/Claude to our client CRM and automate automated email responses..."
                aria-required="true"
                aria-invalid={!!errors.expectations}
                aria-describedby={errors.expectations ? 'error-expectations' : undefined}
                className={`w-full p-3.5 rounded-xl border text-base sm:text-sm text-slate-900 bg-slate-50/50 placeholder:text-slate-400 focus:bg-white focus:outline-hidden focus:ring-2 transition-all resize-y ${
                  errors.expectations 
                    ? 'border-rose-400 focus:ring-rose-200 bg-rose-50/30' 
                    : 'border-slate-300 focus:border-[#2563eb] focus:ring-blue-100'
                }`}
                required
              />
            </div>
            {errors.expectations && (
              <p id="error-expectations" className="text-xs font-semibold text-rose-600 mt-1.5 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" /> {errors.expectations}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={status === 'submitting'}
              className="w-full min-h-[52px] flex items-center justify-center gap-3 py-4 px-8 rounded-2xl bg-gradient-to-r from-[#1d4ed8] via-[#2563eb] to-[#0284c7] hover:from-[#1e40af] hover:to-[#0369a1] text-white text-base sm:text-lg font-black shadow-lg shadow-blue-600/30 active:scale-98 disabled:opacity-70 disabled:cursor-not-allowed transition-all cursor-pointer focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
              id="submit-registration-button"
            >
              {status === 'submitting' ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin text-white" />
                  <span>Securing Your Seat...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5 text-cyan-200" />
                  <span>CONFIRM MY REGISTRATION</span>
                </>
              )}
            </button>
            <p className="text-center text-xs text-slate-500 mt-3">
              🔒 We respect your privacy. No spam. You will only receive webinar joining information and materials.
            </p>
          </div>

        </form>

      </div>

    </div>
  );
};
