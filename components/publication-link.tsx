import type { ReactNode } from "react";
import { publicationLinks } from "@/content/site-copy";

export function PublicationLink({ resource, children, className }: {
  resource: keyof typeof publicationLinks;
  children: ReactNode;
  className?: string;
}) {
  const { href, pending } = publicationLinks[resource];
  return (
    <a href={href} className={className}
      data-publication-pending={pending ? "true" : undefined}
      title={pending ? "Publication link pending: replace before launch" : undefined}>
      {children}
      {pending ? <span className="publication-link__note"> (link pending)</span> : null}
    </a>
  );
}
