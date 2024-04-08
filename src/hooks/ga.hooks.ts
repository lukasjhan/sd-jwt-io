import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const GA_TRACKING_ID = 'G-YSLD6T408C';

function usePageViews() {
  const location = useLocation();

  useEffect(() => {
    (window as any).gtag('config', GA_TRACKING_ID, {
      page_path: location.pathname + location.search,
    });
  }, [location]);
}

export default function RouteTracker() {
  usePageViews();
  return null;
}
