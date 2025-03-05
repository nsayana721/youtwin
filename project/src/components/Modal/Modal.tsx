import React from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string | React.ReactNode;
  confirmLabel?: string;
  cancelLabel?: string;
  type?: 'danger' | 'default';
}

export function Modal({ 
  isOpen, 
  onClose, 
  onConfirm, 
  title, 
  message,
  confirmLabel = 'Remove',
  cancelLabel = 'Cancel',
  type = 'danger'
}: ModalProps) {
  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onConfirm();
  };

  const modalContent = (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-[9999] data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0 }}>
      <div className="bg-white rounded-xl shadow-lg shadow-black/5 max-w-[400px] w-full mx-4 overflow-hidden duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]">
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col space-y-1.5 text-center p-6 pb-0">
            <div className="flex flex-col items-center gap-2 mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill={type === 'danger' ? 'rgba(220,38,37,1)' : 'rgba(79,70,229,1)'} className="w-8 h-8 mb-2">
                {type === 'danger' ? (
                  <path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20ZM11 15H13V17H11V15ZM11 7H13V13H11V7Z" />
                ) : (
                  <path d="M11 11V5H13V11H19V13H13V19H11V13H5V11H11Z" />
                )}
              </svg>
              <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
            </div>
            <div className="text-sm text-gray-500 mb-6">
              {message}
            </div>
          </div>
          <div className="flex flex-col-reverse sm:flex-row justify-center gap-2 p-6">
            <button
              type="button"
              onClick={onClose}
              className="inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-gray-200 bg-white hover:bg-gray-100 h-10 px-4 py-2"
            >
              {cancelLabel}
            </button>
            <button
              type="submit"
              className={`inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 text-white h-10 px-4 py-2 ${
                type === 'danger'
                  ? 'bg-red-600 hover:bg-red-700'
                  : 'bg-primary-500 hover:bg-primary-600'
              }`}
            >
              {confirmLabel}
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}