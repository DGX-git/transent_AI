import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Typography,
  Paper,
  Snackbar,
  Alert,
  InputAdornment,
  Link as MuiLink,
  TextField,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import Header from "./header";

// Custom styled components with blue theme (#084F82)
const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3), // Reduced from 4
  borderRadius: 12,
  boxShadow: "0 25px 50px -12px rgba(8, 79, 130, 0.15), 0 0 0 1px rgba(8, 79, 130, 0.1)",
  backgroundColor: "#fff",
  width: "100%",
  maxWidth: "400px",
}));

const StyledButton = styled(Button)(({ theme }) => ({
  backgroundColor: "#084F82",
  color: "white",
  fontWeight: 600,
  padding: "10px 16px", // Reduced padding
  borderRadius: 8,
  textTransform: "none",
  boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
  "&:hover": {
    backgroundColor: "#063d66",
    transform: "translateY(-1px)",
    boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
  },
  "&:disabled": {
    backgroundColor: "#9ca3af",
    color: "white",
  },
}));

const StyledTextField = styled(TextField)(({ theme, error }) => ({
  marginBottom: theme.spacing(1), // Reduced from 1.5
  "& .MuiOutlinedInput-root": {
    backgroundColor: "white",
    borderRadius: 8,
    "& fieldset": {
      borderColor: error ? "#ef4444" : "#cfe2f3",
      borderWidth: 2,
    },
    "&:hover fieldset": {
      borderColor: error ? "#ef4444" : "#084F82",
    },
    "&.Mui-focused fieldset": {
      borderColor: error ? "#ef4444" : "#084F82",
      boxShadow: error ? "none" : "0 0 0 3px rgba(8, 79, 130, 0.1)",
    },
  },
  "& .MuiInputLabel-root": {
    color: error ? "#ef4444" : "#6b7280",
    "&.Mui-focused": {
      color: error ? "#ef4444" : "#084F82",
      fontWeight: 500,
    },
  },
  "& .MuiOutlinedInput-input": {
    color: "#1e3a5f",
    padding: "14px 20px", // Reduced input padding
  },
}));

// Individual OTP digit box
const OTPDigitBox = styled("input")(({ theme }) => ({
  width: "42px", // Reduced from 48px
  height: "42px",
  textAlign: "center",
  fontSize: "18px", // Reduced from 20px
  fontWeight: "bold",
  border: "2px solid #cfe2f3",
  borderRadius: "8px",
  color: "#1e3a5f",
  backgroundColor: "white",
  outline: "none",
  transition: "all 0.2s",
  "&:focus": {
    borderColor: "#084F82",
    boxShadow: "0 0 0 3px rgba(8, 79, 130, 0.1)",
  },
  "&:disabled": {
    backgroundColor: "#f3f4f6",
    cursor: "not-allowed",
  },
}));

