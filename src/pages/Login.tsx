import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  browserLocalPersistence,
  browserSessionPersistence,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth } from "../firebaseConfig";

// Translation strings
const translations = {
  en: {
    title: "🌾 KarshakaMithram Login",
    email: "Email",
    emailPlaceholder: "Email",
    password: "Password",
    passwordPlaceholder: "Password",
    rememberMe: "Remember me",
    forgotPassword: "Forgot password?",
    login: "Login",
    loggingIn: "Logging in...",
    supporting: "Supporting Indian Farmers",
    noAccount: "Don't have an account?",
    register: "Register",
    resetSent: "Password reset email sent! Check your inbox.",
    errors: {
      invalidEmail: "Please enter a valid email address",
      noPassword: "Please enter your password",
      userNotFound: "No user found with this email",
      wrongPassword: "Incorrect password",
      tooManyAttempts: "Too many failed attempts. Please try again later or reset your password.",
      default: "Failed to login. Please try again.",
      resetFailed: "Failed to send reset email. Please try again.",
      resetEmailRequired: "Please enter a valid email address to reset password"
    },
    showPassword: "Show password",
    hidePassword: "Hide password"
  },
  ml: {
    title: "🌾 കർഷകമിത്രം ലോഗിൻ",
    email: "ഇമെയിൽ",
    emailPlaceholder: "ഇമെയിൽ",
    password: "പാസ്വേഡ്",
    passwordPlaceholder: "പാസ്വേഡ്",
    rememberMe: "എന്നെ ഓർക്കുക",
    forgotPassword: "പാസ്വേഡ് മറന്നുപോയി?",
    login: "ലോഗിൻ",
    loggingIn: "ലോഗിൻ ചെയ്യുന്നു...",
    supporting: "ഇന്ത്യൻ കർഷകരെ പിന്തുണയ്ക്കുന്നു",
    noAccount: "അക്കൗണ്ട് ഇല്ലേ?",
    register: "രജിസ്റ്റർ ചെയ്യുക",
    resetSent: "പാസ്വേഡ് റീസെറ്റ് ഇമെയിൽ അയച്ചു! നിങ്ങളുടെ ഇൻബോക്സ് പരിശോധിക്കുക.",
    errors: {
      invalidEmail: "ദയവായി ഒരു സാധുതയുള്ള ഇമെയിൽ വിലാസം നൽകുക",
      noPassword: "ദയവായി നിങ്ങളുടെ പാസ്വേഡ് നൽകുക",
      userNotFound: "ഈ ഇമെയിൽ ഉപയോഗിച്ച് ഉപയോക്താവ് കണ്ടെത്തിയില്ല",
      wrongPassword: "തെറ്റായ പാസ്വേഡ്",
      tooManyAttempts: "വളരെയധികം പരാജയപ്പെട്ട ശ്രമങ്ങൾ. ദയവായി പിന്നീട് വീണ്ടും ശ്രമിക്കുക അല്ലെങ്കിൽ നിങ്ങളുടെ പാസ്വേഡ് റീസെറ്റ് ചെയ്യുക.",
      default: "ലോഗിൻ ചെയ്യുന്നതിൽ പരാജയപ്പെട്ടു. ദയവായി വീണ്ടും ശ്രമിക്കുക.",
      resetFailed: "റീസെറ്റ് ഇമെയിൽ അയയ്ക്കുന്നതിൽ പരാജയപ്പെട്ടു. ദയവായി വീണ്ടും ശ്രമിക്കുക.",
      resetEmailRequired: "പാസ്വേഡ് റീസെറ്റ് ചെയ്യാൻ ദയവായി ഒരു സാധുതയുള്ള ഇമെയിൽ വിലാസം നൽകുക"
    },
    showPassword: "പാസ്വേഡ് കാണിക്കുക",
    hidePassword: "പാസ്വേഡ് മറയ്ക്കുക"
  }
};

