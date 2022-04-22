import {handler as createUseAccount} from "@components/providers/web3/hooks/useAccount";


export const setupHooks = (...deps) => {
    return {
        useAccount: createUseAccount(...deps)
    }
}
