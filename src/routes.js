import React from 'react';

// const EnquiryEntity = React.lazy(() => import('./views/components/EnquiryEntity'));
// const Dashboard = React.lazy(() => import('./views/Dashboard'));
// const Enquiry = React.lazy(() => import('./views/components/SourceCustomer/Enquiry/index'));
// const Users = React.lazy(() => import('./views/Users/Users'));
// const User = React.lazy(() => import('./views/Users/User'));
// const AllTrips = React.lazy(() => import('./views/components/Trips/TripsP3/index'));
// // const TripDetails = React.lazy(() => import('./views/components/Trips/details/index'));
// const TripDetails = React.lazy(() => import('./views/components/Trips/TripsP3/tripDetail'));
// const TransporterEnquiryDetail = React.lazy(() => import('./views/components/CTEnquiry/transporterDetails'));
//  const Vehicles = React.lazy(() => import('./views/components/Vehicles/VehiclesQuery'));
// const Goods = React.lazy(() => import('./views/components/Goods/GoodsQuery'));
// const QueryCustomer = React.lazy(() => import('./views/components/SourceCustomer/queryCustomer'));
// const ControlTower = React.lazy(() => import('./views/components/CTEnquiry/ctscEnquiry'));
// const TransporterEnquiry = React.lazy(() => import('./views/components/CTEnquiry/ctGroupEnquiry'));
// const SourceCustomer = React.lazy(() => import('./views/components/CTEnquiry/ctscEnquiry'));
// const TransporterList = React.lazy(() => import('./views/components/TransporterList'));
// const Profile = React.lazy(() => import('./views/components/Profile/Profile'));
// const Contracts = React.lazy(() => import('./views/components/Contracts/Contract'));
// const EnrollDriver =  React.lazy(() => import('./views/components/Drivers/EnrollDrivers'));
// const PendingEnrollDriver =  React.lazy(() => import('./views/components/Drivers/PendingEnrollDriver'));
// const ManageUsers = React.lazy(() => import('./views/components/SourceCustomer/User/manageUser'));
// const City=React.lazy(()=>import('./views/components/city'));
// const ChangePassword = React.lazy(() => import('./views/components/Profile/Password'));
// const B2B = React.lazy(() => import('./views/components/b2b'));
// const CTEnquiryDetails=React.lazy(() => import('./views/components/CTEnquiry/ctEnquiryDetails'));
const QuestionPanel=React.lazy(() => import('./view/quizz/questionpanel'));
const Dashboard = React.lazy(()=> import('./view/defaultLayout/dashboard'));
const AdminPanal = React.lazy(()=> import('./view/adminpanel/index'));
const QuizPlayground  = React.lazy(()=> import('./view/quizz/quizplayground'))
const LoginComponent = React.lazy(()=>import('./view/defaultLayout/login'))
const routes = [
//   { path: '/', exact: true, name: 'Home' },
//   { path: '/dashboard', name: 'Dashboard', component: Dashboard },
//   { path: '/scustenquiry/:type', name: 'SourceCustomer', component: SourceCustomer },
//   { path: '/users', exact: true,  name: 'Users', component: Users },
//   { path: '/manageuser', exact: true,  name: 'ManageUsers', component: ManageUsers },
//   { path: '/users/:id', exact: true, name: 'User Details', component: User },
//   { path: '/queryEntity', exact: true, name: 'QueryEntity', component: EnquiryEntity },
//   { path: '/trips/:type', exact: true, name: 'AllTrips', component: AllTrips },
//   // { path: '/trips/:type/:id', exact: true, name: 'TripDetails', component: TripDetails },
//   { path: '/trips/:type/:id', exact: true, name: 'TripDetails', component: TripDetails },
//   { path: '/goods', exact: true, name: 'Goods', component: Goods },
//   { path: '/vehicles', exact: true, name: 'Vehicles', component: Vehicles },
//   { path: '/queryCustomer/:type', exact: true, name: 'QueryCustomer', component: QueryCustomer },
//   { path: '/enquiries/:type', exact: true, name: 'ControlTower', component: ControlTower },

//   { path: '/transporterEnquiries', exact: false, name: 'ControlTower', component: TransporterEnquiry },
//   { path: '/contracts', exact: true, name: 'Contracts', component: Contracts },
//   { path: '/drivers/pendingenroll', exact: true, name: 'PendingEnrollDriver', component: PendingEnrollDriver },
//   { path: '/profile', exact: true, name: 'Profile', component: Profile },
//   { path: '/drivers/enroll', exact: true, name: 'EnrollDrivers', component: EnrollDriver },
//   { path: '/city',exact:true,name:'City',component:City},
//   { path: '/b2b',exact:true,name:'B2B',component:B2B},
//   { path: '/enquiry/:type/:id',exact:true,name:'B2B',component:CTEnquiryDetails},
//   { path: '/trEnquiries/details/:id',exact:true,name:'B2B',component:TransporterEnquiryDetail},
//   { path: '/trEnquiries/details/:id/:id',exact:true,name:'B2B',component:TransporterEnquiryDetail},
  { path: '/quiz/:id',exact:true,name:'Quiz',component:QuestionPanel},
  { path: '/',exact:true,name:'Dashboard',component:Dashboard},
  { path: '/admin',exact:true,name:'AdminPanal',component:AdminPanal},
  { path: '/play',exact:true,name:'QuizPlayground',component:QuizPlayground},
  { path: '/login',exact:true,name:'Login',component:LoginComponent}

];

export default routes;