import { InfoBlock } from "@/app/components/goals/info-block";
import { Box } from "@/app/design-system/components/box";
import { Text } from "@/app/design-system/components/text";

export function DistanceInfo() {
	return (
		<Box paddingBottom="38px">
			<Box marginBottom="28px">
				<Text level="heading" size="28px" withEmoji>
					Distance 📍
				</Text>
			</Box>
			<InfoBlock
				title="Improves immune system"
				infoBlock="Walking can help support your immune system by increasing blood flow, reducing stress, and strengthening your body’s antibodies. This makes it an effective way to combat viruses and bacteria."
				link="https://health.clevelandclinic.org/benefits-of-walking/"
			/>
			<Box height="28px" />
			<InfoBlock
				title="Protects joints"
				infoBlock="Walking lubricates and strengthens muscles, increasing blood flow to cartilage. This is particularly beneficial for people with arthritis, as it keeps joints flexible and reduces the risk of osteoporosis."
				link="https://health.clevelandclinic.org/benefits-of-walking/"
			/>
			<Box height="28px" />
			<InfoBlock
				title="Reduces cravings"
				infoBlock="Walking can curtail cravings for sugary snacks, both during and after the walk, which assists in regulating daily intake of sugary treats."
				link="https://health.clevelandclinic.org/benefits-of-walking/"
			/>
			<Box height="28px" />
			<InfoBlock
				title="Reduces risk of cancer"
				infoBlock="Regular walking (two and a half to five hours of moderate-intensity exercise per week) can reduce the risk of certain cancers like colon, breast, endometrial, kidney, liver, multiple myeloma, and non-Hodgkin lymphoma."
				link="https://health.clevelandclinic.org/benefits-of-walking/"
			/>
			<Box height="28px" />
			<InfoBlock
				title="Improves sleep quality"
				infoBlock="Walking can improve the quality of sleep each night, which is crucial for overall health and well-being."
				link="https://health.clevelandclinic.org/benefits-of-walking/"
			/>
			<Box height="28px" />
			<InfoBlock
				title="Building physical activity into life"
				infoBlock="Regular small bouts of walking, even if not continuous, can contribute significantly to physical fitness and weight management. It's recommended to gradually increase walking duration and intensity as fitness improves."
				link="https://www.betterhealth.vic.gov.au/health/healthyliving/walking-for-good-health"
			/>
		</Box>
	);
}
