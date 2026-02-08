import { useEffect } from "react";
import { useLocation } from "react-router-dom";

interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
  noIndex?: boolean;
}

const SEO = ({ title, description, canonical, noIndex = false }: SEOProps) => {
  const location = useLocation();

  useEffect(() => {
    document.title = title;

    const metaDescription = document.querySelector(
      'meta[name="description"]'
    );
    if (metaDescription) {
      metaDescription.setAttribute("content", description);
    }

    let canonicalLink = document.querySelector("link[rel='canonical']");
    if (!canonicalLink) {
      canonicalLink = document.createElement("link");
      canonicalLink.setAttribute("rel", "canonical");
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute(
      "href",
      canonical || `https://nyagenz.in${location.pathname}`
    );

    let robotsMeta = document.querySelector("meta[name='robots']");
    if (!robotsMeta) {
      robotsMeta = document.createElement("meta");
      robotsMeta.setAttribute("name", "robots");
      document.head.appendChild(robotsMeta);
    }
    robotsMeta.setAttribute(
      "content",
      noIndex ? "noindex, nofollow" : "index, follow"
    );
  }, [title, description, canonical, noIndex, location.pathname]);

  return null;
};

export default SEO;
