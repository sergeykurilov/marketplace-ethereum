const NETWORK_ID = process.env.NEXT_PUBLIC_TARGET_NETWORK_ID;

export const loadContract = async (name, web3) => {
  const res = await fetch(`/contracts/${name}.json`)
  const Artifact = await res.json()
  const contract = null;

  let deployedContract = null
  try {
    deployedContract = new web3.eth.Contract(
      Artifact.abi,
      Artifact.networks[NETWORK_ID].address
    )
  } catch {
    console.error(`Contract ${name} cannot be loaded`)
  }

  return deployedContract
}


// export const loadContract = async (name, provider) => {
//   const res = await fetch(`/contracts/${name}.json`)
//   const Artifact = await res.json()
//   const _contract = window.TruffleContract(Artifact)
//   _contract.setProvider(provider)
//
//   let deployedContract = null
//   try {
//     deployedContract = await _contract.deployed()
//   } catch {
//     console.log(`Contract ${name} cannot be loaded`)
//   }
//
//   return deployedContract
// }