export default function Login() {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [resetSent, setResetSent] = useState(false);
  const [language, setLanguage] = useState<"en" | "ml">("en");
  const navigate = useNavigate();
  const errorRef = useRef<HTMLParagraphElement>(null);

  const t = translations[language];
  const isRTL = language === "ml";

  // Focus error message when it appears
  useEffect(() => {
    if (error && errorRef.current) {
      errorRef.current.focus();
    }
  }, [error]);

  // Simple email validation
  const validateEmail = (email: string) => {
    const re =
      /^(([^<>()\$\$\\.,;:\s@"]+(\.[^<>()\$\$\\.,;:\s@"]+)*)|(".+"))@(([^<>()[\$\\.,;:\s@"]+\.)+[^<>()[\$\\.,;:\s@"]{2,})$/i;
    return re.test(String(email).toLowerCase());
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setEmailError("");
    setResetSent(false);

    if (!validateEmail(email)) {
      setEmailError(t.errors.invalidEmail);
      return;
    }
    if (!password) {
      setError(t.errors.noPassword);
      return;
    }

    setLoading(true);
    try {
      // Set persistence based on rememberMe
      if (rememberMe) {
        await auth.setPersistence(browserLocalPersistence);
      } else {
        await auth.setPersistence(browserSessionPersistence);
      }

      await signInWithEmailAndPassword(auth, email, password);
      navigate("/home");
    } catch (err: any) {
      // Map Firebase error codes to friendly messages
      switch (err.code) {
        case "auth/user-not-found":
          setError(t.errors.userNotFound);
          break;
        case "auth/wrong-password":
          setError(t.errors.wrongPassword);
          break;
        case "auth/too-many-requests":
          setError(t.errors.tooManyAttempts);
          break;
        default:
          setError(t.errors.default);
      }
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordReset = async () => {
    setError("");
    setEmailError("");
    setResetSent(false);

    if (!validateEmail(email)) {
      setEmailError(t.errors.resetEmailRequired);
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      setResetSent(true);
    } catch (err: any) {
      switch (err.code) {
        case "auth/user-not-found":
          setError(t.errors.userNotFound);
          break;
        default:
          setError(t.errors.resetFailed);
      }
    }
  };

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "ml" : "en");
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-br from-green-600 via-green-500 to-yellow-400 px-4">
      <form
        onSubmit={handleLogin}
        className="bg-white rounded-2xl shadow-2xl px-8 py-10 max-w-md w-full flex flex-col space-y-6 relative"
        aria-describedby="error-message"
        noValidate
        dir={isRTL ? "rtl" : "ltr"}
      >
        {/* Language Toggle Button */}
        <button
          type="button"
          onClick={toggleLanguage}
          className={`absolute top-4 ${isRTL ? 'left-4' : 'right-4'} bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium hover:bg-green-200 transition-colors`}
          aria-label={language === "en" ? "Switch to Malayalam" : "Switch to English"}
        >
          {language === "en" ? "മലയാളം" : "English"}
        </button>

        <h1 className="text-3xl font-extrabold text-center text-green-800 mb-4 drop-shadow-md">
          {t.title}
        </h1>

        {(error || emailError || resetSent) && (
          <p
            id="error-message"
            tabIndex={-1}
            ref={errorRef}
            className={`text-center font-medium ${
              resetSent ? "text-green-600" : "text-red-500"
            }`}
            role={resetSent ? "alert" : "alert"}
            aria-live="assertive"
          >
            {resetSent
              ? t.resetSent
              : error || emailError}
          </p>
        )}

        <label htmlFor="email" className="sr-only">
          {t.email}
        </label>
        <input
          id="email"
          type="email"
          placeholder={t.emailPlaceholder}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={`px-5 py-3 border-2 rounded-xl placeholder-green-400 text-green-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 ${
            emailError ? "border-red-500" : "border-green-300"
          }`}
          aria-invalid={!!emailError}
          aria-describedby={emailError ? "error-message" : undefined}
          autoComplete="email"
          required
        />

        <label htmlFor="password" className="sr-only">
          {t.password}
        </label>
        <div className="relative">
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder={t.passwordPlaceholder}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={`w-full px-5 py-3 border-2 rounded-xl placeholder-green-400 text-green-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 ${
              error && !emailError ? "border-red-500" : "border-green-300"
            }`}
            aria-invalid={!!error && !emailError}
            aria-describedby={error && !emailError ? "error-message" : undefined}
            autoComplete="current-password"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword((v) => !v)}
            className={`absolute top-1/2 -translate-y-1/2 text-green-700 hover:text-green-900 focus:outline-none ${
              isRTL ? 'left-3' : 'right-3'
            }`}
            aria-label={showPassword ? t.hidePassword : t.showPassword}
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
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 3l18 18"
                />
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

        <div className={`flex items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
          <label className="inline-flex items-center space-x-2 text-green-700">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={() => setRememberMe((v) => !v)}
              className="form-checkbox h-5 w-5 text-green-600"
            />
            <span>{t.rememberMe}</span>
          </label>

          <button
            type="button"
            onClick={handlePasswordReset}
            className="text-green-700 underline hover:text-green-900 text-sm"
          >
            {t.forgotPassword}
          </button>
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`bg-green-700 text-white font-semibold py-3 rounded-xl hover:bg-green-800 transition disabled:opacity-50 disabled:cursor-not-allowed`}
        >
          {loading ? t.loggingIn : t.login}
        </button>

        <p className="text-center text-green-700 text-sm mt-2">
          {t.supporting}
        </p>

        <p className="text-center text-green-700 text-sm mt-2">
          {t.noAccount}{" "}
          <span
            onClick={() => navigate("/register")}
            className="underline cursor-pointer hover:text-green-900"
            role="link"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") navigate("/register");
            }}
          >
            {t.register}
          </span>
        </p>
      </form>
    </div>
  );
}