"use client";

import React from "react";

interface ModalProps {
	isOpen: boolean;
	onClose: () => void;
	children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
	//モーダルウィンドウが開いてないなら、何もしない
	if (!isOpen) {
		return null;
	}

	return (
		<>
			<div className="modal-backdrop" />
			<div className="modal">
				<div className="modal-content">
					{children}
				</div>
				<div className="btn-wrapper modal-btn-wrapper">
					<button className="btn" onClick={onClose}>
						閉じる
					</button>
				</div>
			</div>
		</>
	);
};

export default Modal;
