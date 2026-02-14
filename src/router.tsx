import { Suspense } from "react";
import { Navigate, Outlet, Route, Routes } from "react-router-dom";

import { GridScan } from "./components/grid-scan";
import PrimaryLoading from "./components/loadings/primary-loading";
import { PROTECTED_ROUTES, PUBLIC_ROUTES, UNPROTECTED_ROUTES } from "./constants/routes/route-list";
import { AuthRoutes } from "./features/auth/auth.routes";
import { ConversationRoutes } from "./features/conversations/conversation.routes";
import useAuth from "./hooks/use-auth";
import SidebarLayout from "./layouts/sidebar-layout";

export function ProtectedOutlet() {
  const isAuth = useAuth();

  return isAuth ? <Outlet /> : <Navigate to={AuthRoutes.paths.login} />;
}

export function UnprotectedOutlet() {
  const isAuth = useAuth();

  return isAuth ? <Navigate to={ConversationRoutes.paths.cover} /> : <Outlet />;
}

export function Router() {
  return (

    <Routes>

      {

        PUBLIC_ROUTES.map(route => (

          <Route

            key={route.path}

            path={route.path}

            element={(

              <Suspense fallback={<div className="flex items-center justify-center w-screen h-screen "><PrimaryLoading /></div>}>

                {route.element}

              </Suspense>

            )}

          />

        ))

      }

      <Route element={<UnprotectedOutlet />}>

        {

          UNPROTECTED_ROUTES.map(route => (

            <Route

              key={route.path}

              path={route.path}

              element={(

                <Suspense fallback={(

                  <div>

                    <div className="absolute inset-0 bg-black">

                      {/* <DarkVeil hueShift={55} noiseIntensity={0} scanlineFrequency={20} speed={2} warpAmount={0} resolutionScale={1} /> */}

                      <GridScan

                        sensitivity={0.55}

                        lineThickness={1}

                        gridScale={0.1}

                        scanOpacity={0.4}

                        enablePost

                        bloomIntensity={0.6}

                        chromaticAberration={0.002}

                        noiseIntensity={0.01}

                      />

                    </div>

                    <div className="flex items-center justify-center w-screen h-screen  text-white">

                      <PrimaryLoading />

                    </div>

                  </div>

                )}

                >

                  {route.element}

                </Suspense>

              )}

            />

          ))

        }

      </Route>

      <Route element={<ProtectedOutlet />}>

        <Route element={<SidebarLayout />}>

          {

            [...PROTECTED_ROUTES].map(route => (

              <Route

                key={route.path}

                path={route.path}

                element={route.element}

              />

            ))

          }

        </Route>

      </Route>

    </Routes>

  );
}
