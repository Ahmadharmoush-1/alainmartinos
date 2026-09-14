import { Button } from "@/components/Button";
import { getContent } from "@/lib/i18n";

const t = getContent();

export default function NotFound() {
  return (
    <section className="silk-bg flex min-h-[70vh] items-center pt-24">
      <div className="container-page py-24 text-center">
        <p className="kicker">404</p>
        <h1 className="mt-4 text-display-lg font-medium">{t.common.notFound.title}</h1>
        <p className="mx-auto mt-4 max-w-md font-serif text-xl italic text-mist">{t.common.notFound.body}</p>
        <div className="mt-10">
          <Button href="/">{t.common.backHome}</Button>
        </div>
      </div>
    </section>
  );
}
