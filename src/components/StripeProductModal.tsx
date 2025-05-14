import React from 'react';
import { X, RefreshCw } from 'lucide-react';

interface StripeProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRefresh: () => void;
  onApply: () => void;
}

const StripeProductModal: React.FC<StripeProductModalProps> = ({
  isOpen,
  onClose,
  onRefresh,
  onApply
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-start justify-center pt-16 z-50">
      <div className="bg-white w-full max-w-2xl rounded-lg shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold text-gray-900">Your Stripe products</h2>
          <button 
            onClick={onClose}
            className="text-black hover:text-gray-700 transition-colors"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4">
          <p className="text-gray-600 mb-4">
            Please select the Stripe products you would like to use for the application. You can also sync manually if the list below doesn't match your Stripe account.
          </p>

          {/* Refresh Button */}
          <button 
            onClick={onRefresh}
            className="flex items-center text-blue-600 hover:text-blue-700 mb-4 transition-colors"
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Update my products
          </button>

          {/* Products List */}
          <div className="bg-gray-800 text-gray-300 p-4 rounded mb-4">
            0 products available
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-4 border-t bg-gray-50 rounded-b-lg">
          <button 
            onClick={onClose}
            className="text-gray-600 hover:text-gray-800 transition-colors"
          >
            Cancel
          </button>
          <div className="flex items-center gap-4">
            <span className="text-gray-600">0 products selected</span>
            <button 
              onClick={onApply}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
            >
              Apply selection
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StripeProductModal;