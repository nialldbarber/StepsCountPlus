import { InfoBlock } from "@/app/components/goals/info-block";
import { Box } from "@/app/design-system/components/box";
import { Text } from "@/app/design-system/components/text";

export function StepsInfo() {
	return (
		<Box paddingBottom="38px">
			<Box marginBottom="28px">
				<Text level="heading" size="30px">
					Steps
				</Text>
			</Box>
			<InfoBlock
				title="Origin of the 10,000 Steps Goal"
				infoBlock={`The 10,000 steps per day goal originated in Japan in the 1960s with a device named "manpo-kei," which translates to "10,000 steps meter." It was more of a marketing tool than a scientifically backed target.`}
				link="https://www.acsh.org/news/2023/11/13/every-picture-tells-story-debunking-10000-steps-17456"
			/>
			<Box height="28px" />
			<InfoBlock
				title="Health Benefits at Fewer Steps"
				infoBlock="Health benefits can be achieved with fewer than 10,000 steps a day. Mortality rates decrease with an increase in steps but level off at approximately 7,500 steps."
				link="https://www.mayoclinic.org/healthy-lifestyle/fitness/in-depth/10000-steps/art-20317391"
			/>
			<Box height="28px" />
			<InfoBlock
				title="Short Spurts Count"
				infoBlock="Shorter spurts of walking, such as during daily activities, can be beneficial. These bursts can have health benefits similar to longer, uninterrupted walking bouts."
				link="https://www.mayoclinic.org/healthy-lifestyle/fitness/in-depth/10000-steps/art-20317391"
			/>
			<Box height="28px" />
			<InfoBlock
				title="Impact on Longevity"
				infoBlock="Increasing daily physical activity by as little as 2,000 steps has been associated with positive health outcomes."
				link="https://newsroom.heart.org/news/heart-healthy-lifestyle-linked-to-a-longer-life-free-of-chronic-health-conditions"
			/>
		</Box>
	);
}
