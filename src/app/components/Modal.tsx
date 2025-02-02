'use client';

import React from 'react';

interface ModalProps {
    isOpen: boolean;
    onCloseAction: () => void;
    children: React.ReactNode;
}

export default function Modal({ isOpen, onCloseAction, children }: ModalProps) {
    if (!isOpen) return null;

    return (
        <div style={overlayStyle} onClick={onCloseAction}>
            <div style={modalStyle} onClick={(e) => e.stopPropagation()}>
                <button style={closeButtonStyle} onClick={onCloseAction}>✖</button>
                {children}
            </div>
        </div>
    );
}

// Basic Styles
const overlayStyle: React.CSSProperties = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
};

const modalStyle: React.CSSProperties = {
    background: '#fff',
    padding: '20px',
    borderRadius: '8px',
    width: '800px',
    position: 'relative',
};

const closeButtonStyle: React.CSSProperties = {
    position: 'absolute',
    top: '10px',
    right: '10px',
    background: 'none',
    border: 'none',
    fontSize: '16px',
    cursor: 'pointer',
};