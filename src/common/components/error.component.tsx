import React, { createContext, useContext, useState, type ReactNode } from 'react'
import './error.component.css'

interface ErrorContextData {
  showErrors: (errors: string[]) => void
}

const ErrorContext = createContext<ErrorContextData>({} as ErrorContextData);

export const ErrorProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [errors, setErrors] = useState<string[]>([])
  const [isOpen, setIsOpen] = useState(false)

  const showErrors = (errorList: string[]) => {
    setErrors(errorList)
    setIsOpen(true)
  }

  const closeMenu = () => setIsOpen(false)

  return (
    <ErrorContext.Provider value={{ showErrors }}>
      {children}

      {isOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <span>⚠️ Ops! Encontramos erros</span>
              <button onClick={closeMenu} className="close-x">❌</button>
            </div>
            <div className="modal-body">
              <ul>
                {errors.map((err, index) => (
                  <li key={index}>{err}</li>
                ))}
              </ul>
            </div>
            <div className="modal-footer">
              <button onClick={closeMenu} className="btn-ok">Entendido</button>
            </div>
          </div>
        </div>
      )}
    </ErrorContext.Provider>
  );
};

// Hook personalizado para facilitar o uso
export const useErrorModal = () => useContext(ErrorContext)