import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../firebaseConfig";

const roles = ["Farmer", "Trader", "Supplier", "Agronomist"];

const translations = {
  en: {
    title: "🌾 KarshakaMithram Register",
    fullName: "Full Name",
    email: "Email",
    mobile: "Mobile Number (10 digits)",
    role: "Select Role",
    roleOptions: roles,
    location: "Location (Village/District)",
    useCurrentLocation: "Use current location",
    password: "Password",
    confirmPassword: "Confirm Password",
    terms: "I accept the",
    termsLink: "Terms and Conditions",
    register: "Register",
    registering: "Registering...",
    alreadyAccount: "Already have an account?",
    login: "Login",
    errors: {
      fullNameRequired: "Full name is required",
      emailRequired: "Email is required",
      emailInvalid: "Please enter a valid email address",
      mobileRequired: "Mobile number is required",
      mobileInvalid: "Please enter a valid 10-digit Indian mobile number",
      roleRequired: "Please select your role",
      locationRequired: "Location is required",
      passwordRequired: "Password is required",
      passwordWeak: "Password must be at least 6 characters",
      confirmPasswordRequired: "Please confirm your password",
      passwordsMismatch: "Passwords do not match",
      termsRequired: "You must accept the terms and conditions",
      emailInUse: "This email is already registered",
      emailInvalidFirebase: "Invalid email address",
      passwordWeakFirebase: "Password is too weak",
      registerFailed: "Failed to register. Please try again.",
      geoNotSupported: "Geolocation is not supported by your browser",
      geoPermissionDenied: "Permission denied or unable to retrieve location",
      geoFailed: "Failed to fetch location name",
      geoNoAddress: "Could not determine location name",
    },
  },
  ml: {
    title: "🌾 കര്‍ഷകമിത്രം രജിസ്റ്റര്‍ ചെയ്യുക",
    fullName: "പൂര്‍ണ്ണ പേര്",
    email: "ഇമെയില്‍",
    mobile: "മൊബൈല്‍ നമ്പര്‍ (10 അക്കങ്ങള്‍)",
    role: "പങ്കാളി തിരഞ്ഞെടുക്കുക",
    roleOptions: ["കർഷകൻ", "വ്യാപാരി", "സപ്ലയർ", "കൃഷി വിദഗ്ധൻ"],
    location: "സ്ഥലം (ഗ്രാമം/ജില്ല)",
    useCurrentLocation: "നിലവിലെ സ്ഥലം ഉപയോഗിക്കുക",
    password: "പാസ്‌വേഡ്",
    confirmPassword: "പാസ്‌വേഡ് സ്ഥിരീകരിക്കുക",
    terms: "ഞാന്‍ അംഗീകരിക്കുന്നു",
    termsLink: "നിയമങ്ങളും നിബന്ധനകളും",
    register: "രജിസ്റ്റര്‍ ചെയ്യുക",
    registering: "രജിസ്റ്റര്‍ ചെയ്യുന്നു...",
    alreadyAccount: "ഇതിനകം അക്കൗണ്ട് ഉണ്ടോ?",
    login: "ലോഗിന്‍ ചെയ്യുക",
    errors: {
      fullNameRequired: "പൂര്‍ണ്ണ പേര് ആവശ്യമാണ്",
      emailRequired: "ഇമെയില്‍ ആവശ്യമാണ്",
      emailInvalid: "സാധുവായ ഇമെയില്‍ വിലാസം നല്‍കുക",
      mobileRequired: "മൊബൈല്‍ നമ്പര്‍ ആവശ്യമാണ്",
      mobileInvalid: "സാധുവായ 10 അക്ക ഇന്ത്യന്‍ മൊബൈല്‍ നമ്പര്‍ നല്‍കുക",
      roleRequired: "ദയവായി നിങ്ങളുടെ പങ്കാളി തിരഞ്ഞെടുക്കുക",
      locationRequired: "സ്ഥലം ആവശ്യമാണ്",
      passwordRequired: "പാസ്‌വേഡ് ആവശ്യമാണ്",
      passwordWeak: "പാസ്‌വേഡ് കുറഞ്ഞത് 6 അക്ഷരമാകണം",
      confirmPasswordRequired: "പാസ്‌വേഡ് സ്ഥിരീകരിക്കുക",
      passwordsMismatch: "പാസ്‌വേഡുകള്‍ പൊരുത്തപ്പെടുന്നില്ല",
      termsRequired: "നിബന്ധനകള്‍ അംഗീകരിക്കണം",
      emailInUse: "ഈ ഇമെയില്‍ ഇതിനകം രജിസ്റ്റര്‍ ചെയ്തിരിക്കുന്നു",
      emailInvalidFirebase: "അസാധുവായ ഇമെയില്‍ വിലാസം",
      passwordWeakFirebase: "പാസ്‌വേഡ് വളരെ ദുർബലമാണ്",
      registerFailed: "രജിസ്റ്റര്‍ ചെയ്യാന്‍ പരാജയപ്പെട്ടു. ദയവായി വീണ്ടും ശ്രമിക്കുക.",
      geoNotSupported: "നിങ്ങളുടെ ബ്രൗസറില്‍ ജിയോളൊക്കേഷന്‍ പിന്തുണയില്ല",
      geoPermissionDenied: "അനുമതി നിഷേധിച്ചു അല്ലെങ്കില്‍ സ്ഥലം കണ്ടെത്താനായില്ല",
      geoFailed: "സ്ഥലം കണ്ടെത്താന്‍ പരാജയപ്പെട്ടു",
      geoNoAddress: "സ്ഥലം കണ്ടെത്താനായില്ല",
    },
  },
};

