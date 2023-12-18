import type { BottomSheetModal } from "@gorhom/bottom-sheet";
import type { RefObject } from "react";
import { useCallback, useMemo } from "react";

export function useBottomSheet(
	sheetRef: RefObject<BottomSheetModal>,
	points?: Array<string>,
) {
	const snapPoints = useMemo(() => points ?? ["50%"], [points]);
	const handlePresentModalPress = useCallback(() => {
		sheetRef.current?.present();
	}, [sheetRef]);
	return { snapPoints, handlePresentModalPress };
}
