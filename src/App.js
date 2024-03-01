import logo from './logo.svg';
import './App.css';
import { SuperHeroes } from './component/SuperHeroes.page';
import { RQSuperHeroes } from './component/RQSuperHeroes.page';
import { HomePage } from './component/Home.page';
// for router
import { Link, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
// for react-query
import { QueryClient, QueryClientProvider } from 'react-query';
// for dev tools
import { ReactQueryDevtools } from 'react-query/devtools'
import { RQSuperHeroPage } from './component/RQSuperHero.page';
import { ParallelQueriesPage } from './component/ParellelQueries.page';
import { DynamicParallelPage } from './component/DynamicParallel.page';
import { DependentQueriesPage } from './component/DependentQueries.page';
import { PaginatedQueriesPage } from './component/PaginatedQueries.page';
import { InfiniteQueriesPage } from './component/InfiniteQueries.page';


// for react-query
const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div>
          <nav>
            <ul>
              <li>
                <Link to='/'>Home</Link>
              </li>
              <li>
                <Link to='/super-heroes'>Traditional Super Heroes</Link>
              </li>
              <li>
                <Link to='/rq-super-heroes'>RQ Super Heroes</Link>
              </li>
            </ul>
          </nav>
          <Routes>
            {/* //  added for infinite queries */}
            <Route path='/rq-infinite' element={<InfiniteQueriesPage />} />
            {/* //  added for paginated queries */}
            <Route path='/rq-paginated' element={<PaginatedQueriesPage />} />
            {/* // added for dependent queries */}
            <Route path='/rq-dependent'
              element={<DependentQueriesPage email='vishwas@example.com' />}
            />
            {/* // added for dynamic parallel queries */}
            <Route path='/rq-dynamic-parallel'
              element={<DynamicParallelPage heroIds={[1, 3]} />}
            />
            {/* //added for parallel queries */}
            <Route path='/rq-parallel' element={<ParallelQueriesPage />} />
            {/* // added for query by id */}
            <Route path='/rq-super-heroes/:heroId' element={<RQSuperHeroPage />} />
            <Route path='/super-heroes' element={<SuperHeroes />} />
            <Route path='/rq-super-heroes' element={<RQSuperHeroes />} />
            <Route path='/' exact element={<HomePage />} />
          </Routes>
        </div>
      </Router>
      <ReactQueryDevtools initialIsOpen={false} position='bottom-right' />
    </QueryClientProvider>
  );
}

export default App;
