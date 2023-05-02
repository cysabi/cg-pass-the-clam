import { useEffect, useState } from "preact/compat"

export const useReplicant = <T>(replicantName: string, initialValue: T): T => {
  const [value, updateValue] = useState<T>(initialValue)
  const replicant = nodecg.Replicant(...replicantName.split(".").reverse())

  const changeHandler = (newValue: T): void => {
    updateValue((oldValue) => {
      if (newValue !== oldValue) {
        return newValue
      }
      return JSON.parse(JSON.stringify(newValue))
    })
  }

  useEffect(() => {
    replicant.on("change", changeHandler)
    return () => {
      replicant.removeListener("change", changeHandler)
    }
  }, [replicant])

  return value
}

export default useReplicant
