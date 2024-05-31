import { getSbVersion, useRuntimeConfig } from "#imports";

export function useSbVersion() {
    const { public: { isProd } } = useRuntimeConfig();
    return getSbVersion(isProd);
}