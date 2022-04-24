import {useEffect} from "react";
import useSWR from "swr"

const adminAddresses = {
    "0x522fd268AaED52d9D181716Dedc0C256482Cf0c5": true,
};

export const handler = (web3, provider) => () => {
    const { data, mutate, ...rest } = useSWR(() =>
            web3 ? "web3/accounts" : null,
        async () => {
            const accounts = await web3.eth.getAccounts()
            return accounts[0]
        }
    )


    useEffect(() => {
        provider &&
        provider.on("accountsChanged",
            accounts => mutate(accounts[0] ?? null)
        )
    }, [provider])

    if(data) {
        console.log(web3.utils.keccak256(data))
    }

    return {
            data,
            isAdmin: (data && adminAddresses[data]) ?? false,
            mutate,
            ...rest
    }
}
