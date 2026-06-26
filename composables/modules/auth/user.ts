import { useCookie, useRouter } from '#imports'
import type { User } from '~/types'

export const useUser = () => {
  const user = useCookie<User | null>('admin_user_data', { default: () => null })
  const token = useCookie<string | null>('admin_token', { default: () => null })
  
  const logOut = () => {
    user.value = null
    token.value = null
    
    if (import.meta.client) {
      window.location.href = '/auth/login'
    }
  }

  const setUser = (userData: User, userToken?: string) => {
    user.value = userData
    if (userToken) {
      token.value = userToken
    }
  }

  return { user, token, logOut, setUser }
}
