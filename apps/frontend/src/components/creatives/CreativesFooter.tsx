interface CreativesFooterProps {
  brand: string;
  location?: string;
  mainSiteUrl?: string;
}

export default function CreativesFooter({ brand, location, mainSiteUrl }: CreativesFooterProps) {
  return (
    <footer className="border-t border-line bg-background py-8">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 text-center text-sm text-muted sm:px-6 md:flex-row md:text-left">
        <p>
          © {new Date().getFullYear()} {brand}. All rights reserved.
        </p>
        <div className="flex items-center gap-4">
          {location && <p>{location}</p>}
          {mainSiteUrl && (
            <a href={mainSiteUrl} className="transition-colors hover:text-brand">
              Main portfolio →
            </a>
          )}
        </div>
      </div>
    </footer>
  );
}
