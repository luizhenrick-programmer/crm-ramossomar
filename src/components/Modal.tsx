// src/components/Modal.tsx
import { useEffect, type ReactNode } from 'react';
import { X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  children: ReactNode;
  footer?: ReactNode;
  size?: 'sm' | 'md' | 'lg';
}

const SIZE_MAP = {
  sm: '480px',
  md: '680px',
  lg: '860px',
};

export function Modal({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
  footer,
  size = 'md',
}: ModalProps) {
  // Fecha com ESC
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [isOpen, onClose]);

  // Bloqueia scroll do body
  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="modal-overlay"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="modal-container anim-scale-in"
        style={{ maxWidth: SIZE_MAP[size] }}
      >
        <div className="modal-header">
          <div>
            <h2 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)' }}>
              {title}
            </h2>
            {subtitle && (
              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: 2 }}>
                {subtitle}
              </p>
            )}
          </div>
          <button
            className="btn btn-ghost btn-sm"
            onClick={onClose}
            aria-label="Fechar modal"
            style={{ padding: 6 }}
          >
            <X size={18} />
          </button>
        </div>
        <div className="modal-body">{children}</div>
        {footer && <div className="modal-footer">{footer}</div>}
      </div>
    </div>
  );
}
