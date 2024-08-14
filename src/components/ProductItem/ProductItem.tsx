import { Products } from '@/types/product.type'
import { formatCurrency, generateNameId } from '@/utils/utils'
import { Link } from 'react-router-dom'
import { Button } from '../ui/button'
import { useProductContext } from '@/context/MyProvider'
import { toast } from 'sonner'

export default function ProductItem({ product }: { product: Products }) {
  const { addProduct } = useProductContext()

  function addToCart(product: Products): void {
    addProduct(product)
    toast.success('Thêm sản phẩm thành công')
  }

  return (
    <div key={product.id} className={`w-1/5} flex flex-col border-[2px] border-white rounded-md`}>
      <Link to={`${'/'}${generateNameId({ name: product.name, id: product.id })}`}>
        <div className='h-5/7'>
          <img src={product.image} alt={product.name} className='w-full h-auto object-cover' />
          <h3 className='text-sm px-2 h-20'>{product.name}</h3>
        </div>
      </Link>
      <div className='flex flex-col justify-start px-2 py-2 h-auto items-center gap-3'>
        <div className='flex items-center gap-5'>
          {product.dis_price === 0 ? (
            <div className='text-yellow-400 font-medium flex items-center gap-1 pb-4'>
              {formatCurrency(product.price)}
              <span className='text-xs'>₫</span>
            </div>
          ) : (
            <div>
              <div className='text-yellow-400 font-medium flex items-center gap-1'>
                {formatCurrency(product.dis_price)}
                <span className='text-xs'>₫</span>
              </div>
              <div className='text-white text-xs line-through flex items-center gap-1'>
                {formatCurrency(product.price)}
                <span className='text-xs'>₫</span>
              </div>
            </div>
          )}
        </div>
        <Button
          className='mt-auto flex h-[28px] w-full items-center justify-center rounded-[6px] bg-[#D8ECD4] text-13 font-bold uppercase text-[#007E42] hover:bg-[#e4f5e7] lg:h-[36px] lg:text-16 py-[8px]'
          onClick={() => addToCart(product)}
        >
          Mua
        </Button>
      </div>
    </div>
  )
}
