import type { TurboModule } from "react-native";
import { TurboModuleRegistry } from "react-native";

export type ContextMenuItem = {
	id: string;
	description: string;
	onClick: () => void;
};

export type ContextMenu = {
	list: Array<ContextMenuItem>;
};

export interface Spec extends TurboModule {
	showMenu: () => Promise<ContextMenu>;
}

export default TurboModuleRegistry.getEnforcing<Spec>("ContextMenu");
