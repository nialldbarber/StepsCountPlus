import type { BottomSheetModal } from "@gorhom/bottom-sheet";
import type { RefObject } from "react";
import { useCallback, useMemo } from "react";

export function useBottomSheet(
	sheetRef: RefObject<BottomSheetModal>,
	points?: Array<string>,
) {
	const snapPoints = useMemo(() => points ?? ["50%", "75%"], [points]);
	const handlePresentModalPress = useCallback(() => {
		sheetRef.current?.present();
	}, [sheetRef]);

	const handleCloseModal = useCallback(() => {
		sheetRef.current?.dismiss();
	}, [sheetRef]);

	return { snapPoints, handlePresentModalPress, handleCloseModal };
}
