import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { CaptionContext } from "../Context/CaptionContext";
import AuthLayout from "../components/ui/AuthLayout";
import PasswordInput from "../components/ui/PasswordInput";
import { VEHICLES } from "../utils/vechiles";

const CaptionSignUp = () => {
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [vechileColor, setVechileColor] = useState("");
  const [vechileModel, setVechileModel] = useState("");
  const [vechileNumber, setVechileNumber] = useState("");
  const [vechileType, setVechileType] = useState("");
  const [vechileCapacity, setVechileCapacity] = useState("");
  const [loading, setLoading] = useState(false);

  const { setCaptionData } = useContext(CaptionContext);
  const navigate = useNavigate();

  // gaadi chunne par uski normal capacity bhar do (driver badal sakta hai)
  const handleSelectType = (vehicle) => {
    setVechileType(vehicle.type);
    setVechileCapacity(String(vehicle.capacity));
  };

  const handleSignupForm = async (e) => {
    e.preventDefault();

    if (!firstname || !lastname || !email || !password || !vechileColor || !vechileModel || !vechileNumber || !vechileType || !vechileCapacity) {
      toast.error("all fields are required");
      return;
    }

    const newCaptionData = {
      fullName: { firstName: firstname, lastName: lastname },
      email,
      password,
      vechile: {
        color: vechileColor,
        model: vechileModel,
        numberPlate: vechileNumber,
        vechileType,
        capacity: vechileCapacity,
      },
    };

    try {
      setLoading(true);
      const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/caption/register`, newCaptionData);
      setCaptionData(res.data?.data);
      toast.success("account created, please log in");
      navigate("/caption-login");
    } catch (error) {
      console.log("captain signup error:", error);
      const msg =
        error?.response?.data?.errors?.[0]?.msg ||
        error?.response?.data?.message ||
        "something went wrong";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout backTo="/caption-login" title="Become a driver" subtitle="Tell us about you and your vehicle.">
      <form onSubmit={handleSignupForm} className="flex flex-col gap-5">
        <p className="eyebrow">about you</p>

        <div className="flex gap-3">
          <input type="text" value={firstname} onChange={(e) => setFirstName(e.target.value)} placeholder="First name" className="input" />
          <input type="text" value={lastname} onChange={(e) => setLastName(e.target.value)} placeholder="Last name" className="input" />
        </div>

        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="email@example.com" className="input" />

        <PasswordInput value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password (min 5 characters)" />

        <p className="eyebrow mt-3">your vehicle</p>

        {/* gaadi ka type: teen tiles */}
        <div className="grid grid-cols-3 gap-3">
          {VEHICLES.map((vehicle) => {
            const selected = vechileType === vehicle.type;
            return (
              <button
                key={vehicle.type}
                type="button"
                onClick={() => handleSelectType(vehicle)}
                className={`flex flex-col items-center gap-1.5 rounded-2xl border-2 py-3.5 transition ${selected ? "border-ink bg-white" : "border-transparent bg-surface"
                  }`}
              >
                <vehicle.icon className="h-7 w-7" />
                <span className="text-sm font-semibold capitalize">{vehicle.type}</span>
              </button>
            );
          })}
        </div>

        <div className="flex gap-3">
          <input type="text" value={vechileModel} onChange={(e) => setVechileModel(e.target.value)} placeholder="Model" className="input" />
          <input type="text" value={vechileColor} onChange={(e) => setVechileColor(e.target.value)} placeholder="Colour" className="input" />
        </div>

        <div className="flex gap-3">
          <input
            type="text"
            value={vechileNumber}
            onChange={(e) => setVechileNumber(e.target.value.toUpperCase())}
            placeholder="Number plate"
            className="input uppercase placeholder:normal-case"
          />
          <input
            type="number"
            min="1"
            value={vechileCapacity}
            onChange={(e) => setVechileCapacity(e.target.value)}
            placeholder="Seats"
            className="input w-28 shrink-0"
          />
        </div>

        <button type="submit" disabled={loading} className="btn-primary mt-2">
          {loading ? "Creating account..." : "Sign up as driver"}
        </button>

        <p className="text-center text-sm text-muted">
          Already driving with us?{" "}
          <Link to="/caption-login" className="font-semibold text-ink underline underline-offset-4">
            Log in
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
};

export default CaptionSignUp;