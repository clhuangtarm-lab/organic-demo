import { Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/Home'
import ScenarioSelect from './pages/ScenarioSelect'
import KnowledgePage1 from './pages/KnowledgePage1'
import KnowledgePage2 from './pages/KnowledgePage2'
import QuizPage from './pages/QuizPage'
import TaskComplete from './pages/TaskComplete'
import CouponSuccess from './pages/CouponSuccess'
import MyCoupons from './pages/MyCoupons'

export default function App() {
  return (
    <div className="phone-shell">
      <Routes>
        <Route path="/"               element={<Home />} />
        <Route path="/scenario"       element={<ScenarioSelect />} />
        <Route path="/knowledge/1"    element={<KnowledgePage1 />} />
        <Route path="/knowledge/2"    element={<KnowledgePage2 />} />
        <Route path="/quiz"           element={<QuizPage />} />
        <Route path="/task-complete"  element={<TaskComplete />} />
        <Route path="/coupon-success" element={<CouponSuccess />} />
        <Route path="/my-coupons"     element={<MyCoupons />} />
        <Route path="*"               element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  )
}
