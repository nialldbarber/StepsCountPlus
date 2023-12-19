import { InfoBlock } from "@/app/components/goals/info-block";
import { Box } from "@/app/design-system/components/box";
import { Text } from "@/app/design-system/components/text";

export function FlightsInfo() {
	return (
		<Box paddingBottom="38px">
			<Box marginBottom="28px">
				<Text level="heading" size="28px">
					Flights
				</Text>
			</Box>
			<InfoBlock
				title="Improves Overall Health and Cardiovascular Fitness"
				infoBlock="Stair climbing can lead to better heart and lung function. It strengthens your heart and lungs, allowing for increased oxygen intake and better circulation of oxygen-rich blood, enhancing overall endurance. This can be especially beneficial for your cardiovascular health"
				link="https://www.livestrong.com/article/464931-what-does-stair-climbing-do-for-your-body/"
			/>
			<Box height="28px" />
			<InfoBlock
				title="Reduced Risk of Heart Disease and Other Chronic Conditions"
				infoBlock="Regularly walking up at least five flights of stairs each day can reduce the risk of heart disease, stroke, and other chronic conditions. It also promotes better heart and overall health, and reduces the risk of dementia and Alzheimer’s"
				link="https://www.henryford.com/blog/2023/12/the-heart-health-benefits-of-taking-the-stairs"
			/>
			<Box height="28px" />
			<InfoBlock
				title="Healthy Bones, Muscles, and Joints"
				infoBlock="Climbing stairs helps to build strong and lean leg muscles, including your glutes, calves, quadriceps, and hamstrings. It also strengthens your bones and can reduce the risk of osteoporosis, particularly beneficial for postmenopausal individuals."
				link="https://www.livestrong.com/article/464931-what-does-stair-climbing-do-for-your-body/"
			/>
			<Box height="28px" />
			<InfoBlock
				title="Calorie Burn and Disease Risk Reduction"
				infoBlock="Stair climbing is an effective way to burn calories. Regular cardiovascular exercise, such as stair climbing, lowers the risk of developing chronic health problems like high blood pressure, diabetes, certain cancers, and also improves the amount of good cholesterol in the blood."
				link="https://www.livestrong.com/article/464931-what-does-stair-climbing-do-for-your-body/"
			/>
		</Box>
	);
}
