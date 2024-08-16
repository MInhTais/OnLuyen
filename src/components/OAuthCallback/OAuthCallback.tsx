import { useEffect, useState } from 'react'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { useProductContext } from '@/context/MyProvider'
import { toast } from 'sonner'
import { saveAccessTokenToLocalStorage, saveRefreshTokenToLocalStorage, saveUserToLocalStorage } from '@/utils/auth'

export default function OAuthCallback() {
  const { setIsAuthenticated, setProfile } = useProductContext()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const [hasShownToast, setHasShownToast] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => {
    if (!hasShownToast) {
      const accessToken = searchParams.get('access_token')
      const refreshToken = searchParams.get('refresh_token')
      const userParam = searchParams.get('user')
      const type = searchParams.get('type')
      const message = searchParams.get('message')

      console.log(type)
      if (type === 'error') {
        toast.error(message)
        navigate('/')
      } else if (accessToken && refreshToken && userParam) {
        const user = JSON.parse(decodeURIComponent(userParam))
        console.log(user)
        if (user) {
          setIsAuthenticated(true)
          setProfile(user)
          saveAccessTokenToLocalStorage(accessToken)
          saveRefreshTokenToLocalStorage(refreshToken)
          saveUserToLocalStorage(user)
          if (pathname === '/login/oauth') {
            toast.success('Đăng nhập thành công')
          } else {
            toast.success('Tài khoản đã được xác thực')
          }
          navigate('/')
        }
      } else {
        toast.error('Failed to authenticate')
        navigate('/login')
      }
    }
    setHasShownToast(true)
  }, [])

  return null
}
