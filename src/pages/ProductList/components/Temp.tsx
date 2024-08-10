import { Link } from 'react-router-dom'
import { Products } from '@/types/product.type'
import { formatCurrency, generateNameId } from '@/utils/utils'
import { Button } from '@/components/ui/button'
import { useProductContext } from '@/context/MyProvider'
import { toast } from '@/components/ui/use-toast'

interface ProductListProps {
  mainColor?: string
  products: Products[]
  header: string
  headerColor: string
  more: boolean
}

const Temp: React.FC<ProductListProps> = ({ header, more, headerColor, mainColor, products }) => {
  const { addProduct } = useProductContext()

  function addToCart(product: Products): void {
    addProduct(product)
    toast({
      description: 'Thêm sản phẩm thành công'
    })
  }

  return (
    <div className={'relative mt-[14px] rounded-md px-4px mb-5 pb-3 ' + mainColor}>
      <div className={'pl-[4px] py-1 text-[20px] font-bold uppercase flex justify-center items-center ' + headerColor}>
        {header}
      </div>
      <div className='grid grid-cols-5 gap-3 px-3 py-3'>
        {products.map((product) => (
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
        ))}
      </div>
      {more ? (
        <Link to={'/'} className={'w-full h-7 flex justify-center hover:text-gray-800 ' + headerColor}>
          Xem Thêm {`>>`}
        </Link>
      ) : (
        ''
      )}
    </div>
  )
}

export default Temp
