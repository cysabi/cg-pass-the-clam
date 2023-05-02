/**
 * A base react hook, to be implemented in other custom replicant hooks.
 */
import { useEffect, useState } from "react"

export type ReplicantParameters<T> = {
  name: string
  namespace?: string | any
  opts?: any
  defaultValue?: T
}

const useReplicant = <T, U>({
  name,
  namespace,
  opts,
  defaultValue,
}: ReplicantParameters<T>): [T | U, (input: T) => void] => {
  const [value, setValue] = useState<T | U>()
  const replicant = nodecg.Replicant(name, namespace, opts)

  // Set state on replicant change
  useEffect(() => {
    const update = (newValue: T): void => {
      console.debug(`Update replicant value for '${name}'`, newValue)
      setValue(newValue)
    }
    replicant.on("change", update)
    return () => {
      replicant.removeListener("change", update)
    }
  }, [replicant])

  // Set default replicant value
  useEffect(() => {
    NodeCG.waitForReplicants(replicant).then(() => {
      if (replicant.value === undefined) {
        console.debug(`Initialize replicant value for '${name}'`, defaultValue)
        replicant.value = defaultValue
      }
    })
  }, [])

  return [
    value as T | U,
    (input) => {
      replicant.value = input
    },
  ]
}

export default useReplicant
