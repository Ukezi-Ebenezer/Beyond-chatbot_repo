import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { RegistrationForm } from './RegistrationForm';

interface RegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RegistrationModal: React.FC<RegistrationModalProps> = ({ isOpen, onClose }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          onClose();
        }
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = 'unset';
        window.removeEventListener('keydown', handleKeyDown);
      };
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto" 
      id="registration-modal"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-registration-title"
    >
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-[#081e4b]/80 backdrop-blur-md transition-opacity animate-in fade-in duration-200"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Content */}
      <div className="relative w-full max-w-2xl my-auto z-10 animate-in zoom-in-95 fade-in duration-200 max-h-[94dvh] overflow-y-auto rounded-3xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 sm:top-6 sm:right-6 z-20 w-10 h-10 rounded-full bg-slate-100/95 text-slate-700 hover:bg-slate-200 hover:text-slate-950 flex items-center justify-center transition-colors cursor-pointer shadow-sm focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-blue-500"
          aria-label="Close registration modal"
        >
          <X className="w-5 h-5" />
        </button>

        <RegistrationForm isModal={true} />
      </div>
    </div>
  );
};

