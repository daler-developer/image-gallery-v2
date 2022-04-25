import { useEffect } from 'react'

const useOnClickOutside = (ref, callback) => {
  useEffect(() => {
    const listener = (e) => {
      if (ref.current?.contains(e.target)) {
        return
      }

      callback(e)
    }

    document.addEventListener('click', listener)

    return () => {
      document.removeEventListener('click', listener)
    }
  }, [ref, callback])
}

export default useOnClickOutside
