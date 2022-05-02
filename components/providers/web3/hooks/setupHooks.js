import {handler as createUseAccount} from "@components/providers/web3/hooks/useAccount";
import {handler as createNetworkHook} from "@components/providers/web3/hooks/useNetwork";
import {handler as createOwnedCoursesHook} from "@components/providers/web3/hooks/useOwnedCourses";
import {handler as createOwnedCourseHook} from "@components/providers/web3/hooks/useOwnedCourse";
import {handler as createManagedCoursesHook } from "@components/providers/web3/hooks/useManagedCourses";


export const setupHooks = ({web3, provider, contract}) => {
    return {
        useAccount: createUseAccount(web3, provider),
        useNetwork: createNetworkHook(web3, provider),
        useOwnedCourses: createOwnedCoursesHook(web3, contract),
        useOwnedCourse: createOwnedCourseHook(web3, contract),
        useManagedCourses: createManagedCoursesHook(web3, contract)
    }
}
