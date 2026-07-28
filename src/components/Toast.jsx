import React from 'react';
import { useShop } from '../context/ShopContext';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export const ToastContainer = () => {
  const { toasts } = useShop();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col space-y-3 max-w-sm w-full px-4 pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`pointer-events-auto flex items-start space-x-3 p-4 rounded-2xl shadow-xl border backdrop-blur-md transition-all duration-300 transform translate-y-0 ${
            toast.type === 'error'
              ? 'bg-red-50/95 border-red-200 text-red-900'
              : toast.type === 'info'
              ? 'bg-sky-50/95 border-sky-200 text-sky-900'
              : 'bg-pink-50/95 border-pink-200 text-pink-950'
          }`}
        >
          {toast.type === 'error' ? (
            <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
          ) : toast.type === 'info' ? (
            <Info className="w-5 h-5 text-sky-500 shrink-0 mt-0.5" />
          ) : (
            <CheckCircle2 className="w-5 h-5 text-pink-500 shrink-0 mt-0.5" />
          )}
          <div className="flex-1 text-sm font-medium leading-snug">{toast.message}</div>
        </div>
      ))}
    </div>
  );
};
