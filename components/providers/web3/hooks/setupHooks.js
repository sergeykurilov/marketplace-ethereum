import {handler as createUseAccount} from "@components/providers/web3/hooks/useAccount";
import {handler as createNetworkHook} from "@components/providers/web3/hooks/useNetwork";


export const setupHooks = (...deps) => {
    return {
        useAccount: createUseAccount(...deps),
        useNetwork: createNetworkHook(...deps),
    }
}
