import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { BrowserRouter, createBrowserRouter, RouterProvider } from "react-router-dom";
import PhotosGallery from "./pages/Photosgallery/PhotosGallery.jsx";



const queryClient = new QueryClient();


const router = createBrowserRouter([
  {
    path: '/',
    element:<PhotosGallery/>
  }
])


function App() {
 

  return (
    <QueryClientProvider
      client={queryClient}>
      <div className="bg-gray-950 text-white min-h-screen">

      <RouterProvider router={router}/>
      </div>
       <ReactQueryDevtools
        initialIsOpen={false}
      />
    </QueryClientProvider>
  );
}

export default App;
