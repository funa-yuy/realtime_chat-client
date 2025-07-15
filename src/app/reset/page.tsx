'use client'

import Link from "next/link";
import { useEffect, useState } from 'react';
import './styles.css';

const loadStorageData = () => {
	const localData: Record<string, string> = {};
	const sessionData: Record<string, string> = {};

	if (typeof window !== 'undefined') {
		for (let i = 0; i < localStorage.length; i++) {
			const key = localStorage.key(i);
			if (key) {
				localData[key] = localStorage.getItem(key) || '';
			}
		}

		for (let i = 0; i < sessionStorage.length; i++) {
			const key = sessionStorage.key(i);
			if (key) {
				sessionData[key] = sessionStorage.getItem(key) || '';
			}
		}
	}

	return { localData, sessionData };
};

// ストレージをリセットする ----------------------------------------------------------------------
const clearAllStorage = () => {
	localStorage.clear();
	sessionStorage.clear();

	//デバック用
	alert('全てのストレージデータがリセットされました');
};

// メイン ----------------------------------------------------------------------
export default function ResetTopPage() {
	const [localStorageData, setLocalStorageData] = useState<Record<string, string>>({});
	const [sessionStorageData, setSessionStorageData] = useState<Record<string, string>>({});

	const updateStorageData = () => {
		const { localData, sessionData } = loadStorageData();
		setLocalStorageData(localData);
		setSessionStorageData(sessionData);
	};

	// データリセットボタンを押した時の処理
	const handleClearStorage = () => {
		//リセット処理
		clearAllStorage();

		//デバック用
		updateStorageData();
	};

	useEffect(() => {
		updateStorageData();
	}, []);

	return (
		<div>
			<h1>リセット機能</h1>

			<div className="storage-status">
				<h2>現在のストレージ状況</h2>

				<h3>LocalStorage</h3>
				{Object.keys(localStorageData).length > 0 ? (
					<ul>
						{Object.entries(localStorageData).map(([key, value]) => (
							<li key={key}>
								<strong>{key}:</strong> {value}
							</li>
						))}
					</ul>
				) : (
					<p>LocalStorageにデータはありません</p>
				)}

				<h3>SessionStorage</h3>
				{Object.keys(sessionStorageData).length > 0 ? (
					<ul>
						{Object.entries(sessionStorageData).map(([key, value]) => (
							<li key={key}>
								<strong>{key}:</strong> {value}
							</li>
						))}
					</ul>
				) : (
					<p>SessionStorageにデータはありません</p>
				)}
			</div>

			<div className="btn-wrapper">
				<button className="btn" onClick={updateStorageData}>
					ストレージ状況を更新♻︎
				</button>
			</div>

			<div className="btn-wrapper">
				<button className="btn danger" onClick={handleClearStorage}>
					全ストレージをリセット
				</button>
			</div>

			<div className="btn-wrapper">
				<Link href="/reset/data-storage" className="btn">
					データ保存ページ ↗︎
				</Link>
			</div>


			<div className="btn-wrapper">
				<Link href="/" className="btn">アプリケーションTOPへ</Link>
			</div>
		</div>
	);
}
