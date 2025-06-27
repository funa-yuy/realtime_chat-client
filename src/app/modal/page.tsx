"use client";

import Link from "next/link";
import { useState } from "react";
// 自作モーダルをインポート
import Modal from "./Modal";

function FeatureExplanation() {
	return (
		<div className="my-4 p-6 border rounded-md">
			<h3 className="font-bold mb-2">【概要】</h3>
			<p>モーダルウィンドウを、自作したコンポーネント（./Modal）を使用して表示する。</p>
			<strong>モーダルの仕組み</strong>
			<ul className="list-disc list-inside ml-4">
				<li>
					1. useState (isModalOpen) を使ってモーダルの表示・非表示の状態を管理します。
				</li>
				<li>
					2. ボタンをクリックすると openModal が呼ばれ、isModalOpen が true になりモーダルが表示されます。
				</li>
				<li>
					3. Modal コンポーネントの onClose に渡された closeModal が実行されると、isModalOpen が false になりモーダルが閉じます。
				</li>
				<li>
					4. モーダルの中身は<code>&lt;Modal&gt;</code>タグの子要素として自由に記述できます
				</li>

			</ul>
		</div>
	);
}

// モーダルウィンドウ ----------------------------------------------------------------------
function ModalSection() {
	const [isModalOpen, setIsModalOpen] = useState(false);

	// openModalが実行されたら、モーダルの表示状態(isModalOpen)をtrue（表示する）する
	const openModal = () => setIsModalOpen(true);
	// closeModalが実行されたら、モーダルの表示状態(isModalOpen)をfalse（非表示にする）する
	const closeModal = () => setIsModalOpen(false);

	return (
		<>
			{/* モーダルウィンドウを開くボタン */}
			<div className="btn-wrapper">
				<button className="btn" onClick={openModal}>
					ここを押してください
				</button>
			</div>

			{/* モーダルウィンドウ内の内容 */}
			<Modal
				isOpen={isModalOpen}
				onClose={closeModal}
			>
				{/* ここにモーダルの中身を記述する */}
				<p>このモーダルは再利用可能です。</p>
				<p>ページによって表示する内容を変えられます。</p>
			</Modal>
		</>
	);
}

// メインのコンポーネント ----------------------------------------------------------------------
export default function ModalPage() {
	return (
		<div>
			<h1>モーダルウィンドウ</h1>
			<FeatureExplanation />

			{/* ここでモーダルウィンドウ機能を呼び出す */}
			<ModalSection />

			<div className="btn-wrapper">
				<Link href="/" className="btn">アプリケーションTOPへ</Link>
			</div>
		</div >
	);
};
