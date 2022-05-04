import {useHooks, useWeb3} from "@components/providers/web3";
import {useEffect} from "react";
import {useRouter} from "next/router";

const _isEmpty = data => {
    return (
        data == null ||
            data == "" ||
        (Array.isArray(data) && data.length === 0) ||
        (data.constructor === Object && Object.keys(data).length === 0)
    );
}


const enhanceHook = swrRes => {
    const {data, error} = swrRes;
    const hasInitialResponse = !!(data || error);
    const isEmpty = hasInitialResponse && _isEmpty(data);
    return {
        ...swrRes,
        isEmpty,
        hasInitialResponse
    }
}

export const useNetwork = () => {
    const swrRes = enhanceHook(useHooks(hooks => hooks.useNetwork)())
    return {
        network: swrRes
    }
}

export const useAccount = () => {
    const swrRes = enhanceHook(useHooks(hooks => hooks.useAccount)())
    return {
        account: swrRes
    }
}

export const useOwnedCourses = (...args) => {
    const swrRes = enhanceHook(useHooks(hooks => hooks.useOwnedCourses)(...args))

    return {
        ownedCourses: swrRes
    }
}

export const useOwnedCourse = (...args) => {
    const swrRes = enhanceHook(useHooks(hooks => hooks.useOwnedCourse)(...args))

    return {
        ownedCourse: swrRes
    }
}

export const useAdmin = ({redirectTo}) => {
    const { account } = useAccount()
    const { requireInstall } = useWeb3()
    const router = useRouter()
    // useEffect(() => {
    //     if ((
    //             requireInstall ||
    //             account.hasInitialResponse && account.isAdmin === false) ||
    //         account.isEmpty) {
    //
    //         router.push(redirectTo)
    //     }
    // }, [account, requireInstall, router, redirectTo])

    return { account }
}

export const useManagedCourses = (...args) => {
    const swrRes = enhanceHook(useHooks(hooks => hooks.useManagedCourses)(...args))

    return {
        managedCourses: swrRes
    }
}

export const useWalletInfo = () => {
    const {account} = useAccount();
    const {network} = useNetwork();
    const canPurchaseCourse = (account.data && network.isSupported);

    return {
        account,
        network,
        canPurchaseCourse
    }
}
