"use client";

import Link from "next/link";
import { useState } from "react";

function Modal({ onClose }: { onClose: () => void }) {
	return (
		<>
			<div className="modal-backdrop" />
			<div className="modal">
				<p>モーダルウィンドウが開きました。</p>
				<div className="btn-wrapper modal-button-container">
					{/* 閉じるボタンを押すと、onCloseが発火 */}
					<button className="btn" onClick={onClose}>
						閉じる
					</button>
				</div>
			</div>
		</>
	);
}

export default function ModalPage() {
	const [isModalOpen, setIsModalOpen] = useState(false);

	// openModalが実行されたら、モーダルの表示状態(isModalOpen)をtrue（表示する）する
	const openModal = () => setIsModalOpen(true);
	// closeModalが実行されたら、モーダルの表示状態(isModalOpen)をfalse（非表示にする）する
	const closeModal = () => setIsModalOpen(false);

	return (
		<div>
			<h1>モーダルウィンドウ</h1>
			<div className="btn-wrapper">
				{/* 「ここを押してください」ボタンを押すと、openModalが発火 */}
				<button className="btn" onClick={openModal}>
					ここを押してください
				</button>
			</div>
			{/* もしisModalOpenがtrue なら、Modalコンポーネントを表示する */}
			{isModalOpen && <Modal onClose={closeModal} />}

			<div className="btn-wrapper">
				<Link href="/" className="btn">アプリケーションTOPへ</Link>
			</div>
		</div >
	);
};
