import { Navigate, Outlet, useRoutes } from 'react-router-dom'
import MainLayout from './layout/Main'
import ProductList from './pages/ProductList'
import ProductDetail from './pages/ProductDetail'
import Cart from './pages/Cart'
import LoginPage from './pages/Login'
import { useProductContext } from './context/MyProvider'
import CartLayout from './layout/Cart'
import Checkout from './pages/Checkout'
import Shipping from './pages/Shipping'
import Categories from './pages/Categories/Categories'
import OAuthCallback from './components/OAuthCallback'
import RegisterPage from './pages/Register/Register'
import AdminLayout from './layout/AdminLayout'
import AdminDashboard from './pages/AdminDashboard'
import AdminProduts from './pages/AdminProduts'

function ProtectedRoute() {
  const { isAuthenticated, profile } = useProductContext()
  console.log(profile?.decentralizations)
  const isAdmin = profile?.decentralizations.find((e) => e.roleName === 'ADMIN')
  return isAuthenticated && isAdmin !== undefined ? <Outlet /> : <Navigate to='/cart' />
}

function RejectedRoute() {
  const { isAuthenticated } = useProductContext()
  return !isAuthenticated ? <Outlet /> : <Navigate to='/' />
}

function ProtectedCheckoutRoute() {
  const { isAuthenticated, selectedProducts, address, getDefaultAddress } = useProductContext()
  const defaultAddress = getDefaultAddress()

  if (!isAuthenticated) {
    return <Navigate to='/login' />
  }

  if (selectedProducts.length === 0) {
    return <Navigate to='/cart' />
  }

  if (address.length === 0 || !defaultAddress?.default) {
    return <Navigate to='/shipping' />
  }
  return <Outlet />
}

export default function useRouteElement() {
  const routeElements = useRoutes([
    {
      path: '/',
      element: (
        <MainLayout>
          <ProductList />
        </MainLayout>
      )
    },
    {
      path: '/:nameId',
      element: (
        <MainLayout>
          <ProductDetail />
        </MainLayout>
      )
    },
    {
      path: '/categories/:categoryId',
      element: (
        <MainLayout>
          <Categories />
        </MainLayout>
      )
    },
    {
      path: '/cart',
      element: (
        <CartLayout>
          <Cart />
        </CartLayout>
      )
    },
    {
      path: '/shipping',
      element: (
        <CartLayout>
          <Shipping />
        </CartLayout>
      )
    },
    {
      path: '',
      element: <RejectedRoute />,
      children: [
        {
          path: '/login',
          element: (
            <MainLayout>
              <LoginPage />
            </MainLayout>
          )
        },
        {
          path: '/login/oauth',
          element: (
            <MainLayout>
              <OAuthCallback />
            </MainLayout>
          )
        },
        {
          path: '/auth/verify-password',
          element: (
            <MainLayout>
              <OAuthCallback />
            </MainLayout>
          )
        },
        {
          path: '/register',
          element: (
            <MainLayout>
              <RegisterPage />
            </MainLayout>
          )
        }
      ]
    },
    {
      path: '',
      element: <ProtectedCheckoutRoute />,
      children: [
        {
          path: '/checkout',
          element: (
            <CartLayout>
              <Checkout />
            </CartLayout>
          )
        }
      ]
    },
    {
      path: '/admin',
      element: <ProtectedRoute />,
      children: [
        {
          path: '',
          element: (
            <AdminLayout>
              <AdminDashboard />
            </AdminLayout>
          )
        },
        {
          path: 'dashboard',
          element: (
            <AdminLayout>
              <AdminDashboard />
            </AdminLayout>
          )
        },
        {
          path: 'products',
          element: (
            <AdminLayout>
              <AdminProduts />
            </AdminLayout>
          )
        }
      ]
    },
    {
      path: '/about',
      element: (
        <MainLayout>
          <ProductList />
        </MainLayout>
      )
    }
  ])

  return routeElements
}
