import { yupResolver } from '@hookform/resolvers/yup'
import { Button } from '@/components/ui/button'
import { useProductContext } from '@/context/MyProvider'
import { schema, Schema } from '@/utils/rules'
import { Lock, Mail } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import authAPI from '@/api/auth.api'
import { toast } from 'sonner'

type formData = Pick<Schema, 'email' | 'password'>
const loginSchema = schema.pick(['email', 'password'])

export const getOauthGoogleUrl = () => {
  const { VITE_GOOGLE_CLIENT_ID, VITE_GOOGLE_AUTHORIZED_REDIRECT_URI } = import.meta.env
  const rootUrl = 'https://accounts.google.com/o/oauth2/v2/auth'
  const options = {
    redirect_uri: VITE_GOOGLE_AUTHORIZED_REDIRECT_URI,
    client_id: VITE_GOOGLE_CLIENT_ID,
    access_type: 'offline',
    response_type: 'code',
    prompt: 'consent',
    scope: ['https://www.googleapis.com/auth/userinfo.profile', 'https://www.googleapis.com/auth/userinfo.email'].join(
      ' '
    )
  }
  const qs = new URLSearchParams(options)
  return `${rootUrl}?${qs.toString()}`
}

export default function LoginPage() {
  const { setIsAuthenticated, setProfile } = useProductContext()
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<formData>({
    resolver: yupResolver(loginSchema)
  })

  const oauthURL = getOauthGoogleUrl()

  const navigate = useNavigate()

  const loginMutation = useMutation({
    mutationFn: (body: Omit<formData, 'confirm_password'>) => authAPI.loginAccount(body)
  })

  const onSubmit = handleSubmit((data) => {
    loginMutation.mutateAsync(data, {
      onSuccess: (data) => {
        const message = data.data.message
        const user = data.data.data.user
        toast.success(message)
        setIsAuthenticated(true)
        setProfile(user)
        navigate('/')
      },
      onError: (error: any) => {
        console.log(error)
        const message = error.response.data.data.password
        toast.error(message)
      }
    })
  })

  return (
    <div className='h-96 flex justify-center items-center my-5'>
      <div className='w-3/5'>
        <form className='rounded bg-white p-4 shadow-sm md:p-10' onSubmit={onSubmit} method='post' noValidate>
          <div className='text-2xl font-medium text-center'>Đăng nhập</div>
          <div className='relative mt-8'>
            <div className='relative col-span-3 lg:col-span-2'>
              <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
                <Mail className='h-5 w-5 text-gray-500' />
              </div>
              <input
                type='email'
                placeholder='Nhập vào email'
                className='w-full text-black p-2 pl-10 rounded-md outline-none border border-gray-300'
                {...register('email')}
              />
            </div>
            <div className='mt-2 text-red-600 min-h-[1.25rem] text-sm'>{errors.email?.message}</div>
          </div>
          <div className='relative mt-4'>
            <div className='relative col-span-3 lg:col-span-2'>
              <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
                <Lock className='h-5 w-5 text-gray-500' />
              </div>
              <input
                type='password'
                placeholder='Nhập vào mật khẩu'
                className='w-full text-black p-2 pl-10 rounded-md outline-none border border-gray-300'
                {...register('password')}
              />
            </div>
            <div className='mt-1 text-red-600 min-h-[1.25rem] text-sm'>{errors.password?.message}</div>
          </div>
          <div className='flex gap-4 mt-5'>
            <Button
              disabled={loginMutation.isPending}
              type='submit'
              variant={'default'}
              className='bg-green-500 hover:bg-green-600 w-1/2'
            >
              {loginMutation.isPending && (
                <svg
                  aria-hidden='true'
                  className='mr-2 h-4 w-4 animate-spin fill-white text-gray-200 '
                  viewBox='0 0 100 101'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    d='M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z'
                    fill='currentColor'
                  />
                  <path
                    d='M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z'
                    fill='currentFill'
                  />
                </svg>
              )}
              Đăng nhập
            </Button>
            <Link
              className='w-1/2 flex items-center justify-center rounded-md border border-input bg-background hover:bg-accent hover:text-accent-foreground'
              to={oauthURL}
            >
              <Mail className='mr-2 h-4 w-4' /> Đăng nhập với Google
            </Link>
          </div>
          <div className='mt-8 flex items-center justify-center'>
            <span className='text-gray-400'>Bạn chưa có tài khoản?</span>
            <Link className='ml-1 text-green-400' to='/register'>
              Đăng ký
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}
