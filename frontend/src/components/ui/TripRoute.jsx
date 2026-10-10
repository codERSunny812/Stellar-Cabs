// pickup -> drop: do dot aur beech mein line, jaise Uber mein
const TripRoute = ({ pickup, destination }) => (
    <div className="flex gap-3">
        <div className="flex flex-col items-center pt-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-ink" />
            <span className="my-1 w-px flex-1 bg-zinc-300" />
            <span className="h-2.5 w-2.5 bg-ink" />
        </div>

        <div className="min-w-0 flex-1">
            <p className="eyebrow">pickup</p>
            <p className="truncate font-medium capitalize">{pickup || "--"}</p>
            <div className="my-3 border-t border-line" />
            <p className="eyebrow">drop</p>
            <p className="truncate font-medium capitalize">{destination || "--"}</p>
        </div>
    </div>
);

export default TripRoute;