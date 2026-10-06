import Link from "next/link";
import Image from "next/image";
import { Plus, ArrowRight, Clock } from "lucide-react";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { blurDataURL } from "@/lib/blur";

interface LearningCardProps {
  title: string;
  description: string;
  href: string;
  image: string;
  badge?: string;
  variant?: "read" | "simulation";
  /** Minutes to read — pill shows next to badge when provided. */
  readingTime?: number;
  /** Set for the first above-fold card so it preloads (LCP). */
  priority?: boolean;
}

export function LearningCard({
  title,
  description,
  href,
  image,
  badge,
  variant = "read",
  readingTime,
  priority = false,
}: LearningCardProps) {
  const isSimulation = variant === "simulation";
  const ctaLabel = isSimulation ? "Run simulation" : "Read more";

  return (
    <Card
      className="
        group/card overflow-hidden rounded-2xl
        border-2 border-border/60
        bg-background
        transition-all duration-200 ease-out
        hover:-translate-y-0.5
        hover:shadow-xl
        hover:border-border
        hover:bg-muted/30
        focus-visible:outline-none
        focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 focus-within:ring-offset-background
      "
    >
      {/* Image — links to destination */}
      <Link
        href={href}
        scroll={true}
        aria-label={title}
        className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring"
      >
        <div className="relative aspect-video overflow-hidden">
          <Image
            src={image}
            alt={title}
            fill
            priority={priority}
            loading={priority ? undefined : "lazy"}
            placeholder="blur"
            blurDataURL={blurDataURL}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            // Quality is meaningless for vectors and trips
            // next-image-unconfigured-qualities — only set for raster.
            quality={image.endsWith(".svg") ? undefined : 80}
            className="
              object-cover
              transition-transform duration-500 ease-out
              group-hover/card:scale-[1.04]
            "
          />
        </div>
      </Link>

      {/* Content */}
      <CardHeader className="flex flex-col gap-4">
        <div className="space-y-2.5">
          <div className="flex flex-wrap items-center gap-2">
            {badge && (
              <Badge className="w-fit border-primary/20 bg-primary/10 font-semibold text-primary">
                {badge}
              </Badge>
            )}
            {readingTime !== undefined && (
              <span className="inline-flex w-fit items-center gap-1 rounded-full border border-border bg-muted/60 px-2 py-0.5 text-[11px] font-medium text-foreground">
                <Clock size={12} aria-hidden="true" className="text-primary" />
                {readingTime} min read
              </span>
            )}
          </div>
          <CardTitle className="text-xl tracking-tight">
            <Link
              href={href}
              scroll={true}
              className="rounded-sm underline-offset-4 decoration-border hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              {title}
            </Link>
          </CardTitle>
          <CardDescription className="text-sm leading-relaxed">{description}</CardDescription>
        </div>

        {/* CTA */}
        <Button size="sm" className="w-fit self-start p-0" asChild>
          <Link
            href={href}
            scroll={true}
            className="group inline-flex items-center gap-1 px-3 py-1.5"
          >
            {ctaLabel}

            {isSimulation ? (
              <ArrowRight
                size={14}
                className="
                  transition-transform duration-300
                  group-hover:translate-x-1
                "
              />
            ) : (
              <Plus
                size={14}
                className="
                  transition-all duration-300
                  group-hover:rotate-90
                  group-hover:translate-x-0.5
                "
              />
            )}
          </Link>
        </Button>
      </CardHeader>
    </Card>
  );
}