export default function EmailLoginWithOTP() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [otpDigits, setOtpDigits] = useState(["", "", "", "", "", ""]);
  const [otpSent, setOtpSent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [showErrorSnackbar, setShowErrorSnackbar] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showSuccessSnackbar, setShowSuccessSnackbar] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [resendTimer, setResendTimer] = useState(0);

  // Clear form when component mounts
  useEffect(() => {
    setEmail("");
    setOtpDigits(["", "", "", "", "", ""]);
    setOtpSent(false);
    setErrors({});
    setTouched({});
  }, []);

  // Timer for resend OTP
  useEffect(() => {
    let interval;
    if (resendTimer > 0) {
      interval = setInterval(() => {
        setResendTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [resendTimer]);

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    if (errors.email) {
      setErrors((prev) => ({ ...prev, email: "" }));
    }
  };

  const handleOTPDigitChange = (index, e) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    const newDigits = [...otpDigits];
    newDigits[index] = value;
    setOtpDigits(newDigits);

    if (errors.otp) {
      setErrors((prev) => ({ ...prev, otp: "" }));
    }

    if (value && index < 5) {
      const nextInput = document.querySelector(`input[name="otp-${index + 1}"]`);
      if (nextInput) nextInput.focus();
    }
  };

  const handleOTPDigitKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otpDigits[index] && index > 0) {
      const prevInput = document.querySelector(`input[name="otp-${index - 1}"]`);
      if (prevInput) prevInput.focus();
    }
  };

  const handleBlur = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const validateEmail = () => {
    if (!email || !email.trim()) {
      setErrors((prev) => ({ ...prev, email: "Email is required" }));
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setErrors((prev) => ({ ...prev, email: "Please enter a valid email address" }));
      return false;
    }
    setErrors((prev) => ({ ...prev, email: "" }));
    return true;
  };

  const validateOtp = () => {
    const otp = otpDigits.join("");
    if (!otp || otp.length !== 6) {
      setErrors((prev) => ({ ...prev, otp: "Please enter a valid 6-digit OTP" }));
      return false;
    }
    setErrors((prev) => ({ ...prev, otp: "" }));
    return true;
  };

  const handleSendOTP = async () => {
    setTouched({ email: true });
    if (!validateEmail()) return;
    setIsSubmitting(true);

    try {
      const res = await fetch(
        `${process.env.REACT_APP_DGX_API_URL}/login/send-otp`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        if (data.message === "User not found. Please register first." || 
            data.message.includes("not found")) {
          setErrors((prev) => ({ ...prev, email: "Account not found. Please register first." }));
          setTouched({ email: true });
        } else {
          setErrors((prev) => ({ ...prev, email: data.message || "Failed to send OTP" }));
          setTouched({ email: true });
        }
        return;
      }

      setErrors({});
      setOtpSent(true);
      setResendTimer(600);
      showSuccessMsg("OTP sent successfully to your email!");
      
      setTimeout(() => {
        const firstInput = document.querySelector('input[name="otp-0"]');
        if (firstInput) firstInput.focus();
      }, 100);
    } catch (error) {
      setErrors((prev) => ({ ...prev, email: "Server error. Please try again." }));
      setTouched({ email: true });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleVerifyOTP = async () => {
    setTouched({ otp: true });
    if (!validateOtp()) return;
    setIsSubmitting(true);

    try {
      const otp = otpDigits.join("");
      const res = await fetch(
        `${process.env.REACT_APP_DGX_API_URL}/login/verify-otp`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, otp }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        showErrorMsg(data.message || "Invalid OTP. Please try again.");
        return;
      }

      if (data.token) {
        localStorage.setItem("authToken", data.token);
      }
      if (data.user) {
        localStorage.setItem("user", JSON.stringify(data.user));
      }

      showSuccessMsg("Login successful!");
      setTimeout(() => {
        navigate("/UploadFiles");
      }, 1500);
    } catch (error) {
      showErrorMsg("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResendOTP = async () => {
    if (resendTimer > 0) return;
    setOtpDigits(["", "", "", "", "", ""]);
    setErrors((prev) => ({ ...prev, otp: "" }));
    await handleSendOTP();
  };

  const showErrorMsg = (message) => {
    setErrorMessage(message);
    setShowErrorSnackbar(true);
  };

  const showSuccessMsg = (message) => {
    setSuccessMessage(message);
    setShowSuccessSnackbar(true);
  };

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  return (
    
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        background: "linear-gradient(to bottom right, #f9fafb, #f3f4f6)",
        overflow: "hidden",
        position: "fixed",
        top: 0,
        left: 0,
      }}
    >

      <Header />

      <Snackbar
        open={showSuccessSnackbar}
        autoHideDuration={4000}
        onClose={() => setShowSuccessSnackbar(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setShowSuccessSnackbar(false)}
          severity="success"
          icon={<CheckCircleIcon />}
          sx={{ backgroundColor: "#084F82", color: "white" }}
        >
          {successMessage}
        </Alert>
      </Snackbar>

      <Snackbar
        open={showErrorSnackbar}
        autoHideDuration={5000}
        onClose={() => setShowErrorSnackbar(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setShowErrorSnackbar(false)}
          severity="error"
          icon={<ErrorIcon />}
          sx={{ backgroundColor: "#ef4444", color: "white" }}
        >
          {errorMessage}
        </Alert>
      </Snackbar>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flex: 1,
          padding: 2,
        }}
      >
        <StyledPaper elevation={3}>
          <Box sx={{ textAlign: "center", mb: 2 }}>
            <Box
              sx={{
                width: 50,
                height: 50,
                backgroundColor: "#e3f2fd",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 10px",
              }}
            >
              {otpSent ? (
                <LockIcon sx={{ fontSize: 26, color: "#084F82" }} />
              ) : (
                <EmailIcon sx={{ fontSize: 26, color: "#084F82" }} />
              )}
            </Box>
            <Typography 
              variant="h5" 
              sx={{ 
                fontWeight: "bold", 
                color: "#1f2937", 
                mb: 0.5, 
                fontSize: "1.35rem"
              }}
            >
              {otpSent ? "Enter Login Code" : "Login"}
            </Typography>
            <Typography variant="body2" sx={{ color: "#084F82", fontSize: "0.85rem" }}>
              {otpSent 
                ? `Code sent to: ${email}` 
                : "Enter your email to receive a login code"}
            </Typography>

            {otpSent && resendTimer > 0 && (
              <Box sx={{ mt: 1.5, display: "flex", alignItems: "center", justifyContent: "center", gap: 0.5 }}>
                <AccessTimeIcon 
                  sx={{ 
                    fontSize: 14, 
                    color: resendTimer <= 60 ? "#ef4444" : "#084F82" 
                  }} 
                />
                <Typography 
                  variant="body2" 
                  sx={{ 
                    color: resendTimer <= 60 ? "#ef4444" : "#084F82",
                    fontWeight: 600,
                    fontSize: "0.75rem",
                  }}
                >
                  {resendTimer <= 0 ? (
                    <span style={{ color: "#ef4444" }}>Code expired</span>
                  ) : (
                    `Expires in: ${formatTime(resendTimer)}`
                  )}
                </Typography>
              </Box>
            )}
          </Box>

          <Box component="form" noValidate autoComplete="off">
            {!otpSent && (
              <StyledTextField
                fullWidth
                label={errors.email && touched.email ? errors.email : "Email Address*"}
                name="email"
                type="email"
                value={email}
                onChange={handleEmailChange}
                onBlur={() => handleBlur("email")}
                error={Boolean(errors.email && touched.email)}
                // InputProps={{
                //   startAdornment: (
                //     <InputAdornment position="start">
                //       {/* <EmailIcon sx={{ color: "#084F82", fontSize: 20 }} /> */}
                //     </InputAdornment>
                //   ),
                // }}
              />
            )}

            {otpSent && (
              <>
                <Box sx={{ display: "flex", justifyContent: "center", gap: 1.2, mb: 1.5 }}>
                  {otpDigits.map((digit, index) => (
                    <OTPDigitBox
                      key={index}
                      type="text"
                      name={`otp-${index}`}
                      value={digit}
                      onChange={(e) => handleOTPDigitChange(index, e)}
                      onKeyDown={(e) => handleOTPDigitKeyDown(index, e)}
                      maxLength={1}
                      autoFocus={index === 0}
                      disabled={resendTimer <= 0}
                    />
                  ))}
                </Box>

                {errors.otp && touched.otp && (
                  <Typography 
                    variant="body2" 
                    sx={{ 
                      color: "#ef4444", 
                      textAlign: "center", 
                      mb: 1.5,
                      fontSize: "0.75rem"
                    }}
                  >
                    {errors.otp}
                  </Typography>
                )}
              </>
            )}

            <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mt: 2 }}>
              {!otpSent ? (
                <StyledButton onClick={handleSendOTP} disabled={isSubmitting} fullWidth>
                  {isSubmitting ? "Sending..." : "Get OTP"}
                </StyledButton>
              ) : (
                <StyledButton
                  onClick={handleVerifyOTP}
                  disabled={isSubmitting}
                  fullWidth
                >
                  {isSubmitting 
                    ? "Verifying..." 
                    : resendTimer <= 0 
                    ? "Code Expired" 
                    : "Login"}
                </StyledButton>
              )}
            </Box>
          </Box>

          <Box
            sx={{
              textAlign: "center",
              mt: 2,
              pt: 2,
              borderTop: "1px solid #cfe2f3",
            }}
          >
            {!otpSent ? (
              <Typography variant="body2" sx={{ color: "#084F82", fontSize: "0.85rem" }}>
                Don't have an account?{" "}
                <MuiLink
                  href="/register"
                  sx={{
                    color: "#084F82",
                    fontWeight: 600,
                    textDecoration: "none",
                    "&:hover": {
                      color: "#063d66",
                      textDecoration: "underline",
                    },
                  }}
                >
                  Register here
                </MuiLink>
              </Typography>
            ) : (
              <Box>
                {resendTimer > 0 ? (
                  <Typography variant="body2" sx={{ color: "#6b7280", fontSize: "0.85rem" }}>
                    Resend OTP in {resendTimer}s
                  </Typography>
                ) : (
                  <Typography variant="body2" sx={{ color: "#084F82", fontSize: "0.85rem" }}>
                    Didn't receive the code?{" "}
                    <MuiLink
                      component="button"
                      type="button"
                      onClick={handleResendOTP}
                      sx={{
                        color: "#084F82",
                        fontWeight: 600,
                        textDecoration: "none",
                        cursor: "pointer",
                        "&:hover": {
                          color: "#063d66",
                          textDecoration: "underline",
                        },
                      }}
                    >
                      Resend Code
                    </MuiLink>
                  </Typography>
                )}
              </Box>
            )}
          </Box>
        </StyledPaper>
      </Box>
    </Box>
  );
}