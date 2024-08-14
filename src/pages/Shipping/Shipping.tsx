import goshipAPI from '@/api/goship.api'
import { Button } from '@/components/ui/button'
import { useProductContext } from '@/context/MyProvider'
import { schema, Schema } from '@/utils/rules'
import { yupResolver } from '@hookform/resolvers/yup'
import { useQuery } from '@tanstack/react-query'
import randomColor from 'randomcolor'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { toast } from 'sonner'

type formData = Pick<Schema, 'name' | 'phone' | 'city' | 'district' | 'address' | 'ward' | 'default'>
const addressSchema = schema.pick(['name', 'phone', 'city', 'district', 'address', 'ward', 'default'])

export default function Shipping() {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors }
  } = useForm<formData>({
    resolver: yupResolver(addressSchema),
    defaultValues: {
      address: '',
      city: '',
      district: '',
      name: '',
      phone: '',
      ward: ''
    }
  })
  const { setAddressProvide, address } = useProductContext()

  const { data: cities } = useQuery({
    queryKey: ['city'],
    queryFn: () => goshipAPI.getCity(),
    staleTime: Infinity
  })
  const city = watch('city')

  const { data: districts } = useQuery({
    queryKey: ['districts', city],
    queryFn: () => goshipAPI.getDistricts(city as string),
    enabled: !!city,
    staleTime: Infinity
  })

  const district = watch('district')
  const { data: wards } = useQuery({
    queryKey: ['wards', district],
    queryFn: () => goshipAPI.getWardsByDistrict(district),
    enabled: !!district,
    staleTime: 5000
  })

  const onSubmit = handleSubmit((data) => {
    console.log(data)
    setAddressProvide(data)
    toast.success('Thêm địa chỉ thành công')
    reset()
  })

  return (
    <div className='rounded-sm bg-white px-10 h-auto shadow flex flex-col py-5 box-border'>
      <h3 className='font-medium text-gray-800 text-base'>2. Địa chỉ giao hàng</h3>
      <h5 className='font-medium text-gray-500 text-sm py-3'>Chọn địa chỉ giao hàng có sẵn bên dưới:</h5>
      <div className='grid grid-cols-2 gap-4'>
        {address.map((address, index) => (
          <div
            key={index}
            className={`col-span-1 border border-dashed text-[13px] rounded-sm bg-white px-5 py-4 shadow flex flex-col`}
            style={{ borderColor: randomColor(), borderWidth: '1px' }}
          >
            <div className='flex justify-between'>
              <div className='text-gray-800 font-medium text-base'>{address.name}</div>
              <div className='text-green-500'>{address.default && 'Mặc định'}</div>
            </div>
            <div className='py-2'>Địa chỉ: {address.address}</div>
            <div>Điện thoại: {address.phone}</div>
          </div>
        ))}
      </div>
      <div>
        <div className='flex gap-2 text-sm py-5'>
          <span>Bạn muốn giao hàng đến địa chỉ khác?</span>{' '}
          <div className='text-blue-600 cursor-pointer'>Thêm địa chỉ giao hàng mới</div>
        </div>
        <form className='flex flex-col gap-4 py-4' onSubmit={onSubmit} method='post' noValidate>
          <div className='flex items-start gap-4'>
            <label htmlFor='name' className='w-1/4 text-right pt-3'>
              Họ tên
            </label>
            <div className='flex-1'>
              <input
                id='name'
                className='w-full text-black p-2 rounded-md outline-none border border-gray-300'
                {...register('name')}
              />
              <div className='mt-2 text-red-600 min-h-[1.25rem] text-sm'>{errors.name?.message}</div>
            </div>
          </div>

          <div className='flex items-start gap-4'>
            <label className='w-1/4 text-right pt-3'>Điện thoại di động</label>
            <div className='flex-1'>
              <input
                id='phoneNumber'
                {...register('phone')}
                className='w-full text-black p-2 rounded-md outline-none border border-gray-300'
              />
              <div className='mt-2 text-red-600 min-h-[1.25rem] text-sm'>{errors.phone?.message}</div>
            </div>
          </div>

          <div className='flex items-start gap-4'>
            <label htmlFor='country' className='w-1/4 text-right pt-3'>
              Tỉnh/Thành phố
            </label>
            <div className='flex-1'>
              <select
                className='w-full flex h-10 items-start justify-between rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none disabled:cursor-not-allowed disabled:opacity-50'
                {...register('city')}
              >
                {(cities?.data.data ?? []).map((city) => (
                  <option key={city.id} value={city.id}>
                    {city.name}
                  </option>
                ))}
              </select>
              <div className='mt-2 text-red-600 min-h-[1.25rem] text-sm'>{errors.city?.message}</div>
            </div>
          </div>

          <div className='flex items-start gap-4'>
            <label htmlFor='state' className='w-1/4 text-right pt-3'>
              Quận/Huyện
            </label>
            <div className='flex-1'>
              <select
                className='w-full flex h-10 items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none disabled:cursor-not-allowed disabled:opacity-50'
                {...register('district')}
              >
                {(districts?.data.data ?? []).map((district) => (
                  <option key={district.id} value={district.id}>
                    {district.name}
                  </option>
                ))}
              </select>
              <div className='mt-2 text-red-600 min-h-[1.25rem] text-sm'>{errors.district?.message}</div>
            </div>
          </div>

          <div className='flex items-start gap-4'>
            <label htmlFor='city' className='w-1/4 text-right pt-3'>
              Phường/Xã
            </label>
            <div className='flex-1'>
              <select
                className='w-full flex h-10 items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none disabled:cursor-not-allowed disabled:opacity-50'
                {...register('ward')}
              >
                {(wards?.data.data ?? []).map((ward) => (
                  <option key={ward.id} value={ward.id}>
                    {ward.name}
                  </option>
                ))}
              </select>
              <div className='mt-2 text-red-600 min-h-[1.25rem] text-sm'>{errors.ward?.message}</div>
            </div>
          </div>

          <div className='flex items-start gap-4'>
            <label htmlFor='addressDetails' className='w-1/4 text-right pt-3'>
              Địa chỉ
            </label>
            <div className='flex-1'>
              <textarea
                {...register('address')}
                id='addressDetails'
                className='w-full text-black p-2 rounded-md outline-none border border-gray-300'
                rows={3}
              />
              <div className='mt-2 text-red-600 min-h-[1.25rem] text-sm'>{errors.address?.message}</div>
            </div>
          </div>
          <div className='flex items-center'>
            <label htmlFor='addressDetails' className='w-1/4 text-right px-5'>
              Đặt địa chỉ mặt định
            </label>
            <input {...register('default')} type='checkbox' className='h-5 w-5 accent-orange mx-1' />
          </div>
          <Button type='submit' variant={'default'} className='bg-green-500 hover:bg-green-600'>
            Lưu thông tin
          </Button>
          <Link to={'/cart'} className='text-blue-400 hover:text-blue-500 text-center'>
            Quay lại
          </Link>
        </form>
      </div>
    </div>
  )
}
