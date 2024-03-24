import { BrowserRouter, Route, Routes } from 'react-router-dom'
import LandingPage from './containers/LandingPage'
import './App.css'
import BlogPage from './components/blogpage'
import { Blog } from './components/blog'
import CreateBlogPage from './components/CreateBlogsPage'


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/*' element={<LandingPage />} />
          <Route path='/blogs' element={<BlogPage />} />
          <Route path='/blog/:id' element={<Blog />} />
          <Route path='/createBlog' element={<CreateBlogPage />} />
        </Routes>
      </BrowserRouter>

    </>
  )
}

export default App