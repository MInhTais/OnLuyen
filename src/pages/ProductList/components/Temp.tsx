import { Link } from 'react-router-dom'
import { Products } from '@/types/product.type'
import ProductItem from '@/components/ProductItem'

interface ProductListProps {
  mainColor?: string
  products: Products[]
  header: string
  headerColor: string
  more: boolean
}

const Temp: React.FC<ProductListProps> = ({ header, more, headerColor, mainColor, products }) => {
  return (
    <div className={'relative mt-[14px] rounded-md px-4px mb-5 pb-3 ' + mainColor}>
      <div className={'pl-[4px] py-1 text-[20px] font-bold uppercase flex justify-center items-center ' + headerColor}>
        {header}
      </div>
      <div className='grid grid-cols-5 gap-3 px-3 py-3'>
        {products.map((product) => (
          <ProductItem product={product} key={product.id} />
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
