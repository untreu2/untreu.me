import { Route, Routes } from 'react-router-dom'
import { Layout } from './components/Layout'
import { legal, posts } from './content'
import { Article } from './pages/Article'
import { Home } from './pages/Home'
import { NotFound } from './pages/NotFound'

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
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  )
}
