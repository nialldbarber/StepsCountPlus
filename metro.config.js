const { getDefaultConfig, mergeConfig } = require("@react-native/metro-config");

const {
	createSentryMetroSerializer,
} = require("@sentry/react-native/dist/js/tools/sentryMetroSerializer");

const defaultSourceExts =
	require("metro-config/src/defaults/defaults").sourceExts;

const config = {
	resolver: {
		sourceExts:
			process.env.MY_APP_MODE === "mocked"
				? ["mock.js", ...defaultSourceExts]
				: defaultSourceExts,
	},
	serializer: {
		customSerializer: createSentryMetroSerializer(),
	},
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
