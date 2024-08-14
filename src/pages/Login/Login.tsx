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

export default function LoginPage() {
  const { setIsAuthenticated, setProfile } = useProductContext()
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<formData>({
    resolver: yupResolver(loginSchema)
  })
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
                placeholder='Nhập vào mật khẩu'
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
          <div className='flex flex-col mt-5'>
            <Button type='submit' variant={'default'} className='bg-green-500 hover:bg-green-600'>
              Đăng nhập
            </Button>
            <div className='mt-8 flex items-center justify-center'>
              <span className='text-gray-400'>Bạn chưa có tài khoản?</span>
              <Link className='ml-1 text-green-400' to='/register'>
                Đăng ký
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
