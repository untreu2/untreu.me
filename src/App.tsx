import { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import { Layout } from './components/Layout'
import { altairLegal, legal, posts } from './content'
import { Article } from './pages/Article'
import { Home } from './pages/Home'
import { NotFound } from './pages/NotFound'

const AltairServer = lazy(() => import('./pages/AltairServer').then((module) => ({ default: module.AltairServer })))

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/posts/:slug"
          element={<Article collection={posts} />}
        />
        <Route
          path="/floyd/:slug"
          element={<Article collection={legal} />}
        />
        {['/altair/admin', '/altair/server'].map((path) => <Route key={path} path={path} element={<Suspense fallback={null}><AltairServer /></Suspense>} />)}
        <Route
          path="/altair/:slug"
          element={<Article collection={altairLegal} />}
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  )
}
