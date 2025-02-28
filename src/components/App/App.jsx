import { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import useStore from "../../zustand/store";
import Nav from "../Nav/Nav";
import HomePage from "../HomePage/HomePage";
import LoginPage from "../LoginPage/LoginPage";
import RegisterPage from "../RegisterPage/RegisterPage";
import FoundItemsList from "../Found Items/FoundItemsList";
import Tips_Guidelines from "../Tips_Guidelines/Tips_Guidelines";
import FoundItem from "../FoundItem/FoundItem";
import Category from "../Categories/Categories";
import Favorites from "../Favorites/Favorites";
import CategoriesLists from "../CategoryLists/CategoryLists";

function App() {
  const user = useStore((state) => state.user);
  const fetchUser = useStore((state) => state.fetchUser);
  const fetchFoundItems = useStore((state) => state.fetchFoundItems);
  const fetchCategories = useStore((state) => state.fetchCategories);


  useEffect(() => {
    fetchUser();
    fetchFoundItems();
    fetchCategories();
  }, [fetchUser, fetchFoundItems, fetchCategories]);

  return (
    <>
      <header>
        <h1>Into the Wild</h1>
        <Nav />
      </header>
      <main>
        <Routes>
          <Route
            path="/"
            element={
              user.id ? (
                <HomePage /> // Render HomePage for authenticated user.
              ) : (
                <Navigate to="/login" replace /> // Redirect unauthenticated user.
              )
            }
          />
          <Route
            path="/login"
            element={
              user.id ? (
                <Navigate to="/" replace /> // Redirect authenticated user.
              ) : (
                <LoginPage /> // Render LoginPage for unauthenticated user.
              )
            }
          />
          <Route
            path="/registration"
            element={
              user.id ? (
                <Navigate to="/" replace /> // Redirect authenticated user.
              ) : (
                <RegisterPage /> // Render RegisterPage for unauthenticated user.
              )
            }
          />
          <Route path='/tips_guidelines' element={<Tips_Guidelines/>}/>
          <Route path='/found' element={<FoundItemsList />} />
          <Route path='/found/:itemId' element={<FoundItem />} />
          <Route path='/items' element={<Category />} />
          <Route path='/favorites' element={<Favorites />} />
          <Route path='/categories/:categoryId' element={<CategoriesLists />} />

          <Route
            path="/about"
            element={
              <>
                <h2>About Page</h2>
                <p>
                  Intelligence doesn’t seem like an aspect of personal
                  character, and it isn’t. Coincidentally, great intelligence is
                  only loosely connected to being a good programmer.
                </p>
                <p>What? You don’t have to be superintelligent?</p>
                <p>
                  No, you don’t. Nobody is really smart enough to program
                  computers. Fully understanding an average program requires an
                  almost limitless capacity to absorb details and an equal
                  capacity to comprehend them all at the same time. The way you
                  focus your intelligence is more important than how much
                  intelligence you have…
                </p>
                <p>
                  …most of programming is an attempt to compensate for the
                  strictly limited size of our skulls. The people who are the
                  best programmers are the people who realize how small their
                  brains are. They are humble. The people who are the worst at
                  programming are the people who refuse to accept the fact that
                  their brains aren’t equal to the task. Their egos keep them
                  from being great programmers. The more you learn to compensate
                  for your small brain, the better a programmer you’ll be.
                  <span className="squiggle">
                    {" "}
                    The more humble you are, the faster you’ll improve.
                  </span>
                </p>
                <p>
                  --From Steve McConnell's <em>Code Complete</em>.
                </p>
              </>
            }
          />
          <Route path="*" element={<h2>404 Page</h2>} />
        </Routes>
      </main>
      <footer>
        <p>Copyright © {new Date().getFullYear()}</p>
      </footer>
    </>
  );
}

export default App;
