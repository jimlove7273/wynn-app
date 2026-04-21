import type { Entry } from "contentful";
import type {
  ComponentSkeleton,
  HeroEntry,
  PromoEntry,
} from "@/types/dataTypes";
import Hero from "./hero";
import Promo from "./promo";

type ComponentEntry = Entry<ComponentSkeleton, "WITHOUT_UNRESOLVABLE_LINKS">;

type ComponentRendererProps = {
  /**
   * The resolved `components` array straight from a Page entry's fields.
   * Undefined slots (dangling references removed by withoutUnresolvableLinks)
   * are filtered out before rendering.
   */
  components: (ComponentEntry | undefined)[];
};

/**
 * Iterates over a page's `components` array and renders the matching React
 * component for each Contentful content type.
 *
 * To add a new component type:
 *  1. Add its skeleton to ComponentSkeleton in types/dataTypes.ts
 *  2. Create the React component in components/
 *  3. Add a new `case` below that maps the content type ID → component
 */
export default function ComponentRenderer({
  components,
}: ComponentRendererProps) {
  const resolved = components.filter((c): c is ComponentEntry => c != null);

  if (resolved.length === 0) return null;

  return (
    <>
      {resolved.map((component) => {
        const contentTypeId = component.sys.contentType.sys.id;

        switch (contentTypeId) {
          case "hero":
            return (
              <Hero key={component.sys.id} entry={component as HeroEntry} />
            );

          case "promo":
            return (
              <Promo key={component.sys.id} entry={component as PromoEntry} />
            );

          default:
            // Unknown content type — log in development so it's easy to spot.
            if (process.env.NODE_ENV === "development") {
              console.warn(
                `[ComponentRenderer] No component registered for content type: "${contentTypeId}"`
              );
            }
            return null;
        }
      })}
    </>
  );
}
