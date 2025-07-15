'use client'

import Link from "next/link";
import { useState } from 'react';
import '../styles.css';

export default function DataStoragePage() {
	const [localText, setLocalText] = useState('');
	const [sessionText, setSessionText] = useState('');
	const [userRole, setUserRole] = useState<'questioner' | 'answerer' | ''>('');
	const [localUserRole, setLocalUserRole] = useState<'questioner' | 'answerer' | ''>('');

	const saveLocalStorage = () => {
		localStorage.setItem('demoText', localText);
		localStorage.setItem('inputText', localText);
		if (localUserRole) {
			localStorage.setItem('userRole', localUserRole);
		}
		alert('LocalStorageに保存しました');
	};

	const saveSessionStorage = () => {
		sessionStorage.setItem('demoSessionText', sessionText);
		sessionStorage.setItem('userRole', userRole);
		alert('SessionStorageに保存しました');
	};

	const saveAllData = () => {
		localStorage.setItem('demoText', localText);
		localStorage.setItem('inputText', localText);
		if (localUserRole) {
			localStorage.setItem('userRole', localUserRole);
		}
		sessionStorage.setItem('demoSessionText', sessionText);
		if (userRole) {
			sessionStorage.setItem('userRole', userRole);
		}
		alert('全てのデータを保存しました');
	};

	return (
		<div>
			<h1>データ保存ページ</h1>

			<div>
				<h2>LocalStorage用データ</h2>
				<div className="send-form">
					<input
						type="text"
						placeholder="LocalStorageに保存するテキスト"
						value={localText}
						onChange={(e) => setLocalText(e.target.value)}
					/>
					<button className="send-btn" onClick={saveLocalStorage}>
						LocalStorageに保存
					</button>
				</div>
				<h2>LocalStorage用ユーザー役割</h2>
				<div>
					<select
						value={localUserRole}
						onChange={(e) => setLocalUserRole(e.target.value as 'questioner' | 'answerer' | '')}
					>
						<option value="">役割を選択</option>
						<option value="questioner">質問者</option>
						<option value="answerer">回答者</option>
					</select>
				</div>

				<h2>SessionStorage用データ</h2>
				<div className="send-form">
					<input
						type="text"
						placeholder="SessionStorageに保存するテキスト"
						value={sessionText}
						onChange={(e) => setSessionText(e.target.value)}
					/>
					<button className="send-btn" onClick={saveSessionStorage}>
						SessionStorageに保存
					</button>
				</div>

				<h2>SessionStorage用ユーザー役割</h2>
				<div>
					<select
						value={userRole}
						onChange={(e) => setUserRole(e.target.value as 'questioner' | 'answerer' | '')}
					>
						<option value="">役割を選択</option>
						<option value="questioner">質問者</option>
						<option value="answerer">回答者</option>
					</select>
				</div>

				<div className="btn-wrapper">
					<button className="btn primary" onClick={saveAllData}>
						全てのデータを保存
					</button>
				</div>
			</div>


			<div className="btn-wrapper">
				<Link href="/reset" className="btn secondary">
					擬似TOPページに戻る
				</Link>
			</div>
		</div>
	);
}
