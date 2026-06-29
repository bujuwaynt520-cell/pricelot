import { AppConfig } from "./appConfig";

export function featureEnabled(
  feature: keyof typeof AppConfig.features
) {
  return AppConfig.features[feature];
}