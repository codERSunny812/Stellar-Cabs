import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa6";
import { FaCarSide, FaMotorcycle } from "react-icons/fa";
import { MdElectricRickshaw } from "react-icons/md";
import Logo from "../components/ui/Logo";

// pehla page: app kya hai, aur login ka raasta
const Home = () => {
    return (
        <div className="flex h-full flex-col bg-ink text-white">
            {/* upar ka hissa */}
            <div className="relative flex flex-1 flex-col overflow-hidden px-6 pt-8">
                {/* peeche halka grid, map jaisa feel */}
                <div
                    className="pointer-events-none absolute inset-0 opacity-[0.07]"
                    style={{
                        backgroundImage:
                            "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
                        backgroundSize: "36px 36px",
                    }}
                />

                <Logo dark />

                <div className="relative mt-auto mb-10">
                    {/* teeno gaadiyan */}
                    <div className="mb-8 flex gap-3">
                        {[FaCarSide, MdElectricRickshaw, FaMotorcycle].map((Icon, i) => (
                            <span key={i} className="grid h-14 w-14 place-items-center rounded-2xl bg-white/10">
                                <Icon className="h-7 w-7" />
                            </span>
                        ))}
                    </div>

                    <h1 className="text-4xl leading-tight font-bold tracking-tight">
                        Go anywhere,
                        <br />
                        <span className="text-zinc-400">in minutes.</span>
                    </h1>
                    <p className="mt-3 text-zinc-400">
                        Cars, autos and bikes near you. Live tracking, upfront fares.
                    </p>
                </div>
            </div>

            {/* neeche ka card */}
            <div className="rounded-t-3xl bg-white px-6 pt-7 pb-8 text-ink">
                <h2 className="text-xl font-bold">Get started with Stellar</h2>
                <Link to="/login" className="btn-primary mt-5">
                    Continue <FaArrowRight />
                </Link>
                <Link to="/caption-login" className="btn-secondary mt-3">
                    Drive with us
                </Link>
            </div>
        </div>
    );
};

export default Home;