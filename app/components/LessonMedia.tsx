interface LessonMediaProps {
  media: {
    id: string;
    type:
      | "image"
      | "video"
      | "youtube"
      | "pdf"
      | "worksheet"
      | "chart"
      | "tradingview";
    title: string;
    url: string;
    caption?: string;
  };
}

export default function LessonMedia({
  media,
}: LessonMediaProps) {

  switch (media.type) {

    case "image":

      return (

        <div className="space-y-4">

          <img
            src={media.url}
            alt={media.title}
            className="rounded-2xl w-full"
          />

          {media.caption && (

            <p className="text-sm text-zinc-500">

              {media.caption}

            </p>

          )}

        </div>

      );

    case "youtube":

      return (

        <div className="space-y-4">

          <iframe
            className="w-full aspect-video rounded-2xl"
            src={media.url}
            title={media.title}
            allowFullScreen
          />

          {media.caption && (

            <p className="text-sm text-zinc-500">

              {media.caption}

            </p>

          )}

        </div>

      );

    case "pdf":

      return (

        <div className="rounded-xl border p-6">

          <h3 className="font-bold text-xl">

            {media.title}

          </h3>

          <p className="text-zinc-500 mb-4">

            {media.caption}

          </p>

          <a

            href={media.url}

            target="_blank"

            className="text-orange-600 font-bold"

          >

            Download PDF →

          </a>

        </div>

      );

    case "worksheet":

      return (

        <div className="rounded-xl border p-6">

          <h3 className="font-bold">

            {media.title}

          </h3>

          <a

            href={media.url}

            target="_blank"

            className="text-orange-600 font-semibold"

          >

            Download Worksheet →

          </a>

        </div>

      );

    case "tradingview":

      return (

        <div className="rounded-2xl border p-8">

          <h3 className="font-bold text-xl mb-3">

            {media.title}

          </h3>

          <p className="text-zinc-500">

            TradingView widget will render here.

          </p>

        </div>

      );

    default:

      return null;

  }

}