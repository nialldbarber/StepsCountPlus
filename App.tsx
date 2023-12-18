import { RootNavigator } from "@/app/navigation";
import React from "react";

export default function App() {
	// useEffect(() => {
	// 	initialize();
	// 	endAppStartup();
	// }, []);

	// const onReportPrepared = useCallback((report: RenderPassReport) => {
	// 	console.log(report);
	// }, []);

	return <RootNavigator />;
}
