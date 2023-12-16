import { RootNavigator } from "@/app/navigation";
import {
	PerformanceProfiler,
	RenderPassReport,
} from "@shopify/react-native-performance";
import React, { useCallback, useEffect } from "react";
import { endAppStartup, initialize } from "react-native-embrace";

export default function App() {
	useEffect(() => {
		initialize();
		endAppStartup();
	}, []);

	const onReportPrepared = useCallback((report: RenderPassReport) => {
		console.log(report);
	}, []);

	return (
		<PerformanceProfiler onReportPrepared={onReportPrepared}>
			<RootNavigator />
		</PerformanceProfiler>
	);
}
