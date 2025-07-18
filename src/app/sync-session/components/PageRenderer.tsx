import { PageConfig, PageProps } from '../config/pages';

interface PageRendererProps {
	pageConfig: PageConfig;
	role: 'questioner' | 'answerer';
	onReady: () => void;
	isReady: boolean;
	isWaiting: boolean;
}

export function PageRenderer({
	pageConfig,
	role,
	onReady,
	isReady,
	isWaiting
}: PageRendererProps) {
	const { displayType, components } = pageConfig;

	let ComponentToRender;

	if (displayType === 'same') {
		ComponentToRender = components.same;
	} else if (displayType === 'different') {
		ComponentToRender = components[role];
	}

	if (!ComponentToRender) {
		return (
			<div className="page-container">
				<h1>エラー</h1>
				<p>このページのコンポーネントが見つかりません。</p>
			</div>
		);
	}

	const pageProps: PageProps = {
		role,
		onReady,
		isReady,
		isWaiting
	};

	return <ComponentToRender {...pageProps} />;
}
