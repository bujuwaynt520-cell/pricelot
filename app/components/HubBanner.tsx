import type { PageImage } from "@/app/types";

interface HubBannerProps {
  title: string;
  description: string;
  image: PageImage;
  label?: string;
  children?: React.ReactNode;
}

export default function HubBanner({ title, description, image, label, children }: HubBannerProps) {
  return (
    <section className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950 text-white shadow-2xl">
      <img
        src={image.url}
        alt={image.alt}
        className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-20"
      />
      <div className="relative px-6 py-12 sm:px-10 sm:py-16 lg:px-12 lg:py-20">
        <div className="max-w-5xl">
          {label ? (
            <div className="mb-4 inline-flex items-center rounded-full bg-orange-500/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.35em] text-orange-200 ring-1 ring-orange-500/20">
              {label}
            </div>
          ) : null}
          <h1 className="text-3xl font-serif font-black tracking-tight text-white sm:text-4xl lg:text-5xl">
            {title}
          </h1>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-200 sm:text-base">
            {description}
          </p>
          {children ? <div className="mt-8">{children}</div> : null}
        </div>
      </div>
    </section>
  );
}
