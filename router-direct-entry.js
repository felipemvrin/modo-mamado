import '@expo/metro-runtime';

const React = require('react');
const { registerRootComponent } = require('expo');
const { ScrollView, StyleSheet, Text, View } = require('react-native');
const {
	installRouterDiagnosticHooks,
	recordRouterDiagnostic,
	recordRouterError,
	useRouterDiagnosticState,
} = require('./utils/routerDiagnostics');

installRouterDiagnosticHooks();
recordRouterDiagnostic('entrypoint iniciado');

class RouterErrorBoundary extends React.Component {
	constructor(props) {
		super(props);
		this.state = { error: null };
	}

	static getDerivedStateFromError(error) {
		return { error };
	}

	componentDidCatch(error, info) {
		recordRouterError('Error renderizando Expo Router', error, info.componentStack);
	}

	render() {
		return this.state.error ? null : this.props.children;
	}
}

function RouterDiagnosticRoot() {
	const diagnosticState = useRouterDiagnosticState();
	const [RouterApp, setRouterApp] = React.useState(null);

	React.useEffect(() => {
		recordRouterDiagnostic('raíz diagnóstica montada');

		const frame = requestAnimationFrame(() => {
			try {
				recordRouterDiagnostic('cargando Expo Router con Linking real');
				const App = require('expo-router/build/qualified-entry').App;
				setRouterApp(() => App);
				recordRouterDiagnostic('módulo de Expo Router cargado');
			} catch (error) {
				recordRouterError('Error cargando Expo Router', error);
			}
		});

		return () => cancelAnimationFrame(frame);
	}, []);

	return React.createElement(
		View,
		{ style: styles.root },
		React.createElement(
			View,
			{ style: styles.routerArea },
			React.createElement(
				RouterErrorBoundary,
				null,
				RouterApp ? React.createElement(RouterApp) : null,
			),
		),
		React.createElement(
			View,
			{ style: styles.panel },
			React.createElement(Text, { style: styles.title }, 'DIAGNÓSTICO TESTFLIGHT'),
			React.createElement(
				Text,
				{ style: diagnosticState.error ? styles.error : styles.status },
				diagnosticState.error || 'Sin error fatal capturado',
			),
			React.createElement(
				ScrollView,
				{ style: styles.logs },
				...diagnosticState.events.map((event, index) =>
					React.createElement(
						Text,
						{ key: `${index}-${event}`, selectable: true, style: styles.logLine },
						event,
					),
				),
			),
		),
	);
}

const styles = StyleSheet.create({
	root: { flex: 1, backgroundColor: '#090909' },
	routerArea: { flex: 1, minHeight: 180 },
	panel: {
		height: 270,
		padding: 12,
		borderTopWidth: 1,
		borderTopColor: '#C6FF00',
		backgroundColor: '#151515',
	},
	title: { color: '#C6FF00', fontSize: 14, fontWeight: '700' },
	status: { color: '#F5F5F5', fontSize: 12, marginTop: 6 },
	error: { color: '#FF7676', fontSize: 12, marginTop: 6 },
	logs: { marginTop: 8 },
	logLine: { color: '#D0D0D0', fontSize: 11, lineHeight: 16 },
});

recordRouterDiagnostic('registrando raíz diagnóstica');
registerRootComponent(RouterDiagnosticRoot);