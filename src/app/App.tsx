import './Null.scss'
import React, {
	useLayoutEffect,
	useRef,
	useEffect,
	useState,
	ComponentType,
} from 'react'
import { BrowserRouter, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

import {
	RouterProvider,
	BrowserRouter as Router,
	Route,
	Routes,
	Outlet,
	useLocation,
} from 'react-router-dom'
import { Provider } from 'react-redux'

// components
import Header from '../components/header/Header'
import Footer from '../components/footer/Footer'

// pages
import Main from '../pages/main/Main'
import NewList from '../pages/newList/NewList'
import FullDescItem from '../pages/fullDescItem/FullDescItem'
import RandomAnime from '../pages/randomAnime/RandomAnime'
import SearchHeader from '../components/searchHeader/SearchHeader'
import Contacts from '../pages/contacts/Contacts'
import Login from '../pages/login/Login'
import Registration from '../pages/regisration/Registration'
import LoginUserCabinet from '../pages/loginUserCabinet/LoginUserCabinet'
import Error from '../pages/error/Error'

import ScrollToTop from '../components/scrollToTop/index'

// router
import { router } from '../router/router'
// -------------------------------------------------------

import store from '../store/index'
import {
	ErrorBoundary,
	ErrorBoundaryProps,
	FallbackProps,
	withErrorBoundary,
} from 'react-error-boundary'
import { ErrorFallback } from '../pages/ErrorFallback/ErrorFallback'
import Layout from '../containers/layout/Layout'

import ParticlesBg from 'particles-bg'
import ParticlesBgMain from '../containers/particlesBgMain/ParticlesBgMain'

import {
	useWindowSize,
	useWindowWidth,
	useWindowHeight,
} from '@react-hook/window-size'
import { error } from 'console'

const App = () => {
	// скролл вверх при переходе на др стр
	// // Scroll to top if path changes
	// useLayoutEffect(() => {
	//   window.scrollTo(0, 0);
	// }, [location.pathname]);

	// return (
	//   <div className="wrapper">
	//     {/* <ParticlesBg color="#d1aee3" num={50} type="cobweb" bg={true} /> */}

	//     <Header />
	//     <div className="container">
	//       <Routes>
	//         <Route path="/" element={<Main />} />
	//         <Route path="fullDescItem/:id" element={<FullDescItem />} />
	//         <Route path="new/" element={<NewList />} />
	//         <Route path="random-anime/" element={<RandomAnime />} />
	//         <Route path="search/" element={<SearchHeader />} />
	//         <Route path="contacts" element={<Contacts />} />
	//         <Route path="login" element={<Login />} />
	//         <Route path="login/user/:id" element={<LoginUserCabinet />} />
	//         <Route path="registration" element={<Registration />} />
	//         <Route path="*" element={<Error />} />
	//       </Routes>
	//     </div>
	//     <Footer />
	//   </div>

	// useScript('./particles.js');
	// <BrowserRouter>
	//  {/* <RouterProvider router={router} />{' '} */}
	//  </BrowserRouter>
	//  {/* <ParticlesBg color="#d1aee3" num={50} type="cobweb" bg={true} /> */}
	//{/* <Outlet /> */}
	// <Layout />

	// const animeItems = useSelector(itemsAnime)

	const refRoot = useRef<HTMLDivElement>(null)
	const wrapperRef = useRef<HTMLDivElement>(null)

	return (
		<Provider store={store}>
			<BrowserRouter>
				<ScrollToTop refEl={refRoot} />

				<div ref={wrapperRef} className='wrapper'>
					<Header />
					<div className='container' ref={refRoot}>
						<Routes>
							<Route path='/' element={<Main />} />
							<Route
								path='fullDescItem/:id'
								element={<FullDescItem flagRandomAnime={false} />}
							/>
							<Route path='new/' element={<NewList />} />
							<Route path='random-anime/' element={<RandomAnime />} />
							<Route path='search/' element={<SearchHeader />} />
							<Route path='contacts' element={<Contacts />} />
							<Route path='login' element={<Login />} />
							<Route path='login/user/:id' element={<LoginUserCabinet />} />
							<Route path='registration' element={<Registration />} />
							<Route path='*' element={<Error />} />
						</Routes>
					</div>
					<Footer />
				</div>
			</BrowserRouter>
		</Provider>
	)
}

export default withErrorBoundary(App, {
	FallbackComponent: (<ErrorFallback error={undefined} />) as any,
})
{
	/* <ComponentType<FallbackProps> | undefined> */
}
