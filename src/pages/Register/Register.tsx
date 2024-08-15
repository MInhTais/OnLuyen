import authAPI from '@/api/auth.api'
import { Button } from '@/components/ui/button'
import { useProductContext } from '@/context/MyProvider'
import { schema, Schema } from '@/utils/rules'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import { Lock, Mail, ShieldCheck } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

type formData = Pick<Schema, 'email' | 'password' | 'confirm_password'>
const loginSchema = schema.pick(['email', 'password', 'confirm_password'])

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

export default function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<formData>({
    resolver: yupResolver(loginSchema)
  })

  const oauthURL = getOauthGoogleUrl()

  const registerMutation = useMutation({
    mutationFn: (body: Omit<formData, 'confirm_password'>) => authAPI.registerAccout(body)
  })

  const onSubmit = handleSubmit((data) => {
    registerMutation.mutateAsync(data, {
      onSuccess: (data) => {
        toast.success(data.data.message)
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
      <div className='w-3/5 pt-20'>
        <form className='rounded bg-white p-4 shadow-sm md:p-10' onSubmit={onSubmit} method='post' noValidate>
          <div className='text-2xl font-medium text-center'>Đăng kí</div>
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
            <div className='mt-1 text-red-600 min-h-[1.25rem] text-sm'>{errors.confirm_password?.message}</div>
          </div>

          <div className='relative mt-4'>
            <div className='relative col-span-3 lg:col-span-2'>
              <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
                <ShieldCheck className='h-5 w-5 text-gray-500' />
              </div>
              <input
                type='password'
                placeholder='Nhập lại mật khẩu'
                className='w-full text-black p-2 pl-10 rounded-md outline-none border border-gray-300'
                {...register('confirm_password')}
              />
            </div>
            <div className='mt-1 text-red-600 min-h-[1.25rem] text-sm'>{errors.confirm_password?.message}</div>
          </div>

          <div className='flex gap-4 mt-5'>
            <Button type='submit' variant={'default'} className='bg-green-500 hover:bg-green-600 w-1/2'>
              Đăng Kí
            </Button>
            <Link
              className='w-1/2 flex items-center justify-center rounded-md border border-input bg-background hover:bg-accent hover:text-accent-foreground'
              to={oauthURL}
            >
              <Mail className='mr-2 h-4 w-4' /> Đăng kí với Google
            </Link>
          </div>
          <div className='mt-8 flex items-center justify-center'>
            <span className='text-gray-400'>Bạn đã có tài khoản?</span>
            <Link className='ml-1 text-green-400' to='/login'>
              Đăng nhập
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}
