import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel'
import Categories from './components/Categories'
import ProductCarousel from '@/components/ProductCarousel'
import { useQuery } from '@tanstack/react-query'
import productsAPI from '@/api/products.api'
import Temp from './components/Temp'

export default function ProductList() {
  const { data: ProductDiscout } = useQuery({
    queryKey: ['products-dis'],
    queryFn: () => {
      return productsAPI.getProductsDiscout()
    }
  })

  const { data: ProductMeat } = useQuery({
    queryKey: ['products-meat'],
    queryFn: () => {
      return productsAPI.getProductMeatCategory()
    }
  })

  console.log(ProductMeat)

  const { data: ProductVes } = useQuery({
    queryKey: ['products-ves'],
    queryFn: () => {
      return productsAPI.getProductVesCategory()
    }
  })

  const { data: ProductOils } = useQuery({
    queryKey: ['products-oil'],
    queryFn: () => {
      return productsAPI.getProductOilsCategory()
    }
  })

  return (
    <div>
      <Categories />
      <div className='w-full'>
        <Carousel>
          <CarouselContent>
            <CarouselItem imageSrc='https://cdn.tgdd.vn/bachhoaxanh/banners/5599/game-vinamilk-0208202413357.png' />
            <CarouselItem imageSrc='https://cdn.tgdd.vn/bachhoaxanh/banners/5599/vu-lan-bao-hieu-maggi-giam-soc-08072024145215.jpg' />
            <CarouselItem imageSrc='https://cdn.tgdd.vn/bachhoaxanh/banners/5599/tich-luy-ulv-0708202410022.jpg' />
          </CarouselContent>
        </Carousel>
      </div>
      <ProductCarousel header='Khuyến mãi sốc' morePromotions={true} products={ProductDiscout?.data.data || []} />
      <Temp
        more={true}
        headerColor='text-white'
        mainColor='bg-[#8d96e8]'
        header='Các loại thịt'
        products={ProductMeat?.data.data || []}
      />

      <div className='w-full'>
        <Carousel>
          <CarouselContent>
            <CarouselItem imageSrc='https://cdn.tgdd.vn/bachhoaxanh/banners/5185/nam-kim-cham-km-soc-050820248302.jpg' />
            <CarouselItem imageSrc='https://cdn.tgdd.vn/bachhoaxanh/banners/5185/ca-hai-san-070820241417.jpg' />
            <CarouselItem imageSrc='https://cdn.tgdd.vn/bachhoaxanh/banners/5185/cu-qua-0208202410173.jpg' />
          </CarouselContent>
        </Carousel>
      </div>

      <Temp
        more={true}
        headerColor='text-[#006133]'
        mainColor='bg-[#EFFFF2]'
        header='Trái cây'
        products={ProductVes?.data.data || []}
      />

      <div className='w-full'>
        <Carousel>
          <CarouselContent>
            <CarouselItem imageSrc='https://cdn.tgdd.vn/bachhoaxanh/banners/5185/vu-lan-bao-hieu-maggi-giam-soc-08072024145843.jpg' />
            <CarouselItem imageSrc='https://cdn.tgdd.vn/bachhoaxanh/banners/5185/mua-hat-nem-meizan-tang-dau-01082024102820.jpg' />
            <CarouselItem imageSrc='https://cdn.tgdd.vn/bachhoaxanh/banners/5185/ctr-uu-dai-khach-cua-vib-3107202483435.png' />
          </CarouselContent>
        </Carousel>
      </div>

      <Temp
        more={true}
        headerColor='text-[#006133]'
        mainColor='bg-white'
        header='Dầu ăn nước chấm gia vị'
        products={ProductOils?.data.data || []}
      />
    </div>
  )
}
