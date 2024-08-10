import categoryAPI from '@/api/category.api'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'

const ProductCategories = () => {
  const { data: CategoryData } = useQuery({
    queryKey: ['category'],
    queryFn: () => {
      return categoryAPI.getCategories()
    }
  })
  return (
    <aside className='bg-white w-64 p-4'>
      <nav>
        <ul>
          <Accordion key={'km'} type='single' collapsible>
            <AccordionItem value='item-1'>
              <AccordionTrigger hiddenIcon className='uppercase text-sm'>
                {'Khuyến mãi sốc'}
              </AccordionTrigger>
            </AccordionItem>
          </Accordion>
          {CategoryData?.data.data.map((category, index) => (
            <Accordion key={index} type='single' collapsible>
              <AccordionItem value={`item-${category.id}`}>
                <AccordionTrigger className='uppercase text-sm'>{category.categorieName}</AccordionTrigger>
                <AccordionContent className='space-y-2 flex flex-col'>
                  {category.categoriesLevel2.map((subCategory) => (
                    <Link to={`categories/` + subCategory.id} key={subCategory.id}>
                      {subCategory.categorieName2}
                    </Link>
                  ))}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          ))}
        </ul>
      </nav>
    </aside>
  )
}

export default ProductCategories