export default function Register() {
  const [lang, setLang] = useState<"en" | "ml">("en");
  const t = translations[lang];

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [mobile, setMobile] = useState("");
  const [mobileError, setMobileError] = useState("");
  const [role, setRole] = useState("");
  const [roleError, setRoleError] = useState("");
  const [location, setLocation] = useState("");
  const [locationError, setLocationError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [termsError, setTermsError] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const errorRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (error && errorRef.current) {
      errorRef.current.focus();
    }
  }, [error]);

  const validateEmail = (email: string) => {
    const re =
      /^(([^<>()\$\$\\.,;:\s@"]+(\.[^<>()\$\$\\.,;:\s@"]+)*)|(".+"))@(([^<>()[\$\\.,;:\s@"]+\.)+[^<>()[\$\\.,;:\s@"]{2,})$/i;
    return re.test(String(email).toLowerCase());
  };

  const validateMobile = (mobile: string) => {
    return /^[6-9]\d{9}$/.test(mobile);
  };

  const validatePassword = (password: string) => {
    return password.length >= 6;
  };

  const handleUseCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert(t.errors.geoNotSupported);
      return;
    }
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`
          );
          const data = await response.json();
          if (data.address) {
            const loc =
              data.address.village ||
              data.address.town ||
              data.address.city ||
              data.address.county ||
              data.address.state ||
              "";
            setLocation(loc);
            setLocationError("");
          } else {
            alert(t.errors.geoNoAddress);
          }
        } catch {
          alert(t.errors.geoFailed);
        }
      },
      () => {
        alert(t.errors.geoPermissionDenied);
      }
    );
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    setError("");
    setEmailError("");
    setMobileError("");
    setRoleError("");
    setLocationError("");
    setPasswordError("");
    setConfirmPasswordError("");
    setTermsError("");

    if (!fullName.trim()) {
      setError(t.errors.fullNameRequired);
      return;
    }
    if (!email) {
      setEmailError(t.errors.emailRequired);
      return;
    }
    if (!validateEmail(email)) {
      setEmailError(t.errors.emailInvalid);
      return;
    }
    if (!mobile) {
      setMobileError(t.errors.mobileRequired);
      return;
    }
    if (!validateMobile(mobile)) {
      setMobileError(t.errors.mobileInvalid);
      return;
    }
    if (!role) {
      setRoleError(t.errors.roleRequired);
      return;
    }
    if (!location.trim()) {
      setLocationError(t.errors.locationRequired);
      return;
    }
    if (!password) {
      setPasswordError(t.errors.passwordRequired);
      return;
    }
    if (!validatePassword(password)) {
      setPasswordError(t.errors.passwordWeak);
      return;
    }
    if (!confirmPassword) {
      setConfirmPasswordError(t.errors.confirmPasswordRequired);
      return;
    }
    if (password !== confirmPassword) {
      setConfirmPasswordError(t.errors.passwordsMismatch);
      return;
    }
    if (!termsAccepted) {
      setTermsError(t.errors.termsRequired);
      return;
    }

    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await updateProfile(userCredential.user, {
        displayName: fullName.trim(),
      });
      setError("");
      alert(t.register + " " + "successful!");
      navigate("/");
    } catch (err: any) {
      switch (err.code) {
        case "auth/email-already-in-use":
          setError(t.errors.emailInUse);
          break;
        case "auth/invalid-email":
          setError(t.errors.emailInvalidFirebase);
          break;
        case "auth/weak-password":
          setError(t.errors.passwordWeakFirebase);
          break;
        default:
          setError(t.errors.registerFailed);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gradient-to-br from-green-600 via-green-500 to-yellow-400 px-4">
      {/* Language Switcher */}
      <div className="mb-4 space-x-4">
        <button
          onClick={() => setLang("en")}
          className={`px-3 py-1 rounded ${
            lang === "en" ? "bg-green-700 text-white" : "bg-white text-green-700"
          }`}
          aria-pressed={lang === "en"}
        >
          English
        </button>
        <button
          onClick={() => setLang("ml")}
          className={`px-3 py-1 rounded ${
            lang === "ml" ? "bg-green-700 text-white" : "bg-white text-green-700"
          }`}
          aria-pressed={lang === "ml"}
        >
          മലയാളം
        </button>
      </div>

      <form
        onSubmit={handleRegister}
        className="bg-white rounded-2xl shadow-2xl px-8 py-10 w-full max-w-4xl flex flex-col space-y-6 md:space-y-8"
        aria-describedby="error-message"
        noValidate
      >
        <h1 className="text-3xl font-extrabold text-center text-green-800 mb-4 drop-shadow-md">
          {t.title}
        </h1>

        {(error ||
          emailError ||
          mobileError ||
          roleError ||
          locationError ||
          termsError) && (
          <p
            id="error-message"
            tabIndex={-1}
            ref={errorRef}
            className="text-center font-medium text-red-500"
            role="alert"
            aria-live="assertive"
          >
            {error ||
              emailError ||
              mobileError ||
              roleError ||
              locationError ||
              termsError}
          </p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Full Name */}
          <div>
            <label htmlFor="fullName" className="sr-only">
              {t.fullName}
            </label>
            <input
              id="fullName"
              type="text"
              placeholder={t.fullName}
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="px-4 py-3 border-2 border-green-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 placeholder-green-400 text-green-900 w-full"
              required
              autoComplete="name"
            />
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="sr-only">
              {t.email}
            </label>
            <input
              id="email"
              type="email"
              placeholder={t.email}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`px-4 py-3 border-2 rounded-xl placeholder-green-400 text-green-900 w-full focus:outline-none focus:ring-2 focus:ring-green-500 ${
                emailError ? "border-red-500" : "border-green-300"
              }`}
              aria-invalid={!!emailError}
              aria-describedby={emailError ? "error-message" : undefined}
              required
              autoComplete="email"
            />
          </div>

          {/* Mobile Number */}
          <div>
            <label htmlFor="mobile" className="sr-only">
              {t.mobile}
            </label>
            <input
              id="mobile"
              type="tel"
              placeholder={t.mobile}
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              className={`px-4 py-3 border-2 rounded-xl placeholder-green-400 text-green-900 w-full focus:outline-none focus:ring-2 focus:ring-green-500 ${
                mobileError ? "border-red-500" : "border-green-300"
              }`}
              aria-invalid={!!mobileError}
              aria-describedby={mobileError ? "error-message" : undefined}
              required
              maxLength={10}
              pattern="[6-9][0-9]{9}"
              inputMode="numeric"
            />
          </div>

          {/* Role Selection */}
          <div>
            <label htmlFor="role" className="sr-only">
              {t.role}
            </label>
            <select
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className={`px-4 py-3 border-2 rounded-xl placeholder-green-400 text-green-900 w-full focus:outline-none focus:ring-2 focus:ring-green-500 ${
                roleError ? "border-red-500" : "border-green-300"
              }`}
              aria-invalid={!!roleError}
              aria-describedby={roleError ? "error-message" : undefined}
              required
            >
              <option value="" disabled>
                {t.role}
              </option>
              {t.roleOptions.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
          </div>

          {/* Location with geolocation button */}
          <div className="relative">
            <label htmlFor="location" className="sr-only">
              {t.location}
            </label>
            <input
              id="location"
              type="text"
              placeholder={t.location}
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className={`w-full px-4 py-3 border-2 rounded-xl placeholder-green-400 text-green-900 focus:outline-none focus:ring-2 focus:ring-green-500 ${
                locationError ? "border-red-500" : "border-green-300"
              }`}
              aria-invalid={!!locationError}
              aria-describedby={locationError ? "error-message" : undefined}
              required
              autoComplete="address-level2"
            />
            <button
              type="button"
              onClick={handleUseCurrentLocation}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-green-700 hover:text-green-900 focus:outline-none"
              aria-label={t.useCurrentLocation}
              title={t.useCurrentLocation}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </button>
          </div>

          {/* Password */}
          <div className="relative">
            <label htmlFor="password" className="sr-only">
              {t.password}
            </label>
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder={t.password}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full px-4 py-3 border-2 rounded-xl placeholder-green-400 text-green-900 focus:outline-none focus:ring-2 focus:ring-green-500 ${
                passwordError ? "border-red-500" : "border-green-300"
              }`}
              aria-invalid={!!passwordError}
              aria-describedby={passwordError ? "error-message" : undefined}
              required
              autoComplete="new-password"
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-green-700 hover:text-green-900 focus:outline-none"
              aria-label={showPassword ? "Hide password" : "Show password"}
              tabIndex={0}
            >
              {showPassword ? (
                                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.875 18.825A10.05 10.05 0 0112 19c-5.523 0-10-4.477-10-10a9.96 9.96 0 012.175-6.125M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 3l18 18" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
              )}
            </button>
          </div>

          {/* Confirm Password */}
          <div className="relative">
            <label htmlFor="confirmPassword" className="sr-only">
              {t.confirmPassword}
            </label>
            <input
              id="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              placeholder={t.confirmPassword}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className={`w-full px-4 py-3 border-2 rounded-xl placeholder-green-400 text-green-900 focus:outline-none focus:ring-2 focus:ring-green-500 ${
                confirmPasswordError ? "border-red-500" : "border-green-300"
              }`}
              aria-invalid={!!confirmPasswordError}
              aria-describedby={confirmPasswordError ? "error-message" : undefined}
              required
              autoComplete="new-password"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword((v) => !v)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-green-700 hover:text-green-900 focus:outline-none"
              aria-label={
                showConfirmPassword
                  ? "Hide confirm password"
                  : "Show confirm password"
              }
              tabIndex={0}
            >
              {showConfirmPassword ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.875 18.825A10.05 10.05 0 0112 19c-5.523 0-10-4.477-10-10a9.96 9.96 0 012.175-6.125M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 3l18 18" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Terms and Conditions */}
        <div className="flex items-center space-x-3">
          <input
            id="terms"
            type="checkbox"
            checked={termsAccepted}
            onChange={() => setTermsAccepted((v) => !v)}
            className={`form-checkbox h-5 w-5 text-green-600 ${
              termsError ? "border-red-500" : ""
            }`}
            aria-invalid={!!termsError}
            aria-describedby={termsError ? "error-message" : undefined}
            required
          />
          <label htmlFor="terms" className="text-green-700 text-sm select-none">
            {t.terms}{" "}
            <a
              href="/terms"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-green-900"
            >
              {t.termsLink}
            </a>
          </label>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-green-700 text-white font-semibold py-3 rounded-xl hover:bg-green-800 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? t.registering : t.register}
        </button>

        <p className="text-center text-green-700 text-sm mt-2">
          {t.alreadyAccount}{" "}
          <span
            onClick={() => navigate("/")}
            className="underline cursor-pointer hover:text-green-900"
            role="link"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") navigate("/");
            }}
          >
            {t.login}
          </span>
        </p>
      </form>
    </div>
  );
}